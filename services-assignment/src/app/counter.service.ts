export class CounterService {

  usersActivated = 0;
  usersDeactivated = 0;

  userActivated() {
    this.usersActivated++;
    this.logStatus();
  }

  userDeactivated() {
    this.usersDeactivated++;
    this.logStatus();
  }

  private logStatus() {
    console.log('number of activation -> ' + this.usersActivated);
    console.log('number of deactivation -> ' + this.usersDeactivated);
    console.log('number of actions performed -> ' + (this.usersActivated + this.usersDeactivated));
  }

}
