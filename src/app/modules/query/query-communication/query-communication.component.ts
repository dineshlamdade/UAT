import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { CKEditorModule } from 'ckeditor4-angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { QueryService } from '../query.service';
import { AuthService } from '../../auth/auth.service';
// import { DocumentViewerComponent } from './document-viewer/document-viewer.component';


export interface user2 {
  SrNo: any;
  RefNo: any;
  Documents: any;
  Description: any;
  By: any;
  Date_Time: any;

}
export interface status{
  SrNo: any;
  RefNo: any;
  By: any;
  Date_Time: any;
  status: any;

}
export interface contact{
  role: any;
  Comapny: any;
  Name: any;
  Tel_No: any;
  Email: any;
  Grade: any;
  Designation: any;
}
@Component({
  selector: 'app-query-communication',
  templateUrl: './query-communication.component.html',
  styleUrls: ['./query-communication.component.scss']
})


export class QueryCOmmunicationComponent implements OnInit {

  emoji1:boolean=false;
  emoji2:boolean=false;
  emoji3:boolean=false;
  emoji4:boolean=false;
  emoji5:boolean=false;
public modalRef: BsModalRef;

queryCommunicationForm: FormGroup;
  perticularEmpDetails: any;
  GetIterationdetailsbyQueryIDData: any;
  getQueAnstemplistByIdData: any;
  documentInfoByIdData: any;
  editflag: boolean = false;

  documentIndex: any;
  selectedDoc: any;
  // public modalRef: BsModalRef;
  public masterfilesArray: File[] = [];
  public urlArray: Array<any> = [];
  public urlIndex: number;
  public urlSafe: SafeResourceUrl;
  documentList: any = [];
  listDoc: File[] = [];
  queryGenerationEmpId: any;
  getAllQueryGenerationData: any;
  documents: any =[];
  getRootCasuelistData: any;
  getReplayDataByIdData: any;
  attachementData: any;
  addressedTodropdownData: any;
  forwardWorkflowId: any;
  approverEmpRoleName: any;
  rating: any;
  ListOfDocuments: any;

