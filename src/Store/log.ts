import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { throttle } from 'throttle-debounce';

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
    write: (text: string, type: LogEntryTypes = LogEntryTypes.Info) => {
      const items = get().log;
      const newEntry = { text, createdAt: new Date(), type };
      set({ log: [...items.slice(items.length - MAX_LOG_ITEMS), newEntry] });
    },

    botLog: new Map(),
    addBotLog(botId, text) {
      const logs = get().botLog;
      let targetLog = logs.get(botId);
      if (!targetLog) {
        logs.set(botId, [text]);
        return set({ botLog: logs });
      }
      targetLog.push(text);
      if (targetLog.length > 30) {
        targetLog = targetLog.slice(targetLog.length - 30);
      }
      logs.set(botId, targetLog);
      set({ botLog: logs });
    },
  }),
  // {
  //   name: 'log', // can be any name
  //   storage: AsyncStorage,
  // }
);

export default useStore;
