import {AssetManager} from 'Ludic'
import {Ludic} from 'Ludic'
import {RubeAssetLoader} from 'box2d'
import Senso from './senso/senso'


AssetManager.addLoader(['rube','rubeImage'], RubeAssetLoader);

//Config Ludic?
Ludic.devmode = true;

var config = {
  canvas: {
    fullscreen: true
  },
  camera: {
    fps: false,
    extras: {
      axes: true,
      grid: false
    },
    ptm: 25
  },
  world: {
    gravity: {
      x: 0,
      y: -10
    },
    drawDebug: true
  },
  input: {
    logAllKeys:false,
    logUnmappedKeys:true,
  }
};

var app = new Senso(config);
app.run();

console.log("Hey");