  ratingName: any ='';
  descriptionData: any;
  queryNumber: any;
  status: any;
  addressedToEmpId: number;
  docName: any =[];
  // hideClosebtn :boolean = true;
  badgeCount:boolean=true;
  feedbackRemark:any= '';
  employeeMasterId: any;
  userData: any;

constructor(private modalService: BsModalService ,public formBuilder : FormBuilder ,public queryService :QueryService , private router: Router,
  public sanitizer: DomSanitizer,private alertService: AlertServiceService, private route:ActivatedRoute,private authService: AuthService ){

    this.route.params.subscribe(value =>{
      this.queryGenerationEmpId = value.id;
    })

    if( localStorage.getItem('dashboardSummary') != null)
    {
      let summaryData = JSON.parse(localStorage.getItem('dashboardSummary'))
      this.forwardWorkflowId = summaryData.forwardWorkflowId;
      this.queryNumber = summaryData.queryNumber;
      // alert( this.queryNumber)
      this.status = summaryData.status;
    }
// if(action = 'close')
// {

// }
    this.queryCommunicationForm = this.formBuilder.group(
      {

         "queryIterationId":new FormControl(0),
         "queryGenerationEmpId":new FormControl(0),
         "addressedToEmpId":new FormControl(0,[Validators.required]),
         "queAnsMasterId":new FormControl(null,[Validators.required]),
         "queryDescription":new FormControl('',[Validators.required]),
         "queryRootCause":new FormControl(null),
         "rootCauseDescription":new FormControl(''),
         "rating":new FormControl(null),
         "remark": new FormControl(null),
         "action":new FormControl('reply'),
         "status":new FormControl('save'),

      })
      this.userData = this.authService.getprivileges()
      console.log("userData::", this.userData);
      this.employeeMasterId = this.userData.UserDetails.employeeMasterId;
  }


Popup1(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-md' })
  );
}

  contact1:contact[];

  ngOnInit(): void {
this.getAllQueryListSummary();
this.getEmpMasterDetails(this.employeeMasterId);
this.getIterationdetailsbyQueryID(this.queryGenerationEmpId);
this.getQueAnstemplistById(this.queryGenerationEmpId);
this.getRootCasuelist();
this.addressedTodropdown();


      this.contact1 = [
        { role: '1', Comapny:'1111', Name:'AAA',Tel_No:'12-8-2020 ',Email:'done',Grade:'A',Designation:'Worker'},
        { role: '2', Comapny:'1112', Name:'AAA',Tel_No:'12-9-2021',Email:'done',Grade:'A',Designation:'Worker'},
      ];
  }
  isRelyDiv = true;
  isShowDiv = false;
  isforwardDiv= true;

  toggleDisplayDiv() {
    this.isRelyDiv = !this.isRelyDiv;
    this.isShowDiv = true;
  }
  toggleReplyDiv(){
    this.isShowDiv = false;
    this.isRelyDiv = true;
  }
  toggleDisplayforwarddiv()
  {
    this.isforwardDiv = !this.isforwardDiv;
    this.isShowDiv = true;
  }
  toggleforwardDiv(){
    this.isShowDiv = false;
    this.isforwardDiv = true;
  }

  changeemoji1(value,rating){
    this.rating = value;
    this.emoji2 = false;
    this.emoji3 = false;
    this.emoji4 = false;
    this.emoji5 = false;
    this.emoji1 =!this.emoji1;
    this.ratingName = rating;

  }

  changeemoji2(value,rating){
    this.rating = value;
    this.emoji1 = false;
    this.emoji3 = false;
    this.emoji4 = false;
    this.emoji5 = false;
    this.emoji2= !this.emoji2;
    this.ratingName = rating;

  }

  changeemoji3(value,rating){
    this.rating = value;
    this.emoji2 = false;
    this.emoji1 = false;
    this.emoji4 = false;
    this.emoji5 = false;
    this.emoji3= !this.emoji3;
    this.ratingName = rating;

  }

  changeemoji4(value,rating){
    this.rating = value;
    this.emoji2 = false;
    this.emoji3 = false;
    this.emoji1 = false;
    this.emoji5 = false;
    this.emoji4=!this.emoji4;
    this.ratingName = rating;

  }

  changeemoji5(value,rating){
    this.rating = value;
    this.emoji2 = false;
    this.emoji3 = false;
    this.emoji1 = false;
    this.emoji4 = false;
    this.emoji5=!this.emoji5;
    this.ratingName = rating;

  }

  queryCommunicationFormSubmit(value)
  {
    // if(value == 'Save'){
    //  this.queryCommunicationForm.controls['status'].setValue('Save');
    // }else{
    // this.queryCommunicationForm.controls['status'].setValue('Draft');
    // }


    // if(!this.editflag){
    //   this.addQueryIteration();
    // }else{
    //   this.updateQueryIteration();

    // }

  if (this.queryCommunicationForm.invalid) {
    return;
  }
  this.reset();
  }
