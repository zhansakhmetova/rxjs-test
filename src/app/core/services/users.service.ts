import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, map, Observable, of, Subject, tap} from "rxjs";
import {User, Response} from "../models/user.model";
import {ActivatedRoute, Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute) {
  }

  searchUsersBy(email: string, status: string): Observable<User[]> {
    this.router.navigate([], {relativeTo: this.route, queryParams: {status, email}});

    let params: HttpParams = new HttpParams();
    params = params.append('status', status);
    params = params.append('email', email);
    return this.httpClient.get<Response<User[]>>('https://gorest.co.in/public/v1/users', {params})
      .pipe(
        map((res) => res.data),
      )

  }
}
