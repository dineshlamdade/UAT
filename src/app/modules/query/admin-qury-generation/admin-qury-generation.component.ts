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
  getDeleteByIdData: any;
  query:any;

  documentIndex: any;
  selectedDoc: any;
  public modalRef: BsModalRef;
  public masterfilesArray: File[] = [];
  public urlArray: Array<any> = [];
  public urlIndex: number;
  public urlSafe: SafeResourceUrl;
  documentList: any = [];
  queryNumber: any;


  constructor(public formBuilder : FormBuilder ,public queryService :QueryService ,public toster : ToastrService,
    private router: Router,public sanitizer: DomSanitizer,
    private modalService: BsModalService,) {
  this.queryGenerationForm = this.formBuilder.group(
    {
        "queryRequestDTO":[
        {
        "queryGenerationEmpId":new FormControl(0),
        "queryNumber":new FormControl(0),
        "employeeMasterId":new FormControl(0),
        "onBehalfOfEmployee":new FormControl(true),
        "applicationModuleId":new FormControl(0),
        "queryTypeMasterId":new FormControl(0),
        "subQueTypeMasterId":new FormControl(0),
        "queAnsMasterId":new FormControl(0),
        "priority":new FormControl(null),
        "queryDescription":new FormControl('test desc 10'),
        "subject":new FormControl('test sub'),
        "queryRootCause":new FormControl(null),
        "status":new FormControl('submitted'),

        }
        ],

    })
   }

  ngOnInit(): void {
    this.getModuleName();
    this.getAllQueryListSummary();
    this.querySubQueryTypeQA();
    this.getById(this.queryGenerationEmpId);
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
    // this.getAllQueryGenerationData.forEach(element => {
    //   this.queryNumber = element.queryNumber;
    // });
    this.queryGenerationForm.controls['queryNumber'].setValue(this.getAllQueryGenerationData.queryNumber);

  })
}

queryGenerationEmpId:number;
getById(queryGenerationEmpId){
  this.queryService.getById(queryGenerationEmpId).subscribe(res =>
    {
      this.getByIdData = res.data.results[0];
      // console.log("*********",this.getByIdData);

    })
}
querySubQueryTypeQA() //one value is bind only other is remaining
{
  this.queryService.querySubQueryTypeQA().subscribe(res =>
    {
      this.querySubQueryTypeQAData = res.data.results;
      this.querySubQueryTypeQAData.forEach(element => { // not working loop
      this.subQueryType = element.subQueTypeMasterId;
      });
    // console.log("*********",this.querySubQueryTypeQAData);
    // console.log("!!!!!!!!!!!",this.subQueryType);
    })
}
addQueryGeneration(){
  this.queryService.addQueryGeneration(this.queryGenerationForm.value).subscribe(res =>
    {
      // this.addQueryGenerationData = res.data.results[0];
      // console.log("*********",this.addQueryGenerationData);
      this.toster.success("",'Query Added Successfully');

    })
}
updateQueryGeneration(){
  this.queryService.updateQueryGeneration(this.queryGenerationForm.value).subscribe(res =>
    {
      this.updateQueryGenerationData = res.data.results[0];
      // console.log("*********",this.addQueryGenerationData);
      this.toster.success("",'Query Updated Successfully');

    })
}
editQuery(query)
{
  this.editflag = true;
  this.queryGenerationForm.enable();
  this.queryGenerationForm.patchValue(query);
  this.isUpdate =true;
  this.isSave = false;
  this.isReset =false;
  this.getById(query.queryGenerationEmpId);
  this.queryGenerationEmpId = query.queryGenerationEmpId;
}
viewQuery(query)
{
 this.editflag = false;
 this.queryGenerationForm.patchValue(query);
 this.queryGenerationForm.disable();
 this.isUpdate =true;
 this.isSave = false;
 this.getById(query.queryGenerationEmpId);
  this.queryGenerationEmpId = query.queryGenerationEmpId;
}
getDeleteById()
{
  this.queryService.getDeleteById(this.queryGenerationEmpId).subscribe(res =>
    {
      this.toster.success("",'Query Deleted Successfully');
    })
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

public UploadModalDocument(template1: TemplateRef<any>, index, document) {
  this.documentIndex = index;
  this.selectedDoc = document
  this.modalRef = this.modalService.show(
    template1,
    Object.assign({}, { class: 'gray modal-md' })

  );
}
onMasterUpload(event: { target: { files: string | any[] } }) {
  if (event.target.files.length > 0) {
    for (const file of event.target.files) {
      this.masterfilesArray.push(file);
    }
  }

  // this.documentList.splice(this.documentIndex, 1, {
  //   'active': this.selectedDoc.active,
  //   'createdBy': null,
  //   'documentName': "wedding card",
  //   'documentRemark': "wedding card",
  //   'loanMasterDocumentId': 1,
  //   'fileName': this.masterfilesArray[this.documentIndex].name
  // })
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



