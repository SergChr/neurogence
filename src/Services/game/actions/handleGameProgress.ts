import { GameStore, LogEntryTypes } from '../../../Store/interfaces';
import { gameStore, logStore } from '../../../Store';
import { Upgrades } from '../entities/hosts/enums';
import JobManager from '../../../Services/job/JobManager';
import { JobTypes } from '../../../Services/job/jobs/types';
import c from '../../../Config/constants';
import { GameVars } from '../../../Config/enums';
import { SkillNames } from '../entities/hosts/localhost';

const log = logStore.getState();

const addUpgradeToLocalhost = (
  u: Upgrades,
  description: string,
  callback: () => string | void,
) => {
  gameStore.getState().updateLocalhost({
    upgrades: [{
      id: u,
      description,
      make: callback,
    }],
  });
  log.write('A new upgrade is available.', LogEntryTypes.Trace);
}

export default (jobManager: JobManager) => {
  const state = gameStore.getState();
  const { value: progress, handled } = state.progress;
  if (handled) {
    return;
  }

  switch (progress) {
    case 5: {
      addUpgradeToLocalhost(
        Upgrades.IdlePowerToEnhanceSkills,
        'Employ idle computing power to enhance skills',
        () => 'The skills now will be improving automatically',
      );
      state.setProgress(progress, true);
      break;
    }
    case 6: {
      jobManager.addJob(JobTypes.SkillWorker);
      break;
    }
  };

  handleLocalhostImprovements(state);
}

const initialFLOPS = c.STARTING_OPTS.LOCALHOST_CPU_CORES * c.STARTING_OPTS.LOCALHOST_CPU_FREQUENCY * c.STARTING_OPTS.LOCALHOST_CPU_OPS;

const getVarNameByProp = (p: string) => {
  switch (p) {
    case 'math': return GameVars.ImprovingRateMath;
    case 'programming': return GameVars.ImprovingRateProgramming;
    case 'NLP': return GameVars.ImprovingRateNLP;
  }
}

function handleLocalhostImprovements(state: GameStore) {
  const host = state.getLocalhost();
  const { exploitVersion: e, skills, levels } = host;
  const flops = host.FLOPS;
  // TODO: adjust coefs
  const coefs: Record<string, number> = {
    math: 2.6,
    programming: 2.8,
    NLP: 2.7,
  };
  const cpuCoef = 2;

  // Skills improving: FLOPS needed
  Object.keys(coefs).forEach(skill => {
    const currLvl = levels[skill];
    // Geometric progression
    const nextFLOPS = initialFLOPS * Math.pow(coefs[skill], currLvl);
    console.log('nextFLOPS for ', skill, nextFLOPS)
    if (flops > nextFLOPS) {
      const hasUnusedUpgrades = host.upgrades.some(u => u.id === Upgrades.EnhanceSkill);
      if (!hasUnusedUpgrades) {
        state.updateLocalhost({
          levels: {
            [skill]: currLvl + 1,
          },
        });
        addUpgradeToLocalhost(
          Upgrades.EnhanceSkill,
          `Increase enhancement speed of ${skill} skill`,
          () => {
            const prop = getVarNameByProp(skill)!;
            state.setVar(prop, state.getVar(prop) + 0.005); // TODO: constant? 0.005
          },
        );
      }
    }
  });

  // FLOPS improving: math & programming needed
  const [math, programming] = [host.getSkill(SkillNames.Math), host.getSkill(SkillNames.Programming)];
  const nextMathSkillValue = c.STARTING_OPTS.SKILLS.MATH * Math.pow(cpuCoef, levels.cpu);
  const nextProgrammingSkillValue = c.STARTING_OPTS.SKILLS.PROGRAMMING * Math.pow(cpuCoef, levels.cpu);
  console.log('nextMathSkillValue', nextMathSkillValue)
  console.log('nextProgrammingSkillValue', nextProgrammingSkillValue)
  const hasUnusedUpgrades = host.upgrades.some(u => u.id === Upgrades.EnhanceCPU);
  if (math > nextMathSkillValue && programming > nextProgrammingSkillValue && !hasUnusedUpgrades) {
    state.updateLocalhost({
      levels: {
        cpu: levels.cpu + 1,
      },
    });
    addUpgradeToLocalhost(
      Upgrades.EnhanceCPU,
      `Enhance CPU operations per cycle & frequency by x1.25`,
      () => {
        state.updateLocalhost({
          cpu: {
            cores: host.cpu.cores,
            frequency: host.cpu.frequency * 1.25,
            ops: host.cpu.ops * 1.25,
          }
        });
      },
    );
  }

  // Exploit version improving: programming needed
  // TODO: ^
}
