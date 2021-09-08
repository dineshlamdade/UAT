import { Component, OnInit } from '@angular/core';
import { TemplateRef} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-holdrelease',
  templateUrl: './holdrelease.component.html',
  styleUrls: ['./holdrelease.component.scss']
})
export class HoldreleaseComponent implements OnInit {
  
  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    
  }
 
}
