import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UsersService} from "../../core/services/users.service";
import {debounceTime, distinctUntilChanged, map, Observable, startWith, Subject, switchMap} from "rxjs";
import {User} from "../../core/models/user.model";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  formGroup: FormGroup;
  user$!: Observable<User[]>
  statuses = ['active', 'inactive'];

  constructor(private fb: FormBuilder, private users: UsersService) {
    this.formGroup = this.fb.group({
      email: new FormControl(''),
      status: this.fb.array([]),
    })
  }

  ngOnInit(): void {
    this.user$ = this.users.getUsers();
  }

  searchBy() {
    this.user$ = this.formGroup.valueChanges
      .pipe(
        startWith(this.formGroup.value),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(() => {
            return this.users.searchUsersBy(
              this.formGroup.get('email')?.value,
              this.formGroup.get('status')?.value == 'active' ? 'active' : 'inactive'
            );
          }
        )
      )
  }

  onChange(event: any) {
    const formArray: FormArray = this.formGroup.get('status') as FormArray;

    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    } else {
      const index = formArray.controls.findIndex(x => x.value === event.target.value);
      formArray.removeAt(index);
    }
  }
}
