
import { CompanySettingsService } from './../company-settings.service';
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { AlertServiceService } from '../../../core/services/alert-service.service';

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

@Component( {
  selector: 'app-attribute-creation',
  templateUrl: './attribute-creation.component.html',
  styleUrls: ['./attribute-creation.component.scss'],
  encapsulation: ViewEncapsulation.None
} )
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
    private attributeCreationService: CompanySettingsService,
    private alertService: AlertServiceService,
    @Inject( DOCUMENT ) private document: Document ) {
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

    this.AttributeCreationForm = this.formBuilder.group( {
      id: new FormControl( null, ),
      code: new FormControl( '', Validators.required ),
      description: new FormControl( '', Validators.required ),
      attributeNature: new FormControl( '', Validators.required ),
      optionList: new FormControl( '', Validators.required ),
      // optionList: this.formBuilder.array([]),
      // type: new FormControl('', ),
      // isStatutory: new FormControl('0'),
    } );

    this.getAllAttributeCreation();
  }



  // get All AttributeCreation
  getAllAttributeCreation(): void {
    this.attributeCreationService.getAllAttributeCreation().subscribe( res => {

      this.AttributeCreationList = res.data.results;
    } );
  }

  // Get Attribute Creation ById
  GetAttributeCreationByIdDisable( id ): void {

    // this.CycleupdateFlag=true;
    // this.CycleupdateFlag1=false;
    this.disabled = false;
    this.viewCancelButton = true;
    this.attributeCreationService.GetAttributeCreationById( id )
      .subscribe( response => {

        //  this.HeadCreationForm.patchValue({ id: response.data.results[0].globalHeadMasterId });
        this.AttributeCreationForm.patchValue( { code: response.data.results[0].code } );
        this.AttributeCreationForm.patchValue( { description: response.data.results[0].description } );
        this.AttributeCreationForm.patchValue( { attributeNature: response.data.results[0].attributeNature } );
        if ( response.data.results[0].attributeNature == "L" ) {
          this.hidevalue = true;
        }
        else {
          this.hidevalue = false;
        }
        this.summons = [];
        if ( response.data.results[0].optionList.length > 0 ) {
          response.data.results[0].optionList.forEach( element => {
            // const obj = {
            //     label: element,
            //     value: element,
            // };

            this.summons.push( element.optionValue );
            // const control = <FormArray>this.AttributeCreationForm.controls['optionList'];
            // control.push(element.optionValue)
            //this.transactionInstitutionNames.push(obj);
            //  this.AttributeCreationForm.patchValue({ optionList: this.summons});
          } );

          this.AttributeCreationForm.patchValue( { optionList: this.summons } );
        }
      } );

    this.summons = [];
  }


  onChangeEvent( event: any ): void {

    this.summons.push( event );
    //this.summons
    // this.newlist.push(this.summons.values)
    // if ((this.id == undefined || this.id == '00000000-0000-0000-0000-000000000000')) {
    //  this.HeadCreationForm.patchValue({ shortName:this.Name });
    // this.EventDetails.controls["RegistrationClosedDate"].setValue["EventStartDate"];
    // this.notificationForm.patchValue({ scheduleTime: this.CurrentTime });
    // }

  }

  onStatusChange( event ): void {

    this.selectedNature = event.target.value;
    if ( this.selectedNature == 'L' ) {
      this.hidevalue = true;
      this.AttributeCreationForm.controls['optionList'].setValidators( [Validators.required] );
    }
    else {
      this.summons = [];
      this.hidevalue = false;
      this.AttributeCreationForm.patchValue( { addDays: null } );
      this.AttributeCreationForm.get( 'optionList' ).clearValidators();
      this.AttributeCreationForm.get( 'optionList' ).updateValueAndValidity();
    }
  }
  addOptionList(): void {
    this.AttributeCreationForm.patchValue( { optionList: '' } );
  }

  //add new AttributeCreation
  addAttributeCreation(): void {

    const addAttributeCreation: SaveAttributeCreation = Object.assign( {} );
    //addAttributeCreation.options=this.summons;
    addAttributeCreation.options = [];
    this.summons.forEach( function ( f ) {
      addAttributeCreation.options.push( f );
    } );
    addAttributeCreation.numberOfOption = this.summons.length.toString();
    addAttributeCreation.code = this.AttributeCreationForm.value.code;
    addAttributeCreation.description = this.AttributeCreationForm.value.description;
    addAttributeCreation.attributeNature = this.AttributeCreationForm.value.attributeNature;
    //     code;string;
    // description:string;
    // attributeNature:string;
    if ( addAttributeCreation.globalAttributeMasterId == undefined || addAttributeCreation.globalAttributeMasterId == 0 ) {

      this.attributeCreationService.AddAttributeCreation( addAttributeCreation ).subscribe( ( res: any ) => {

        addAttributeCreation.options = [];
        this.summons = [];
        this.alertService.sweetalertMasterSuccess( res.status.message, '' );
        this.getAllAttributeCreation();
        this.hidevalue = false;
        this.AttributeCreationForm.reset();
        //  this.AttributeCreationForm.patchValue({ isStatutory:'0' });
      },
        ( error: any ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
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
    this.AttributeCreationForm.patchValue( { isStatutory: '0' } );
  }

}
