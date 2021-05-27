import { Component, OnInit } from '@angular/core';
import { TemplateRef} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { ToastrService } from 'ngx-toastr';
import { QueryService } from '../query.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-qury-generation',
  templateUrl: './admin-qury-generation.component.html',
  styleUrls: ['./admin-qury-generation.component.scss']
})
export class AdminQuryGenerationComponent implements OnInit {
  queryGenerationForm: FormGroup;
  moduleListData :any;
  getAllQueryGenerationData: any;
  querySubQueryTypeQAData: any;
  subQueryType: any;
  isSave:boolean = true;
  isReset:boolean = true;
  isUpdate:boolean = false;
  editflag: boolean = false;
  getByIdData: any;
  addQueryGenerationData: any;
  updateQueryGenerationData: any;
  queryGenerationEmpId:number = 0;

  documentIndex: any;
  selectedDoc: any;
  public modalRef: BsModalRef;
  public masterfilesArray: File[] = [];
  public urlArray: Array<any> = [];
  public urlIndex: number;
  public urlSafe: SafeResourceUrl;
  documentList: any = [];

  perticularEmpDetails: any;
  employeeMasterIdData: any;
  subQueryData: any;
  priorityData: any;
  listQAData: any = [];
  selectedModuleId: any;
  queryTemplateData: any;
  selectedModule: any;
  queryNumberData: any;
  listDoc: Array<any> = [];
  editQuerySummaery: any;
  employeeMasterId: any;
  addQuerywithDocsData: any;
  queryTempData: any;
  listSubQA: any;
  listSubQueryTypeData: any = [];
  viewFlag :boolean = false;

  constructor(public formBuilder : FormBuilder ,public queryService :QueryService ,public toster : ToastrService,
    private router: Router,public sanitizer: DomSanitizer,
    private modalService: BsModalService,) {
    this.queryGenerationForm = this.formBuilder.group(
    {
        "queryGenerationEmpId":new FormControl(0),
        "queryNumber":new FormControl(0),
        "employeeMasterId":new FormControl(1),//temp
        "onBehalfOfEmployee":new FormControl(false),
        "applicationModuleId":new FormControl(null,[Validators.required]),
        "queryTypeMasterId":new FormControl(null,[Validators.required]),
        "subQueTypeMasterId":new FormControl(0),
        "queAnsMasterId":new FormControl(null,[Validators.required]),
        "priority":new FormControl(null),
        "queryDescription":new FormControl(''),
        "subject":new FormControl(''),
        "queryRootCause":new FormControl(null),
        "status":new FormControl('save'),
    })
   }

  ngOnInit(): void {
    this.getModuleName();
    this.getAllQueryListSummary();
  }

