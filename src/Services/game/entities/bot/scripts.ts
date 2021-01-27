import { ScriptTypes } from './interface';

const script = (
  type: ScriptTypes,
  description: string,
  thenText: string = 'Once done, then',
  shouldBeLast = false,
) => ({
  type,
  thenText,
  description,
  shouldBeLast,
});

export default [
  script(ScriptTypes.SearchForHosts, 'Searches for target hosts to connect.', 'If found, then'),
  script(ScriptTypes.BruteforcePassword, 'Guesses a password for a found host. Takes a lot of time.', 'Once password matched, then'),
];
