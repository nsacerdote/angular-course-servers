import {Injectable} from '@angular/core';
import {CounterService} from './counter.service';

@Injectable()
export class UsersService {
  activeUsers = ['Max', 'Anna'];
  inactiveUsers = ['Chris', 'Manu'];

  constructor(private counterService: CounterService) {}

  activateUser(user: string) {
    this.removeFromArray(this.inactiveUsers, user);
    this.activeUsers.push(user);
    this.counterService.userActivated();
  }

  deactivateUser(user: string) {
    this.removeFromArray(this.activeUsers, user);
    this.inactiveUsers.push(user);
    this.counterService.userDeactivated();
  }

  private removeFromArray(array: string[], user: string) {
    const index = array.indexOf(user);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

}
