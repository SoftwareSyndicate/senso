import Box2D from 'box2d';
import Ludic from 'Ludic';
import {Screen} from 'Ludic';
import {DebugDraw} from 'box2d'
import {World} from 'box2d'

/* import Level1 from '../levels/Level1'; */

class GameScreen extends Screen {
  constructor() {
    super();

    this.gravity = new Box2D.b2Vec2(0.0, -10.0);
    this.world = new World(this.gravity);

    this.debugDraw = DebugDraw.newDebugger(Ludic.canvas.el);
    this.world.SetDebugDraw(this.debugDraw);
    this.debugDraw.SetFlags(DebugDraw.e_shapeBit);

    /* this.currentLevel = new Level1(Ludic.canvas, this.world); */
  }

  step(delta){
    /* this.currentLevel.step(delta); */
  }

  onDestroy(){

  }
}

export default GameScreen;
