import { OtherMasterService } from './../other-master.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { max } from 'rxjs/operators';
import { AlertServiceService } from './../../../core/services/alert-service.service';
import { element } from 'protractor';


@Component({
  selector: 'app-certificationMaster',
  templateUrl: './certificationMaster.component.html',
  styleUrls: ['./certificationMaster.component.scss']
})
export class CertificationMasterComponent implements OnInit {
  form: FormGroup;
  cancelButtonShow: boolean = false;
  summary: Array<any> = [];
  currencyArray: Array<any> = [];
  currency: string = 'INR';
  sdmApplicabilityArray: Array<any> = [];
  summaryIndex: number;
  frequencyArrayList: Array<any> = [];
  certificateCountLabel: string = 'Yearly';
  feesCountLabel: string = 'Yearly';

  constructor(private formBuilder: FormBuilder,
    private service: OtherMasterService,
    private alertService: AlertServiceService,
    ) {
    this.form = this.formBuilder.group({
      certificateMasterId:  new FormControl(null),
      certificateName: new FormControl(null, [Validators.required]),
      certificateCode: new FormControl(null),
      verificationReqiured: new FormControl(false),
      renewable: new FormControl(false),
      feesRenewableOnceEvery: new FormControl(1),
      feesRenewableCycle: new FormControl(null),
      feesRenewableCount: new FormControl(null),
      certificateRenewableOnceEvery: new FormControl(1),
      certificateRenewableCycle: new FormControl(null),
      certificateRenewableCount: new FormControl(null),
      amount: new FormControl(null),
      sdmMasterId: new FormControl(null, [Validators.required]),
      isActive: new FormControl(1),
      remark: new FormControl(null)
    })
  }

  ngOnInit() {

    const renewablefield = this.form.get('renewable');
    const active = this.form.get('isActive');
    const remark = this.form.get('remark');

    this.getSdmApplicability();
    this.getPageLoadData();
    this.getFrequencyMaster();
    this.feesRenewableValidation();
 
    active.valueChanges.subscribe((data) => {
      if (data === 0) {
        remark.setValidators(Validators.required);
      } else {
        remark.clearValidators();
        remark.setValue(null);
      }
    });
  }

  getSdmApplicability() {
    this.service.getSdmApplicationModule().subscribe((res)=>{
      this.sdmApplicabilityArray = res.data.results;
      console.log('SDM', this.sdmApplicabilityArray);
    })
  }

  getPageLoadData(){
    this.service.getCertificateMaster().subscribe((res) => {
      console.log('Page Load Data',res);
      this.summary = res.data.results;
    });
  }

  getFrequencyMaster(){
    this.service.getFrequencyMaster().subscribe((res)=>{
      this.frequencyArrayList = res.data.results
      console.log('Frequency List',res)
    })
  }

  feesRenewableValidation() {
    let renewablefield = this.form.get('renewable');
    let feesRenewableOnceEveryfield = this.form.get('feesRenewableOnceEvery');
    let feesRenewableCyclefield = this.form.get('feesRenewableCycle');
    let feesRenewableCountfield = this.form.get('feesRenewableCount');
    let certificateRenewableOnceEveryfield = this.form.get('certificateRenewableOnceEvery');
    let certificateRenewableCyclefield = this.form.get('certificateRenewableCycle');
    let certificateRenewableCountfield = this.form.get('certificateRenewableCount');
    let amountfield = this.form.get('amount');
    if (renewablefield.value === true) {
        feesRenewableOnceEveryfield.setValidators(Validators.required);
        feesRenewableCyclefield.setValidators(Validators.required);
        feesRenewableCountfield.setValidators(Validators.required);
        certificateRenewableOnceEveryfield.setValidators(Validators.required);
        certificateRenewableCyclefield.setValidators(Validators.required);
        certificateRenewableCountfield.setValidators(Validators.required);
        amountfield.setValidators(Validators.required);
      } else {
        feesRenewableOnceEveryfield.clearValidators();
        feesRenewableCyclefield.clearValidators();
        feesRenewableCountfield.clearValidators();
        certificateRenewableOnceEveryfield.clearValidators();
        certificateRenewableCyclefield.clearValidators();
        certificateRenewableCountfield.clearValidators();
        feesRenewableOnceEveryfield.setValue(null);
        feesRenewableCyclefield.setValue(null);
        feesRenewableCountfield.setValue(null);
        certificateRenewableOnceEveryfield.setValue(null);
        certificateRenewableCyclefield.setValue(null);
        certificateRenewableCountfield.setValue(null);
        amountfield.clearValidators();
        amountfield.setValue(null);

      }

  }

  submit(){
    if((this.form.invalid)){
      console.log('Invalid Form data')
      return;
    }
    let data = this.setDataProperty();
    this.postData(data);
    this.feesRenewableValidation();
  }

  setDataProperty(){
    let data = this.form.getRawValue();
    data.sdmMasterId = parseInt(data.sdmMasterId);
    if(!this.form.get('certificateMasterId').value){
      delete data.certificateMasterId;
    }
    console.log('submit',data);
    return data;
  }

  setCertificateCountLabel() {
    const certificateRenewableCycle = parseInt(this.form.get('certificateRenewableCycle').value);
    const temp = this.frequencyArrayList.find((element) =>element.id === certificateRenewableCycle)
    this.certificateCountLabel = temp.name
  }

  setfeesCountLabel(){
    const feesRenewableCycle = parseInt(this.form.get('feesRenewableCycle').value);
    const temp =  this.frequencyArrayList.find((element) =>element.id === feesRenewableCycle)
    this.feesCountLabel = temp.name
  }

  postData(data){
    if(data.certificateMasterId){
      this.service.putCertificateMaster(data).subscribe((res)=>{
        console.log(res);
        this.summary[this.summaryIndex] = (res.data.results[0]);
        this.alertService.sweetalertMasterSuccess('',res.status.messsage);
        this.reset();
      }, (error: any) => {
        console.log();
        this.alertService.sweetalertWarning(error.error.status.messsage);
      });
    } else{
      data.isActive = 1;
      this.service.postCertificateMaster(data).subscribe((res)=>{
        console.log(res);
        this.summary.push(res.data.results[0]);
        this.alertService.sweetalertMasterSuccess('',res.status.messsage);
        this.reset();
      }, (error: any) => {
        console.log();
        this.alertService.sweetalertWarning(error.error.status.messsage);
      });
    }
  }

  edit(item, index) {
    this.form.enable();
    this.form.patchValue(item);
    this.feesRenewableValidation();
    this.summaryIndex = index;
  }

  reset(){
    this.form.reset();
    this.form.enable();
    this.cancelButtonShow = false;
    this.feesRenewableValidation();
  }

  view(item){
    this.edit(item, null);
    this.form.disable();
    this.cancelButtonShow = true;
    this.feesRenewableValidation();
  }
}





