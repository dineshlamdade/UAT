import { Component, OnInit } from '@angular/core';
import { TemplateRef} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
// import { ToastrService } from 'ngx-toastr';
import { QueryService } from '../query.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import Swal from 'sweetalert2/src/sweetalert2.js'

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
  isCancle :boolean = false;
  editflag: boolean = false;
  getByIdData: any;
  addQueryGenerationData: any;
  updateQueryGenerationData: any;
  queryGenerationEmpId:number=0;

  documentIndex: any;
  selectedDoc: any;
  public modalRef: BsModalRef;
  // public masterfilesArray: File[] = [];
  public urlArray: Array<any> = [];
  public urlIndex: number;
  public urlSafe: SafeResourceUrl;
  documentList: any = [];

  // public Index: number;

  perticularEmpDetails: any;
  employeeMasterIdData: any;
  subQueryData: any;
  priorityData: any;
  listQAData: any = [];
  selectedModuleId: any;
  queryTemplateData: any;
  selectedModule: any;
  queryNumberData: any;
  listDoc: File[] = [];
  editQuerySummaery: any;

  employeeMasterId: any;

  addQuerywithDocsData: any;
  queryTempData: any;
  listSubQA: any;
  listSubQueryTypeData: any = [];
  viewFlag :boolean = false;
  queryDocs: any;
  fileName:any;
  editQueryTypeMasterId: any = '';
  hideEditTime:boolean= true;
  ListOfDocuments: any;
  documents: any;
// ...........for single query btns.........................................
  isPrevious:boolean=false;
  isSaveDraftNext:boolean=false;
  isSaveNext:boolean=false;
  isnext:boolean=false;
  getQueAnstemplistByIdData: any;
  descriptionData: any;

  constructor(public formBuilder : FormBuilder ,public queryService :QueryService , private alertService: AlertServiceService
    ,private router: Router,public sanitizer: DomSanitizer,
    private modalService: BsModalService, )

    {
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
    this.getQueAnstemplistById(this.queryGenerationEmpId);


  }

  queryGenerationFormSubmit(value)
  {
    if(value == 'Save'){
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
    // this.employeeMasterIdData = element.employeeMasterId;
    this.queryNumberData = element.queryNumber;
    this.employeeMasterId = element.employeeMasterId
    console.log("getAllQueryListSummary",this.employeeMasterId )
    });
    this.getEmpMasterDetails(this.employeeMasterIdData);

  })
}

