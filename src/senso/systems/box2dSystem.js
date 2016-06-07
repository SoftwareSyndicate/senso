import {BaseSystem} from 'EiN'

export default class Box2dSystem extends BaseSystem {
  constructor(active = true, priority = -1, world){
    super(active, priority);
    this.world = world;
    this.entityProps = ['body'];
  }

  //Overide
  onEntityAdded(manager){
    let ents = manager.getEntitiesByProps(this.entityProps);
    for(let ent of ents){
      ent.body.entityData = ent;
    }
  }

  onEntityRemoved(manager){}

  //Overide
  update(delta){
    this.world.step(delta, 3, 2);
  }
};
