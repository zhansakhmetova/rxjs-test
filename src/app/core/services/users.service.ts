import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {User, Response} from "../models/user.model";



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<Response<User[]>>('https://gorest.co.in/public/v1/users')
      .pipe(map((res) => res.data));
  }

  searchUsersBy(email: string, status: string): Observable<User[]> {
    let params: HttpParams = new HttpParams();
    params = params.append('status', status);
    params = params.append('email', email);
    return this.http.get<Response<User[]>>('https://gorest.co.in/public/v1/users', {params})
      .pipe(
        map((res) => res.data),
        catchError(err => of([]))
      )
  }
}
