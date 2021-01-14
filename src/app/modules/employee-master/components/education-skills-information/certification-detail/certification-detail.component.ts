import { Component, OnInit, ViewEncapsulation, ViewChild, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { EventEmitterService } from '../../../employee-master-services/event-emitter/event-emitter.service';
import { employeeEducationRequest, employeeSkillDetailsRequest, employeeLanguageRequest, employeeCertificateRequest } from '../../../dto-models/educatio-skills.model';
import { ConfirmationModalComponent } from '../../../shared modals/confirmation-modal/confirmation-modal.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EducationSkillsInformationService } from '../../../employee-master-services/education-skills-information.service';
import { SharedInformationService } from '../../../employee-master-services/shared-service/shared-information.service';
import { PreviousEmploymentInformationService } from './../../../employee-master-services/previous-employment-information/previous-employment-information.service';


var certificateNameArray = [
  {
    certificateMasterMappingId: "5",
    certificateName: "Java",
    renewalFeesCurrency: "£-JEP",
    renewalFees: "2523",
    renewable: "0",

  },
  {
    certificateMasterMappingId: "2",
    certificateName: "Angular",
    renewalFeesCurrency: "₹-INR",
    renewalFees: "4532",
    renewable: "1"
  },
  {
    certificateMasterMappingId: "3",
    certificateName: "C++",
    renewalFeesCurrency: "$-KYD",
    renewalFees: "652",
    renewable: "0"
  },
  {
    certificateMasterMappingId: "4",
    certificateName: "NodeJS",
    renewalFeesCurrency: "$-BND",
    renewalFees: "1241",
    renewable: "1"
  },
];


@Component({
  selector: 'app-certification-detail',
  templateUrl: './certification-detail.component.html',
  styleUrls: ['./certification-detail.component.scss']
})
export class CertificationDetailComponent implements OnInit {

  CertificateInfoForm: FormGroup;
  currencyArray: Array<any> = [];
  filteredCurrencyArray: Array<any> = [];
  date = { startDate: "", endDate: "" }
  addPush: boolean;
  public employeeCertificateRequestModel = new employeeCertificateRequest('', '', '', '', '', '', '', '', '', '', '', '', '', '');
  tomorrow = new Date();
  // certificateNameList: Array<any> = [];
  certificateNameList: Array<any> = [];
  filteredCertificateList: Array<any> = [];
  CertificateMappingList: Array<any> = [];
  CertificateAllList: Array<any> = [];
  ToFilteredCertificateAllList: Array<any> = [];
  certificateItem: any;
  certificateSummaryGridData: Array<any> = [];
  employeeMasterId: number;
  certificateEditFlag: boolean = false;
  certificateViewFlag: boolean = false;
  certificateId: number;
  certificateModel: any;
  renewableModel: any;



  constructor(private formBuilder: FormBuilder, public datepipe: DatePipe,
    private EventEmitterService: EventEmitterService,
    public dialog: MatDialog,
    private matDialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private EducationSkillsInformationService: EducationSkillsInformationService,
    private CommonDataService: SharedInformationService,
    private PreviousEmpInformationService: PreviousEmploymentInformationService) { }

  ngOnInit(): void {
    this.CertificateInfoForm = this.formBuilder.group({
      cerificateName: ['', Validators.required],
      cerificateNumber: [''],
      renewable: [''],
      renewalCertificationDate: [''],
      renewalValidityFromDate: [''],
      renewalValidityToDate: [''],
      renewalValidityRemark: [''],
      renewalFeesValidityFromDate: [''],
      renewalFeesValidityToDate: [''],
      renewalFeesValidityRemark: [''],
      renewalFeesCurrency: [''],
      renewalFees: [''],
      languageSpeak: [''],
    });
    const temp2 = this.CertificateInfoForm.get('renewable');
    temp2.disable();

    // const temp7 = this.CertificateInfoForm.get('renewalFeesCurrency');
    // temp7.disable();
    // const temp8 = this.CertificateInfoForm.get('renewalFees');
    // temp8.disable();

    this.certificateNameList = certificateNameArray;
    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);

    this.getCertificateMapping();
    this.getAllCertificateSummary();
    this.getCertificateMapping()
    this.PreviousEmpInformationService.getCurrencyList().subscribe(res => {

      this.currencyArray = res.data.results;
    })
  }



  getCertificateList() {

    this.EducationSkillsInformationService.getAllCertificates().subscribe(res => {
      

      this.CertificateMappingList.forEach(element1 => {
        res.data.results.forEach(element2 => {
          if (element1.certificateMasterId == element2.certificateMasterId) {
            this.ToFilteredCertificateAllList.push(element2);
          }
        })
      })
      console.log(this.ToFilteredCertificateAllList);

    })
  }

  getCertificateMapping() {

    this.EducationSkillsInformationService.getAllCertificateMapping().subscribe(res => {
      
      this.ToFilteredCertificateAllList = res.data.results;
      // this.getCertificateList();
    })
  }

  getAllCertificateSummary() {

    this.EducationSkillsInformationService.getAllCertificateSummary(this.employeeMasterId).subscribe(res => {
      
      this.certificateSummaryGridData = res.data.results[0];
      console.log((this.certificateSummaryGridData));

      this.certificateSummaryGridData.forEach(element => {
        if (element.renewable == 0) {
          element.renewable = 'No';
        }
        if (element.renewable == 1) {
          element.renewable = 'Yes';
        }
      })
    })
  }

  postCertificateForm(employeeCertificateRequestModel) {
    
    employeeCertificateRequestModel.employeeMasterId = this.employeeMasterId
    employeeCertificateRequestModel.renewalCertificationDate = this.datepipe.transform(employeeCertificateRequestModel.renewalCertificationDate, 'dd-MMM-yyyy');
    employeeCertificateRequestModel.renewalValidityFromDate = this.datepipe.transform(employeeCertificateRequestModel.renewalValidityFromDate, 'dd-MMM-yyyy');
    employeeCertificateRequestModel.renewalValidityToDate = this.datepipe.transform(employeeCertificateRequestModel.renewalValidityToDate, 'dd-MMM-yyyy');
    employeeCertificateRequestModel.renewalFeesValidityFromDate = this.datepipe.transform(employeeCertificateRequestModel.renewalFeesValidityFromDate, 'dd-MMM-yyyy');
    employeeCertificateRequestModel.renewalFeesValidityToDate = this.datepipe.transform(employeeCertificateRequestModel.renewalFeesValidityToDate, 'dd-MMM-yyyy');

    var y: number = +employeeCertificateRequestModel.certificateMasterMappingId;
    employeeCertificateRequestModel.certificateMasterMappingId = y;
    if (this.renewableModel == 'no') {
      this.employeeCertificateRequestModel.renewable = 0;
    }
    if (this.renewableModel == 'yes') {
      this.employeeCertificateRequestModel.renewable = 1;
    }
    this.EducationSkillsInformationService.postCertificateInfoForm(employeeCertificateRequestModel).subscribe(res => {

      this.getAllCertificateSummary();
      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
      this.resetCertificateForm();
      this.employeeCertificateRequestModel.certificateMasterMappingId = null;
      this.employeeCertificateRequestModel.employeeCertificateId = null;
    }, (error: any) => {
      this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
    })
  }

  updateCertificateForm(employeeCertificateRequestModel) {
    
    employeeCertificateRequestModel.employeeMasterId = this.employeeMasterId
    employeeCertificateRequestModel.renewalCertificationDate = this.datepipe.transform(employeeCertificateRequestModel.renewalCertificationDate, 'dd-MMM-yyyy');
    employeeCertificateRequestModel.renewalValidityFromDate = this.datepipe.transform(employeeCertificateRequestModel.renewalValidityFromDate, 'dd-MMM-yyyy');
    employeeCertificateRequestModel.renewalValidityToDate = this.datepipe.transform(employeeCertificateRequestModel.renewalValidityToDate, 'dd-MMM-yyyy');
    employeeCertificateRequestModel.renewalFeesValidityFromDate = this.datepipe.transform(employeeCertificateRequestModel.renewalFeesValidityFromDate, 'dd-MMM-yyyy');
    employeeCertificateRequestModel.renewalFeesValidityToDate = this.datepipe.transform(employeeCertificateRequestModel.renewalFeesValidityToDate, 'dd-MMM-yyyy');

    var y: number = +employeeCertificateRequestModel.certificateMasterMappingId;
    employeeCertificateRequestModel.certificateMasterMappingId = y;
    if (this.renewableModel == 'no') {
      this.employeeCertificateRequestModel.renewable = 0;
    }
    if (this.renewableModel == 'yes') {
      this.employeeCertificateRequestModel.renewable = 1;
    }

    this.EducationSkillsInformationService.putCertificateInfoForm(employeeCertificateRequestModel).subscribe(res => {

      this.getAllCertificateSummary();
      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
      this.employeeCertificateRequestModel.employeeCertificateId = 0;
      this.resetCertificateForm();
      this.employeeCertificateRequestModel.certificateMasterMappingId = null;
      this.employeeCertificateRequestModel.employeeCertificateId = null;
    }, (error: any) => {
      this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
    })

  }

  onSelectionName(certificate) {
    
    this.employeeCertificateRequestModel.cerificateNumber = '';
    if (certificate.certificateMasterDetails.renewable == false) {
      this.renewableModel = 'no';
      // this.employeeCertificateRequestModel.renewable = 0;
    }
    if (certificate.certificateMasterDetails.renewable == true) {
      this.renewableModel = 'yes';
      // this.employeeCertificateRequestModel.renewable = 1;
    }
    // this.employeeCertificateRequestModel.renewalFeesCurrency = certificate.certificateMasterDetails.renewalFeesCurrency;
    // this.employeeCertificateRequestModel.renewalFees = certificate.certificateMasterDetails.amount;
    this.employeeCertificateRequestModel.certificateMasterMappingId = certificate.certificateMasterMappingId;

    // setTimeout(() => {
    //   this.certificateModel = certificate.certificateMasterDetails.certificateName;
    // }, 200)
  }


  editCertificate(certificate) {

    this.certificateEditFlag = true;
    this.certificateViewFlag = false;

    this.EducationSkillsInformationService.getCertificateById(certificate.employeeCertificateId).subscribe(res => {
      
      this.employeeCertificateRequestModel.renewalFeesValidityFromDate = res.data.results[0].renewalFeesValidityFromDate;
      this.employeeCertificateRequestModel.renewalCertificationDate = res.data.results[0].renewalCertificationDate;
      this.employeeCertificateRequestModel.renewalFeesValidityToDate = res.data.results[0].renewalFeesValidityToDate;
      this.employeeCertificateRequestModel.renewalFeesCurrency = res.data.results[0].renewalFeesCurrency;
      this.employeeCertificateRequestModel.renewalFees = res.data.results[0].renewalFees;
      this.employeeCertificateRequestModel.renewalValidityFromDate = res.data.results[0].renewalValidityFromDate;
      this.employeeCertificateRequestModel.renewalValidityToDate = res.data.results[0].renewalValidityToDate;
      this.employeeCertificateRequestModel.renewalValidityRemark = res.data.results[0].renewalValidityRemark;
      this.employeeCertificateRequestModel.renewalFeesValidityRemark = res.data.results[0].renewalFeesValidityRemark;
      this.employeeCertificateRequestModel.cerificateNumber = res.data.results[0].cerificateNumber;
      this.employeeCertificateRequestModel.certificateMasterMappingId = res.data.results[0].certificateMasterMappingId;
      this.employeeCertificateRequestModel.employeeCertificateId = res.data.results[0].employeeCertificateId;
      this.certificateModel = res.data.results[0].certificateMasterMapping;

      if (res.data.results[0].renewable == 0) {
        this.renewableModel = 'no';
        this.disableForm();
        const temp1 = this.CertificateInfoForm.get('cerificateName');
        temp1.enable();
        const temp12 = this.CertificateInfoForm.get('cerificateNumber');
        temp12.enable();
      }
      if (res.data.results[0].renewable == 1) {
        this.renewableModel = 'yes'
      }
    })

    this.enableForm();
  }

  viewCertificateRow(certificate) {

    this.certificateEditFlag = false;
    this.certificateViewFlag = true;

    this.EducationSkillsInformationService.getCertificateById(certificate.employeeCertificateId).subscribe(res => {
      
      this.employeeCertificateRequestModel.renewalFeesValidityFromDate = res.data.results[0].renewalFeesValidityFromDate;
      this.employeeCertificateRequestModel.renewalCertificationDate = res.data.results[0].renewalCertificationDate;
      this.employeeCertificateRequestModel.renewalFeesValidityToDate = res.data.results[0].renewalFeesValidityToDate;
      this.employeeCertificateRequestModel.renewalFeesCurrency = res.data.results[0].renewalFeesCurrency;
      this.employeeCertificateRequestModel.renewalFees = res.data.results[0].renewalFees;
      this.employeeCertificateRequestModel.renewalValidityFromDate = res.data.results[0].renewalValidityFromDate;
      this.employeeCertificateRequestModel.renewalValidityToDate = res.data.results[0].renewalValidityToDate;
      this.employeeCertificateRequestModel.renewalValidityRemark = res.data.results[0].renewalValidityRemark;
      this.employeeCertificateRequestModel.renewalFeesValidityRemark = res.data.results[0].renewalFeesValidityRemark;
      this.employeeCertificateRequestModel.cerificateNumber = res.data.results[0].cerificateNumber;
      this.employeeCertificateRequestModel.certificateMasterMappingId = res.data.results[0].certificateMasterMappingId;
      this.employeeCertificateRequestModel.employeeCertificateId = res.data.results[0].employeeCertificateId;

      if (res.data.results[0].renewable == 0) {
        this.renewableModel = 'no'
      } else {
        this.renewableModel = 'yes'
      }
    })

    this.disableForm();
  }

  cancelCertificateView() {
    this.certificateEditFlag = false;
    this.certificateViewFlag = false;
    this.resetCertificateForm();
    this.employeeCertificateRequestModel.certificateMasterMappingId = null;
    this.employeeCertificateRequestModel.employeeCertificateId = null;
    this.getAllCertificateSummary();
  }

  filterCertificate(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.ToFilteredCertificateAllList.length; i++) {
      let country = this.ToFilteredCertificateAllList[i];
      if (country.certificateMasterDetails.certificateName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredCertificateList = filtered;
  }

  filterCurrency(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.currencyArray.length; i++) {
      let country = this.currencyArray[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredCurrencyArray = filtered;
  }

  resetCertificateForm() {
    this.CertificateInfoForm.reset();
    this.employeeCertificateRequestModel.certificateMasterMappingId = null;
    this.employeeCertificateRequestModel.employeeCertificateId = null;
  }

  disableForm() {
    const temp1 = this.CertificateInfoForm.get('cerificateName');
    temp1.disable();
    const temp2 = this.CertificateInfoForm.get('renewable');
    temp2.disable();
    const temp3 = this.CertificateInfoForm.get('renewalCertificationDate');
    temp3.disable();
    const temp4 = this.CertificateInfoForm.get('renewalValidityFromDate');
    temp4.disable();
    const temp5 = this.CertificateInfoForm.get('renewalValidityToDate');
    temp5.disable();
    const temp6 = this.CertificateInfoForm.get('renewalValidityRemark');
    temp6.disable();
    const temp7 = this.CertificateInfoForm.get('renewalFeesCurrency');
    temp7.disable();
    const temp8 = this.CertificateInfoForm.get('renewalFees');
    temp8.disable();
    const temp9 = this.CertificateInfoForm.get('renewalFeesValidityFromDate');
    temp9.disable();
    const temp10 = this.CertificateInfoForm.get('renewalFeesValidityToDate');
    temp10.disable();
    const temp11 = this.CertificateInfoForm.get('renewalFeesValidityRemark');
    temp11.disable();
    const temp12 = this.CertificateInfoForm.get('cerificateNumber');
    temp12.disable();
  }

  enableForm() {
    const temp1 = this.CertificateInfoForm.get('cerificateName');
    temp1.enable();
    const temp12 = this.CertificateInfoForm.get('cerificateNumber');
    temp12.enable();
    const temp3 = this.CertificateInfoForm.get('renewalCertificationDate');
    temp3.enable();
    const temp4 = this.CertificateInfoForm.get('renewalValidityFromDate');
    temp4.enable();
    const temp5 = this.CertificateInfoForm.get('renewalValidityToDate');
    temp5.enable();
    const temp6 = this.CertificateInfoForm.get('renewalValidityRemark');
    temp6.enable();
    const temp7 = this.CertificateInfoForm.get('renewalFeesCurrency');
    temp7.enable();
    const temp8 = this.CertificateInfoForm.get('renewalFees');
    temp8.enable();
    const temp9 = this.CertificateInfoForm.get('renewalFeesValidityFromDate');
    temp9.enable();
    const temp10 = this.CertificateInfoForm.get('renewalFeesValidityToDate');
    temp10.enable();
    const temp11 = this.CertificateInfoForm.get('renewalFeesValidityRemark');
    temp11.enable();
  }
}
