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
  listQAData: any;
  selectedModuleId: any;
  queryTemplateData: any;
  selectedModule: any;
  queryNumberData: any;
  listDoc: Array<any> = [];
  editQuerySummaery: any;
  employeeMasterId: any;
  addQuerywithDocsData: any;

  constructor(public formBuilder : FormBuilder ,public queryService :QueryService ,public toster : ToastrService,
    private router: Router,public sanitizer: DomSanitizer,
    private modalService: BsModalService,) {
    this.queryGenerationForm = this.formBuilder.group(
    {
        "queryGenerationEmpId":new FormControl(0),
        "queryNumber":new FormControl(0),
        "employeeMasterId":new FormControl(0),
        "onBehalfOfEmployee":new FormControl(false),
        "applicationModuleId":new FormControl(null,[Validators.required]),
        "queryTypeMasterId":new FormControl(0),
        "subQueTypeMasterId":new FormControl(0),
        "queAnsMasterId":new FormControl(0),
        "priority":new FormControl(null),
        "queryDescription":new FormControl(''),
        "subject":new FormControl(''),
        // "queryRootCause":new FormControl(null),
        "status":new FormControl(''),
    })
   }

  ngOnInit(): void {
    this.getModuleName();
    this.getAllQueryListSummary();
    // this.addQuerywithDocs();
  }

  queryGenerationFormSubmit()
  {
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
      this.getByIdData = res.data.results;
      this.getByIdData.forEach(element => {
        this.listDoc = element.listDoc;
      });
    })
}
querySubQueryTypeQA(applicationModuleId)  //for all dropdown
{
  this.queryService.querySubQueryTypeQA(applicationModuleId).subscribe(res =>
    {
      this.querySubQueryTypeQAData = res.data.results;

    })
}
getSubQueryListData(value)
{

  this.querySubQueryTypeQAData.forEach(element => {

    if(element.queryTypeMasterId == parseInt(value) ){
      console.log(JSON.stringify(element));
    this.subQueryData = element.listSubQueryTypeData;
    this.priorityData = element.listPriority;
    this.listQAData = element.listQA;
  }
    });
}
moduleChange(value) // when module is changed then template also changed.
{
  this.selectedModuleId = value;
  this.querySubQueryTypeQA( this.selectedModuleId);
  this.getAll();
}
getAll() // this api call for the assign template dropdown
{
  this.queryTemplateData=[];
   this.queryService.getAll().subscribe( res =>{
    res.data.results.forEach(element => {
      if(element.moduleId == this.selectedModuleId)
      {
        this.queryTemplateData.push(element);
        }
    });
   })
  }

addQueryGeneration(){ //post api for saving data
  this.queryGenerationForm.controls['applicationModuleId'].setValue(parseInt(this.queryGenerationForm.controls['applicationModuleId'].value));
  this.queryGenerationForm.controls['queryTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queryTypeMasterId'].value));
  this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));
  let queryGenerationEmployeeData : any = {
     "queryRequestDTO":[ this.queryGenerationForm.value],
    }

    const formData  = new FormData();
    formData.append('queryGenerationEmployeeData', queryGenerationEmployeeData);

    console.log(JSON.stringify(queryGenerationEmployeeData));

    this.queryService.addQueryGeneration(formData).subscribe(res =>
    {
      this.addQueryGenerationData = res.data.results;
      console.log(JSON.stringify(this.addQueryGenerationData));
      this.getAllQueryListSummary();
      this.toster.success("",'Query Added Successfully');
      this.reset();
    })
}
addQuerywithDocs() //not yet used
{
  let queryGenerationEmployeeData : any = {
    "queryRequestDTO":[ this.queryGenerationForm.value],
   }
     let queryDocs :any ={
    "listDoc":this.listDoc,
     }
     const formData  = new FormData();
    formData.append('queryGenerationEmployeeData', queryGenerationEmployeeData);
    formData.append( this.employeeMasterId + 'queryDocs', queryDocs );
    this.queryService.addQuerywithDocs(formData).subscribe(res => {
    this.addQuerywithDocsData = res.data.results;
  })
}
updateQueryGeneration(){ //put api for update data
  this.queryGenerationForm.controls['applicationModuleId'].setValue(parseInt(this.queryGenerationForm.controls['applicationModuleId'].value));
  this.queryGenerationForm.controls['queryTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queryTypeMasterId'].value));
  this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));
  let queryGenerationEmployeeData : any = {
     "queryRequestDTO":[ this.queryGenerationForm.value],
    }
    let queryDocs :any ={
      "listDoc":[this.queryGenerationForm.value],
       }
    const formData  = new FormData();
    formData.append('queryGenerationEmployeeData', queryGenerationEmployeeData);
    formData.append( this.employeeMasterId + 'queryDocs', queryDocs );

    console.log(JSON.stringify(queryGenerationEmployeeData));

     this.queryService.updateQueryGeneration(formData).subscribe(res =>
    {
      this.getAllQueryListSummary();
      this.toster.success("",'Query Updated Successfully');
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
  this.queryGenerationEmpId = queryGenerationSummary.queryGenerationEmpId;
  this.editQuerySummaery = queryGenerationSummary;
  this.queryGenerationForm.controls['queryNumber'].disable();
}
viewQuery(queryGenerationSummary)
{
 this.editflag = false;
 this.queryGenerationForm.patchValue(queryGenerationSummary);
 this.queryGenerationForm.disable();
 this.isUpdate =true;
 this.isSave = false;
 this.getById(queryGenerationSummary.queryGenerationEmpId);
 this.queryGenerationEmpId = queryGenerationSummary.queryGenerationEmpId;
}

getDeleteById(queryGenerationEmpId) // delete the record from summary
{
  this.queryService.getDeleteById(queryGenerationEmpId.queryGenerationEmpId).subscribe(res =>
    {
      this.toster.success("",'Query Deleted Successfully');
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



