import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  GameStore,
} from './interfaces';

const useStore = create<GameStore>(persist(
  (set, get) => ({
    progress: 0,
    setProgress(n) {
      set({ progress: n });
    },

    hosts: [],
    addHost(host) {
      set({ hosts: [...this.hosts, host] });
    },
  }),
  {
    name: 'game',
    storage: AsyncStorage,
  }
));

export default useStore;
