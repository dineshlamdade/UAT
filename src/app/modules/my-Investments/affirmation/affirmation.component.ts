import { Component, OnInit } from '@angular/core';

import jspdf from 'jspdf';
import * as _html2canvas from "html2canvas";
const html2canvas: any = _html2canvas;

import {
  HostListener,
  Inject,
  Optional,
  TemplateRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { NumberFormatPipe } from 'src/app/core/utility/pipes/NumberFormatPipe';
import { startOfYear } from 'date-fns';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { from } from 'rxjs';
import { AffirmationService } from './affirmation.service';
import { MyInvestmentsService } from '../my-Investments.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';


export interface summaryTempList {
  group;
  module;
} 

@Component({
  selector: 'app-affirmation',
  templateUrl: './affirmation.component.html',
  styleUrls: ['./affirmation.component.scss']
})
export class AffirmationComponent implements OnInit {

  public modalRef: BsModalRef;
  public templateUserIdList = [];
  public declarationTempList: summaryTempList[];

  imgFile: any = '';
  imageFile: any;


  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private Service: MyInvestmentsService,
    private datePipe: DatePipe,
    private http: HttpClient,
    private affirmationService: AffirmationService,
    private numberFormat: NumberFormatPipe,
    public dialog: MatDialog,
    private alertService: AlertServiceService,
  ) { }

  ngOnInit() {

    
    this.getaffirmationSummarySummary();
  }


   /*  Summary getaffirmationSummary Summary */
   getaffirmationSummarySummary()
    {
    this.affirmationService
      .getaffirmationSummarySummary()
      .subscribe((res) => {
        console.log('res::', res);
      this.templateUserIdList = res.data.results;
      console.log("templateUserIdList::",this.templateUserIdList)

      });
  }


    /* =================pdf======================== */
    download() {
      console.log('hi');
  
      let data = document.getElementById('htmlData');
      html2canvas(data).then(canvas => {
        console.log(canvas)
        // Few necessary setting options
        const imgWidth = 193;
       const pageHeight = 0;
        const imgHeight = canvas.height * imgWidth / canvas.width;
       // const heightLeft = imgHeight;
  
        const contentDataURL = canvas.toDataURL('image/png')
        // A4 size page of PDF
        const pdf = new jspdf('p', 'mm', 'a4');
        const position = -120;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        // Generated PDF
        pdf.save('FORM.12B.pdf');
      });
    }

   /* Upload Documents */
  UploadModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-xg' })
    );
  }

/* View Popup */
  UploadModalView(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }
  openFormSign(template2: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template2,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  openForm12BModal(template1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template1,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }
  

  onImageChange(e) {
    const reader = new FileReader();
    
    if(e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.imgFile = reader.result as string;
        
   
      };
    }
  }

  getImageFile(imagefile : any){
    this.imageFile = imagefile;
}

}
