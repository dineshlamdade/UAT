
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import { DatePipe, DOCUMENT } from '@angular/common';
import { CompanySettingsService } from '../../company-settings.service';
import { SaveBusinessYear } from '../../model/business-cycle-model';
import { AlertServiceService } from '../../../../core/services/alert-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component( {
  selector: 'app-business-year',
  templateUrl: './business-year.component.html',
  styleUrls: ['./business-year.component.scss']
} )
export class BusinessYearComponent implements OnInit {
  users1 = [
    { srno: '1', headtype: 'Earning', headcode: 'AAA', headdesc: 'AAA Desc', openingval: '0.00', chngamount: '0.00', chngper: '2', closingamt: '0.00', unitofmeasure: 'PM', remark: 'Remark1' },
    { srno: '2', headtype: 'Earning', headcode: 'AAA', headdesc: 'AAA Desc', openingval: '0.00', chngamount: '0.00', chngper: '2', closingamt: '0.00', unitofmeasure: 'MM', remark: 'Remark1' },
    { srno: '3', headtype: 'Earning', headcode: 'AAA', headdesc: 'AAA Desc', openingval: '0.00', chngamount: '0.00', chngper: '2', closingamt: '0.00', unitofmeasure: 'PM', remark: 'Remark1' },
    { srno: '4', headtype: 'Earning', headcode: 'AAA', headdesc: 'AAA Desc', openingval: '0.00', chngamount: '0.00', chngper: '2', closingamt: '0.00', unitofmeasure: 'PA', remark: 'Remark1' },
  ];
  modalRef: BsModalRef;

  BusinessYearform: FormGroup;
  editedRecordIndexId: number = 0;

  BusinessYear = [
    { label: '2010', value: '2010' },
    { label: '2011', value: '2011' },
    { label: '2012', value: '2012' },
    { label: '2013', value: '2013' },
    { label: '2014', value: '2014' },

    { label: '2015', value: '2015' },
    { label: '2016', value: '2016' },
    { label: '2017', value: '2017' },
    { label: '2018', value: '2018' },
    { label: '2019', value: '2019' },

    { label: '2020', value: '2020' },
    { label: '2021', value: '2021' },
    { label: '2022', value: '2022' },
    { label: '2023', value: '2023' },
    { label: '2024', value: '2024' },

    { label: '2025', value: '2025' },
    { label: '2026', value: '2026' },
    { label: '2027', value: '2027' },
    { label: '2028', value: '2028' },
    { label: '2029', value: '2029' },
    { label: '2030', value: '2030' },

  ];

  updateFlag: boolean;
  BusinessyearList = [];

  constructor( private datepipe: DatePipe, private companySetttingService: CompanySettingsService, private formBuilder: FormBuilder, private alertService: AlertServiceService, private modalService: BsModalService ) {

  }

  ngOnInit(): void {
    this.BusinessYearform = this.formBuilder.group( {
      id: new FormControl( null ),
      description: new FormControl( '', Validators.required ),
      fromDate: new FormControl( '', Validators.required ),
      toDate: new FormControl( '', Validators.required ),
      businessYear: new FormControl( '', Validators.required ),
    } );
    this.getAllBusinessyear();
  }
  //add & update new BusinessYear
  addBusinessYear(): void {

    let addBusinessYear: SaveBusinessYear = Object.assign( {}, this.BusinessYearform.value );
    if ( this.editedRecordIndexId == 0 ) {
      delete addBusinessYear.id;
      addBusinessYear.fromDate = this.datepipe.transform( addBusinessYear.fromDate, 'dd-MMM' );
      addBusinessYear.toDate = this.datepipe.transform( addBusinessYear.toDate, 'dd-MMM' );
      console.log( JSON.stringify( addBusinessYear ) );
      this.companySetttingService.AddBusinessYear( addBusinessYear ).subscribe( ( res: any ) => {
        if ( res.status.code == "503" ) {
          this.alertService.sweetalertError( res.status.message );
        } else {
          this.alertService.sweetalertMasterSuccess( res.status.message, '' );

        }



        this.getAllBusinessyear();
        this.BusinessYearform.reset();
      },
        ( error: any ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );
    }
    else {
      addBusinessYear.fromDate = this.datepipe.transform( addBusinessYear.fromDate, "dd-MMM" );
      addBusinessYear.toDate = this.datepipe.transform( addBusinessYear.toDate, "dd-MMM" );
      addBusinessYear.description = this.BusinessYearform.get( 'description' ).value;
      addBusinessYear.businessYearDefinitionId = this.editedRecordIndexId;
      console.log( 'desc', this.BusinessYearform.get( 'description' ).value );
      console.log( JSON.stringify( addBusinessYear ) );
      this.companySetttingService.UpdateBusinessYear( addBusinessYear ).subscribe( ( res: any ) => {

        this.alertService.sweetalertMasterSuccess( res.status.message, '' );
        this.getAllBusinessyear();
        this.BusinessYearform.reset();
        this.updateFlag = false;
        this.editedRecordIndexId = 0;
      },
        ( error: any ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );
    }
  }

  //get all Businessyear
  getAllBusinessyear(): void {
    this.BusinessyearList = [];
    this.companySetttingService.getAllBusinessYear().subscribe( res => {
      this.BusinessyearList = res.data.results;
      console.log( 'Business year list', this.BusinessyearList );
    },
      ( error: any ) => {
        this.alertService.sweetalertError( error["error"]["status"]["message"] );
      } );
  }

  DeleteBussinessyearById( id ): void {
    console.log( 'delete', id );
    this.updateFlag = false;
    this.companySetttingService.DeleteBusinessYearById( id )
      .subscribe( response => { //: saveBusinessYear[]
        this.alertService.sweetalertMasterSuccess( response.status.message, '' );
        this.getAllBusinessyear();
        this.BusinessYearform.reset();
      },
        ( error: any ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );
  }

  ResetBusiness(): void {
    this.editedRecordIndexId = 0;
    this.BusinessYearform.reset();
    this.BusinessYearform.enable();
    this.updateFlag = false;

    this.BusinessYearform.get( 'description' ).enable();
    this.BusinessYearform.get( 'businessYear' ).setValue( '' );
  }
  // http://localhost:8086/hrms/v1/business-year/27
  GetBussinessyearById( id: number ): void {
    console.log( 'gettt' );
    this.editedRecordIndexId = id;
    console.log( id, this.BusinessyearList );
    this.updateFlag = true;

    this.companySetttingService.GetBusinessYearById( id )
      .subscribe( response => { //: saveBusinessYear[]
        console.log( response );
        this.BusinessYearform.patchValue( { id: response.data.results[0].businessYearDefinitionId } );
        this.BusinessYearform.patchValue( { description: response.data.results[0].description } );
        this.BusinessYearform.patchValue( { fromDate: response.data.results[0].fromDate } );
        this.BusinessYearform.patchValue( { toDate: response.data.results[0].toDate } );
        this.BusinessYearform.patchValue( { businessYear: response.data.results[0].businessYear } );

      },
        ( error: any ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );
    this.BusinessYearform.get( 'description' ).disable();
  }
  UploadModal1( template: TemplateRef<any> ) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign( {}, { class: 'gray modal-md' } )
    );
  }
}
