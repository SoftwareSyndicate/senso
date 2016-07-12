import {default as em, BaseSystem} from 'EiN'
import Senshi from 'entities/senshi'

export default class SenshiCreationSystem extends BaseSystem {
  constructor(active = true, priority = -1){
    super(active, priority);
    this.registerEvents();

    this.listener = Ludic.input.newEventListener({
      keyConfig: {
        'space.once.down': this.createSenshi
      },
      binder: this
    }, true)
  }

  registerEvents(){
    console.log("reg creation");
  }

  //Overide
  onEntityAdded(manager){
    this.entities = manager.getEntitiesByClassName("Senshi");
  }

  onEntityRemoved(manager){}


  //Overide
  update(delta){

  }

  // instance methods
  createSenshi(){
    // temp; only one player for now
    if(this.entities.length > 0){
      return;
    }

    console.log('create senshi', this);

    let size = 12;
    let bounds = this.camera.getViewportBounds();
    let width = bounds.w * 2;
    let height = 2;
    let floorY = bounds.y - height / 2;
    let x = 0;

    var senshi =  new Senshi(0, bounds.y + 3, size, size/2, "#2c3e50", true, 1, this.world);
    em.addEntity(senshi);
  }
};
