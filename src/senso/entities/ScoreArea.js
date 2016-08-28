import {BaseEntity} from 'EiN';
import Box2D from 'box2d';

export default class ScoreArea extends BaseEntity{
  constructor(x, y, width = 1, height = 1, color, active = true, priority = -1, world, isDynamic = true){
    super(active, priority);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
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

    var shape = new Box2D.b2PolygonShape();
    shape.SetAsBox(this.width / 2, this.height / 2, );
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

    ctx.translate(pos.x, pos.y);
    ctx.rotate(this.body.GetAngle());
    ctx.translate(-(pos.x), -(pos.y));
    ctx.fillStyle = this.color;
    ctx.fillRect(pos.x - this.width / 2, pos.y - this.height / 2, this.width, this.height);
  }
};
