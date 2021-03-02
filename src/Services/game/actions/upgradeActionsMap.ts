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
    game().updateLocalhost({ exploitVersion: localhost.exploitVersion + 2 });
    return `You can now search for vulnerabilities in machines. Current exploit script version is ${localhost.exploitVersion + 2}.`;
  },
  [Upgrades.MetricsPanel]: () => {
    game().setUpgrade(Upgrades.MetricsPanel);
    game().setLocalSkill(SkillNames.Programming, 0.0001);
    return 'Enabled. You can now see the machine\'s skills.';
  },
  [Upgrades.IdlePowerToEnhanceSkills]: () => {
    jobManager.addJob(JobTypes.SkillWorker);
    if (!game().upgrades[Upgrades.MetricsPanel]) {
      game().setUpgrade(Upgrades.MetricsPanel);
    }
    game().setProgress(6);
    return 'The skills now will be improving automatically';
  },
  [Upgrades.EnhanceSkill]: (p: Payload) => {
    const prop = getGameVarByName(p.skill)!;
    game().setVar(prop, game().getVar(prop) + 0.0005); // TODO: constant? 0.005
  },
}

export default upgrades;
