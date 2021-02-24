import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-education-skills-information',
  templateUrl: './education-skills-information.component.html',
  styleUrls: ['./education-skills-information.component.scss']
})
export class EducationSkillsInformationComponent implements OnInit {
  educationTab: boolean = true;
  skillTab: boolean = false;
  languageTab: boolean = false;
  certificationTab: boolean = false;
  public tabIndex = 0;



  constructor(private router: Router) {
    this.educationTab = true;
    this.skillTab = false;
    this.languageTab = false;
    this.certificationTab = false;
    // this.router.navigate(['/employee-master/education-skills-information/education-details']);

    if (router.url == '/employee-master/education-skills-information/education-details') {
      this.tabIndex = 0;
      this.educationTabValidation();
    }
    if (router.url == '/employee-master/education-skills-information/skills-details') {
      this.tabIndex = 1;
      this.skillTabValidation();
    }
    if (router.url == '/employee-master/education-skills-information/language-details') {
      this.tabIndex = 2;
      this.languageTabValidation();
    }
    if (router.url == '/employee-master/education-skills-information/certification-details') {
      this.tabIndex = 3;
      this.certificationTabValidation();
    }
  }

  ngOnInit(): void {

  }

  educationTabValidation() {
    this.educationTab = true;
    this.skillTab = false;
    this.languageTab = false;
    this.certificationTab = false;
    this.router.navigate(['/employee-master/education-skills-information/education-details']);
  }

  skillTabValidation() {
    this.educationTab = false;
    this.skillTab = true;
    this.languageTab = false;
    this.certificationTab = false;
  }

  languageTabValidation() {
    this.educationTab = false;
    this.skillTab = false;
    this.languageTab = true;
    this.certificationTab = false;
  }

  certificationTabValidation() {
    this.educationTab = false;
    this.skillTab = false;
    this.languageTab = false;
    this.certificationTab = true;
  }

}
