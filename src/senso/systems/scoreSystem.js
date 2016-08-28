import {BaseSystem} from 'EiN'

export default class ScoreSystem extends BaseSystem {
  constructor(active = true, priority = -1, ctx){
    super(active, priority);
    this.ctx = ctx;
    this.scoreArea = false;
  }

  //Overide
  onEntityAdded(manager){
    this.senshis = manager.getEntitiesByClassName('Senshi');
    this.scoreArea = manager.getEntitiesByClassName('ScoreArea');
  }

  onEntityRemoved(manager){
    this.senshis = manager.getEntitiesByClassName('Senshi');
    this.scoreArea = manager.getEntitiesByClassName('ScoreArea');
  }

  //Overide
  update(delta){
    if(!this.scoreArea) {
      return;
    }
    /* if entity is in sensor, add 1 to entity.score */
    var scoreArea = this.scoreArea[0];
    var contact = scoreArea.world.GetContactList();
    while(contact){
      console.log('B', contact.GetFixtureB());
      this.senshis.forEach((senshi) => {
        if(senshi.fixture.e === contact.GetFixtureB().e) {
          console.log('CONTACTING');
          senshi.score++;
        }
      })

      contact = contact.GetNext();
      if(contact.e === 0) {
        contact = false;
      }
    }
    // contacts.forEach((contact) => {
    //   console.log(contact);
    // });
  }
};
