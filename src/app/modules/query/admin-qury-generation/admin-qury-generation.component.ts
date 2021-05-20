import { Component, OnInit } from '@angular/core';
import { TemplateRef} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  constructor(public formBuilder : FormBuilder ,public queryService :QueryService ,public toster : ToastrService,
    private router: Router,public sanitizer: DomSanitizer,
    private modalService: BsModalService,) {
  this.queryGenerationForm = this.formBuilder.group(
    {
        "queryGenerationEmpId":new FormControl(0),
        "queryNumber":new FormControl(0),
        "employeeMasterId":new FormControl(0),
        "onBehalfOfEmployee":new FormControl(true),
        "applicationModuleId":new FormControl(0),
        "queryTypeMasterId":new FormControl(0),
        "subQueTypeMasterId":new FormControl(0),
        "queAnsMasterId":new FormControl(0),
        "priority":new FormControl(''),
        "queryDescription":new FormControl(''),
        "subject":new FormControl(''),
        "queryRootCause":new FormControl(null),
        "status":new FormControl(''),
    })
   }

  ngOnInit(): void {
    this.getModuleName();
    this.getAllQueryListSummary();
    this.querySubQueryTypeQA();
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
  this.queryGenerationForm.reset();
  }
// .........................................api calling..................................................
  getModuleName()
{
  this.queryService.getModuleName().subscribe(res => {
    this.moduleListData = res.data.results;
  })
}
getAllQueryListSummary()
{
this.queryService.getAllQueryList().subscribe(res =>
  {
    this.getAllQueryGenerationData = res.data.results;
    this.getAllQueryGenerationData.forEach(element => {
    this.employeeMasterIdData = element.employeeMasterId;
    this.queryNumberData = element.queryNumber;
    });
    this.getEmpMasterDetails(this.employeeMasterIdData);
    console.log(JSON.stringify(  this.queryNumberData));
  })
}

getById(queryGenerationEmpId){ //used for the edit
  this.queryService.getById(queryGenerationEmpId).subscribe(res =>
    {
      this.getByIdData = res.data.results;
      console.log("@@@@@@@@@@@@@@@@@@@@@",this.getByIdData);

      // this.getByIdData = [];
      this.getByIdData.forEach(element => {
        this.listDoc = element.listDoc;
        console.log("!!!!!!!!!!!!!!!!!!",this.listDoc);
      });
    })
}
querySubQueryTypeQA()
{
  this.queryService.querySubQueryTypeQA().subscribe(res =>
    {
      this.querySubQueryTypeQAData = res.data.results;
    })
}
queryTypeChange(value)
{
  this.subQueryData = [];
  this.querySubQueryTypeQAData.forEach(element => {
  if(element.queryTypeMasterId == value){
    this.subQueryData = element.listSubQueryTypeData;
    this.priorityData = element.listPriority;
    this.listQAData = element.listQA;
  }
});
}
moduleChange(value) // when module is changed then template also changed.
{
  this.selectedModuleId = value;
  this.moduleListData.forEach(element => {
    if(element.applicationModuleId == parseInt(value))
    {
   this.selectedModule = element.applicationModuleName;
    }
  });
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
  this.queryService.addQueryGeneration(this.queryGenerationForm.value).subscribe(res =>
    {
      this.addQueryGenerationData = res.data.results;
      console.log(JSON.stringify(this.addQueryGenerationData));
      this.getAllQueryListSummary();
      this.toster.success("",'Query Added Successfully');
      this.queryGenerationForm.reset();
    })
}
updateQueryGeneration(){ //put api for update data

  // let queryRequestDTO = [
  //   {
  //       "queryGenerationEmpId":this.queryGenerationEmpId,
  //       "queryNumber":this.queryNumber,
  //       "employeeMasterId":this.employeeMasterId,
  //       "onBehalfOfEmployee":true,
  //       "applicationModuleId":this.applicationModuleId,
  //       "queryTypeMasterId":this.queryTypeMasterId,
  //       "subQueTypeMasterId":this.subQueTypeMasterId,
  //       "queAnsMasterId":this.queAnsMasterId,
  //       "queryDescription":this.queryDescription,
  //       "subject":this.subject,
  //       "queryRootCause":this.queryRootCause,
  //       "status":this.status,
  //   }
  // ]
  this.queryService.updateQueryGeneration(this.queryGenerationForm.value).subscribe(res =>
    {
      // this.updateQueryGenerationData = res.data.results[0];
      // console.log("*********",this.addQueryGenerationData);
      this.getAllQueryListSummary();
      this.toster.success("",'Query Updated Successfully');
     this.queryGenerationForm.reset();
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
  // this.getById(this.queryGenerationEmpId);
  this.getById(queryGenerationSummary.queryGenerationEmpId);
  this.queryGenerationEmpId = queryGenerationSummary.queryGenerationEmpId;

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

getDeleteById(queryGenerationEmpId)// delete the record from summary
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
}
cancel()
{
this.reset();
}
// ........................upload Document..............................................................

  // Previous Doc Viewer
  public previousDocViewerPropertyIndex() { //not yet used
    this.urlIndex = this.urlIndex - 1;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.urlArray[this.urlIndex].blobURI
    );
  }

  // Next Doc Viewer
public nextDocViewerPropertyIndex() { //not yet used
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
onMasterUpload(event: { target: { files: string | any[] } }) {
  // console.log('event::', event);
  if (event.target.files.length > 0) {
    for (const file of event.target.files) {
      this.masterfilesArray.push(file);
    }
  }
  // console.log('this.masterfilesArray::', this.masterfilesArray);
}
public removeSelectedLicMasterDocument(index: number) {
  this.masterfilesArray.splice(index, 1);
}

public docViewer(template1: TemplateRef<any>, index: any) {
  console.log('---in doc viewer--');
  this.urlIndex = index;

  console.log('urlArray::', this.urlArray);
  this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
    this.urlArray[this.urlIndex].blobURI
  );

  console.log('urlSafe::', this.urlSafe);
  this.modalRef = this.modalService.show(
    template1,
    Object.assign({}, { class: 'gray modal-xl' })
  );
}


}



