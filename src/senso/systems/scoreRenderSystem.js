import {BaseSystem} from 'EiN'
import {Text} from 'Ludic'


export default class ScoreRenderSystem extends BaseSystem {
  constructor(hud, active = true, priority = -1){
    super(active, priority);
    this.hud = hud;

    this.entityScores = {};
  }

  //Overide
  onEntityAdded(manager){
    let ents = manager.getEntitiesByClassName("Senshi");
    let arr = ents.map((ent)=>{
      return ent._id
    });
    let id = arr.filter((id)=>{
      return !this.entityScores.hasOwnProperty(id)
    })[0];
    let newEnt = ents.find((ent)=>{
      return ent._id == id;
    })
    this.createScore(newEnt, ents.length);
    this.entities = ents;
  }

  onEntityRemoved(manager){
    this.entities = manager.getEntitiesByClassName("Senshi");
  }

  //Overide
  update(delta){
    // this.ctx.save();
    // this.entities.forEach(entity => {
    //   this.ctx.save();
    //   entity.draw(this.ctx);
    //   this.ctx.restore();
    // });
    // this.ctx.restore();

    for(let ent of this.entities){
      let text = this.entityScores[ent._id];
      text.text = this.getScore(ent);
    }
  }

  getScore(ent){
    return `Score: ${ent.score}`;
  }

  createScore(ent, len){
    let id = ent._id;
    let text;
    switch (len) {
      case 1:
        text = new Text("Score: 0", 0, 0, {fontSize: 22});
        break;
      case 2:
        text = new Text("Score: 0", this.hud.camera.canvas.width()-100, 0, {fontSize: 22});
        break;
      case 3:
        text = new Text("Score: 0", 0, this.hud.camera.canvas.height()-24, {fontSize: 22});
        break;
      case 4:
        text = new Text("Score: 0", this.hud.camera.canvas.width()-100, this.hud.camera.canvas.height()-24, {fontSize: 22});
        break;
      default:

    }

    this.hud.addElement(text, `player_${id}`);
    text.color = ent.color;
    this.entityScores[id] = text;
    console.log('create score', this.entityScores);
  }
};
