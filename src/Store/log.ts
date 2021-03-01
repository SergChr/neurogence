import create from 'zustand';
import { configurePersist } from 'zustand-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  LogEntryTypes,
  LogStore,
} from './interfaces';

const MAX_LOG_ITEMS = 20;

const { persist } = configurePersist({
  storage: AsyncStorage,
  rootKey: 'root', // optional, default value is `root`
});

const useStore = create<LogStore>(persist(
  {
    key: 'log',
  },
  (set, get) => ({
    log: [],
    reset: () => set({ log: [] }),
    write: (text: string, type: LogEntryTypes = LogEntryTypes.Info) => {
      const items = get().log;
      const newEntry = { text, createdAt: new Date(), type };
      set({ log: [...items.slice(items.length - MAX_LOG_ITEMS), newEntry] });
    },

    botLog: {},
    addBotLog(botId, text) {
      const logs = get().botLog;
      let targetLog = logs[botId];
      if (!targetLog) {
        logs[botId] = [text];
        return set({ botLog: logs });
      }
      targetLog.push(text);
      if (targetLog.length > 30) {
        targetLog = targetLog.slice(targetLog.length - 30);
      }
      logs[botId] = targetLog;
      set({ botLog: logs });
    },
  })));

export default useStore;
