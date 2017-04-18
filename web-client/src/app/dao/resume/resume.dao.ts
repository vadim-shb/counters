import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Resume} from "../../domain/resume";
import {Http} from "@angular/http";

@Injectable()
export class ResumeDao {

  constructor(private http: Http) { }

  findAll(): Observable<Resume[]> {
    return this.http.get(`/api/resumes`)
      .map(response => response.json() as Resume[])
  }
}