  queryGenerationFormSubmit(value)
  {
    if(value == 'save'){
     this.queryGenerationForm.controls['status'].setValue('Save');
    }else{
    this.queryGenerationForm.controls['status'].setValue('Draft');
    }

    if(!this.editflag){
      this.addQueryGeneration();
    }else{
      this.updateQueryGeneration();
    }

  if (this.queryGenerationForm.invalid) {
    return;
  }
  this.reset();
  }
// .........................................api calling..................................................
  getModuleName()
{
  this.queryService.getModuleName().subscribe(res => {
    this.moduleListData = res.data.results;
  })
}
getAllQueryListSummary() //summary table
{
this.queryService.getAllQueryList().subscribe(res =>
  {
    this.getAllQueryGenerationData = res.data.results;
    this.getAllQueryGenerationData.forEach(element => {
    this.employeeMasterIdData = element.employeeMasterId;
    this.queryNumberData = element.queryNumber;
    this.employeeMasterId = element.employeeMasterId;
    });
    this.getEmpMasterDetails(this.employeeMasterIdData);

  })
}

getById(queryGenerationEmpId){ //used for the edit
  this.queryService.getById(queryGenerationEmpId).subscribe(res =>
    {
      this.getByIdData = res.data.results[0];
      // this.getByIdData.forEach(element => {
        this.listDoc =  this.getByIdData.listDoc;

      // });
  this.queryGenerationForm.controls['queryTypeMasterId'].setValue(this.getByIdData.queryTypeMasterId);
  this.queryGenerationForm.controls['queAnsMasterId'].setValue(this.getByIdData.queAnsMasterId);
  console.log("*******",this.getByIdData.queAnsMasterId);
  this.queryGenerationForm.controls['priority'].setValue(this.getByIdData.priority);
  this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(this.getByIdData.subQueTypeMasterId);
    })
}
querySubQueryTypeQA(applicationModuleId)  //for all dropdown
{
  // alert(applicationModuleId)
  this.queryService.querySubQueryTypeQA(applicationModuleId).subscribe(res =>
    {
      this.querySubQueryTypeQAData = res.data.results;
      // this.listSubQueryTypeData = res.data.results;
      this.querySubQueryTypeQAData.forEach(element => {
        if(element.subQuery == false){
        this.listQAData = element.listQA;
        console.log("####",this.listQAData);
        }
        else{
        element.listSubQueryTypeData.forEach(element => {
        this.listQAData = element.listSubQA;
        console.log("*****",this.listQAData);

      });
        }
      });

      if(this.editflag){
      this.getSubQueryListData(this.getByIdData.queryTypeMasterId);
      }
    })
}
getSubQueryListData(value)
{
  this.querySubQueryTypeQAData.forEach(element => {
    if(element.queryTypeMasterId == parseInt(value) ){
    this.subQueryData = element.listSubQueryTypeData;
    this.priorityData = element.listPriority;
    if(element.subQuery == false){
    this.listQAData = element.listQA; // if subquery is false then
    }else{
    this.listQAData = element.listSubQA; // if subquery is true then
    }
  }
    });
}
moduleChange(value) // when module is changed then template also changed.
{
  this.selectedModuleId = value;
  this.querySubQueryTypeQA( this.selectedModuleId);
}


addQueryGeneration(){ //post api for saving data
  if(this.listDoc.length == 0){
  this.queryGenerationForm.controls['applicationModuleId'].setValue(parseInt(this.queryGenerationForm.controls['applicationModuleId'].value));
  this.queryGenerationForm.controls['queryTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queryTypeMasterId'].value));
  this.queryGenerationForm.controls['queAnsMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queAnsMasterId'].value));
  this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));

  let data = []
  data.push(this.queryGenerationForm.value)
  let queryGenerationEmployeeData  = {
    "queryRequestDTO": data
    }
    const formData  = new FormData();
    formData.append('queryGenerationEmployeeData', JSON.stringify(queryGenerationEmployeeData));
    console.log(JSON.stringify(queryGenerationEmployeeData));
    this.queryService.addQueryGeneration(formData).subscribe(res =>
    {
      this.addQueryGenerationData = res.data.results;
      console.log(JSON.stringify(this.addQueryGenerationData));
      this.getAllQueryListSummary();
      this.toster.success("",'Query Generation Employee Details saved Successfully');
      this.reset();
    })
    }else{
      this.addQuerywithDocs();
    }

}
addQuerywithDocs() //not yet used
{
  this.queryGenerationForm.controls['queAnsMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queAnsMasterId'].value));
  this.queryGenerationForm.controls['applicationModuleId'].setValue(parseInt(this.queryGenerationForm.controls['applicationModuleId'].value));
  this.queryGenerationForm.controls['queryTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queryTypeMasterId'].value));
  this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));

    //  let queryDocs :any ={
    // "listDoc":this.listDoc,
    //  }
    let data = []
    data.push(this.queryGenerationForm.value)
    let queryGenerationEmployeeData  = {
      "queryRequestDTO": data,
      // "listDoc":this.listDoc,
      }
      const formData  = new FormData();
      formData.append('queryGenerationEmployeeData', JSON.stringify(queryGenerationEmployeeData));
      console.log(JSON.stringify(queryGenerationEmployeeData));
      this.queryService.addQueryGeneration(formData).subscribe(res =>
      {
        this.addQueryGenerationData = res.data.results;
        console.log(JSON.stringify(this.addQueryGenerationData));
        this.getAllQueryListSummary();
        this.toster.success("",'Query Generation Employee Details saved Successfully');
        this.reset();
      })
}
updateQueryGeneration() //put api for update data
{
  this.queryGenerationForm.controls['queAnsMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queAnsMasterId'].value));
  this.queryGenerationForm.controls['applicationModuleId'].setValue(parseInt(this.queryGenerationForm.controls['applicationModuleId'].value));
  this.queryGenerationForm.controls['queryTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queryTypeMasterId'].value));
  this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));
  this.queryGenerationForm.controls['queryNumber'].setValue(parseInt(this.queryGenerationForm.controls['queryNumber'].value));
  this.queryGenerationForm.removeControl('queryRootCause');

  let data = []
  data.push(this.queryGenerationForm.value)
  let queryGenerationEmployeeData  = {
    "queryRequestDTO": data
    }
    const formData  = new FormData();
    formData.append('queryGenerationEmployeeData', JSON.stringify(queryGenerationEmployeeData));
    console.log(JSON.stringify(queryGenerationEmployeeData));

    this.queryService.addQueryGeneration(formData).subscribe(res =>
    {
      this.addQueryGenerationData = res.data.results;
      console.log(JSON.stringify(this.addQueryGenerationData));
      this.getAllQueryListSummary();
      this.toster.success("",'Query Generation Employee Details updated Successfully');
      this.editflag =false;
      this.reset();
    })

}
getEmpMasterDetails(employeeMasterIdData)// temp id is used
{
  this.queryService.getEmpMasterDetails(60).subscribe(res =>
    {
      this.perticularEmpDetails = res.data.results[0][0];
    })
}
editQuery(queryGenerationSummary)
{
  this.editflag = true;
  this.queryGenerationForm.enable();
  this.queryGenerationForm.patchValue(queryGenerationSummary);
  this.isUpdate =true;
  this.isSave = false;
  this.isReset =false;
  this.getById(queryGenerationSummary.queryGenerationEmpId);
  this.querySubQueryTypeQA(queryGenerationSummary.applicationModuleId);
  this.queryGenerationEmpId = queryGenerationSummary.queryGenerationEmpId;
  this.editQuerySummaery = queryGenerationSummary;

  this.queryGenerationForm.controls['queryNumber'].disable();
}
viewQuery(queryGenerationSummary)
{
 this.editflag = false;
 this.queryGenerationForm.patchValue(queryGenerationSummary);
 this.queryGenerationForm.disable();
//  this.queryTemplateData.disable();
 this.isUpdate =true;
 this.isSave = false;
 this.viewFlag = true;
 this.editQuerySummaery = queryGenerationSummary;

 this.getById(queryGenerationSummary.queryGenerationEmpId);
 this.queryGenerationEmpId = queryGenerationSummary.queryGenerationEmpId;
}

