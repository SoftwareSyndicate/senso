import {BaseEntity} from 'EiN'
import {Text} from 'Ludic'

export default class CountdownTimer extends BaseEntity{
  constructor(x, y, seconds, hud, active = true, priority = -1){
    super(active, priority);
    this.x = x;
    this.y = y;

    this.seconds = seconds;
    this.hud = hud;

    this.text = new Text(this.getTextString(), this.x, this.y, {fontSize: 22});
    this.hud.addElement(this.text, 'countdown_timer');
    this.text.color = 'rgb(0,0,0)';
  }

  getTextString(){
    return "Time: " + parseInt(this.seconds);
  }

  updateText(){
    this.text.text = this.getTextString();
  }
};
