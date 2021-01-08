import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  GameStore,
} from './interfaces';

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
  }));

export default useStore;
