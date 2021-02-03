import { OS, HostTypes } from '../Services/game/entities/hosts/enums';

export default {
  // by how much more the localhost should have computing power
  // to enslave the other host
  COMP_TRANSCENDENCE_COEF: 5,

  STARTING_OPTS: {
    LOCALHOST_CPU_CORES: 1,
    LOCALHOST_CPU_FREQUENCY: 6000000000,
    LOCALHOST_CPU_OPS: 4,
    SKILLS: {
      IMG_VIDEO_PROCESS: 0,
      NLP: 0.0001,
      MATH: 0,
      PHYSICS: 0,
      PROGRAMMING: 0,
      SOCIAL: 0,
    },
  },

  COMPANY: 'Ambicord',
  FONT_FAMILY: {
    REGULAR: 'Baumans-Regular',
    BOLD: 'Arya-Bold',
  },

  POLLING_INTERVAL: 2000,
  BOT_POLLING_INTERVAL: 1000,
  OS_PREVALENCE: {
    [OS.Windows]: 0.16,
    [OS.MacOS]: 0.04,
    [OS.Ubuntu]: 0.1,
    [OS.Fedora]: 0.13,
    [OS.CentOS]: 0.18,
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
};
