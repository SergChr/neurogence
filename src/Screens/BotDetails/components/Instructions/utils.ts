import { ScriptGroups } from "../../../../Services/game/entities/bot/interface";
import { Colors } from '../../../../Styles/enums';

type GroupColors = {
  text: Colors;
  background: Colors;
};

export const getGroupDescription = (name: ScriptGroups): string => {
  switch (name) {
    case ScriptGroups.OutsideHost: return 'Outside a host';
    case ScriptGroups.Login: return 'Entering a host';
    case ScriptGroups.LoggedIn: return 'Inside a host';
  }
}

export const getGroupColors = (name: ScriptGroups): GroupColors => {
  switch (name) {
    case ScriptGroups.OutsideHost: {
      return {
        text: Colors.Grey,
        background: Colors.Background,
      };
    };
    case ScriptGroups.Login: {
      return {
        text: Colors.GreyDark,
        background: Colors.Black,
      };
    };
    case ScriptGroups.LoggedIn: {
      return {
        text: Colors.Grey,
        background: Colors.Primary2,
      };
    };
  }
}
