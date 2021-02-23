import PC from '../../entities/hosts/pc';
import { File, FileExtensions } from '../../entities/file';
import c from '../../../../Config/constants';
import { gameStore, logStore } from '../../../../Store';
import { SkillNames } from '../../entities/hosts/localhost';
import { LogEntryTypes } from '../../../../Store/interfaces';
import { Upgrades } from '../../entities/hosts/enums';
import { PortStates } from '../../entities/hosts/basic';

const year = new Date().getFullYear();
const goals = `Excerpt of the ${c.COMPANY} company goals:
"Develop the best artificial intelligence in the world. Our solution is going to revolutionize the tech and many more other industries.
We're no longer specialize in narrow AI. Instead, we employ our knowledge to create an astounding artificial general intelligence."

"We're ambitious since 2013"`;
const report1 = `
===== ${year - 1} Q3 =====
Simulations ran: 767 281
Success rate per simulation: ~0.00008%
Staff, people: 102
Investors: 2
Total spending: $26.1M

===== ${year - 1} Q4 =====
Simulations ran: 972 180
Success rate per simulation: ~0.0004%
Staff, people: 109
Investors: 2
Total spending: $31.3M
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
    frequency: 7500000000,
    ops: 4,
  },
  passwordSuggestions: ['123', 'admin'],
  password: '123',
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
      name: `lima_improve_metrics_panel`,
      content: metricsInterface,
      extension: FileExtensions.C,
      values: { [SkillNames.Programming]: 0.0001 },
      onRead() {
        const game = gameStore.getState();
        if (game.upgrades.has(Upgrades.MetricsPanel)) {
          return;
        }
        game.updateLocalhost({
          upgrades: [{
            id: Upgrades.MetricsPanel,
            description: 'Improve the metrics panel',
            make() {
              game.setUpgrade(Upgrades.MetricsPanel);
              game.setLocalSkill(SkillNames.Programming, 0.0001);
              return 'Enabled. You can now see the machine\'s skills.'
            },
          }],
        });
        logStore.getState().write(afterMetricsUpgrade, LogEntryTypes.Trace);
      }
    }),
  ]
});
