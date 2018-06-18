import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    @Output() navigationTriggered = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit() {
    }

    navigate(targetPage) {
        this.navigationTriggered.emit(targetPage);
    }
}
