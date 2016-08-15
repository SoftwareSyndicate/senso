import {ClearSystem, Camera, CameraSystem, Vector2, InputSystem, HUD, Text} from 'Ludic'
import {default as em, BaseSystem} from 'EiN';
import BaseLevel from './BaseLevel'
import RenderSystem from 'systems/renderSystem.js'
import SenshiMovementSystem from 'systems/senshiMovementSystem.js'
import SenshiCreationSystem from 'systems/senshiCreationSystem.js'
import Box2dSystem from 'systems/box2dSystem.js'
import Senshi from 'entities/senshi'

import anime from 'animejs'

export default class Level1 extends BaseLevel {
  constructor(canvas, world){
    super();
    this.canvas = canvas;
    this.ctx = canvas.getContext();
    this.world = world;
    this.lost = false;

    this.initSystems();
    this.initEntities();
  }

  initSystems(){
    this.clearSystem = new BaseSystem(true, -100, (delta)=>{
      this.ctx.restore();
      // this.ctx.fillStyle = this.color;
      this.ctx.fillStyle = 'white';
      this.ctx.clearRect(0, 0, this.canvas.width(), this.canvas.height());
      this.ctx.fillRect(0, 0, this.canvas.width(), this.canvas.height());
      this.ctx.save();
    });
    em.addSystem(this.clearSystem);


    this.camera = new Camera(this.canvas);
    this.camera.setViewCenterWorld(new Vector2(), true);
    this.cameraSystem = new BaseSystem(true, 25, (delta)=>{
      this.camera.update(delta);
    });
    em.addSystem(this.cameraSystem);

    this.renderSystem = new RenderSystem(true, 30, this.ctx);
    em.addSystem(this.renderSystem);



    this.hud = new HUD(this.camera);
    this.hudSystem = new BaseSystem(true, 31, (delta)=>{
      this.hud.update(delta);
    });
    em.addSystem(this.hudSystem);

    // testing hud
    let text = new Text("this is a string", 0, 0, {fontSize: 44});
    this.hud.addElement(text, 'mytext');


    this.debugDrawSystem = new BaseSystem(true, 29, (delta)=>{
      this.world.drawDebug();
    });
    em.addSystem(this.debugDrawSystem);

    this.box2dSystem = new Box2dSystem(true, 20, this.world);
    em.addSystem(this.box2dSystem);

    this.inputSystem = new BaseSystem(true, 1, (delta)=>{
      Ludic.input.step(delta);
    });
    em.addSystem(this.inputSystem);


    this.senshiMovementSystem = new SenshiMovementSystem(true, 3);
    em.addSystem(this.senshiMovementSystem);

    this.senshiCreationSystem = new SenshiCreationSystem(true, 3);
    this.senshiCreationSystem.camera = this.camera;
    this.senshiCreationSystem.world = this.world;
    em.addSystem(this.senshiCreationSystem);

  }

  initEntities(){

  }

  step(delta){
    if(!this.lost){
      em.update(delta);
    }
  }
}
