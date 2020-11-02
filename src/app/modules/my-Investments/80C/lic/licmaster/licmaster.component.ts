import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-licmaster',
  templateUrl: './licmaster.component.html',
  styleUrls: ['./licmaster.component.scss']
})
export class LicmasterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    console.log('LICMasterComponent');
  }

}
