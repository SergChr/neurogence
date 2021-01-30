import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  GameStore,
} from './interfaces';
import Localhost from '../Services/game/entities/hosts/localhost';
import Bot from '../Services/game/entities/bot';

// TODO: add persist()
// const useStore = create<GameStore>(persist(
const useStore = create<GameStore>(
  (set, get) => ({
    progress: 0,
    setProgress(n) {
      if (get().progress < n) {
        set({ progress: n });
      }
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
      if (payload.upgrades) {
        payload.upgrades.forEach(upgrade => {
          (<Localhost>hosts[hostIndex]).addUpgrade(upgrade);
        });
      }
      if (payload.cpu) {
        hosts[hostIndex].addCPUPower(payload.cpu);
      }
      set({ hosts });
      return <Localhost>hosts[hostIndex];
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
        console.log(hosts[hostIndex].connected)
      }
      set({ hosts });
    },

    upgrades: {},
    setUpgrade(s, v) {
      this.upgrades[s] = v;
    },

    bots: [],
    updateBot(data, toRemove) {
      const bots = [...get().bots];
      const botIndex = bots.findIndex(b => b.id === data.id);
      if (botIndex === -1) {
        bots.push(new Bot(data));
      } else if (toRemove) {
        bots.splice(botIndex, 1);
      } else {
        Object.entries(data).forEach(([key, value]) => {
          (bots[botIndex] as any)[key] = value;
        });
      }
      set({ bots });
    },

    jobs: [],
  }));

export default useStore;
