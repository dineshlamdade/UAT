import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CKEditorModule } from 'ckeditor4-angular';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { QueryService } from '../query.service';


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

  documentIndex: any;
  selectedDoc: any;
  // public modalRef: BsModalRef;
  public masterfilesArray: File[] = [];
  public urlArray: Array<any> = [];
  public urlIndex: number;
  public urlSafe: SafeResourceUrl;
  documentList: any = [];
  listDoc: File[] = [];

constructor(private modalService: BsModalService ,public formBuilder : FormBuilder ,public queryService :QueryService , private router: Router,public sanitizer: DomSanitizer, ){}
Popup1(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-md' })
  );
  this.queryCommunicationForm = this.formBuilder.group(
    {

      "queryIterationId":new FormControl(0),
       "queryGenerationEmpId":new FormControl(0),
       "addressedToEmpId":new FormControl(0),
       "queAnsMasterId":new FormControl(0),
       "queryDescription":new FormControl(0),
       "queryRootCause":new FormControl(null),
       "rootCauseDescription":new FormControl(null),
       "rating":new FormControl(null),
       "remark": new FormControl(null),
       "action":new FormControl('reply'),
       "status":new FormControl('save'),

    })
}

  users: user2[];
  status1:status[];
  contact1:contact[];

  ngOnInit(): void {

this.queryCommunicationForm = this.formBuilder.group({})
this.getEmpMasterDetails(60);
this.getIterationdetailsbyQueryID(120);

    this.users = [
      { SrNo: '1', RefNo:'1111',Documents:'DOC1',Description:'aaaa', By:'AAA',Date_Time:'12-8-2020 '},
      { SrNo: '2', RefNo:'1112',Documents:'Doc 2',Description:'aaaa', By:'AAA',Date_Time:'12-9-2021 ' },
    ];
      this.status1 = [
        { SrNo: '1', RefNo:'1111', By:'AAA',Date_Time:'12-8-2020 ',status:'done'},
        { SrNo: '2', RefNo:'1112', By:'AAA',Date_Time:'12-9-2021',status:'done'},
      ];
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

  changeemoji1(){
    this.emoji1=true;
  }

  changeemoji2(){
    this.emoji2=true;
  }

  changeemoji3(){
    this.emoji3=true;
  }

  changeemoji4(){
    this.emoji4=true;
  }

  changeemoji5(){
    this.emoji5=true;
  }

// ..................................QueryIteration API calling...................................................

  getEmpMasterDetails(employeeMasterIdData)// temp id is used for employee details
{
  this.queryService.getEmpMasterDetails(60).subscribe(res =>
    {
      this.perticularEmpDetails = res.data.results[0][0];
    })
}
getIterationdetailsbyQueryID(queryIterationId) //Get Iteration details by Query ID
{
  this.queryService.getIterationdetailsbyQueryID(queryIterationId).subscribe(res =>
    {
      this.GetIterationdetailsbyQueryIDData = res.data.results[0];
    })
}
getQueAnstemplistById(queryIterationId) //Get Question Answer template list by QueryGenerationEmpId
                                        //for Query Iteration reply screen dropdown.
{
  this.queryService.getQueAnstemplistById(queryIterationId).subscribe(res =>
    {
      this.getQueAnstemplistByIdData = res.data.results[0];
    })
}
documentInfoById(queryIterationId) //Get Document details by Query Iteration Id
{
  this.queryService.documentInfoById(queryIterationId).subscribe(res =>
    {
      this.documentInfoByIdData = res.data.results[0];
    })
}

addQueryIteration(){ // post api for save data
  // let data = []
  // data.push(this.queryCommunicationForm.value)
  let queryIterationData  = {
    "queryIterationData": this.queryCommunicationForm.value,
    }
    const formData  = new FormData();
    formData.append('queryIterationData', JSON.stringify(queryIterationData));
    this.queryService.addQueryIteration(formData).subscribe(res =>
    {

    })
}
updateQueryIteration() // update api for save data
{
  // let data = []
  // data.push(this.queryCommunicationForm.value)
  let queryIterationData  = {
    "queryIterationData": this.queryCommunicationForm.value,
    }
    const formData  = new FormData();
    formData.append('queryIterationData', JSON.stringify(queryIterationData));
  this.queryService.updateQueryIteration(formData).subscribe(res =>
    {

    })
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

public docViewer(template1: TemplateRef<any>, index: any) {
  console.log('---in doc viewer--');
  this.urlIndex = index;

  console.log('listDoc::', this.listDoc);
  // this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
  //   this.listDoc[this.urlIndex].blobURI
  // );

  console.log('urlSafe::', this.urlSafe);
  this.modalRef = this.modalService.show(
    template1,
    Object.assign({}, { class: 'gray modal-xl' })
  );
}

};
