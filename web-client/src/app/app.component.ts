import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import {Resume} from "./domain/resume";
import 'rxjs/Rx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'app worksss!';
  resume: Resume;

  constructor(private http: Http){
  }

  ngOnInit(): void {
    this.http.get(`/api/resume`)
      .map(response => response.json() as Resume)
      .subscribe(resume => {
        this.resume = resume;
      })
  }
}
