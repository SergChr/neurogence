import { Upgrades } from '../entities/hosts/enums';
import gameStore from '../../../Store/game';
import { SkillNames } from '../entities/hosts/localhost';
import JobManager from '../../job/JobManager';
import { JobTypes } from '../../job/jobs/types';
import { getGameVarByName } from '../../../utils/getGameVarByName';

const game = gameStore.getState;

const jobManager = new JobManager(gameStore);

type UpgradesMap = Partial<Record<Upgrades, Function>>;
type Payload = any;

const upgrades: UpgradesMap = {
  [Upgrades.ExploitVersion]: () => {
    const localhost = game().getLocalhost();
    const targetVersion = localhost.exploitVersion + 2;
    game().updateLocalhost({ exploitVersion: targetVersion });
    return `You can now search for vulnerabilities in machines. Current exploit script version is ${targetVersion}.`;
  },
  [Upgrades.MetricsPanel]: () => {
    game().setUpgrade(Upgrades.MetricsPanel);
    game().setLocalSkill(SkillNames.Programming, 0.0001);
    game().updateLocalhost({
      upgrades: [{
        id: Upgrades.IdlePowerToEnhanceSkills,
        description: 'Employ idle computing power to enhance skills',
      }],
    });
    return 'Enabled. You can now see the machine\'s skills.\nThere is also an important upgrade becomes available.';
  },
  [Upgrades.IdlePowerToEnhanceSkills]: () => {
    jobManager.addJob(JobTypes.SkillWorker);
    if (!game().upgrades[Upgrades.MetricsPanel]) {
      game().setUpgrade(Upgrades.MetricsPanel);
    }
    game().setProgress(6);
    return 'The skills now will be improving automatically.';
  },
  [Upgrades.EnhanceSkill]: (p: Payload) => {
    const prop = getGameVarByName(p.skill)!;
    game().setVar(prop, game().getVar(prop) + 0.0005); // TODO: constant? 0.005
  },
  [Upgrades.EnableBots]: () => {
    game().setUpgrade(Upgrades.EnableBots);
    return 'You can create bots to explore more machines to absorb.';
  },

  [Upgrades.EnhanceCPU]: (p: Payload) => {
    if (p) {
      game().updateLocalhost({
        override: {
          cpu: p.cpu,
        }
      });
    }
  },
}

export default upgrades;
