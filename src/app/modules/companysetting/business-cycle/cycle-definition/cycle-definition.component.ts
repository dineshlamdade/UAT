
import { Component, OnInit, ViewChild, TemplateRef, Inject, HostListener, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { DatePipe, DOCUMENT } from '@angular/common';
//import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { HttpClient } from '@angular/common/http';
//import { AlertServiceService } from './src/app/core/services/alert-service.service';


import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { CompanySettingsService } from '../../company-settings.service';
import { saveBusinessYear, saveCycleDefinition } from '../../model/business-cycle-model';
import { AlertServiceService } from '../../../../core/services/alert-service.service';

@Component( {
  selector: 'app-cycle-definition',
  templateUrl: './cycle-definition.component.html',
  styleUrls: ['./cycle-definition.component.scss']
} )
export class CycleDefinitionComponent implements OnInit {
  CycleupdateFlag: boolean = false;
  isViewAddDays: boolean = false;
  CycleupdateFlag1: boolean = false;
  cycleDefinitionForm: FormGroup;
  ServicesList = [];
  CycleDefinitionList = [];
  serviceName = [];
  activeFrequencyList: Array<any> = [];
  disabled: boolean = true;
  BusinessyearList: Array<any> = [];
  dropdownSettings = {};
  @ViewChild( 'multiSelect' ) multiSelect;
  serviceNameDropDownList = [];
  Multiselectflag: boolean = false;
  updateFlag: boolean = false;

  constructor( private datepipe: DatePipe, private companySetttingService: CompanySettingsService, private formBuilder: FormBuilder, private alertService: AlertServiceService ) { }

  ngOnInit(): void {

    this.cycleDefinitionForm = this.formBuilder.group( {
      id: new FormControl( null, ),
      cycleName: new FormControl( '', Validators.required ),//['', [Validators.required, Validators.maxLength(10)]],
      businessYearDefinitionId: new FormControl( '', Validators.required ),
      frequencyMasterId: new FormControl( '', Validators.required ),
      addDays: new FormControl( '' ),
      // serviceName: new FormControl( '', Validators.required ),
      services: new FormControl( '' ),
      // serviceName:this.formBuilder.array([])s

      //serviceName:[this.ServicesList,[Validators.required]],
      //serviceName:this.ServicesList ,

      // serviceName: this.ServicesList.length == 0 ? [Validators.required] : [null],
      // serviceName: new FormControl(this.ServicesList.length>0, Validators.required),
      //serviceName:(this.ServicesList,Validators.required),
      //serviceName: new FormControl([this.serviceNameDropDownList[0],this.serviceNameDropDownList[2]], Validators.required)
    } );
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'serviceMasterId',
      textField: 'serviceName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };

    this.companySetttingService.getAllServicesName().subscribe( res => {
      this.serviceNameDropDownList = [];

      this.serviceNameDropDownList = res.data.results;
      console.log( 'dropdown list multiselec is', this.serviceNameDropDownList );
    } );


    //get all Businessyear

    this.companySetttingService.getAllBusinessYear().subscribe( res => {

      this.BusinessyearList = res.data.results;
    } );



    this.getAllCycleDefinition();
    this.getActiveFrequency();
  }


  //get all  activeFrequencyList
  getActiveFrequency(): void {
    this.companySetttingService.getActiveFrequency().subscribe( res => {

      this.activeFrequencyList = res.data.results;
    } );
  }



  //add new cycle-definition & update
  addCycleDefinition(): void {
    console.log( 'in addCycleDefinition' );




    let addCycleDefinition: saveCycleDefinition = Object.assign( {}, this.cycleDefinitionForm.value );


    // delete addCycleDefinition.addDays;




    if ( addCycleDefinition.id == undefined || addCycleDefinition.id == 0 || addCycleDefinition.id == null ) {
      // const employerContributionMethod = this.cycleDefinitionForm;
      // console.log( 'employerContributionMethod', employerContributionMethod );
      addCycleDefinition.serviceName = [];
      this.ServicesList.forEach( function ( f ) {
        addCycleDefinition.serviceName.push( f );
      } );
      console.log( JSON.stringify( addCycleDefinition ) );
      this.companySetttingService.AddCycleDefinition( addCycleDefinition ).subscribe( ( res: any ) => {


        this.alertService.sweetalertMasterSuccess( res.status.message, '' );
        this.getAllCycleDefinition();
        this.CancelBusiness();
        this.resetCycledefinition();
      },
        ( error: any ) => {
          //  this.sweetalertError(error["error"]["status"]["message"]);
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );
      this.ServicesList = [];
      this.serviceName = [];
      this.cycleDefinitionForm.reset();
    }
    else {
      addCycleDefinition.businessCycleDefinitionId = addCycleDefinition.id;

      this.serviceName = [];
      //  this.serviceName.push(addCycleDefinition.services)
      addCycleDefinition.serviceName = this.serviceName;
      delete addCycleDefinition.serviceName;
      addCycleDefinition.serviceName = this.cycleDefinitionForm.get( 'services' ).value;
      this.serviceName.push( this.cycleDefinitionForm.get( 'services' ).value );
      // this.serviceName.push( this.cycleDefinitionForm.get( 'services' ).value );
      addCycleDefinition.serviceName = this.serviceName;
      console.log( 'json', JSON.stringify( addCycleDefinition ) );
      this.companySetttingService.UpdateCycleDefinition( addCycleDefinition ).subscribe( ( res: any ) => {

        this.alertService.sweetalertMasterSuccess( res.status.message, '' );
        this.getAllCycleDefinition();
        this.cycleDefinitionForm.reset();
        this.CycleupdateFlag = false;
        this.CycleupdateFlag1 = false;

      },
        ( error: any ) => {

          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );
    }
  }
  onChangeFrequencyFromCycleDefinition( event ) {
    console.log( event );
    // console.log(this.selectedFrequency);
    let findIndex = this.activeFrequencyList.findIndex( o => o.id == event );
    console.log( 's', findIndex );


    if ( this.activeFrequencyList[findIndex].name == 'Adhoc' ) {
      console.log( 'i' );
      this.isViewAddDays = true;
      // this.cycleDefinitionForm.controls['addDays'].setValidators([Validators.required]);
    }
    else {
      console.log( 'i3' );
      this.isViewAddDays = false;
      //
      //this.cycleDefinitionForm.patchValue:[{' addDays': null, disabled: true }],
      //     const control = new FormControl('Nancy');

      this.cycleDefinitionForm.patchValue( { addDays: null } );

      this.cycleDefinitionForm.get( 'addDays' ).clearValidators();
      this.cycleDefinitionForm.get( 'addDays' ).updateValueAndValidity();
    }
  }
  getAllCycleDefinition(): void {
    this.CycleDefinitionList = [];
    this.companySetttingService.getAllCycleDefinition().subscribe( res => {

      this.CycleDefinitionList = res.data.results;

      console.log( 'cycle creation res', this.CycleDefinitionList )

    } );
  }
  CancelBusiness(): void {
    this.disabled = true;
    this.cycleDefinitionForm.reset();
    this.updateFlag = false;
    this.CycleupdateFlag = false;
    this.CycleupdateFlag1 = false;
    this.isViewAddDays = false;
  }

  GetCycleDefinitionbyIdDisable( id ): void {
    this.CycleupdateFlag = true;
    this.CycleupdateFlag1 = false;
    this.disabled = false;
    this.companySetttingService.GetCycleDefinitionById( id )
      .subscribe( response => {
        let index = this.BusinessyearList.findIndex( o => o.businessYearDefinitionId == response.data.results[0].businessYearDefinition.businessYearDefinitionId )
        console.log( this.BusinessyearList[index] );

        this.cycleDefinitionForm.patchValue( { id: response.data.results[0].id } );
        this.cycleDefinitionForm.patchValue( { cycleName: response.data.results[0].cycleName } );
        this.cycleDefinitionForm.patchValue( { businessYearDefinitionId: response.data.results[0].businessYearDefinition.businessYearDefinitionId } );
        this.cycleDefinitionForm.patchValue( { frequencyMasterId: response.data.results[0].frequency.id } );
        this.cycleDefinitionForm.patchValue( { services: response.data.results[0].serviceName } );
        this.cycleDefinitionForm.patchValue( { addDays: response.data.results[0].addDays } );
      } );

    // this.cycleDefinitionForm.patchValue( { businessYearDefinitionId: response.data.results[0].businessYearDefinition.businessYearDefinitionId } );

  }

  GetCycleDefinitionbyId( id ): void {

    // here remove validation




    this.CycleupdateFlag = true;
    this.CycleupdateFlag1 = true;
    this.companySetttingService.GetCycleDefinitionById( id )
      .subscribe( response => { //: saveBusinessYear[]

        this.cycleDefinitionForm.patchValue( { id: response.data.results[0].id } );
        this.cycleDefinitionForm.patchValue( { cycleName: response.data.results[0].cycleName } );
        this.cycleDefinitionForm.patchValue( { businessYearDefinitionId: response.data.results[0].businessYearDefinition.businessYearDefinitionId } );
        this.cycleDefinitionForm.patchValue( { frequencyMasterId: response.data.results[0].frequency.id } );
        this.cycleDefinitionForm.patchValue( { services: response.data.results[0].serviceName } );
        this.cycleDefinitionForm.patchValue( { addDays: response.data.results[0].addDays } );

      } );
  }
  resetCycledefinition(): void {
    console.log( this.cycleDefinitionForm );

    //  this.cycleDefinitionForm.reset();
    // this.cycleDefinitionForm.patchValue({ serviceName: [null] });
    // this.ServicesList=[];
  }



  onItemSelect( item: any ) {
    console.log( item );

    this.Multiselectflag = true;

    this.ServicesList.push( item.serviceName );
    console.log( item );
  }
  onItemDeSelect( item: any ) {

    // this.cycleDefinitionForm.controls.serviceName.push(item.serviceName)
    // this.ServicesList = [];
    var index = this.ServicesList.indexOf( item.serviceName )
    if ( index != -1 ) {
      this.ServicesList.splice( index, 1 )
    }
  }


  onSelectAll( item: any ) {
    this.ServicesList = [];

    this.serviceNameDropDownList.forEach( function ( f ) {
      console.log( 'f', f );
      //  this.ServiceList.push( f );
    } );

    item.forEach( element => {
      this.ServicesList.push( element.serviceName )
    } );
    //this.ServicesList.push(items.serviceName)

    console.log( item );
  }

  DeleteCycleDefinitionById( id ): void {
    console.log( 'deleted id is', id );
    this.CycleupdateFlag = false;
    this.CycleupdateFlag1 = false;
    this.companySetttingService.DeleteCycleDefinitionById( id )
      .subscribe( response => { //: saveBusinessYear[]

        this.getAllCycleDefinition();
        //  this.BusinessYearform.reset();
      } );
  }
  keyPressedSpaceNotAllow( event: any ) {
    const pattern = /[ ]/;
    let inputChar = String.fromCharCode( event.charCode );
    if ( pattern.test( inputChar ) ) {
      event.preventDefault();
    }
  }



}
