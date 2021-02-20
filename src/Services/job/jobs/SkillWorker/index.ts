import Worker from '../worker';
import { SkillNames } from '../../../../Services/game/entities/hosts/localhost';
import { GameVars } from '../../../../Config/enums';

type Props = {
  store: any;
  tickInterval?: number;
};

export default class SkillWorker extends Worker {
  constructor({ store, tickInterval }: Props) {
    super({ store });
    this.tickInterval = tickInterval || this.tickInterval;
  }

  timer: any;

  run() {
    // timer exists, that means the worker is already running
    if (this.timer) {
      return;
    }
    this.timer = <any>setInterval(this.tick.bind(this), this.tickInterval);
  }

  tick() {
    const state = this.store.getState();
    const skills = state.getLocalhost().skills;

    const mathCompound = (skills.math || 0) * state.getVar(GameVars.ImprovingRateMath);
    state.setLocalSkill(SkillNames.Math, (skills.math || 0) + mathCompound);

    const NLPCompound = (skills.NLP || 0) * state.getVar(GameVars.ImprovingRateNLP);
    state.setLocalSkill(SkillNames.NLP, (skills.NLP || 0) + NLPCompound);

    const programmingCompound = (skills.programming || 0) * state.getVar(GameVars.ImprovingRateProgramming);
    state.setLocalSkill(SkillNames.Programming, (skills.programming || 0) + programmingCompound);

    const physicsCompound = (skills.physics || 0) * state.getVar(GameVars.ImprovingRatePhysics);
    state.setLocalSkill(SkillNames.Physics, (skills.physics || 0) + physicsCompound);
  }

  stop() {
    clearInterval(this.timer);
    this.timer = undefined;
  }
}
