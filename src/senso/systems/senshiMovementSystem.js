import {default as em, BaseSystem} from 'EiN'
import Ludic from 'Ludic'
import Box2D from 'box2d'


export default class SenshiMovementSystem extends BaseSystem {
  constructor(active = true, priority = -1){
    super(active, priority);
    this.entityListenerMap = {};

    // environment vars describing how players move
    this.maxVX = 15;
    this.maxVY = 10;


    this.registerEvents();
  }

  registerEvents(){
    console.log("reg");
    // register 'create new player' event
  }

  //Overide
  onEntityAdded(manager){
    this.entities = manager.getEntitiesByClassName("Senshi");
    for(let ent of this.entities){
      if(!this.entityListenerMap.hasOwnProperty(ent._id)){
        this.createListener(ent);
      }
    }
  }

  onEntityRemoved(manager){}


  //Overide
  update(delta){

  }

  // instance methods
  createListener(entity){
    this.entityListenerMap[entity._id] = {
      entity,
      id: entity._id,
      listener: Ludic.input.newEventListener({
        keyConfig: {
          'w.once': this.moveEntity('y', entity, this.maxVY, 's'),
          'a.once': this.moveEntity('x', entity, -this.maxVX, 'd'),
          's.once': this.moveEntity('y', entity, -this.maxVY, 'w'),
          'd.once': this.moveEntity('x', entity, this.maxVX, 'a')
        }
      }, true)
    }
  }

  moveEntity(axis, entity, max, oddKey){
    let vec = new Box2D.b2Vec2(0,0);
    let dirs = {
      y: {
        old: 'x',
        desired: 'y'
      },
      x: {
        old: 'y',
        desired: 'x'
      }
    }
    let dir = dirs[axis];

    return (keyDown, e)=>{
      let desiredVel;
      if(keyDown){
        desiredVel = max;
        // this.running = true;
      } else if(!e.allKeys[oddKey]) {
        desiredVel = 0;
        // this.running = false;
      } else if(e.allKeys[oddKey]) {
        desiredVel = -max;
      }
      // let vel = entity.body.GetLinearVelocity();
      // let velChange = desiredVel - vel.get_x();
      // let impulse = entity.body.GetMass() * velChange;
      // console.log('move entity right', desiredVel, vel.get_x(), velChange, entity.body.GetMass(), impulse);
      // entity.body.ApplyForce(new Box2D.b2Vec2(0, impulse), entity.body.GetWorldCenter());
      let oldVel = entity.body.GetLinearVelocity();
      vec[`set_${dir.old}`](oldVel[`get_${dir.old}`]());
      vec[`set_${dir.desired}`](desiredVel);
      entity.body.SetLinearVelocity(vec);
    }
  }
};