getDeleteById(queryGenerationEmpId) // delete the record from summary
{
  this.queryService.getDeleteById(queryGenerationEmpId.queryGenerationEmpId).subscribe(res =>
    {
      this.toster.success("",'Query Generation Employee Details Deleted Successfully');
      this.getAllQueryListSummary();
    },error => {
      if(error.error.status.code == '4001'){
        this.toster.error("", 'You can not delete this query because the query status is Closed..!');
      }
    });
}

reset(){
  this.queryGenerationForm.enable();
  this.queryGenerationForm.reset();
  this.queryGenerationForm.controls['queryDescription'].reset();
  this.queryGenerationForm.controls['subject'].reset();
  this.queryTemplateData = [];
  this.querySubQueryTypeQAData = [];
  this.getByIdData = [];
  this.listDoc = []; //reset the upload document
}
cancel()
{
this.reset();
this.queryGenerationForm.controls['queryNumber'].disable();

}
// ........................upload Document..............................................................

  // Previous Doc Viewer
  public previousDocViewer() { //not yet used
    this.urlIndex = this.urlIndex - 1;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.urlArray[this.urlIndex].blobURI
    );
  }

  // Next Doc Viewer
public nextDocViewer() { //not yet used
  this.urlIndex = this.urlIndex + 1;
  this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
    this.urlArray[this.urlIndex].blobURI
  );
}

public UploadModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-md' })
  );
}

// onMasterUpload(event: { target: { files: string | any[] } }) {

//   if (event.target.files.length > 0) {
//     for (const file of event.target.files) {
//       this.listDoc.push(file);
//     }
//   }

// }
public onMasterUpload(
  event: { target: { files: string | any[] } },
  docType: string
) {
  console.log('event::', event);
  console.log('docType::', docType);

  if (event.target.files.length > 0) {
    for (const file of event.target.files) {
          const data = {
            name: file.name,
          };
          this.urlArray.push(data);
          this.listDoc.push(file);
    }
  }
}
// public removeSelectedLicMasterDocument(index: number) {
//   this.listDoc.splice(index, 1);
// }
public removeSelectedLicMasterDocument(index: number, docType: string) {
      this.listDoc.splice(index, 1);
}

public docViewer(template1: TemplateRef<any>, index: any) {
  console.log('---in doc viewer--');
  this.urlIndex = index;

  console.log('listDoc::', this.listDoc);
  this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
    this.listDoc[this.urlIndex].blobURI
  );

  console.log('urlSafe::', this.urlSafe);
  this.modalRef = this.modalService.show(
    template1,
    Object.assign({}, { class: 'gray modal-xl' })
  );
}


}