getById(queryGenerationEmpId) { //used for the edit

  this.queryService.getById(queryGenerationEmpId).subscribe(res => {

    this.getByIdData = res.data.results[0];
    console.log(JSON.stringify(this.getByIdData))
    this.querySubQueryTypeQA(this.getByIdData.applicationModuleId);
    this.listDoc = this.getByIdData.listDoc;
    this.queryGenerationForm.controls['queryTypeMasterId'].setValue(this.getByIdData.queryTypeMasterId);
    this.queryGenerationForm.controls['queAnsMasterId'].setValue(this.getByIdData.queAnsMasterId);
    this.queryGenerationForm.controls['priority'].setValue(this.getByIdData.priority);
    this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(this.getByIdData.subQueTypeMasterId);

  })
}
querySubQueryTypeQA(applicationModuleId)  //for all dropdown
  {
    this.queryService.querySubQueryTypeQA(applicationModuleId).subscribe(res => {
      this.querySubQueryTypeQAData = res.data.results;
      this.querySubQueryTypeQAData.forEach(element => {
        if (element.subQuery == false) {
          this.listQAData = element.listQA;
        }
        else {
          element.listSubQueryTypeData.forEach(element => {
            this.listQAData = element.listSubQA;
          });
        }
        if (this.editflag) {
          this.getSubQueryListData(this.getByIdData.queryTypeMasterId);
          this.editQueryTypeMasterId = this.getByIdData.queryTypeMasterId
          this.queryGenerationForm.controls['queryTypeMasterId'].setValue(this.getByIdData.queryTypeMasterId);
        }
      });


    })
  }

  getSubQueryListData(value) {
    this.querySubQueryTypeQAData.forEach(element => {
      if (element.queryTypeMasterId == parseInt(value)) {
        this.subQueryData = element.listSubQueryTypeData;
        this.priorityData = element.listPriority;
        console.log("priorityData",this.priorityData);
        this.queryGenerationForm.controls['priority'].setValue(this.priorityData);
        if (element.subQuery == false) {
          this.listQAData = element.listQA; // if subquery is false then
        } else {
          this.listQAData = element.listSubQA; // if subquery is true then
        }
        // if(element.subQuery == true){
        //   this.listQAData = element.listSubQueryTypeData.listSubQA[0];
        //   console.log("listQAData",this.listQAData)
        // }
        if (this.editflag) {
          this.queryGenerationForm.controls['queAnsMasterId'].setValue(this.getByIdData.queAnsMasterId);
          // console.log("@@@@@@@@@@@@@",this.getByIdData.queryTypeMasterId)
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
    this.queryService.addQueryGeneration(formData).subscribe(res =>
    {
      this.addQueryGenerationData = res.data.results;
      console.log(JSON.stringify(this.addQueryGenerationData));
    // console.log("Without Doc**********",queryGenerationEmployeeData)

      this.getAllQueryListSummary();
      this.alertService.sweetalertMasterSuccess('Query Generated Successfully.', '' );

      this.reset();
    })
    }else{
      this.addQuerywithDocs();
    }
}

updateQueryGeneration() //put api for update data
{
  if(this.listDoc.length == 0){
  this.queryGenerationForm.controls['queAnsMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queAnsMasterId'].value));
  this.queryGenerationForm.controls['applicationModuleId'].setValue(parseInt(this.queryGenerationForm.controls['applicationModuleId'].value));
  this.queryGenerationForm.controls['queryTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queryTypeMasterId'].value));
  this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));
  // this.queryGenerationForm.controls['status'].setValue('Save');


  let data = []
  data.push(this.queryGenerationForm.value)
  let queryGenerationEmployeeData  = {
    "queryRequestDTO": data
    }
    const formData  = new FormData();
    formData.append('queryGenerationEmployeeData', JSON.stringify(queryGenerationEmployeeData));
    this.queryService.updateQueryGeneration(formData).subscribe(res =>
    {
      this.addQueryGenerationData = res.data.results;
    console.log("Without Doc**********",queryGenerationEmployeeData)

      this.getAllQueryListSummary();
      this.alertService.sweetalertMasterSuccess('Query Updated Successfully', '' );

      this.editflag =false;
      this.reset();
    })

  }else{
    this.updateQuerywithDoc();
  }

}

