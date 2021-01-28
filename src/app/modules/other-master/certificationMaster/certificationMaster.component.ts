import { OtherMasterService } from './../other-master.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';


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
  currency: string;

  constructor(private formBuilder: FormBuilder,
    private service: OtherMasterService) {
    this.form = this.formBuilder.group({
      certificateMasterId:  new FormControl(0),
      certificateName: new FormControl(null, Validators.required),
      certificateCode: new FormControl(null),
      verificationReqiured: new FormControl(false),
      renewable: new FormControl(false),
      certificateRenewableCycle: new FormControl(true),
      feesRenewableCycle: new FormControl(true),
      amount: new FormControl(null),
    })
  }

  ngOnInit() {
    console.log(this.form.value);
    this.currency = 'INR';
    this.service.getCertificateMaster().subscribe(res => {
      console.log(res);
      //this.currencyArray = res.data.results;
    });
  const abc = this.service.getCompanyGroupMaster();
  console.log(abc)

  }

}


