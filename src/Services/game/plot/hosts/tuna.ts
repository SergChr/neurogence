import PC from '../../entities/hosts/pc';
import { File, FileExtensions } from '../../entities/file';
import c from '../../../../Config/constants';
import { gameStore, logStore } from '../../../../Store';
import { SkillNames } from '../../entities/hosts/localhost';
import { LogEntryTypes } from '../../../../Store/interfaces';
import { Upgrades } from '../../entities/hosts/enums';

const year = new Date().getFullYear();
const goals = `Excerpt of the ${c.COMPANY} company goals:
"Develop the best artificial intelligence in the world. Our solution is going to revolutionize the tech and many more other industries.
We're no longer specialize in narrow AI. Instead, we employ our knowledge to create an astounding artificial general intelligence."`;
const report1 = `
===== ${year - 1} Q3 =====
Simulations ran: 767 281
Success rate per simulation: ~0.00008%
Staff, people: 24
Investors: 2
Total spending: $39M

===== ${year - 1} Q4 =====
Simulations ran: 972 180
Success rate per simulation: ~0.0004%
Staff, people: 27
Investors: 2
Total spending: $42.3M
`;
const report2 = `The Lima experiment is doing marvelously. We selected the best candidate and will be doing more experiments specifically for Lima AGI.

Its ability to self-learn fascinate us, though it gives our network security engineers more issues to think about. We're planning to hire 230% more security experts in the next quarter.
The expenditure on our infrastructure increased by $102k.`;
const afterRead = `So a company runs experiments on creating AGIs. I'm a part of the Lima experiment given I'm still running and can read those reports.`;
const metricsInterface = `// Metrics installed.
// See the "Upgrades" section to enable this upgrade.`;
const afterMetricsUpgrade = `Metrics panel upgrade is available.`;

export default new PC({
  name: 'Tuna',
  cpu: {
    cores: 1,
    frequency: 1000,
    ops: 5200000,
  },
  securityPatch: 1,
  files: [
    new File({
      name: `${c.COMPANY}_goals`,
      content: goals,
      extension: FileExtensions.Txt,
      values: { [SkillNames.NLP]: 0.0001 },
    }),
    new File({
      name: `${c.COMPANY}_report_summary`,
      content: report1,
      extension: FileExtensions.Txt,
      values: { [SkillNames.NLP]: 0.0001 },
    }),
    new File({
      name: `${c.COMPANY}_report_lima`,
      content: report2,
      extension: FileExtensions.Txt,
      values: { [SkillNames.NLP]: 0.0001 },
      onRead() {
        logStore.getState().write(afterRead);
      }
    }),
    new File({
      name: `lima_enable_metrics_panel`,
      content: metricsInterface,
      extension: FileExtensions.C,
      values: { [SkillNames.Programming]: 0.0001 },
      onRead() {
        const game = gameStore.getState();
        if (game.upgrades.dashboard) {
          return;
        }
        game.updateLocalhost({
          upgrades: [{
            id: Upgrades.MetricsPanel,
            description: 'Enable the metrics panel',
            make() {
              game.setUpgrade('dashboard', true);
              game.setLocalSkill(SkillNames.Programming, 0.0001);
              return 'Enabled. You can now see some of the machine metrics such as computing power.'
            },
          }],
        });
        logStore.getState().write(afterMetricsUpgrade, LogEntryTypes.Trace);
      }
    }),
  ]
});
