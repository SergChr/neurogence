import { GameVars } from '../Config/enums';

export const getGameVarByName = (p: string) => {
  switch (p) {
    case 'math': return GameVars.ImprovingRateMath;
    case 'programming': return GameVars.ImprovingRateProgramming;
    case 'NLP': return GameVars.ImprovingRateNLP;
  }
}
