import {BaseSystem} from 'EiN'

export default class CountdownTimerSystem extends BaseSystem {
  constructor(active = true, priority = -1){
    super(active, priority);
  }

  //Overide
  onEntityAdded(manager){
    this.timers = manager.getEntitiesByClassName('CountdownTimer');
  }

  onEntityRemoved(manager){
    this.timers = manager.getEntitiesByClassName('CountdownTimer');
  }

  //Overide
  update(delta){

    this.timers.forEach((timer) => {
      timer.seconds -= delta;
      timer.updateText();
    });
  }
};
