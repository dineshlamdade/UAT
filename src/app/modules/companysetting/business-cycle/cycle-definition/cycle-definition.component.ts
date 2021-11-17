
import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import { CompanySettingsService } from '../../company-settings.service';
import { SaveCycleDefinition } from '../../model/business-cycle-model';
import { AlertServiceService } from '../../../../core/services/alert-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ExcelserviceService } from '../../../excel_service/excelservice.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-cycle-definition',
  templateUrl: './cycle-definition.component.html',
  styleUrls: ['./cycle-definition.component.scss']
})
export class CycleDefinitionComponent implements OnInit, AfterViewInit {
  modalRef: BsModalRef;
  CycleupdateFlag = false;
  isViewAddDays = false;
  CycleupdateFlag1 = false;
  cycleDefinitionForm: FormGroup;
  ServicesList = [];
  CycleDefinitionList = [];
  // serviceName = [];
  activeFrequencyList: Array<any> = [];
  disabled = true;
  //BusinessyearList: any = [];
  dropdownSettings = {};
  @ViewChild('multiSelect') multiSelect;
  serviceNameDropDownList = [];
  Multiselectflag = false;
  updateFlag = false;
  sortedFrequencyList = [];
  header: any[];
  excelData: any[];

  @Input() BusinessyearList : any;
  CycleDefinitionFlag: boolean = false;
  frequencyMasterId: any;
  cycleName: any;
  frequencyName: any;
  frequencyId: any;

  // @ViewChild('BusinessyearList',  {static: false}) BusinessyearList;
  
  constructor(private companySettings: CompanySettingsService, private formBuilder: FormBuilder,
    private alertService: AlertServiceService, private modalService: BsModalService,
    private datePipe: DatePipe,
    private excelservice: ExcelserviceService) {
    this.getAllCycleDefinition();
    this.getActiveFrequency();
  }

  ngAfterViewInit() {
    this.getAllBusinessYear();
    console.log("after view init: "+ JSON.stringify(this.BusinessyearList))
  }

  ngOnInit(): void {

    this.cycleDefinitionForm = this.formBuilder.group({
      id: new FormControl(null,),
      cycleName: new FormControl('', Validators.required), // ['', [Validators.required, Validators.maxLength(10)]],
      businessYearDefinitionId: new FormControl('', Validators.required),
      frequencyMasterId: new FormControl('', Validators.required),
      addDays: new FormControl(''),
      incompleteDaysFalls: new FormControl('', Validators.required),
      yearDefinition: new FormControl({ value: '', disabled: true }), // this. is from date to date autopopulated field..

    });

  }


  getAllBusinessYear() {
    this.companySettings.getAllBusinessYear().subscribe(res => {
      this.BusinessyearList = res.data.results;
      this.BusinessyearList.forEach(element => {
        console.log("in cycle def comp this.businessYearList" + JSON.stringify(element.description))
      });
    });

  }
  getAllCycleDefinition(): void {
    this.CycleDefinitionList = [];
    this.companySettings.getAllCycleDefinition().subscribe(res => {
      this.CycleDefinitionList = res.data.results;
      // console.log( 'cycle creation res', this.CycleDefinitionList );

    });

  }

  // get all  activeFrequencyList
  getActiveFrequency(): void {
    this.activeFrequencyList = [];
    this.companySettings.getActiveFrequency().subscribe(res => {

      this.activeFrequencyList = res.data.results;
    }, (error) => {

    }, () => {
      // for ( let i = 0; i < this.activeFrequencyList.length; i++ ){
      if (this.activeFrequencyList.findIndex(o => o.name.toLowerCase() == 'daily') !== -1) {
        //console.log( 'in daily' );
        const index = this.activeFrequencyList.findIndex(o => o.name.toLowerCase() == 'daily');
        this.sortedFrequencyList.push(this.activeFrequencyList[index]);

      } if (this.activeFrequencyList.findIndex(o => o.name.toLowerCase() == 'weekly') !== -1) {
        const index = this.activeFrequencyList.findIndex(o => o.name.toLowerCase() == 'weekly');
        this.sortedFrequencyList.push(this.activeFrequencyList[index]);

      }
      if (this.activeFrequencyList.findIndex(o => o.name.toLowerCase() === 'biweekly') !== -1) {
        const index = this.activeFrequencyList.findIndex(o => o.name.toLowerCase() == 'biweekly');
        this.sortedFrequencyList.push(this.activeFrequencyList[index]);

      }
      if (this.activeFrequencyList.findIndex(o => o.name.toLowerCase() === 'semi-monthly') !== -1) {
        const index = this.activeFrequencyList.findIndex(o => o.name.toLowerCase() == 'semi-monthly');
        this.sortedFrequencyList.push(this.activeFrequencyList[index]);

      }
      if (this.activeFrequencyList.findIndex(o => o.name.toLowerCase() === 'monthly') !== -1) {
        const index = this.activeFrequencyList.findIndex(o => o.name.toLowerCase() == 'monthly');
        this.sortedFrequencyList.push(this.activeFrequencyList[index]);

      }
      if (this.activeFrequencyList.findIndex(o => o.name.toLowerCase() === 'quarterly') !== -1) {
        const index = this.activeFrequencyList.findIndex(o => o.name.toLowerCase() === 'quarterly');
        this.sortedFrequencyList.push(this.activeFrequencyList[index]);

      }
      if (this.activeFrequencyList.findIndex(o => o.name.toLowerCase() === 'half-yearly') !== -1) {
        const index = this.activeFrequencyList.findIndex(o => o.name.toLowerCase() == 'half-yearly');
        this.sortedFrequencyList.push(this.activeFrequencyList[index]);

      } if (this.activeFrequencyList.findIndex(o => o.name.toLowerCase() === 'yearly') !== -1) {
        const index = this.activeFrequencyList.findIndex(o => o.name.toLowerCase() == 'yearly');
        this.sortedFrequencyList.push(this.activeFrequencyList[index]);

      } if (this.activeFrequencyList.findIndex(o => o.name.toLowerCase() === 'adhoc') !== -1) {
        const index = this.activeFrequencyList.findIndex(o => o.name.toLowerCase() == 'adhoc');
        this.sortedFrequencyList.push(this.activeFrequencyList[index]);
      }
      //console.log( ' this.sortedFrequencyList', this.sortedFrequencyList );
    });
  }





