import {default as em, BaseSystem} from 'EiN'

export default class SenshiMovementSystem extends BaseSystem {
  constructor(active = true, priority = -1){
    super(active, priority);
    this.registerEvents();
  }

  registerEvents(){
    console.log("reg");
  }

  //Overide
  onEntityAdded(manager){
    this.entities = manager.getEntitiesByClassName("Senshi");
  }

  onEntityRemoved(manager){}


  //Overide
  update(delta){

  }
};
