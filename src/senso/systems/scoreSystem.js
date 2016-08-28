import {BaseSystem} from 'EiN'

export default class ScoreSystem extends BaseSystem {
  constructor(active = true, priority = -1, ctx){
    super(active, priority);
    this.ctx = ctx;
  }

  //Overide
  onEntityAdded(manager){
    this.scoreArea = manager.getEntitiesByClassName('ScoreArea')[0];
  }

  onEntityRemoved(manager){
    this.scoreArea = manager.getEntitiesByClassName('ScoreArea')[0];
  }

  //Overide
  update(delta){

    /* if entity is in sensor, add 1 to entity.score */
    let contact = this.scoreArea.body.GetContactList();
    let senshisInScoreArea = [];

    while(true){
      if(contact.get_contact().IsTouching()) {
        let senshi = contact.get_other().entityData;
        if(senshi) {
          senshisInScoreArea.push(senshi);
        }
      }

      contact = contact.get_next();
      if(contact.e === 0) {
        break;
      }
    }

    this.scoreArea.occupied = false;
    this.scoreArea.contested = false;
    if(senshisInScoreArea.length == 1) {
      this.scoreArea.occupied = true;
      senshisInScoreArea[0].score += parseInt(delta * 200);
    } else if(senshisInScoreArea.length > 1) {
      this.scoreArea.contested = true;
    }
  }
};
