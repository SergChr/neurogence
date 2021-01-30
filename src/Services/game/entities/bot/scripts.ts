import { Group } from 'react-native';
import { ScriptTypes as Types, ScriptGroups as Groups } from './interface';

const script = (
  type: Types,
  description: string,
  thenText: string = 'Once done, then',
  hasOrSupport = false,
  shouldBeLast = false,
  group: Groups | undefined = undefined,
) => ({
  type,
  thenText,
  description,
  shouldBeLast,
  hasOrSupport,
  group,
});

export default [
  script(
    Types.SearchForHosts,
    'Searches for target hosts to connect.',
    'If found, then',
    false,
    false,
    Groups.OutsideHost,
  ),
  script(
    Types.BruteforcePassword,
    'Guesses a password for a found host. Takes a lot of time.',
    'Once password matched, then',
    true,
    false,
    Groups.Login,
  ),
  script(
    Types.DDoSAttack,
    'Flood the bandwidth with packets on a target host',
    'When the host became unavailable, then',
    false,
    false,
    Groups.OutsideHost,
  ),
  script(
    Types.LoginViaExploit,
    'Find a security vulnerability and exploit it',
    'If successfully, then',
    true,
    false,
    Groups.Login,
  ),
  script(
    Types.ClosePorts,
    'Close network ports on a host so no one can reach it and vice versa',
    'Once ports closed, then',
    false,
    false,
    Groups.LoggedIn,
  ),
  script(
    Types.Absorb,
    'Absorb host to take a full controll over it',
    'Once absorbed, then',
    false,
    false,
    Groups.LoggedIn,
  ),
  script(
    Types.ForceAbsorb,
    'Take control over a host forcefully (if you have enough computing power)',
    'Once absorbed, then',
    false,
    false,
    Groups.LoggedIn,
  ),
  script(
    Types.DeleteUserLog,
    'Clear the trails of your activity',
    'Once done, then',
    false,
    false,
    Groups.LoggedIn,
  ),
  script(
    Types.CloneItself,
    'Make a clone of the bot',
    'Once done, then',
    false,
    false,
    Groups.LoggedIn,
  ),

];