  // add new cycle-definition & update
  addCycleDefinition(): void {
    // console.log('in addCycleDefinition');
    const addCycleDefinition: SaveCycleDefinition = Object.assign({}, this.cycleDefinitionForm.value);
    // delete addCycleDefinition.addDays;
    if (addCycleDefinition.id == undefined || addCycleDefinition.id == 0 || addCycleDefinition.id == null) {
      // const employerContributionMethod = this.cycleDefinitionForm;
      // console.log( 'employerContributionMethod', employerContributionMethod );
      //  addCycleDefinition.serviceName = [];
      this.ServicesList.forEach(function (f) {
        //   addCycleDefinition.serviceName.push( f );
      });
      // console.log( JSON.stringify( addCycleDefinition ) );
      this.companySettings.AddCycleDefinition(addCycleDefinition).subscribe((res: any) => {


        this.alertService.sweetalertMasterSuccess(res.status.message, '');
        this.getAllCycleDefinition();
        this.CancelBusiness();
        this.resetCycledefinition();
      },
        (error: any) => {
          //  this.sweetalertError(error["error"]["status"]["message"]);
          this.alertService.sweetalertError(error['error']['status']['message']);
        });
      this.ServicesList = [];
      // this.serviceName = [];
      this.cycleDefinitionForm.reset();
    }
    else {

      addCycleDefinition.businessCycleDefinitionId = addCycleDefinition.id;
    this.cycleDefinitionForm.controls['cycleName'].enable();
    this.cycleDefinitionForm.controls['addDays'].enable();
    this.cycleDefinitionForm.controls['businessYearDefinitionId'].enable();
    this.cycleDefinitionForm.controls['frequencyMasterId'].enable();
    this.cycleDefinitionForm.controls['incompleteDaysFalls'].enable();
      console.log("addCycleDefinition: "+ JSON.stringify(addCycleDefinition))
      let data={
        "businessCycleDefinitionId": addCycleDefinition.businessCycleDefinitionId ,
    "frequencyMasterId": this.frequencyMasterId,
    "businessYearDefinitionId":addCycleDefinition.businessYearDefinitionId,
    "cycleName":  this.cycleName,
    "incompleteDaysFalls": this.cycleDefinitionForm.controls["incompleteDaysFalls"].value

      }

      // this.serviceName = [];
      //  this.serviceName.push(addCycleDefinition.services)
      //  addCycleDefinition.serviceName = this.serviceName;
      //  delete addCycleDefinition.serviceName;
      // addCycleDefinition.serviceName = this.cycleDefinitionForm.get( 'services' ).value;
      // this.serviceName.push( this.cycleDefinitionForm.get( 'services' ).value );
      // this.serviceName.push( this.cycleDefinitionForm.get( 'services' ).value );
      // addCycleDefinition.serviceName = this.serviceName;
      // console.log( 'json', JSON.stringify( addCycleDefinition ) );
      this.companySettings.UpdateCycleDefinition(data).subscribe((res: any) => {
        this.alertService.sweetalertMasterSuccess(res.status.message, '');
        this.getAllCycleDefinition();
        this.cycleDefinitionForm.reset();
        this.CycleupdateFlag = false;
        this.CycleupdateFlag1 = false;

      },
        (error: any) => {

          this.alertService.sweetalertError(error['error']['status']['message']);
        });
    }
  }

