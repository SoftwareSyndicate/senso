import {App} from 'Ludic';
import Ludic from 'Ludic';
import GameScreen from './screens/GameScreen';

export default class Senso extends App {
  constructor(config){
    super(config);

    //TODO REFACTOR screen manager, should probably extend
    this.screenListener = Ludic.screenManager.newListener(true);
    this.gameScreen = new GameScreen();
    Ludic.screenManager.addScreen(this.gameScreen, true);
  }

  update(delta){
    Ludic.screenManager.update(delta);
  }
}