addQuerywithDocs() //not yet used
{
  this.queryGenerationForm.controls['queAnsMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queAnsMasterId'].value));
  this.queryGenerationForm.controls['applicationModuleId'].setValue(parseInt(this.queryGenerationForm.controls['applicationModuleId'].value));
  this.queryGenerationForm.controls['queryTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queryTypeMasterId'].value));
  this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));

    let data = []
    data.push(this.queryGenerationForm.value)
    let queryGenerationEmployeeData  = {
      "queryRequestDTO": data,
      }
      console.log(JSON.stringify(queryGenerationEmployeeData));
      const formData  = new FormData();
      formData.append('queryGenerationEmployeeData', JSON.stringify(queryGenerationEmployeeData));
      this.employeeMasterId = 1;
      console.log("employeeMasterId",this.employeeMasterId)
      for (const queryDoc of this.listDoc) {
        formData.append('queryDocs', queryDoc,this.employeeMasterId + queryDoc.name);
      }
      formData.forEach((value, key) => {
        console.log(key,' ', value);
      });
      this.queryService.addQuerywithDocs(formData).subscribe(res =>
      {
        this.addQueryGenerationData = res.data.results;
        // console.log(JSON.stringify(this.addQueryGenerationData));

        this.alertService.sweetalertMasterSuccess('Query Generated Successfully', '' );
        this.getAllQueryListSummary();
        this.reset();
      })
}
updateQuerywithDoc()
{
  this.queryGenerationForm.controls['queAnsMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queAnsMasterId'].value));
  this.queryGenerationForm.controls['applicationModuleId'].setValue(parseInt(this.queryGenerationForm.controls['applicationModuleId'].value));
  this.queryGenerationForm.controls['queryTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queryTypeMasterId'].value));
  this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));
  // this.queryGenerationForm.controls['status'].setValue('Save');


  let data = []
  data.push(this.queryGenerationForm.value)
  let queryGenerationEmployeeData  = {
    "queryRequestDTO": data,
    }
    console.log(JSON.stringify(queryGenerationEmployeeData));
    const formData  = new FormData();
    formData.append('queryGenerationEmployeeData', JSON.stringify(queryGenerationEmployeeData));
    this.employeeMasterId = 1;
    console.log("employeeMasterId",this.employeeMasterId)
    for (const queryDoc of this.listDoc) {
      formData.append('queryDocs', queryDoc,this.employeeMasterId + queryDoc.name);
    }
    formData.forEach((value, key) => {
      console.log(key,' ', value);
    });

      this.queryService.updateQuerywithDoc(formData).subscribe(res =>
      {
        this.addQueryGenerationData = res.data.results;
        console.log("update with documents",this.addQueryGenerationData);
        this.alertService.sweetalertMasterSuccess('Query Updated Successfully', '' );
        this.getAllQueryListSummary();
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

getQueAnstemplistById(queryGenerationEmpId) //Get Question Answer template list by QueryGenerationEmpId
                                        //for Query Iteration reply screen dropdown.
{
  this.queryService.getQueAnstemplistById(this.queryGenerationEmpId).subscribe(res =>
    {
      this.getQueAnstemplistByIdData = res.data.results;
    })
}
answerTempChange(value)
{
  console.log("this.getQueAnstemplistByIdData: "+ JSON.stringify(this.getQueAnstemplistByIdData))

    this.getQueAnstemplistByIdData.forEach(element => {
      if(element.queAnsMasterId == value)
    {
         this.descriptionData = element.answerDescription;
         this.queryGenerationForm.controls['queryDescription'].setValue(this.descriptionData);
    }
    // this.descriptionData = element.answerDescription;

  });
}
editQuery(queryGenerationSummary) {
  this.querySubQueryTypeQAData = null
  this.listQAData = []
  this.editflag = true;
  this.queryGenerationForm.enable();
  this.queryGenerationForm.patchValue(queryGenerationSummary);
  this.isUpdate = true;
  this.isSave = true;
  this.isReset = false;
  this.isCancle = true;
  this.getById(queryGenerationSummary.queryGenerationEmpId);
  this.queryGenerationEmpId = queryGenerationSummary.queryGenerationEmpId;
  this.editQuerySummaery = queryGenerationSummary;

  this.queryGenerationForm.controls['queryNumber'].disable();
  this.urlArray = queryGenerationSummary.listDoc;
  this.hideEditTime = false;

}
viewQuery(queryGenerationSummary)
{
 this.viewFlag = true;
 this.editflag = false;
 this.queryGenerationForm.patchValue(queryGenerationSummary);
 this.queryGenerationForm.disable();
//  this.queryTemplateData.disable();
 this.isUpdate =false;
 this.isSave = false;
 this.isReset = false;
 this.isCancle = true;

 this.editQuerySummaery = queryGenerationSummary;
//  this.queryGenerationForm.controls['queryDescription'].disable();
 this.getById(queryGenerationSummary.queryGenerationEmpId);
 this.queryGenerationEmpId = queryGenerationSummary.queryGenerationEmpId;
}

getDeleteById(queryGenerationEmpId) // delete the record from summary
{
  this.queryService.getDeleteById(queryGenerationEmpId.queryGenerationEmpId).subscribe(res =>
    {
      this.alertService.sweetalertMasterSuccess('Query Deleted Successfully', '' );
      this.getAllQueryListSummary();
    },error => {
      if(error.error.status.code == '4001'){
        this.alertService.sweetalertWarning( 'Query With Closed Status cant be deleted' );

      }
    });

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }

    ).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
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
  this.hideEditTime = true;

}
cancel()
{
this.reset();
this.queryGenerationForm.controls['queryNumber'].disable();
this.isSave = true;
this.isReset = true;
this.isUpdate = false;
this.isCancle = false;
this.hideEditTime = true;
}
// ........................upload Document..............................................................
public UploadModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-md' })
  );
}

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

public removeSelectedLicMasterDocument(index: number, docType: string) {
      this.listDoc.splice(index, 1);
}

public docViewer(template1: TemplateRef<any>,index: any) {
 this.ListOfDocuments = document;
 this.urlIndex = 0;
  //  this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
  //    document.documents[this.urlIndex].queryBlobURI
  //  );   working half

 //});

 console.log('urlSafe::', this.urlSafe);
 this.modalRef = this.modalService.show(
   template1,
   Object.assign({}, { class: 'gray modal-xl' })
 );
}
// Previous Doc Viewer
public previousDocViewer() { //not yet used
  this.urlIndex = this.urlIndex - 1;
  this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
    this.ListOfDocuments.documents[this.urlIndex].queryBlobURI
  );
}

// Next Doc Viewer
public nextDocViewer() { //not yet used
this.urlIndex = this.urlIndex + 1;
this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
 this.ListOfDocuments.documents[this.urlIndex].queryBlobURI
);
}

}



