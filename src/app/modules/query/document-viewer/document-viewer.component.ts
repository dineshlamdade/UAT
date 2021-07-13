import { Component, OnInit, TemplateRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { QueryService } from '../query.service';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})
export class DocumentViewerComponent implements OnInit {
  public modalRef: BsModalRef;

  public masterfilesArray: File[] = [];
  public urlArray: Array<any> = [];
  public urlIndex: number;
  public urlSafe: SafeResourceUrl;
  documentList: any = [];
  listDoc: any= [];
  ListOfDocuments: any;
  documentURLIndex: number;
  queryDocumentId: any;
  documents: any;
  GetIterationdetailsbyQueryIDData: any;
  queryGenerationEmpId: any;
  docData: any;
  employeeCode: any;
  empName: any;
  refNumber: any;
  queryNumber: any;
  queryTypeCode: any;
  GetIterationdetailsbyQueryIDData2: any;

  constructor( private router: Router, private modalService: BsModalService,  public sanitizer: DomSanitizer,
    public queryService :QueryService ,) {
}

  ngOnInit(): void {

    if( localStorage.getItem('GetIterationdetailsbyQueryIDData') != null){
      let communicationFormData = JSON.parse(localStorage.getItem('GetIterationdetailsbyQueryIDData'))
      this.listDoc = communicationFormData.documents;
      this.queryGenerationEmpId = communicationFormData.queryGenerationEmpId;

      this.listDoc.forEach(element => {
        this.queryDocumentId = element.queryDocumentId;
      });
      }
      // alert()
      this.openModal(this.queryDocumentId);
   this.getIterationdetailsbyQueryID(this.queryGenerationEmpId);

  }


  public openModal(queryDocumentId:any) {
    this.documentList = this.listDoc;
   this.documentURLIndex = this.listDoc.findIndex(doc=> doc.queryDocumentId == queryDocumentId);
   this.documentURLIndex = 0;
   this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
  this.documentList[this.documentURLIndex].queryBlobURI
  );

  }

  public docViewer(template1: TemplateRef<any>, index: any) {

    // this.ListOfDocuments = document;
    this.documentURLIndex = 0;

      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.listDoc[this.documentURLIndex].queryBlobURI
       );

     this.modalRef = this.modalService.show(
       template1,
       Object.assign({}, { class: 'gray modal-xl' })
     );
  }
  // Previous Doc Viewer
  public previousDocViewer() { //not yet used
    this.urlIndex = this.documentURLIndex - 1;
    this.documentURLIndex = this.documentURLIndex - 1;

    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.listDoc[this.urlIndex].queryBlobURI
    );
  }

  // Next Doc Viewer
  public nextDocViewer() { //not yet used
    // alert()
  this.urlIndex = this.documentURLIndex + 1;
  this.documentURLIndex = this.documentURLIndex + 1;

    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
    this.listDoc[this.urlIndex].queryBlobURI
  );
  }

// ..................API calling.............................................................
  getIterationdetailsbyQueryID(queryGenerationEmpId) //Get Iteration details by Query ID // for all table
{
  this.queryService.getIterationdetailsbyQueryID(this.queryGenerationEmpId).subscribe(res =>
    {
      this.GetIterationdetailsbyQueryIDData = res.data.results;
      this.GetIterationdetailsbyQueryIDData2 = res.data.results[0];
      // this.refNumber = this.GetIterationdetailsbyQueryIDData2.refNumber;
      // console.log("this.refNumber",this.refNumber);

      console.log("GetIterationdetailsbyQueryIDData2",this.GetIterationdetailsbyQueryIDData2)
      this.GetIterationdetailsbyQueryIDData.forEach(element => {
        this.docData = element.documents;
        // this.refNumber = element.refNumber;

      });
      this.docData.forEach(element => {
      this.employeeCode = element.employeeCode;
      this.empName = element.empName;
      this.queryNumber = element.queryNumber;
      this.queryTypeCode = element.queryTypeCode;

      if(this.docData != null){
      this.refNumber = element.refNumber;
      console.log("this.refNumber",this.refNumber)
       }

      });

    })

}


}
