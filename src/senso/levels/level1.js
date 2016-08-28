import {ClearSystem, Camera, CameraSystem, Vector2, InputSystem, HUD, Text, MenuDialog} from 'Ludic'
import {default as em, BaseSystem} from 'EiN';
import BaseLevel from './BaseLevel'
import RenderSystem from 'systems/renderSystem.js'
import SenshiMovementSystem from 'systems/senshiMovementSystem.js'
import SenshiCreationSystem from 'systems/senshiCreationSystem.js'
import Box2dSystem from 'systems/box2dSystem.js'
import Senshi from 'entities/senshi'
import ScoreArea from 'entities/ScoreArea'

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
      // this.ctx.fillStyle = this.color;
      this.ctx.fillStyle = 'white';
      this.ctx.clearRect(0, 0, this.canvas.width(), this.canvas.height());
      this.ctx.fillRect(0, 0, this.canvas.width(), this.canvas.height());
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

    this.menu = new MenuDialog({
      position: 'center',
      width:200,
      height:150,
      borderWidth: 3,
      title: "this is a dialog"
    })
    this.hud.addElement(this.menu, 'menu');
    this.menu.addMenuItem(new MenuDialog.MenuItem('Item One'))
    this.menu.addMenuItem(new MenuDialog.MenuItem('Item Two'))
    this.menu.addMenuItem(new MenuDialog.MenuItem('Item Three'))


    this.debugDrawSystem = new BaseSystem(true, 29, (delta)=>{
      this.world.drawDebug();
    });
    em.addSystem(this.debugDrawSystem);

    this.box2dSystem = new Box2dSystem(true, 20, this.world);
    em.addSystem(this.box2dSystem);

    this.inputSystem = new BaseSystem(true, 1, (delta)=>{
      Ludic.input.update(delta);
    });
    em.addSystem(this.inputSystem);


    this.senshiMovementSystem = new SenshiMovementSystem(true, 3);
    em.addSystem(this.senshiMovementSystem);

    this.senshiCreationSystem = new SenshiCreationSystem(true, 3);
    this.senshiCreationSystem.camera = this.camera;
    this.senshiCreationSystem.world = this.world;
    em.addSystem(this.senshiCreationSystem);


    this.listener = Ludic.input.newEventListener({
      keyConfig: {
        'esc.once.down': 'start'
      },
      methods: {
        start: (keyDown,e)=>{
          if(keyDown && !e.button.lastState.pressed){
            this.menu.toggle();
          }
        }
      },
      binder: this
    }, true)
  }

  initEntities(){
    let size = 12;
    let bounds = this.camera.getViewportBounds();
    let width = bounds.w * 2;
    let height = 2;
    let floorY = bounds.y - height / 2;
    let x = 0;

    var scoreArea =  new ScoreArea(0, bounds.y / 2, size, size/2, "rgba(255, 0, 0, .2)", true, 1, this.world);
    em.addEntity(scoreArea);
  }

  update(delta){
    if(!this.lost){
      em.update(delta);
    }
  }
}
