import {BaseEntity} from 'EiN';
import Box2D from 'box2d';

export default class ScoreArea extends BaseEntity{
  constructor(x, y, radius = 1, color, active = true, priority = -1, world, isDynamic = true){
    super(active, priority);
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.world = world;
    this.isDynamic = isDynamic;
    this.color = color;
    this.current = true;
    this.score = 0;
    this.createB2D();
  }

  createB2D(){
    var bd = new Box2D.b2BodyDef();
    if(this.isDynamic){
      bd.set_type(Box2D.b2_dynamicBody);
    }
    bd.set_position(new Box2D.b2Vec2(this.x, this.y));
    this.body = this.world.CreateBody(bd);

    var shape = new Box2D.b2CircleShape();
    shape.set_m_radius(this.radius);
    this.fixture = this.body.CreateFixture(shape, 0.0);
    // this.fixture.SetRestitution(1.0);
    this.fixture.SetDensity(1.0);
    this.fixture.SetSensor(true);
    this.body.SetAwake(1);
    this.body.SetActive(1);
  }

  getPosition(easyRead){
    var pos;

    this.pos = this.body.GetPosition();

    if(easyRead){
      pos = {
        x:this.pos.get_x(),
        y:this.pos.get_y()
      };
    } else {
      pos = this.pos;
    }
    return pos;
  }

  draw(ctx){

    let pos = this.getPosition(true);

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(pos.x, pos.y, this.radius, 0, 2*Math.PI, false);
    ctx.fill();
  }
};
