import {BaseEntity} from 'EiN';
import Box2D from 'box2d';

export default class ScoreArea extends BaseEntity{
  constructor(x, y, radius, passiveColor, occupiedColor, contestedColor, active = true, priority = -1, world){
    super(active, priority);
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.world = world;
    this.passiveColor = passiveColor;
    this.occupiedColor = occupiedColor;
    this.contestedColor = contestedColor;

    this.occupied = false;
    this.contested = false;
    this.createB2D();
  }

  createB2D(){
    var bd = new Box2D.b2BodyDef();
    bd.set_position(new Box2D.b2Vec2(this.x, this.y));
    this.body = this.world.CreateBody(bd);

    var shape = new Box2D.b2CircleShape();
    shape.set_m_radius(this.radius);
    this.fixture = this.body.CreateFixture(shape, 0.0);
    this.fixture.SetSensor(true);
  }

  getPosition(){
    let pos = this.body.GetPosition();
    return {
      x: pos.get_x(),
      y: pos.get_y()
    };
  }

  draw(ctx){

    let pos = this.getPosition();

    let color = this.passiveColor;
    if(this.occupied) {
      color = this.occupiedColor;
    } else if(this.contested) {
      color = this.contestedColor;
    }

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(pos.x, pos.y, this.radius, 0, 2*Math.PI, false);
    ctx.fill();
  }
};
