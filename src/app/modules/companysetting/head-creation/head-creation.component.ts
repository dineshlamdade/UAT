import { CompanySettingsService } from './../company-settings.service';
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import Swal from 'sweetalert2';
import { SaveHeadCreation } from '../model/business-cycle-model';




@Component( {
  selector: 'app-head-creation',
  templateUrl: './head-creation.component.html',
  styleUrls: ['./head-creation.component.scss'],
  encapsulation: ViewEncapsulation.None
} )
export class HeadCreationComponent implements OnInit {
  NatureList: Array<any> = [];
  TypeList: Array<any> = [];
  HeadCreationList: Array<any> = [];
  viewCancelButton: boolean = false;
  HeadCreationForm: FormGroup;
  Name: string;
  disabled: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private headCreationService: CompanySettingsService,
    @Inject( DOCUMENT ) private document: Document ) {
    this.NatureList = [
      { label: 'Earning', value: 'Earning' },
      { label: 'Deduction', value: 'Deduction' },
      { label: 'Perquisite', value: 'Perquisite' },
    ];

    this.TypeList = [
      { label: 'House Rental', value: 'House Rental' },
      { label: 'Basic Salary', value: 'Basic Salary' },
      { label: 'Dearness Allowance', value: 'Dearness Allowance' },
      // { label: 'HRA Pune', value: 'HRA Pune' },
    ];

  }

  ngOnInit(): void {

    this.HeadCreationForm = this.formBuilder.group( {
      id: new FormControl( null ),
      standardName: new FormControl( '', Validators.required ),
      description: new FormControl( '', Validators.required ),
      shortName: new FormControl( '', Validators.required ),
      headNature: new FormControl( '', Validators.required ),
      type: new FormControl( '' ),
      isStatutory: new FormControl( 0 ),
    } );

    this.getAllHeadCreation();
  }

  // get All HeadCreation
  getAllHeadCreation(): void {
    this.headCreationService.getAllHeadCreation().subscribe( res => {

      this.HeadCreationList = res.data.results;
    } );
  }

  // get HeadCreation by Id
  GetHeadCreationbyIdDisable( id ): void {
    ;
    // this.CycleupdateFlag=true;
    // this.CycleupdateFlag1=false;
    this.disabled = false;
    this.viewCancelButton = true;
    this.headCreationService.GetHeadCreationById( id )
      .subscribe( response => {

        //  this.HeadCreationForm.patchValue({ id: response.data.results[0].globalHeadMasterId });
        this.HeadCreationForm.patchValue( { standardName: response.data.results[0].standardName } );
        this.HeadCreationForm.patchValue( { description: response.data.results[0].description } );
        this.HeadCreationForm.patchValue( { shortName: response.data.results[0].shortName } );
        this.HeadCreationForm.patchValue( { headNature: response.data.results[0].headNature } );
        if ( response.data.results[0].isStatutory == 1 ) {
          this.HeadCreationForm.patchValue( { isStatutory: '1' } );
        }
        else {
          this.HeadCreationForm.patchValue( { isStatutory: '0' } );
        }
        this.HeadCreationForm.patchValue( { type: response.data.results[0].type } );
      } );

  }

  //add new HeadCreation
  addHeadCreation(): void {

    const addHeadCreation: SaveHeadCreation = Object.assign( {}, this.HeadCreationForm.value );
    if ( addHeadCreation.id == undefined || addHeadCreation.id == 0 ) {

      this.headCreationService.AddHeadCreation( addHeadCreation ).subscribe( ( res: any ) => {


        this.sweetalertMasterSuccess( "Success..!!", res.status.message );
        this.getAllHeadCreation();
        this.HeadCreationForm.reset();
        this.HeadCreationForm.patchValue( { isStatutory: '0' } );
      },
        ( error: any ) => {
          this.sweetalertError( error["error"]["status"]["message"] );
        } );
    }
    // else{
    //
    //   //Update BusinessYear service
    //   addBusinessYear.fromDate = this.datepipe.transform(addBusinessYear.fromDate, "dd-MMM");
    //   addBusinessYear.toDate = this.datepipe.transform(addBusinessYear.toDate, "dd-MMM");
    //   this.payrollService.UpdateBusinessYear(addBusinessYear.id,addBusinessYear).subscribe((res:any )=> {
    //
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
  CancelHeadCreation(): void {
    this.disabled = true;
    this.HeadCreationForm.reset();
    this.viewCancelButton = false;
    this.HeadCreationForm.patchValue( { isStatutory: '0' } );
  }

  ResetHeadCreation(): void {
    this.HeadCreationForm.reset();
    this.viewCancelButton = false;
    this.HeadCreationForm.patchValue( { isStatutory: '0' } );
  }


  onChangeEvent( event: any ): void {
    ;
    this.Name = event.target.value;
    // if ((this.id == undefined || this.id == '00000000-0000-0000-0000-000000000000')) {
    this.HeadCreationForm.patchValue( { shortName: this.Name } );
    // this.EventDetails.controls["RegistrationClosedDate"].setValue["EventStartDate"];
    // this.notificationForm.patchValue({ scheduleTime: this.CurrentTime });
    // }

  }


  sweetalert7( message: any ) {
    Swal.fire( {
      text: message,
    } )
  }

  sweetalertWarning( message: any ) {
    Swal.fire( {
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
    } )
  }

  sweetalertInfo( message: any ) {
    Swal.fire( {
      title: message,
      showCloseButton: true,
      showCancelButton: false,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      icon: 'info',
      timer: 15000,
      timerProgressBar: true,
    } )
  }

  sweetalertMasterSuccess( message: any, text: any ) {
    Swal.fire( {
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
    } )
  }

  sweetalertError( message: any ) {
    Swal.fire( {
      title: message,
      showCloseButton: true,
      showCancelButton: false,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      icon: 'error',
      timer: 15000,
      timerProgressBar: true,
    } )
  }


}
