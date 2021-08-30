import { Component, OnInit } from '@angular/core';
import { TemplateRef} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { ToastrService } from 'ngx-toastr';
import { DemoService } from '../demo/demo.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  
  queryGenerationForm: FormGroup;
  perticularEmpDetails: any;
  public headTemplateList5 = [];
  // employeeMasterIdData: any;
  // loanTypeData: any;
// row:any;
  // For Bank BtncompanyMasterform
  // bankData: any;
  // isNameSelected: boolean;
  // selectInput(event) {
  //   let selected = event.target.value;
  //   if (selected == "Bank Transfer") {
  //     this.isNameSelected = true;
  //   } else {
  //     this.isNameSelected = false;
  //   }
  // }

  // favoriteName:string;
  // index: number = 0;
  // public addDisburseForm: any = FormGroup;
  // masterGridDataList: Array<any> = [];
  // bankData: number = 0;
  // For Bank Btn
  // public bankMasterDetailsResponse: any;
  // public companyBankMasterId: number;
  // public ifscCodeList = [];
  // public companyGroupId: number = 0;

  // public generalForm: FormGroup;
  
  constructor(public formBuilder : FormBuilder ,public demoService :DemoService ,public toster : ToastrService,
    private router: Router,public sanitizer: DomSanitizer,private datePipe: DatePipe,private modalService: BsModalService) {
      // this.queryGenerationForm = this.formBuilder.group(
      //   {
      //       "queryGenerationEmpId":new FormControl(0),
      //       "queryNumber":new FormControl(0),
      //       "employeeMasterId":new FormControl(0),
      //       "onBehalfOfEmployee":new FormControl(true),
      //       "applicationModuleId":new FormControl(null,[Validators.required]),
      //       "queryTypeMasterId":new FormControl(0),
      //       "subQueTypeMasterId":new FormControl(0),
      //       "queAnsMasterId":new FormControl(0),
      //       "priority":new FormControl(null),
      //       "queryDescription":new FormControl(''),
      //       "subject":new FormControl(''),
      //       "queryRootCause":new FormControl(null),
      //       "status":new FormControl(''),
      //   })

      // this.addDisburseForm = this.formBuilder.group( {
      //   typeOfEstablishment: new FormControl( '', Validators.required ),
        
      // })
     }

  ngOnInit(): void {
    this.getEmpMasterDetails();
    // this.getBankDetailsPopUp();
    // this.getAllLoanType();

    // this.demoService.getTypeOfEstablishment().subscribe( res => {
    //   res.data.results.forEach( element => {
    //     const obj = {
    //       label: element.dropdownValue,
    //       value: element.dropdownName,
    //     };
    //     this.typeOfEstablishmentList.push( obj );
    //   } );
    
    // } );

    // this.generalForm = this.formBuilder.group({
    //   claimApprWorkflowId: new FormControl({ value: '', disabled: false })
    // });

    this.queryGenerationForm = this.formBuilder.group({
      regApprWorkflowId: new FormControl({ value: '', disabled: false }),
      claimApprWorkflowId: new FormControl({ value: '', disabled: false }),
    })
    this.getAllWorkflowMasters();
  }
  public modalRef: BsModalRef;

  extralargepopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }
  largepopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  mediumpopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  // getBankDetailsPopUp(){
  //   this.demoService.getBankMasterDetails().subscribe(res =>{
  //     this.bankData = res.data.results[0];
  //   })
  //   this.addDisburseForm.patchValue( this.bankData[0] );
  // }
  // bankDetailsInfo(template: TemplateRef<any>,) {
  //   this.modalRef = this.modalService.show(
  //    template,
  //         Object.assign({}, { class: 'gray modal-lg' })
  //   );
  // }


  getEmpMasterDetails()// temp id is used
{
  this.demoService.getEmpMasterDetails(60).subscribe(
    res =>
    {
      this.perticularEmpDetails = res.data.results[0][0];
    })
}

getAllWorkflowMasters() {
  this.demoService.getAllWorkflowMasters().subscribe(
    res => {
    console.log("getAllWorkflowMasters", res);
    this.headTemplateList5 = res.data.results;
  })
}

// onSelectBanksdetails(event: any, data:any){
//   if(event.checked){

//    this.bankData.push({
//      'ifscCode':this.bankData.bankIFSC,
//      'bankName':this.bankData.bankName,
//      'branchName':this.bankData.branchName,
     
//     })
//     console.log("Row Data is: "+ JSON.stringify(this.bankData.data))
// alert(this.bankData);
//   }
// }

// getAllLoanType()
// {
//   this.loanservice.getAllLoanType().subscribe(res => {
//     this.loanTypeData = res.data.results[0];

//   })
// }

// viewMaster(bankData) {
//   window.scrollTo( 0, 0 );
//   this.index = 0;
  
//   this.addDisburseForm.patchValue( this.masterGridDataList[0] );
//   this.addDisburseForm.disable();
// }

// onSelectBanksdetails(){
//   this.checkedList = [];
//   for (var i = 0; i < this.checklist.length; i++) {
//     if(this.checklist[i].isSelected)
//     this.checkedList.push(this.checklist[i]);
//   }
//   this.checkedList = JSON.stringify(this.checkedList);
// }

// getProoduct(isSelected, product){
//   console.log(isSelected, product)
// }


// onSelectCompanyGroup( evt: any ) {
//   console.log( evt );
//   this.companyGroupId = evt;
// }

}
// function viewMaster(bankData: any) {
//   throw new Error('Function not implemented.');
// }



