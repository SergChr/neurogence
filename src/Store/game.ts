import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BasicHost from '../Services/game/entities/hosts/basic';
import {
  GameStore,
} from './interfaces';

const useStore = create<GameStore>(persist(
  (set, get) => ({
    progress: 0,
    setProgress(n: number) {
      set({ progress: n });
    },

    hosts: [],
    addHost(h: BasicHost) {
      set({ hosts: [...this.hosts, h] });
    },

  }),
  {
    name: 'game',
    storage: AsyncStorage,
  }
));

export default useStore;
