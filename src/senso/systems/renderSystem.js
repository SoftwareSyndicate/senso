import {BaseSystem} from 'EiN'

export default class RenderSystem extends BaseSystem {
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

    // this.ctx.fillStyle = "black";
    // this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height );
    // this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height );

    this.ctx.save();
    this.entities.forEach(entity => {
      this.ctx.save();
      entity.draw(this.ctx);
      this.ctx.restore();
    });
    this.ctx.restore();
  }
};
