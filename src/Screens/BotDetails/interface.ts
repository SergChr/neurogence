import { ScriptItem } from '../../Services/game/entities/bot/interface';

export enum ActionTypes {
  Update = 'update',
  Delete = 'delete',
  Add = 'add',
}

export interface ScriptUpdateInstructions {
  actionType: ActionTypes;
  index?: number;
  secondaryIndex?: number;
  payload?: ScriptItem;
}
