import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MyInvestmentsService } from '../../../my-Investments.service';
import { LandingPageService } from '../../landing-page.service';

@Component({
  selector: 'app-hra-exemption',
  templateUrl: './hra-exemption.component.html',
  styleUrls: ['./hra-exemption.component.scss']
})
export class HraExemptionComponent implements OnInit {

  @Input()
  modalRef: BsModalRef
  isrentuphouse: boolean = false;
  isrentupexemp: boolean = false;
  ismaxbenhouse: boolean = false;
  ismaxbenexemp: boolean = false;
  rentalUpdated: Array<any> = [];
  countriesList: Array<any> = [];
  pinCode: number;
  public submitted = false;
  public hraExemption: FormGroup;
  basicDearnessAllowance: number;
  houseRentalAllowance: number;
  houseRental: number;
  percentBDAllowance: number;
  hrAndPercentBDA: number;
  exemptAmount: number;


  constructor(public modalService: BsModalService,
    private service: LandingPageService,
    private formBuilder: FormBuilder,
    private investmentService: MyInvestmentsService) { }

  ngOnInit(): void {
    debugger
    this.getHRAExemption();
    this.hraExemption = this.formBuilder.group({
      month: new FormControl(null, Validators.required),
      country: new FormControl({ value: 'India', disabled: true }),
      pinCode: new FormControl(null, Validators.required),
      city: new FormControl({ value: null, disabled: true }),
      metro: new FormControl({ value: null, disabled: true })
    })

  }

  rentuphouse() {
    console.log('hi');
    this.isrentuphouse = true;
    this.isrentupexemp = false;
    this.ismaxbenhouse = false;
    this.ismaxbenexemp = false;
  }

  rentupexemp() {
    console.log('hi');
    this.isrentuphouse = false;
    this.isrentupexemp = true;
    this.ismaxbenhouse = false;
    this.ismaxbenexemp = false;

  }

  maxbenhouse() {
    console.log('hi');
    this.isrentuphouse = false;
    this.isrentupexemp = false;
    this.ismaxbenhouse = true;
    this.ismaxbenexemp = false;
  }

  maxbenexemp() {
    console.log('hi');
    this.isrentuphouse = false;
    this.isrentupexemp = false;
    this.ismaxbenhouse = false;
    this.ismaxbenexemp = true;

  }
  showPopUp(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template, Object.assign({}, { class: "gray modal-xl" }
      ))
  }

  getHRAExemption() {
    this.service.HRAExumptionMonthlyAnnual().subscribe((res) => {
      this.rentalUpdated = res.data.results[0];
    });
  }
  getContryList() {
    this.investmentService.getCountryList().subscribe((res) => {
      this.countriesList = res.data.results.filter(e => e == "India");
    });
  }
  getInfoByPinCode1() {
    debugger
    this.hraExemption.get('city').patchValue('');
    this.hraExemption.get('metro').patchValue('');
    this.pinCode = this.hraExemption.get("pinCode").value;
    this.service.getInfoByPinCode(this.pinCode).subscribe((res) => {
      res.data.results[0].forEach(element => {
        if (element.isMetro == 'Metro') {
          this.hraExemption.get('city').patchValue(element.taluka);
          this.hraExemption.get('metro').patchValue(element.isMetro);
        }
      });
      if (this.hraExemption.get('city').value != 'Metro') {
        this.hraExemption.get('city').patchValue(res.data.results[0][0].taluka);
        this.hraExemption.get('metro').patchValue(res.data.results[0][0].isMetro);
      }
    })
  }
  showData() {
    debugger
    this.submitted = true;
    if (this.hraExemption.invalid) {
      return;
    }
    let isMetro = 'no';
    if (this.hraExemption.get('metro').value == 'Metro') {
      isMetro = 'yes';
    }
    const data = {
      "monthCycleId": 94,
      "pincode": this.hraExemption.get('pinCode').value,
      "city": this.hraExemption.get('city').value,
      "metro": isMetro
    }
    this.service.hraMaxBenefit(data).subscribe((res) => {
      console.log(res);
      this.basicDearnessAllowance = res.data.results;
      this.houseRentalAllowance = res.data.results;
      this.houseRental = res.data.results;
      this.percentBDAllowance = res.data.results;
      this.hrAndPercentBDA = res.data.results;
      this.exemptAmount = res.data.results;
    })
  }
}