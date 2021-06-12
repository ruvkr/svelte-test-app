/**
 * @typedef {{
 *   from?: number;
 *   to?: number;
 *   stiffness?: number;
 *   damping?: number;
 *   mass?: number;
 *   initialVelocity?: number;
 *   restVelocity?: number;
 *   restDisplacement?: number;
 *   onUpdate?: (value: number) => void;
 *   onComplete?: () => void;
 * }} SpringConfig
 */

export class Spring {
  /** @param {SpringConfig} */
  constructor({
    from = 0,
    to = 0,
    stiffness = 100,
    damping = 10,
    mass = 1,
    initialVelocity = 0,
    restVelocity = 0.01,
    restDisplacement = 0.01,
    onUpdate = () => {},
    onComplete = () => {},
  } = {}) {
    // configs
    this.from = from;
    this.to = to;
    this.stiffness = stiffness;
    this.damping = damping;
    this.mass = mass;
    this.initialVelocity = initialVelocity;
    this.restVelocity = restVelocity;
    this.restDisplacement = restDisplacement;

    // callbacks
    this.onUpdate = onUpdate;
    this.onComplete = onComplete;

    // spring state
    this._delta = to - from;
    this._time = 0;
    this._timeDelta = 1000 / 60;
    this._position = from;
    this._prevPosition = from;
    this._velocity = initialVelocity;
    this._animationFrame = 0;
    this._isAnimating = false;
    this._zeta = damping / (2 * Math.sqrt(stiffness * mass));
    this._omega = Math.sqrt(stiffness / mass) / 1000;
  }

  _tick() {
    this._time = this._time + this._timeDelta;
    this._prevPosition = this._position;

    if (this._zeta < 1) {
      const envelope = Math.exp(-this._zeta * this._omega * this._time);
      const expoDecay = this._omega * Math.sqrt(1.0 - this._zeta * this._zeta);

      this._position =
        this.to -
        envelope *
          (((this.initialVelocity + this._zeta * this._omega * this._delta) /
            expoDecay) *
            Math.sin(expoDecay * this._time) +
            this._delta * Math.cos(expoDecay * this._time));
    } else {
      const envelope = Math.exp(-this._omega * this._time);
      this._position =
        this.to -
        envelope *
          (this._delta +
            (this.initialVelocity + this._omega * this._delta) * this._time);
    }

    this._velocity = (this._position - this._prevPosition) / this._timeDelta;

    const isBelowRestVelocity = Math.abs(this._velocity) <= this.restVelocity;
    const isBelowRestDisplacement =
      Math.abs(this.to - this._position) <= this.restDisplacement;

    if (isBelowRestVelocity && isBelowRestDisplacement) {
      this._position = this.to;
      this._complete();

      // update callback
      this.onUpdate(this._position);
      // complete callback
      this.onComplete();
    } else {
      // update callback
      this.onUpdate(this._position);
    }
  }

  _complete() {
    cancelAnimationFrame(this._animationFrame);
    this._startTime = 0;
    this._time = 0;
    this._isAnimating = false;
    this._animationFrame = 0;
  }

  _step() {
    this._tick();
    if (this._isAnimating) {
      this._animationFrame = requestAnimationFrame(() => this._step());
    }
  }

  start() {
    if (!this._isAnimating) {
      this._isAnimating = true;
      this._step();
    }
  }

  stop() {
    if (this._isAnimating) this._complete();
  }

  /** @param {SpringConfig} configs */
  updateConfigs(configs = {}) {
    for (const config in configs) this[config] = configs[config];
    this.from = this._position;
    this.initialVelocity = this._velocity;
    this._zeta = this.damping / (2 * Math.sqrt(this.stiffness * this.mass));
    this._omega = Math.sqrt(this.stiffness / this.mass) / 1000;
  }
}
