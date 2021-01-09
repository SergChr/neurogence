import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  GameStore,
} from './interfaces';
import Localhost from 'Services/game/entities/hosts/localhost';

// TODO: add persist()
// const useStore = create<GameStore>(persist(
const useStore = create<GameStore>(
  (set, get) => ({
    progress: 0,
    setProgress(n) {
      set({ progress: n });
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
        (<Localhost>hosts[hostIndex]).setUpgrades(payload.upgrades);
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
  }));

export default useStore;