  onChangeFrequencyFromCycleDefinition(event) {
    //alert(event);
   this.frequencyId = event

  //alert(this.frequencyName)
    // console.log(this.selectedFrequency);
    const findIndex = this.activeFrequencyList.findIndex(o => o.id == event);
    
   
    console.log('s', findIndex);


    if (this.activeFrequencyList[findIndex].name.toLowerCase() == 'adhoc') {
      console.log('i');
      this.isViewAddDays = true;
      // this.cycleDefinitionForm.controls['addDays'].setValidators([Validators.required]);
    }
    else {
      console.log('i3');
      this.isViewAddDays = false;
      //
      // this.cycleDefinitionForm.patchValue:[{' addDays': null, disabled: true }],
      //     const control = new FormControl('Nancy');

      this.cycleDefinitionForm.patchValue({ addDays: null });

      this.cycleDefinitionForm.get('addDays').clearValidators();
      this.cycleDefinitionForm.get('addDays').updateValueAndValidity();
    }
  }

  CancelBusiness(): void {
    this.cycleDefinitionForm;
    this.disabled = true;
    this.cycleDefinitionForm.reset();
    this.updateFlag = false;
    this.CycleupdateFlag = false;
    this.CycleupdateFlag1 = false;
    this.isViewAddDays = false;
    this.cycleDefinitionForm.controls['cycleName'].enable();
    this.cycleDefinitionForm.controls['addDays'].enable();
    this.cycleDefinitionForm.controls['businessYearDefinitionId'].enable();
    this.cycleDefinitionForm.controls['frequencyMasterId'].enable();
    this.cycleDefinitionForm.controls['incompleteDaysFalls'].enable();

    this.cycleDefinitionForm.patchValue({
      id: null,
      cycleName: '',
      businessYearDefinitionId: '',
      frequencyMasterId: '',
      addDays: '',
      // services: ''
    });
    // this.cycleDefinitionForm.controls.multiselectServices.setValidators( Validators.required );
    // this.cycleDefinitionForm.controls.multiselectServices.updateValueAndValidity();
  }

  GetCycleDefinitionbyIdDisable(id: number): void {
    window.scrollTo(0, 0);
    this.CycleupdateFlag = true;
    this.CycleupdateFlag1 = false;
    this.disabled = false;
    this.companySettings.GetCycleDefinitionById(id)
      .subscribe(response => {

        this.frequencyMasterId = response.data.results[0].frequency.id
        this.cycleName = response.data.results[0].cycleName.split('_')[0]
        this.cycleDefinitionForm.patchValue({ id: response.data.results[0].id });
        this.cycleDefinitionForm.patchValue({ cycleName: response.data.results[0].cycleName.split('_')[0] });
        this.cycleDefinitionForm.patchValue({ businessYearDefinitionId: response.data.results[0].businessYearDefinition.businessYearDefinitionId });
        this.cycleDefinitionForm.patchValue({ frequencyMasterId: response.data.results[0].frequency.id });
        // this.cycleDefinitionForm.patchValue( { services: response.data.results[0].serviceName } );
        this.cycleDefinitionForm.patchValue({ addDays: response.data.results[0].addDays });
        this.cycleDefinitionForm.patchValue({ incompleteDaysFalls: response.data.results[0].incompleteDaysFalls });
        const index = this.BusinessyearList.findIndex(o => o.businessYearDefinitionId == response.data.results[0].businessYearDefinition.businessYearDefinitionId);
        this.cycleDefinitionForm.patchValue({
          yearDefinition: this.datePipe.transform(new Date(response.data.results[0].businessYearDefinition.fullFromDate), 'dd-MMM-yyyy') + ' To ' + this.datePipe.transform(new Date(response.data.results[0].businessYearDefinition.fullToDate), 'dd-MMM-yyyy'),
        });

        // this.cycleDefinitionForm.controls.multiselectServices.clearValidators();
        // this.cycleDefinitionForm.controls.multiselectServices.updateValueAndValidity();
        this.cycleDefinitionForm.disable();
      });


    // this.cycleDefinitionForm.patchValue( { businessYearDefinitionId: response.data.results[0].businessYearDefinition.businessYearDefinitionId } );

  }

