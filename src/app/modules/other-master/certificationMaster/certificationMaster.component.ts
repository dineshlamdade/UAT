import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { element } from 'protractor';
import { max } from 'rxjs/operators';
import { AlertServiceService } from './../../../core/services/alert-service.service';
import { OtherMasterService } from './../other-master.service';

@Component({
  selector: 'app-certificationMaster',
  templateUrl: './certificationMaster.component.html',
  styleUrls: ['./certificationMaster.component.scss'],
})
export class CertificationMasterComponent implements OnInit {
  public form: FormGroup;
  public cancelButtonShow = false;
  public summary: Array<any> = [];
  public currencyArray: Array<any> = [];
  public currency = 'INR';
  public sdmApplicabilityArray: Array<any> = [];
  public summaryIndex: number;
  public frequencyArrayList: Array<any> = [];
  public certificateCountLabel = 'Yearly';
  public feesCountLabel = 'Yearly';
  public renewableFieldset = false;

  constructor(private formBuilder: FormBuilder,
              private service: OtherMasterService,
              private alertService: AlertServiceService,
              private cdref: ChangeDetectorRef
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
      remark: new FormControl(null),
    });
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
      if (data === false) {
        remark.setValidators(Validators.required);
      } else {
        remark.clearValidators();
        remark.setValue(null);
      }
    });
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();

     }

  getSdmApplicability() {
    this.service.getSdmApplicationModule().subscribe((res) => {
      this.sdmApplicabilityArray = res.data.results;
      console.log('SDM', this.sdmApplicabilityArray);
    });
  }

  getPageLoadData() {
    this.service.getCertificateMaster().subscribe((res) => {
      console.log('Page Load Data', res);
      this.summary = res.data.results;
    });
  }

  public getFrequencyMaster(): void {
    this.service.getFrequencyMaster().subscribe((res) => {
      this.frequencyArrayList = res.data.results;
      console.log('Frequency List', res);
    });
  }

  public feesRenewableValidation(): void {
    const renewablefield = this.form.get('renewable');
    const feesRenewableOnceEveryfield = this.form.get('feesRenewableOnceEvery');
    const feesRenewableCyclefield = this.form.get('feesRenewableCycle');
    const feesRenewableCountfield = this.form.get('feesRenewableCount');
    const certificateRenewableOnceEveryfield = this.form.get('certificateRenewableOnceEvery');
    const certificateRenewableCyclefield = this.form.get('certificateRenewableCycle');
    const certificateRenewableCountfield = this.form.get('certificateRenewableCount');
    const amountfield = this.form.get('amount');
    if (renewablefield.value === true) {
        feesRenewableOnceEveryfield.setValidators(Validators.required);
        feesRenewableCyclefield.setValidators(Validators.required);
        feesRenewableCountfield.setValidators(Validators.required);
        certificateRenewableOnceEveryfield.setValidators(Validators.required);
        certificateRenewableCyclefield.setValidators(Validators.required);
        certificateRenewableCountfield.setValidators(Validators.required);
        amountfield.setValidators(Validators.required);
        this.renewableFieldset = true;
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
        this.renewableFieldset = false;

      }

  }

  submit() {
    if ((this.form.invalid)) {
      console.log('Invalid Form data');
      return;
    }
    const data = this.setDataProperty();
    this.postData(data);
    this.feesRenewableValidation();
  }

  setDataProperty() {
    const data = this.form.getRawValue();
    const active = this.form.get('isActive').value;
    active === true ? data.isActive = 1 : data.isActive = 0;
    data.sdmMasterId = parseInt(data.sdmMasterId);
    if (!this.form.get('certificateMasterId').value) {
      delete data.certificateMasterId;
    }

    console.log('submit', data);
    return data;
  }

  setCertificateCountLabel() {
    const certificateRenewableCycle = parseInt(this.form.get('certificateRenewableCycle').value);
    const temp = this.frequencyArrayList.find((element) => element.id === certificateRenewableCycle);
    this.certificateCountLabel = temp.name;
  }

  setfeesCountLabel() {
    const feesRenewableCycle = parseInt(this.form.get('feesRenewableCycle').value);
    const temp =  this.frequencyArrayList.find((element) => element.id === feesRenewableCycle);
    this.feesCountLabel = temp.name;
  }

  postData(data) {
    if (data.certificateMasterId) {
      this.service.putCertificateMaster(data).subscribe((res) => {
        console.log(res);
        this.summary[this.summaryIndex] = (res.data.results[0]);
        this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
        this.reset();
      }, (error: any) => {
        console.log();
        this.alertService.sweetalertWarning(error.error.status.messsage);
      });
    } else {
      data.isActive = 1;
      this.service.postCertificateMaster(data).subscribe((res) => {
        console.log(res);
        this.summary.push(res.data.results[0]);
        this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
        this.reset();
      }, (error: any) => {
        console.log();
        this.alertService.sweetalertWarning(error.error.status.messsage);
      });
    }
  }

  edit(item, index) {
    this.form.enable();
    if (item.isActive === 1) {
      item.isActive = true;
    } else {
      item.isActive = false;
    }
    this.form.patchValue(item);
    this.feesRenewableValidation();
    this.summaryIndex = index;
  }

  reset() {
    this.form.reset();
    this.form.enable();
    this.cancelButtonShow = false;
    this.feesRenewableValidation();
    this.form.patchValue({
      verificationReqiured: false,
      renewable: false,
      isActive: true,
    });
  }

  view(item) {
    this.edit(item, null);
    this.form.disable();
    this.cancelButtonShow = true;
    this.feesRenewableValidation();
  }
}
