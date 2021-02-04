import sleep from "../../../../utils/sleep";
import Host from "../hosts/basic";
import Localhost from "../hosts/localhost";
import { ScriptExecutionResult } from './index';

const response = (
  isOk: boolean,
  updHost: Host,
  updLocalhost: Localhost,
): ScriptExecutionResult => ({
  isOk, updHost, updLocalhost,
});

export const bruteforcePassword = async (host: Host, localhost: Localhost) => {
  await sleep(10000);
  return response(true, host, localhost);
}
