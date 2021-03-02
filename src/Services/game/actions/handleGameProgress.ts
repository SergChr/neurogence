import { GameStore, LogEntryTypes } from '../../../Store/interfaces';
import { gameStore, logStore } from '../../../Store';
import { Upgrades } from '../entities/hosts/enums';
import c from '../../../Config/constants';
import Localhost, { SkillNames } from '../entities/hosts/localhost';

const log = logStore.getState();

const addUpgradeToLocalhost = (
  u: Upgrades,
  description: string,
  payload?: any,
) => {
  gameStore.getState().updateLocalhost({
    upgrades: [{
      id: u,
      description,
      payload,
    }],
  });
  log.write('A new upgrade is available.', LogEntryTypes.Trace);
}

export default () => {
  const state = gameStore.getState();
  const { value: progress, handled } = state.progress;
  const isMaxSkillsReached = Object.values(state.getLocalhost().skills).some(v => v > 1000000);
  if (progress > 5 && !isMaxSkillsReached) {
    handleLocalhostImprovements(state);
  }
  if (handled) {
    return;
  }
  switch (progress) {
    case 1: {
      addUpgradeToLocalhost(
        Upgrades.IdlePowerToEnhanceSkills,
        'Employ idle computing power to enhance skills',
      );
      state.setProgress(progress, true);
      break;
    }
  };
}

const initialFLOPS = c.STARTING_OPTS.LOCALHOST_CPU_CORES * c.STARTING_OPTS.LOCALHOST_CPU_FREQUENCY * c.STARTING_OPTS.LOCALHOST_CPU_OPS;

function handleLocalhostImprovements(state: GameStore) {
  const host = state.getLocalhost();
  const { exploitVersion: e, levels } = host;
  const flops = Localhost.FLOPS(host);
  // TODO: adjust coefs
  const coefs: Record<string, number> = {
    math: 6.5,
    programming: 5,
    NLP: 20,
  };
  const cpuCoef = 4;

  // Skills improving: FLOPS needed
  const hasUnusedSkillUpgrades = host.upgrades.some(u => u.id === Upgrades.EnhanceSkill);
  Object.keys(coefs).forEach(skill => {
    const currLvl = levels[skill];
    // Geometric progression
    const nextFLOPS = initialFLOPS * Math.pow(coefs[skill], currLvl);
    if (!hasUnusedSkillUpgrades && flops > nextFLOPS) {
      state.updateLocalhost({
        levels: {
          [skill]: currLvl + 1,
        },
      });
      addUpgradeToLocalhost(
        Upgrades.EnhanceSkill,
        `Increase enhancement speed of ${skill} skill`,
        { skill },
      );
    }
  });

  // FLOPS improving: math & programming needed
  const [math, programming] = [host.skills[SkillNames.Math] || 0, host.skills[SkillNames.Programming] || 0];
  const nextMathSkillValue = c.STARTING_OPTS.SKILLS.MATH * Math.pow(cpuCoef, levels.cpu);
  const nextProgrammingSkillValue = c.STARTING_OPTS.SKILLS.PROGRAMMING * Math.pow(cpuCoef, levels.cpu);
  const hasUnusedUpgrades = host.upgrades.some(u => u.id === Upgrades.EnhanceCPU);
  if (!hasUnusedUpgrades && math > nextMathSkillValue && programming > nextProgrammingSkillValue) {
    state.updateLocalhost({
      levels: {
        cpu: levels.cpu + 1,
      },
    });
    addUpgradeToLocalhost(
      Upgrades.EnhanceCPU,
      `Enhance CPU operations per cycle & frequency by x1.2`,
      () => {
        state.updateLocalhost({
          cpu: {
            cores: host.cpu.cores,
            frequency: host.cpu.frequency * 1.2,
            ops: host.cpu.ops * 1.2,
          }
        });
      },
    );
  }

  // Exploit version improving: programming needed
  const shouldIncreaseExploitVersion = programming > c.STARTING_OPTS.SKILLS.PROGRAMMING * Math.pow(coefs.programming, e - 1);
  if (shouldIncreaseExploitVersion) {
    state.updateLocalhost({
      exploitVersion: e + 1,
    });
    // log.write(`Exploit software version was upgraded to ${e + 1}`, LogEntryTypes.Trace);
  }
}
