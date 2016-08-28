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
    this.scoreArea.color = "rgba(255, 0, 0, .2)";

    while(true){
      if(contact.get_contact().IsTouching()) {
        this.scoreArea.color = "rgba(255, 0, 0, .4)";

        let senshi = contact.get_other().entityData;
        if(senshi) {
          senshi.score += parseInt(delta * 200);
        }
      }

      contact = contact.get_next();
      if(contact.e === 0) {
        break;
      }
    }
  }
};
