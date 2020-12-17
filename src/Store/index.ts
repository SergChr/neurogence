import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  LogEntryTypes,
  State,
} from './interfaces';

const log: any = [
  {text: 'Very start!', createdAt: new Date(43255543), type: LogEntryTypes.Info},
  {text: 'Hello how are you?', createdAt: new Date(76586558), type: LogEntryTypes.Info},
  {text: 'Hello how are you?', createdAt: new Date(765658664), type: LogEntryTypes.Warn},
  {text: 'Hello how are you?', createdAt: new Date(7658658), type: LogEntryTypes.Info},
  {text: 'Hello how are you?', createdAt: new Date(758664558), type: LogEntryTypes.Info},
  {text: 'Hello how are you?', createdAt: new Date(65864458), type: LogEntryTypes.Info},
  {text: 'Hello how are you?', createdAt: new Date(76587968), type: LogEntryTypes.Trace},
  {text: 'Hello how are you?', createdAt: new Date(586005318), type: LogEntryTypes.Info},

  {text: 'Hello how are you?', createdAt: new Date(265658664), type: LogEntryTypes.Info},
  {text: 'Hello how are you?', createdAt: new Date(8658658), type: LogEntryTypes.Trace},
  {text: 'Hello how are you?', createdAt: new Date(7018664558), type: LogEntryTypes.Trace},
  {text: 'Hello how are you?', createdAt: new Date(63464458), type: LogEntryTypes.Error},
  {text: 'Almost end', createdAt: new Date(76787968), type: LogEntryTypes.Info},
  {text: 'The END message', createdAt: new Date(503005318), type: LogEntryTypes.Info},
];

const useStore = create<State>(persist(
  (set, get) => ({
    log: log,
    writeLog: (text: string, type: LogEntryTypes = LogEntryTypes.Info) =>
      set({ log: [...get().log, { text, createdAt: new Date(), type }] }),
  }),
  {
    name: 'main', // can be any name
    storage: AsyncStorage,
  }
));

export default useStore;
