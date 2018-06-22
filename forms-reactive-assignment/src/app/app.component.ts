import {Component, OnInit} from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myFormGroup: FormGroup;

  ngOnInit(): void {
    this.myFormGroup = new FormGroup({
      'projectName' : new FormControl(null, [Validators.required, this.testNotAllowedValidator.bind(this)], this.testNotAllowedAsyncValidator.bind(this)),
      'mail' : new FormControl(null, [Validators.required, Validators.email ]),
      'projectStatus' : new FormControl(null)
    });
  }

  onSubmit() {
    console.log(this.myFormGroup);
  }

  testNotAllowedValidator(control: FormControl): { [key: string]: any; } {
    if (control.value === 'Test') {
      return {notAllowedProjectName : true};
    }
    return null;
  }

  testNotAllowedAsyncValidator(control: FormControl): Promise<{ [key: string]: any; }> | Observable<{ [key: string]: any; }> {
    return new Promise(
      (resolve) => {
        setTimeout(
          () => {
            if (control.value === 'TestAsync') {
              resolve({notAllowedProjectName : true});
            }
            resolve(null);
          }, 5000
        );
      }
    );
  }
}
