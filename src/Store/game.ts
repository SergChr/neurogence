import create from 'zustand';
import { configurePersist } from 'zustand-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  GameStore,
} from './interfaces';
import Localhost from '../Services/game/entities/hosts/localhost';
import Host from '../Services/game/entities/hosts/basic';
import { GameVars } from '../Config/enums';

const { persist } = configurePersist({
  storage: AsyncStorage,
  rootKey: 'root',
});

const useStore = create<GameStore>(persist(
  {
    key: 'game',
  },
  (set, get) => ({
    progress: {
      value: 0,
      handled: false,
    },
    setProgress(n, handled = false) {
      set({
        progress: {
          value: n,
          handled,
        }
      });
    },

    hosts: [],
    addHost(host) {
      set({ hosts: [...get().hosts, host] });
    },
    getLocalhostIndex(hosts) {
      return hosts.findIndex((h) => h.name === 'localhost')!;
    },
    updateLocalhost(payload) {
      const hosts = [...get().hosts];
      const hostIndex = this.getLocalhostIndex(hosts);
      const host = <Localhost>hosts[hostIndex];
      if (payload.upgrades) {
        host.upgrades = Localhost.makeUpgrades(host, payload.upgrades);
      }
      if (payload.cpu) {
        host.cpu = Host.addCPUPower(host, payload.cpu);
      }
      if (payload.levels) {
        Object.entries(payload.levels).forEach(([key, value]) => {
          host.levels[key] = value;
        });
      }
      if (payload.exploitVersion) {
        host.exploitVersion = payload.exploitVersion;
      }
      if (payload.override) {
        Object.entries(payload.override).forEach(([key, value]) => {
          (host as any)[key] = value;
        });
      }
      set({ hosts });
      return host;
    },
    destroyHalfLocalhost() {
      const hosts = [...get().hosts];
      const hostIndex = this.getLocalhostIndex(hosts);
      const target = hosts[hostIndex].cpu;
      hosts[hostIndex].cpu = {
        cores: target.cores / 2,
        frequency: target.frequency / 2,
        ops: target.ops / 2,
      };
      set({ hosts });
    },
    setLocalSkill(skill, value) {
      const hosts = [...get().hosts];
      const i = this.getLocalhostIndex(hosts);
      const host = <Localhost>hosts[i];
      (<Localhost>hosts[i]).skills = Localhost.setSkill(host, skill, value);
      set({ hosts });
    },
    getLocalhost() {
      return <Localhost>get().hosts.find((h: Host) => h.name === 'localhost')!;
    },
    updateHost(name, payload) {
      const hosts = [...get().hosts];
      const hostIndex = hosts.findIndex((h) => h.name === name);
      if (payload.enslaved) {
        hosts[hostIndex].enslaved = true;
      }
      if (payload.connected !== undefined) {
        hosts[hostIndex].connected = payload.connected;
      }
      if (payload.ports) {
        hosts[hostIndex].ports = payload.ports;
      }
      if (payload.isUserLogEmpty != null) {
        hosts[hostIndex].isUserLogEmpty = payload.isUserLogEmpty;
      }
      if (payload.override) {
        Object.entries(payload.override).forEach(([key, value]) => {
          (hosts[hostIndex] as any)[key] = value;
        });
      }
      set({ hosts });
    },

    upgrades: {},
    setUpgrade(upgrade) {
      const upgrades = get().upgrades;
      upgrades[upgrade] = true;
      set({ upgrades });
    },

    bots: [],
    updateBot(data, toRemove) {
      const bots = [...get().bots];
      const botIndex = bots.findIndex(b => b.id === data.id);
      if (botIndex === -1) {
        bots.push(data);
      } else if (toRemove) {
        bots.splice(botIndex, 1);
      } else {
        Object.entries(data).forEach(([key, value]) => {
          (bots[botIndex] as any)[key] = value;
        });
      }
      set({ bots });
    },

    blockedBots: {},
    blockBot(id) {
      const blockedBots = get().blockedBots;
      const blockedBot = blockedBots[id];
      blockedBots[id] = { blockedAttempts: blockedBot ? blockedBot.blockedAttempts + 1 : 1 };
      set({ blockedBots });
    },

    jobs: [],

    variables: {
      // TODO: adjust vars
      [GameVars.BruteforcePwdLimitTime]: 30,
      [GameVars.MaxBots]: 4,
      [GameVars.MaxBotInstances]: 4,
      [GameVars.MaxBotScripts]: 5,
      [GameVars.ImprovingRateMath]: 0.08,
      [GameVars.ImprovingRateNLP]: 0.02,
      [GameVars.ImprovingRateProgramming]: 0.074,
      [GameVars.ImprovingRatePhysics]: 0.05,
    },
    setVar(key, value) {
      const vars = get().variables;
      vars[key] = value;
      set({ variables: vars });
    },
    getVar(key) {
      return get().variables[key];
    },
})));

export default useStore;
