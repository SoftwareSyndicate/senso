import {ClearSystem, Camera, CameraSystem, Vector2, InputSystem} from 'Ludic'
import {default as em, BaseSystem} from 'EiN';
import BaseLevel from './BaseLevel'
import RenderSystem from '../systems/renderSystem.js'
import Box2dSystem from '../systems/box2dSystem.js'
import Senshi from '../entities/senshi'

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


  }

  initEntities(){
    let size = 12;
    let bounds = this.camera.getViewportBounds();
    let width = bounds.w * 2;
    let height = 2;
    let floorY = bounds.y - height / 2;
    let x = 0;

    var senshi =  new Senshi(0, bounds.y + 3, size, size/2, "#2c3e50", true, 1, this.world, false);

    senshi.fixture.SetRestitution(0);
    senshi.isFirstBlock = true;


    em.addEntity(senshi);
  }

  step(delta){
    if(!this.lost){
      em.update(delta);
    }
  }
}
