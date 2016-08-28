import {BaseSystem} from 'EiN'

export default class ScoreSystem extends BaseSystem {
  constructor(active = true, priority = -1, ctx){
    super(active, priority);
    this.ctx = ctx;
    this.entityProps = ['draw'];
  }

  //Overide
  onEntityAdded(manager){
    this.entities = manager.getEntitiesByProps(this.entityProps);
  }

  onEntityRemoved(manager){
    this.entities = manager.getEntitiesByProps(this.entityProps);
  }

  //Overide
  update(delta){
    /* if entity is in sensor, add 1 to entity.score */
    this.entities.forEach(entity => {
      let pos = entity.getPosition(true);
      if(pos.x > -5 && pos.y > -5 && pos.x < 5 && pos.y < 5){
        console.log("winning");
        entity.score++;
      }
    });
  }
};
