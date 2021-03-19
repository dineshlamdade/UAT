import { CompanySettingsService } from './../company-settings.service';
import { Component, OnInit, ViewChild, ElementRef, TemplateRef, Inject, HostListener, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { FormArray, AbstractControl } from '@angular/forms';
import { DatePipe, DOCUMENT } from '@angular/common';
import { MyInvestmentsService } from './../../my-Investments/my-Investments.service';


import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { FileService } from '../../my-Investments/file.service';

import { NumberFormatPipe } from './../../../core/utility/pipes/NumberFormatPipe';
import { from } from 'rxjs';
//sneha
import Swal from 'sweetalert2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
/////////////////bharati
//import { SaveAttributeCreation } from './attributecreation.model';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { de } from 'date-fns/locale';
import { element } from 'protractor';

export class SaveAttributeCreation {
  globalAttributeMasterId: number;
  code; string;
  description: string;
  attributeNature: string;
  numberOfOption: string;
  options: any[];
}

export class SaveAttributeSelection {
  attributeGroupDefinitionId: number;
  // id:number;
  name; string;
  description: string;
  //createdBy:string;
  // attributeNature:string;
  // numberOfOption:string;
  attributeMasterIdList: any[];
}

@Component({
  selector: 'app-attribute-creation',
  templateUrl: './attribute-creation.component.html',
  styleUrls: ['./attribute-creation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AttributeCreationComponent implements OnInit {
  AttributeCreationList: Array<any> = [];
  NatureList: Array<any> = [];
  AttributeCreationForm: FormGroup;
  disabled: boolean = true
  viewCancelButton: boolean = false;
  hidevalue: boolean = false;
  //summons = [];
  summons: Array<any> = [];
  newlist: Array<any> = [];
  optionList = [];
  selectedNature: string;
  // TypeList: Array<any> = [];
  // HeadCreationList:Array<any> = [];


  // Name:string;




  constructor(
    private formBuilder: FormBuilder,
    private Service: MyInvestmentsService,
    private datePipe: DatePipe,
    // private messageService: MessageService,
    private http: HttpClient,
    // private notifyService: NotificationsService,
    public datepipe: DatePipe,
    private fileService: FileService,
    private attributeCreationService: CompanySettingsService,
    private numberFormat: NumberFormatPipe,
    private modalService: BsModalService,
    @Inject(DOCUMENT) private document: Document) {
    this.NatureList = [
      { label: 'L', value: 'L' },
      { label: 'F', value: 'F' },
      { label: 'SP', value: 'SP' },
      { label: 'SDM', value: 'SDM' },
      { label: 'PEI', value: 'PEI' },
      { label: 'WF', value: 'WF' },
      { label: 'GM', value: 'GM' },
    ];
  }

  ngOnInit(): void {

    this.AttributeCreationForm = this.formBuilder.group({
      id: new FormControl(null,),
      code: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      attributeNature: new FormControl('', Validators.required),
      optionList: new FormControl('', Validators.required),
      // optionList: this.formBuilder.array([]),
      // type: new FormControl('', ),
      // isStatutory: new FormControl('0'),
    });

    this.getAllAttributeCreation();
  }


  sweetalert7(message: any) {
    Swal.fire({
      text: message,
    })
  }

  sweetalertWarning(message: any) {
    Swal.fire({
      title: message,
      showCloseButton: true,
      showCancelButton: false,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      background: '#e68a00',
      icon: 'warning',
      timer: 15000,
      timerProgressBar: true,
    })
  }

  sweetalertInfo(message: any) {
    Swal.fire({
      title: message,
      showCloseButton: true,
      showCancelButton: false,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      icon: 'info',
      timer: 15000,
      timerProgressBar: true,
    })
  }

  sweetalertMasterSuccess(message: any, text: any) {
    Swal.fire({
      title: message,
      text: text,
      showCloseButton: true,
      showCancelButton: false,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      icon: 'success',
      timer: 15000,
      timerProgressBar: true,
    })
  }

  sweetalertError(message: any) {
    Swal.fire({
      title: message,
      showCloseButton: true,
      showCancelButton: false,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      icon: 'error',
      timer: 15000,
      timerProgressBar: true,
    })
  }
  // get All AttributeCreation
  getAllAttributeCreation(): void {
    this.attributeCreationService.getAllAttributeCreation().subscribe(res => {
      debugger
      this.AttributeCreationList = res.data.results;
    });
  }

  // Get Attribute Creation ById
  GetAttributeCreationByIdDisable(id): void {
    debugger;
    // this.CycleupdateFlag=true;
    // this.CycleupdateFlag1=false;
    this.disabled = false;
    this.viewCancelButton = true;
    this.attributeCreationService.GetAttributeCreationById(id)
      .subscribe(response => {
        debugger
        //  this.HeadCreationForm.patchValue({ id: response.data.results[0].globalHeadMasterId });
        this.AttributeCreationForm.patchValue({ code: response.data.results[0].code });
        this.AttributeCreationForm.patchValue({ description: response.data.results[0].description });
        this.AttributeCreationForm.patchValue({ attributeNature: response.data.results[0].attributeNature });
        if (response.data.results[0].attributeNature == "L") {
          this.hidevalue = true;
        }
        else {
          this.hidevalue = false;
        }
        this.summons = [];
        if (response.data.results[0].optionList.length > 0) {
          response.data.results[0].optionList.forEach(element => {
            // const obj = {
            //     label: element,
            //     value: element,
            // };

            this.summons.push(element.optionValue);
            // const control = <FormArray>this.AttributeCreationForm.controls['optionList'];
            // control.push(element.optionValue)
            //this.transactionInstitutionNames.push(obj);
            //  this.AttributeCreationForm.patchValue({ optionList: this.summons});
          });

          this.AttributeCreationForm.patchValue({ optionList: this.summons });
        }
      });

    this.summons = [];
  }


  onChangeEvent(event: any): void {
    debugger;
    this.summons.push(event);
    //this.summons
    // this.newlist.push(this.summons.values)
    // if ((this.id == undefined || this.id == '00000000-0000-0000-0000-000000000000')) {
    //  this.HeadCreationForm.patchValue({ shortName:this.Name });
    // this.EventDetails.controls["RegistrationClosedDate"].setValue["EventStartDate"];
    // this.notificationForm.patchValue({ scheduleTime: this.CurrentTime });
    // }

  }

  onStatusChange(event): void {
    debugger
    this.selectedNature = event.target.value;
    if (this.selectedNature == 'L') {
      this.hidevalue = true;
      this.AttributeCreationForm.controls['optionList'].setValidators([Validators.required]);
    }
    else {
      this.summons = [];
      this.hidevalue = false;
      this.AttributeCreationForm.patchValue({ addDays: null });
      this.AttributeCreationForm.get('optionList').clearValidators();
      this.AttributeCreationForm.get('optionList').updateValueAndValidity();
    }
  }
  addOptionList(): void {
    this.AttributeCreationForm.patchValue({ optionList: '' });
  }

  //add new AttributeCreation
  addAttributeCreation(): void {
    debugger
    const addAttributeCreation: SaveAttributeCreation = Object.assign({});
    //addAttributeCreation.options=this.summons;
    addAttributeCreation.options = [];
    this.summons.forEach(function (f) {
      addAttributeCreation.options.push(f);
    });
    addAttributeCreation.numberOfOption = this.summons.length.toString();
    addAttributeCreation.code = this.AttributeCreationForm.value.code;
    addAttributeCreation.description = this.AttributeCreationForm.value.description;
    addAttributeCreation.attributeNature = this.AttributeCreationForm.value.attributeNature;
    //     code;string;
    // description:string;
    // attributeNature:string;
    if (addAttributeCreation.globalAttributeMasterId == undefined || addAttributeCreation.globalAttributeMasterId == 0) {

      this.attributeCreationService.AddAttributeCreation(addAttributeCreation).subscribe((res: any) => {
        debugger
        addAttributeCreation.options = [];
        this.summons = [];
        this.sweetalertMasterSuccess("Success..!!", res.status.message);
        this.getAllAttributeCreation();
        this.hidevalue = false;
        this.AttributeCreationForm.reset();
        //  this.AttributeCreationForm.patchValue({ isStatutory:'0' });
      },
        (error: any) => {
          this.sweetalertError(error["error"]["status"]["message"]);
        });
    }
    // else{
    //     debugger
    //   //Update BusinessYear service
    //   addBusinessYear.fromDate = this.datepipe.transform(addBusinessYear.fromDate, "dd-MMM");
    //   addBusinessYear.toDate = this.datepipe.transform(addBusinessYear.toDate, "dd-MMM");
    //   this.payrollService.UpdateBusinessYear(addBusinessYear.id,addBusinessYear).subscribe((res:any )=> {
    //   debugger
    //   this.sweetalertMasterSuccess("Updated..!!", res.status.message);
    //   this.getAllBusinessyear();
    //   this.BusinessYearform.reset();
    //   this.updateFlag=false;
    //   },
    //   (error: any) => {
    //      this.sweetalertError(error["error"]["status"]["message"]);
    //      // this.notifyService.showError(error["error"]["status"]["message"], "Error..!!")
    //    });
    // }
  }
  CancelAttributeCreation(): void {
    this.summons = [];
    this.disabled = true;
    this.hidevalue = false;
    this.AttributeCreationForm.reset();
    this.viewCancelButton = false;
    //this.HeadCreationForm.patchValue({ isStatutory:'0' });
  }

  ResetAttributeCreation(): void {
    this.AttributeCreationForm.reset();
    this.viewCancelButton = false;
    this.hidevalue = false;
    this.summons = [];
    this.AttributeCreationForm.patchValue({ isStatutory: '0' });
  }

}