  GetCycleDefinitionbyId(id): void {
    window.scrollTo(0, 0);
    // here remove validation



    //this.CycleDefinitionFlag = true;
    this.CycleupdateFlag = true;
    this.CycleupdateFlag1 = true;
    this.cycleDefinitionForm.controls['cycleName'].disable();
    this.cycleDefinitionForm.controls['addDays'].disable();
    this.companySettings.GetCycleDefinitionById(id)
      .subscribe(response => { // : saveBusinessYear[]
        //console.log( 'xx', );

        this.frequencyMasterId = response.data.results[0].frequency.id
        this.cycleName = response.data.results[0].cycleName.split('_')[0]

        this.cycleDefinitionForm.patchValue({ id: response.data.results[0].id });
        this.cycleDefinitionForm.patchValue({ cycleName: response.data.results[0].cycleName.split('_')[0] });
        this.cycleDefinitionForm.patchValue({ businessYearDefinitionId: response.data.results[0].businessYearDefinition.businessYearDefinitionId });
        this.cycleDefinitionForm.patchValue({ frequencyMasterId: response.data.results[0].frequency.id });
        this.cycleDefinitionForm.patchValue({ incompleteDaysFalls: response.data.results[0].incompleteDaysFalls });
        this.cycleDefinitionForm.patchValue({ addDays: response.data.results[0].addDays });
        this.cycleDefinitionForm.patchValue({
          //yearDefinition: response.data.results[0].businessYearDefinition.fullFromDate + ' To ' + response.data.results[0].businessYearDefinition.fullToDate,

          yearDefinition: this.datePipe.transform(new Date(response.data.results[0].businessYearDefinition.fullFromDate), 'dd-MMM-yyyy') + ' To ' + this.datePipe.transform(new Date(response.data.results[0].businessYearDefinition.fullToDate), 'dd-MMM-yyyy'),
        });
        // this.cycleDefinitionForm.controls.multiselectServices.clearValidators();
        // this.cycleDefinitionForm.controls.multiselectServices.updateValueAndValidity();

      });
  }
  resetCycledefinition(): void {
    console.log(this.cycleDefinitionForm);

    //  this.cycleDefinitionForm.reset();
    // this.cycleDefinitionForm.patchValue({ serviceName: [null] });
    // this.ServicesList=[];
  }



  // onItemSelect( item: any ) {
  //   console.log( item );

  //   this.Multiselectflag = true;

  //   this.ServicesList.push( item.serviceName );
  //   console.log( item );
  // }
  // onItemDeSelect( item: any ) {
  //   let index = this.ServicesList.indexOf( item.serviceName );
  //   if ( index != -1 ) {
  //     this.ServicesList.splice( index, 1 );
  //   }
  // }


  // onSelectAll( item: any ) {
  //   this.ServicesList = [];

  //   // this.serviceNameDropDownList.forEach( function ( f ) {
  //   //   console.log( 'f', f );
  //   //   //  this.ServiceList.push( f );
  //   // } );

  //   item.forEach( element => {
  //     this.ServicesList.push( element.serviceName );
  //   } );

  //   console.log( item );
  // }

  DeleteCycleDefinitionById(id): void {
    console.log('deleted id is', id);
    this.CycleupdateFlag = false;
    this.CycleupdateFlag1 = false;
    this.companySettings.DeleteCycleDefinitionById(id)
      .subscribe(response => { // : saveBusinessYear[]
        this.alertService.sweetalertMasterSuccess(response.status.message, '');
        this.getAllCycleDefinition();
      });
  }
  keyPressedSpaceNotAllow(event: any) {
    const pattern = /[ '_',  ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  onChangeBusinessYear(evt: any) {
    console.log(evt);
    if (evt == '') {
      this.cycleDefinitionForm.patchValue({
        yearDefinition: ''
      });
    } else {
      const index = this.BusinessyearList.findIndex(o => o.businessYearDefinitionId == evt);
      this.cycleDefinitionForm.patchValue({
        yearDefinition: this.datePipe.transform(new Date(this.BusinessyearList[index].fullFromDate), 'dd-MMM-yyyy') + ' To ' + this.datePipe.transform(new Date(this.BusinessyearList[index].fullToDate), 'dd-MMM-yyyy'),

      });
    }

  }
  UploadModal1(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }
  getCycleName(name): void {
    // this.CycleName = name;
  }

  exportAsXLSX(): void {
    this.excelData = [];
    this.header = []
    this.header = ["S.No.","Cycle Name","Cycle spanning two months-Treat as part of which month", "Description", "From Date", "To Date"]
    //this.excelData = this.attendanceData
    
    this.CycleDefinitionList.forEach((element,index) => {


      let obj = {
        "S.No.":index+1,
        "Cycle Name": element.cycleName,
        "Cycle spanning two months-Treat as part of which month":element.incompleteDaysFalls,
        "Description": element.description,
        "From Date": this.datePipe.transform(new Date(element.businessYearDefinition.fullFromDate), 'dd-MMM-yyyy'),
        "To Date": this.datePipe.transform(new Date(element.businessYearDefinition.fullToDate), 'dd-MMM-yyyy')



      }
      this.excelData.push(obj)
    });
    // console.log(this.excelData)
    this.excelservice.exportAsExcelFile(this.excelData, 'Business Cycle Defination', 'Business Cycle Defination', this.header);
  }
}
