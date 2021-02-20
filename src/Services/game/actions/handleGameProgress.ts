import { LogEntryTypes } from '../../../Store/interfaces';
import { gameStore, logStore } from '../../../Store';
import { Upgrades } from '../entities/hosts/enums';
import JobManager from '../../../Services/job/JobManager';
import { JobTypes } from '../../../Services/job/jobs/types';

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
  const { value: progress, handled } = gameStore.getState().progress;
  if (handled) {
    return;
  }

  switch (progress) {
    case 5: {
      addUpgradeToLocalhost(
        Upgrades.IdlePowerToEnhanceSkills,
        'Employ idle computing power to enhance your skills',
        () => 'The skills now will be improving automatically',
      );
      gameStore.getState().setProgress(progress, true);
      break;
    }
    case 6: {
      jobManager.addJob(JobTypes.SkillWorker);
      break;
    }
  };
}
