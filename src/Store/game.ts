import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  GameStore,
} from './interfaces';
import Localhost from '../Services/game/entities/hosts/localhost';
import { GameVars } from '../Config/enums';

const useStore = create<GameStore>(
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
        payload.upgrades.forEach(upgrade => {
          host.addUpgrade(upgrade);
        });
      }
      if (payload.cpu) {
        host.addCPUPower(payload.cpu);
      }
      if (payload.levels) {
        Object.entries(payload.levels).forEach(([key, value]) => {
          host.levels[key] = value;
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
      (<Localhost>hosts[i]).setSkill(skill, value);
      set({ hosts });
    },
    getLocalhost() {
      return <Localhost>get().hosts.find((h) => h.name === 'localhost')!;
    },
    updateHost(name, payload) {
      const hosts = [...get().hosts];
      const hostIndex = hosts.findIndex((h) => h.name === name);
      if (payload.enslaved) {
        hosts[hostIndex].enslave();
      }
      if (payload.connected !== undefined) {
        hosts[hostIndex].connected = payload.connected;
      }
      set({ hosts });
    },

    upgrades: new Set(),
    setUpgrade(upgrade) {
      const newSet = get().upgrades;
      newSet.add(upgrade);
      set({ upgrades: newSet });
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

    blockedBots: new Map(),
    blockBot(id) {
      const blockedBots = get().blockedBots;
      const blockedBot = blockedBots.get(id);
      blockedBots.set(id, { blockedAttempts: blockedBot ? blockedBot.blockedAttempts + 1 : 1 });
      set({ blockedBots });
    },

    jobs: new Set(),

    variables: new Map([
      [GameVars.BruteforcePwdLimitTime, 30],
      [GameVars.MaxBots, 3],
      [GameVars.MaxBotInstances, 30],
      [GameVars.MaxBotScripts, 6],
      [GameVars.ImprovingRateMath, 0.05],
      [GameVars.ImprovingRateNLP, 0.05],
      [GameVars.ImprovingRateProgramming, 0.05],
      [GameVars.ImprovingRatePhysics, 0.05],
    ]),
    setVar(key, value) {
      const vars = get().variables;
      vars.set(key, value);
      set({ variables: vars });
    },
    getVar(key) {
      return get().variables.get(key);
    },
}),
  // {
  //   name: 'GameStore',
  //   storage: AsyncStorage,
  // }
);

export default useStore;
