import { OS, HostTypes } from '../Services/game/entities/hosts/enums';

export default {
  // by how much more the localhost should have computing power
  // to absorb the other host
  // TODO
  COMP_TRANSCENDENCE_COEF: 5,

  STARTING_OPTS: {
    LOCALHOST_CPU_CORES: 1,
    LOCALHOST_CPU_FREQUENCY: 25000000,
    LOCALHOST_CPU_OPS: 100,
    LOCALHOST_EXPLOIT_VERSION: 1,
    SKILLS: {
      NLP: 0.0001,
      MATH: 0.0001,
      PHYSICS: 0,
      PROGRAMMING: 0.0001,
      SOCIAL: 0,
    },
  },

  COMPANY: 'Ambicord',
  FONT_FAMILY: {
    REGULAR: 'Baumans-Regular',
    BOLD: 'Arya-Bold',
  },

  POLLING_INTERVAL: 4000,
  BOT_POLLING_INTERVAL: 3500,
  SKILLS_IMPROVING_INTERVAL: 20000,
  OS_PREVALENCE: {
    [OS.Windows]: 0.18,
    [OS.MacOS]: 0.04,
    [OS.Ubuntu]: 0.1,
    [OS.Fedora]: 0.13,
    [OS.CentOS]: 0.16,
    [OS.ChromeOS]: 0.06,
    [OS.FreeBSD]: 0.13,
    [OS.Debian]: 0.13,
    [OS.Solaris]: 0.07,
  },
  HOST_TYPE_PREVALENCE: {
    [HostTypes.MailServer]: 0.05,
    [HostTypes.Camera]: 0.05,
    [HostTypes.Router]: 0.05,
    [HostTypes.PC]: 0.85,
    // Database?
  },

  MAX_BOT_BLOCK_ATTEMPTS: 5,
};
