import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SignaturePad } from 'angular2-signaturepad';

@Component({
  selector: 'app-signatureaffirmation-pad',
  templateUrl: './signatureaffirmation-pad.component.html',
  styleUrls: ['./signatureaffirmation-pad.component.scss']
})
export class SignatureaffirmationPadComponent implements OnInit {


    /** Signature  */

    @ViewChild('signatureAffirmationCanvas', { static: true })
    signaturePad!: SignaturePad;

    @Output() imageFile: EventEmitter<any> =   new EventEmitter();
    

    public signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
      'minWidth': 5,
      'canvasWidth': 500,
      'canvasHeight': 300
    };
  imgFile: any;


  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  drawComplete() {
    // console.log("event: "+ event)
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
     let contentDataURL = this.signaturePad.toDataURL();
    this.imgFile = this.sanitizer.bypassSecurityTrustResourceUrl(contentDataURL)
    this.imageFile.emit(this.imgFile)
  }

drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }
  
  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

}
