import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  @Output() numberEmitted = new EventEmitter<number>();
  currentNumber = 0;
  ref = null;

  constructor() { }

  ngOnInit() {
  }

  onStart() {
    this.ref = setInterval(() => {
      this.numberEmitted.emit(this.currentNumber++);
    }, 1000);
  }

  onStop() {
    clearInterval(this.ref);
  }
}
