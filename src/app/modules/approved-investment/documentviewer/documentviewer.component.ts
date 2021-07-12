import { Component, OnInit, TemplateRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
innerHeight
@Component({
  selector: 'app-documentviewer',
  templateUrl: './documentviewer.component.html',
  styleUrls: ['./documentviewer.component.scss']
})
export class DocumentviewerComponent implements OnInit {

  public documentSafeURL: SafeResourceUrl;
  public modalRef: BsModalRef;
  public documentURLIndex: number;
  masterInfo: any;

  constructor(
    private router: Router,
    private modalService: BsModalService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    //console.log("getData::",this.router.getCurrentNavigation().extras.state);
    this.masterInfo =localStorage.getItem("customers");
    console.log("getData::",this.masterInfo);
    localStorage.removeItem("customers");
    console.log("getData after remove::",localStorage.getItem("customers"));
  }


  public docViewer(documentViewerTemplate: TemplateRef<any>, index: any) {
    this.documentURLIndex = index;

    this.documentSafeURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.masterInfo.documentDetails[this.documentURLIndex].documentURL
    );
    this.modalRef = this.modalService.show(
      documentViewerTemplate,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }

  public nextDocViewer() {
    this.documentURLIndex = this.documentURLIndex + 1;
    this.documentSafeURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.masterInfo.documentDetails[this.documentURLIndex].documentURL
    );
  }

  public previousDocViewer() {
    this.documentURLIndex = this.documentURLIndex - 1;
    this.documentSafeURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.masterInfo.documentDetails[this.documentURLIndex].documentURL
    );
  }
}
