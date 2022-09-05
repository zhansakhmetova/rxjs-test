import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UsersService} from "../../core/services/users.service";
import {debounceTime, distinctUntilChanged, Observable, startWith, switchMap} from "rxjs";
import {User} from "../../core/models/user.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  formGroup: FormGroup;
  user$!: Observable<User[]>
  statuses = ['active', 'inactive'];

  constructor(private fb: FormBuilder, private users: UsersService, private activeRoute: ActivatedRoute,) {
    this.formGroup = this.fb.group({
      email: new FormControl(''),
      status: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      if (params['email'] || params['status']) {
        this.formGroup.patchValue({
          email: params['email'],
          status: params['status']
        })
      }
    })
    this.searchBy();
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
              this.formGroup.get('status')?.value
            );
          }
        )
      )
  }

}
