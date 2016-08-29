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
    return parseInt(this.seconds);
  }

  updateText(){
    this.text.text = this.getTextString();
    if(this.seconds < 4) {
      this.text.color = 'rgb(255,0,0)';
      this.text.setPositionX(this.x - 60*(4 - parseInt(this.seconds)));
      this.text.setPositionY(this.y - 60*(4 - parseInt(this.seconds)));
      this.text.setFontSize(1000 * (4 - parseInt(this.seconds))/4);

    }
  }
};
