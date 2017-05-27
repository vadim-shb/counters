import { Component, OnInit } from '@angular/core';
import {ResumeDao} from "../../../dao/resume/resume.dao";
import {Resume} from "../../../domain/resume";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.less']
})
export class UserDashboardComponent implements OnInit {

  private resumes: Resume[];

  constructor(private resumeDao: ResumeDao) {
  }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.resumeDao.findAll().subscribe(resume => this.resumes = resume);
  }
}
