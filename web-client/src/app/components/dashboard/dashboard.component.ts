import { Component, OnInit } from '@angular/core';
import {ResumeDao} from "../../dao/resume/resume.dao";
import {Resume} from "../../domain/resume";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  private resumes: Resume[];
  constructor(private resumeDao: ResumeDao) { }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.resumeDao.findAll().subscribe(resume => this.resumes = resume);
  }
}
