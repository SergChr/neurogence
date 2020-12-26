import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  LogEntryTypes,
  LogStore,
} from './interfaces';

const MAX_LOG_ITEMS = 20;

// TODO: add persist()
const useStore = create<LogStore>(
  (set, get) => ({
    log: [],
    reset: () => set({ log: [] }),
    writeLog: (text: string, type: LogEntryTypes = LogEntryTypes.Info) => {
      const items = get().log;
      const newEntry = { text, createdAt: new Date(), type };
      set({ log: [...items.slice(items.length - MAX_LOG_ITEMS), newEntry] });
    },
  }),
  // {
  //   name: 'log', // can be any name
  //   storage: AsyncStorage,
  // }
);

export default useStore;