// ..................................QueryIteration API calling...................................................

  getEmpMasterDetails(employeeMasterId)// temp id is used for employee details...
{

  this.queryService.getEmpMasterDetails(employeeMasterId).subscribe(res =>
    {
      this.perticularEmpDetails = res.data.results[0][0];
    })
}
getAllQueryListSummary() //left side card data....
{
this.queryService.getAllQueryList().subscribe(res =>
  {
    this.getAllQueryGenerationData = res.data.results[0];
    this.employeeMasterId = this.getAllQueryGenerationData.employeeMasterId;
    // console.log("employeeMasterId",this.employeeMasterId);

    res.data.results.forEach(element => {
      if(element.queryNumber == this.queryNumber)
      {
        this.getAllQueryGenerationData = element;
      }
    });
    // console.log("getAllQueryGenerationData",this.getAllQueryGenerationData);

  })
  // this.getEmpMasterDetails(this.employeeMasterId)
}
getIterationdetailsbyQueryID(queryGenerationEmpId) //Get Iteration details by Query ID // for all table
{
  this.queryService.getIterationdetailsbyQueryID(this.queryGenerationEmpId).subscribe(res =>
    {
      this.GetIterationdetailsbyQueryIDData = res.data.results[0];
      // console.log(" this.GetIterationdetailsbyQueryIDData", this.GetIterationdetailsbyQueryIDData);
      this.attachementData = res.data.results;
      // console.log(" attachementData ", this.attachementData )

      this.documents = this.GetIterationdetailsbyQueryIDData.documents[0];
      // this.docName = this.GetIterationdetailsbyQueryIDData.documents;
      this.attachementData.forEach(element => {
        if(element.documents.length > 0){
          this.docName.push(element.documents)
        }
      });
      // console.log(" this.docName",  this.docName)

      // console.log(" this.documents ", this.documents )
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
  // console.log("this.getQueAnstemplistByIdData: "+ JSON.stringify(this.getQueAnstemplistByIdData))

    this.getQueAnstemplistByIdData.forEach(element => {
      if(element.queAnsMasterId == value)
    {
         this.descriptionData = element.answerDescription;
         this.queryCommunicationForm.controls['queryDescription'].setValue(this.descriptionData);
    }
    // this.descriptionData = element.answerDescription;

  });
}
getRootCasuelist()
{
  this.queryService.getRootCasuelist().subscribe(res =>
    {
      this.getRootCasuelistData = res.data.results;
    })
}

addQueryIteration(value){ // post api for save data

    this.queryCommunicationForm.controls['queAnsMasterId'].setValue(parseInt(this.queryCommunicationForm.controls['queAnsMasterId'].value));
    this.queryCommunicationForm.controls['queryGenerationEmpId'].setValue(parseInt(this.queryGenerationEmpId));
    this.queryCommunicationForm.controls['queryIterationId'].setValue(0);
    this.queryCommunicationForm.controls['queryRootCause'].setValue(null);
    this.queryCommunicationForm.controls['action'].setValue('reply');
    this.queryCommunicationForm.controls['addressedToEmpId'].setValue(this.addressedToEmpId);

    // console.log("addressedToEmpId",this.addressedToEmpId)//undefined
    if(value == 'Save'){
      this.queryCommunicationForm.controls['status'].setValue('Save');
     }else{
     this.queryCommunicationForm.controls['status'].setValue('Draft');
     }

    console.log(JSON.stringify(this.queryGenerationEmpId));
    const formData  = new FormData();
    formData.append('queryIterationData', JSON.stringify(this.queryCommunicationForm.value));
    for (const queryDoc of this.listDoc) {
      formData.append('queryDocs', queryDoc,queryDoc.name);
    }
    formData.forEach((value, key) => {
      console.log(key,' ', value);
    });
    this.queryService.addQueryIteration(formData).subscribe(res =>
    {
      this.alertService.sweetalertMasterSuccess('Query Replied Successfully', '' );
      this.getIterationdetailsbyQueryID(0);
    })
    this.reset();
}
addForwordScreen(value)
{

  this.queryCommunicationForm.controls['queAnsMasterId'].setValue(null);
  this.queryCommunicationForm.controls['queryGenerationEmpId'].setValue(parseInt(this.queryGenerationEmpId));
  // this.queryCommunicationForm.controls['addressedToEmpId'].setValue(parseInt(this.addressedToEmpId));

  this.queryCommunicationForm.controls['queryIterationId'].setValue(0);
  this.queryCommunicationForm.controls['queryRootCause'].setValue(null);
  this.queryCommunicationForm.controls['action'].setValue('forward');

  if(value == 'Save'){
    this.queryCommunicationForm.controls['status'].setValue('Save');
   }else{
   this.queryCommunicationForm.controls['status'].setValue('Draft');
   }

  console.log(JSON.stringify(this.queryGenerationEmpId));
  const formData  = new FormData();
  formData.append('queryIterationData', JSON.stringify(this.queryCommunicationForm.value));
  for (const queryDoc of this.listDoc) {
    formData.append('queryDocs', queryDoc,queryDoc.name);
  }
  formData.forEach((value, key) => {
    console.log(key,' ', value);
  });

  this.queryService.addQueryIteration(formData).subscribe(res =>
  {
    this.alertService.sweetalertMasterSuccess('Query Forwarded Successfully', '' );

  })
  this.reset();
}
closeScreen()
{
  this.queryCommunicationForm.controls['queAnsMasterId'].setValue(parseInt(this.queryCommunicationForm.controls['queAnsMasterId'].value));
  this.queryCommunicationForm.controls['queryGenerationEmpId'].setValue(parseInt(this.queryGenerationEmpId));
  this.queryCommunicationForm.controls['queryIterationId'].setValue(0);
  this.queryCommunicationForm.controls['queryRootCause'].setValue(null);
  this.queryCommunicationForm.controls['action'].setValue('close');
  // this.queryCommunicationForm.controls['action'].setValue(this.hideClosebtn);

  this.queryCommunicationForm.controls['status'].setValue('Save');
  this.queryCommunicationForm.controls['rating'].setValue(this.rating);

  this.queryCommunicationForm.controls['remark'].setValue(this.feedbackRemark);

  console.log(JSON.stringify(this.queryGenerationEmpId));
  const formData  = new FormData();
  formData.append('queryIterationData', JSON.stringify(this.queryCommunicationForm.value));
  for (const queryDoc of this.listDoc) {
    formData.append('queryDocs', queryDoc,queryDoc.name);
  }
  formData.forEach((value, key) => {
    console.log(key,' ', value);
  });
  this.queryService.addQueryIteration(formData).subscribe(res =>
  {
    this.alertService.sweetalertMasterSuccess('Query Closed Successfully', '' );
    this.status = 'Closed';
  })
  this.reset();
}
skipScreen()
{
  this.queryCommunicationForm.controls['queAnsMasterId'].setValue(parseInt(this.queryCommunicationForm.controls['queAnsMasterId'].value));
  this.queryCommunicationForm.controls['queryGenerationEmpId'].setValue(parseInt(this.queryGenerationEmpId));
  this.queryCommunicationForm.controls['queryIterationId'].setValue(0);
  this.queryCommunicationForm.controls['queryRootCause'].setValue(null);
  this.queryCommunicationForm.controls['action'].setValue('close');
  this.queryCommunicationForm.controls['status'].setValue('Save');
  this.queryCommunicationForm.controls['rating'].setValue(null);
  this.queryCommunicationForm.controls['remark'].setValue(null);


  // this.queryCommunicationForm.controls['remark'].setValue(this.queryCommunicationForm.value);

  console.log(JSON.stringify(this.queryGenerationEmpId));
  const formData  = new FormData();
  formData.append('queryIterationData', JSON.stringify(this.queryCommunicationForm.value));
  for (const queryDoc of this.listDoc) {
    formData.append('queryDocs', queryDoc,queryDoc.name);
  }
  formData.forEach((value, key) => {
    console.log(key,' ', value);
  });
  this.queryService.addQueryIteration(formData).subscribe(res =>
  {
    // this.alertService.sweetalertMasterSuccess('Query Skipped Successfully', '' );
    // this.status = 'Closed';
  })
  this.reset();
}
// updateQueryIteration() // update api for save data
// {
//      this.queryCommunicationForm.controls['queAnsMasterId'].setValue(parseInt(this.queryCommunicationForm.controls['queAnsMasterId'].value));
//     this.queryCommunicationForm.controls['queryGenerationEmpId'].setValue(parseInt(this.queryGenerationEmpId));
//     this.queryCommunicationForm.controls['queryIterationId'].setValue(0);
//     this.queryCommunicationForm.controls['queryRootCause'].setValue(null);
//     this.queryCommunicationForm.controls['action'].setValue('reply');

//     console.log(JSON.stringify(this.queryGenerationEmpId));
//     const formData  = new FormData();
//     formData.append('queryIterationData', JSON.stringify(this.queryCommunicationForm.value));
//     for (const queryDoc of this.listDoc) {
//       formData.append('queryDocs', queryDoc,queryDoc.name);
//     }
//     formData.forEach((value, key) => {
//       console.log(key,' ', value);
//     });
//   this.queryService.updateQueryIteration(formData).subscribe(res =>
//     {
//       this.alertService.sweetalertMasterSuccess('Query Iteration Employee Details Updated Successfully.', '' );

//     })
//     this.reset();
// }
getReplayDataById(queryGenerationEmpId) //Replay button data Api
{
this.queryService.getReplayDataById(this.queryGenerationEmpId).subscribe(res =>
  {
    this.getReplayDataByIdData = res.data.results[0];
    console.log("getReplayDataByIdData!!!!!!!!!!!!!!", this.getReplayDataByIdData);
    this.addressedToEmpId = this.getReplayDataByIdData.addressedToEmpId;
    this.queryCommunicationForm.controls['addressedToEmpId'].setValue(this.getReplayDataByIdData.addressedToEmpId);

    this.reset();
  })
}
addressedTodropdown() //forword screen addressed to dropdown
{
  let data =
  {
    "employeeMasterId":1,
    "flag":"ApproversInfo",
    "workflowMasterHeaderId":this.forwardWorkflowId
  }
  this.queryService.addressedTodropdown(data).subscribe(res =>
    {
      this.addressedTodropdownData = res.data.results[0];
    })
}
roleChange(value)
{
  this.addressedTodropdownData.forEach(element => {
    if(element.approverId == value)
    {
      this.approverEmpRoleName = element.approverEmpRole;
      this.queryCommunicationForm.controls['addressedToEmpId'].setValue(value);
      // console.log("addressedTodropdownData",this.addressedTodropdownData)
    }
  });
}

reset()
{
  this.queryCommunicationForm.reset();
  this.queryCommunicationForm.enable();
  this.listDoc = []; //reset the upload document
  // this.addressedTodropdownData =[]; //reset the forword to dropdown in forword screen
  this.queryCommunicationForm.controls['queryRootCause'].reset();
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

public docViewer(template1: TemplateRef<any>, document: any) {
  //console.log('---in doc viewer--');
  this.ListOfDocuments = document;
  this.urlIndex = 0;
  //document.documents.forEach(element => {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      document.documents[this.urlIndex].queryBlobURI
    );

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


navigateToDocmentViewer(GetIterationdetailsbyQueryIDData) {
  localStorage.setItem('GetIterationdetailsbyQueryIDData',JSON.stringify(GetIterationdetailsbyQueryIDData))
  if(GetIterationdetailsbyQueryIDData.numberOfDocuments > 0){
  const url = this.router.serializeUrl(
    this.router.createUrlTree(['/document-viewer'])
  );

  this.router.navigate([]).then((result) => {
    window.open(
      url,
      '_blank',
      'location=yes,height=1000,width=1000,scrollbars=yes,status=yes'
    );
  });
}
}
resetFeedbackForm()
{
this.ratingName = [];
this.feedbackRemark ='';
}

getInnerHTML(val){
if(this.GetIterationdetailsbyQueryIDData.queryDescription != null){
  return val.replace(/(<([^>]+)>)/ig,'');
}
}

};
