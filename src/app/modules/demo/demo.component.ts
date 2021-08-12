import { Component, OnInit } from '@angular/core';
import { TemplateRef} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { ToastrService } from 'ngx-toastr';
import { DemoService } from '../demo/demo.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  queryGenerationForm: FormGroup;
  perticularEmpDetails: any;
  employeeMasterIdData: any;
row:any;
  // For Bank Btn
  bankData: any;
  isNameSelected: boolean;
  selectInput(event) {
    let selected = event.target.value;
    if (selected == "Bank Transfer") {
      this.isNameSelected = true;
    } else {
      this.isNameSelected = false;
    }
  }

  favoriteName:string;
  index: number = 0;
  public addDisburseForm: any = FormGroup;
  masterGridDataList: Array<any> = [];
  // bankData: number = 0;
  // For Bank Btn

  constructor(public formBuilder : FormBuilder ,public demoService :DemoService ,public toster : ToastrService,
    private router: Router,public sanitizer: DomSanitizer,
    private modalService: BsModalService) {
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
     }

  ngOnInit(): void {
    this.getEmpMasterDetails();
    this.getBankDetailsPopUp();
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

  getBankDetailsPopUp(){
    this.demoService.getBankMasterDetails().subscribe(res =>{
      this.bankData = res.data.results[0];
    })
    this.addDisburseForm.patchValue( this.bankData[0] );
  }
  bankDetailsInfo(template: TemplateRef<any>,) {
    this.modalRef = this.modalService.show(
     template,
          Object.assign({}, { class: 'gray modal-lg' })
    );
  }


  getEmpMasterDetails()// temp id is used
{
  this.demoService.getEmpMasterDetails(60).subscribe(
    res =>
    {
      this.perticularEmpDetails = res.data.results[0][0];
    })
}

onSelectBanksdetails(event: any, data:any){
  if(event.checked){

   this.bankData.push({
     'ifscCode':this.bankData.bankIFSC,
     'bankName':this.bankData.bankName,
     'branchName':this.bankData.branchName,
     
    })
    console.log("Row Data is: "+ JSON.stringify(this.bankData.data))
alert(this.bankData);
  }

  
}
viewMaster(bankData) {
  window.scrollTo( 0, 0 );
  this.index = 0;
  
  this.addDisburseForm.patchValue( this.masterGridDataList[0] );
  this.addDisburseForm.disable();
}


// onSelectBanksdetails(){
//   this.checkedList = [];
//   for (var i = 0; i < this.checklist.length; i++) {
//     if(this.checklist[i].isSelected)
//     this.checkedList.push(this.checklist[i]);
//   }
//   this.checkedList = JSON.stringify(this.checkedList);
// }

getProoduct(isSelected, product){
  console.log(isSelected, product)
}
}
function viewMaster(bankData: any) {
  throw new Error('Function not implemented.');
}

