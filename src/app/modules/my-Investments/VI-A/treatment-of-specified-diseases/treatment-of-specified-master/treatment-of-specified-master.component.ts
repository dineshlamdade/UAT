import { DatePipe, DOCUMENT } from '@angular/common';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import {
  Component,
  HostListener,
  Inject,
  Input,
  OnInit,
  Optional,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { startOfYear } from 'date-fns';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { FileService } from '../../../file.service';
import { MyInvestmentsService } from '../../../my-Investments.service';
import { TreatmentOfSpecifiedService } from '../treatment-of-specified.service';

@Component({
  selector: 'app-treatment-of-specified-master',
  templateUrl: './treatment-of-specified-master.component.html',
  styleUrls: ['./treatment-of-specified-master.component.scss'],
})
export class TreatmentOfSpecifiedMasterComponent implements OnInit {
  public enteredRemark = '';
  @Input() public specifiedDiseaseMasterId: any;
  public showdocument = true;
  public modalRef: BsModalRef;
  public submitted = false;
  public visibilityFlag = false;
  public pdfSrc =
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
  public pdfSrc1 = 'https://www.gstatic.com/webp/gallery/1.jpg';
  public name = 'Set iframe source';
  public urlSafe: SafeResourceUrl;
  public summarynew: any = {};
  public summaryGridData: Array<any> = [];
  public summaryComputationGridDate: any;
  public masterGridData: Array<any> = [];
  public paymentDetailGridData: Array<any> = [];
  public declarationGridData: Array<any> = [];
  public familyMemberGroup: Array<any> = [];
  public frequencyOfPaymentList: Array<any> = [];
  public specifiedDiseaseNameList: Array<any> = [];
  public neurologicalDiseaseNameList: Array<any> = [];
  public institutionNameList: Array<any> = [];
  public transactionDetail: Array<any> = [];
  public documentDetailList: Array<any> = [];
  public uploadGridData: Array<any> = [];
  public transactionInstitutionNames: Array<any> = [];
  public editTransactionUpload: Array<any> = [];
  public transactionPolicyList: Array<any> = [];
  public transactionInstitutionListWithPolicies: Array<any> = [];
  public familyMemberName: Array<any> = [];
  public urlArray: Array<any> = [];
  public urlIndex: number;
  public glbalECS: number;
  public form: FormGroup;
  public Index: number;
  public showUpdateButton: boolean;
  public isShowNurological: boolean;
  userAgeBracket: any;
  
  public tabIndex = 0;
  public radioSelected: string;
  public familyRelationSame: boolean;

  public isEdit: boolean = false;

  documentPassword = [];
  remarkList = [];
  documentDataArray = [];
  filesUrlArray = [];


  documentArray: any[] = [];
  isVisibleTable = false;

  viewDocumentName: any;
  viewDocumentType: any;


  public documentRemark: any;
  public isECS = true;

  public masterfilesArray: File[] = [];
  public receiptNumber: number;
  public receiptAmount: string;
  public receiptDate: Date;
  public selectedInstitution: string;
  public policyDuplicate: string;
  public sumDeclared: any;
  public enableCheckboxFlag2: any;
  public greaterDateValidations: boolean;
  public policyMinDate: Date;
  public paymentDetailMinDate: Date;
  public paymentDetailMaxDate: Date;
  public minFormDate: Date;
  public maxFromDate: Date;
  public financialYearStart: Date;
  public employeeJoiningDate: Date;
  public windowScrolled: boolean;
  public addNewRowId: number;
  public declarationTotal: number;
  public declaredAmount: number;
  public actualTotal: number;
  public actualAmount: number;
  public hideRemarkDiv: boolean;
  public hideRemoveRow: boolean;
  public isClear: boolean;
  public isCancel: boolean;

  public isShowCancel: boolean;
  public isShowSave: boolean;
  public isShowUpdate: boolean;

  public today = new Date();
  public proofSubmissionId = '';
  public transactionStatustList: any;
  public globalInstitution: String = 'ALL';
  public globalPolicy: String = 'ALL';
  public globalTransactionStatus: String = 'ALL';

  public globalAddRowIndex: number;
  public globalSelectedAmount: string;
  summaryDetails: any;
  indexCount: any;
  editRemarkData: any;
  public remarkCount : any;
  selectedremarkIndex : any;
  currentJoiningDate: Date;
  documentRemarkList: any;

  constructor(
    private formBuilder: FormBuilder,
    private Service: MyInvestmentsService,
    private datePipe: DatePipe,
    private http: HttpClient,
    private fileService: FileService,
    private treatmentOfSpecifiedService: TreatmentOfSpecifiedService,
    private numberFormat: NumberFormatPipe,
    public dialog: MatDialog,
    private modalService: BsModalService,
    private alertService: AlertServiceService,
    @Inject(DOCUMENT) private document: Document,
    public sanitizer: DomSanitizer
  ) {
    this.form = this.formBuilder.group({
      familyMemberInfoId: new FormControl(null, Validators.required),
      patientName: new FormControl(null, Validators.required),
      relationship: new FormControl({ value: null, disabled: true }, Validators.required),
      ageBracket: new FormControl({ value: null, disabled: true }, Validators.required),
      neurologicalDiseaseName: new FormControl(null, Validators.required),
      specifiedDiseaseName: new FormControl(null, Validators.required),
      proofSubmissionId: new FormControl(''),
      specifiedDiseaseMasterId: new FormControl(''),
      remark: new FormControl(null),
    });

    (this.specifiedDiseaseNameList = [
      { label: 'Malignant Cancers', value: 'Malignant Cancers' },
      {
        label: 'Full-Blown Acquired Immuno-Deficiency Syndrome (AIDS)',
        value: 'Full-Blown Acquired Immuno-Deficiency Syndrome (AIDS)',
      },
      { label: 'Chronic Renal failure', value: 'Chronic Renal failure' },
      {
        label: 'Hematological disorders - Hemophilia',
        value: 'Hematological disorders - Hemophilia',
      },
      {
        label: 'Hematological disorders - Thalassaemia',
        value: 'Hematological disorders - Thalassaemia',
      },
      {
        label:
          'Neurological diseases with disability level >=40% per cent and above',
        value:
          'Neurological diseases with disability level >=40% per cent and above',
      },
    ]),
      (this.neurologicalDiseaseNameList = [
        { label: 'Dementia', value: 'Dementia' },
        {
          label: 'Dystonia Musculorum Deformans',
          value: 'Dystonia Musculorum Deformans',
        },
        { label: 'Motor Neuron Disease', value: 'Motor Neuron Disease' },
        { label: 'Ataxia', value: 'Ataxia' },
        { label: 'Chorea', value: 'Chorea' },
        { label: 'Hemiballismus', value: 'Hemiballismus' },
        { label: 'Aphasia', value: 'Aphasia' },
        { label: 'Parkinson', value: 'Parkinson' },
      ]);

    this.addNewRowId = 0;
    this.hideRemarkDiv = false;
    this.hideRemoveRow = false;
    this.isClear = false;
    this.isCancel = false;
    this.receiptAmount = this.numberFormat.transform(0);
    this.globalAddRowIndex = 0;
    this.globalSelectedAmount = this.numberFormat.transform(0);
  }

  public ngOnInit(): void {

    this.masterPage();
    this.isShowSave = true;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);

    //-------------- Business Financial Year API Call -------------------------------
    this.Service.getBusinessFinancialYear().subscribe((res) => {
      this.financialYearStart = res.data.results[0].fromDate;
    });

    //-------------- Family Member List API call ---------------------------
    this.Service.getFamilyInfo().subscribe((res) => {
      this.familyMemberGroup = res.data.results;
      console.log("familyMemberGroup", this.familyMemberGroup)
      res.data.results.forEach((element) => {
        const obj = {
          label: element.familyMemberName,
          value: element.familyMemberName,
        };
        this.familyMemberName.push(obj);
      });
    });

    this.deactivateRemark();

    //-------------------- Get All Institutes From Global Table -------------------------
    this.Service.getAllInstitutesFromGlobal().subscribe((res) => {
      res.data.results.forEach((element: { insurerName: any }) => {
        const obj = {
          label: element.insurerName,
          value: element.insurerName,
        };
        this.institutionNameList.push(obj);
      });
    });

    //------------------ Get All Previous Employer -----------------------------
    this.Service.getAllPreviousEmployer().subscribe((res) => {
      if (res.data.results.length > 0) {
        this.employeeJoiningDate = res.data.results[0].joiningDate;
      }
    });

    if (this.specifiedDiseaseMasterId != undefined || this.specifiedDiseaseMasterId != null) {
      const input = this.specifiedDiseaseMasterId;
      // console.log("edit", input)
      // this.editMaster(input);
      // console.log('editMaster patientName', input);
      this.editMaster(input.specifiedDiseaseMasterId);
      console.log('editMaster patientName', input.specifiedDiseaseMasterId);
    }

  }

  // ------------------------------------Master----------------------------

  //------------------- convenience getter for easy access to form fields -----------------
  get masterForm() {
    return this.form.controls;
  }

  //---------------- Get Master Page Data API call -----------------------
  masterPage() {
    this.treatmentOfSpecifiedService
      .getSpecifiedDiseaseMaster()
      .subscribe((res) => {
        console.log('masterGridData::', res);
        this.masterGridData = res.data.results;
        this.masterGridData.forEach((element) => {
          element.documentInformationList.forEach(element => {
            // if(element!=null)
            this.documentArray.push({
              'dateofsubmission': element.creatonTime,
              'documentType': element.documentType,
              'documentName': element.fileName,
              'documentPassword': element.documentPassword,
              'documentRemark': element.documentRemark,
              'status': element.status,
              'lastModifiedBy': element.lastModifiedBy,
              'lastModifiedTime': element.lastModifiedTime,

            })
          });
          this.documentArray.push({
            'dateofsubmission': element.creatonTime,
            'documentType': element.documentType,
            'documentName': element.fileName,
            'documentPassword': element.documentPassword,
            'documentRemark': element.documentRemark,
            'status': element.status,
            'lastModifiedBy': element.lastModifiedBy,
            'lastModifiedTime': element.lastModifiedTime,

          })
        });
      });
    // });
  }

  //-------------- Post Master Page Data API call -------------------
  public addMaster(formData: any, formDirective: FormGroupDirective): void {
    this.submitted = true;
    this.isShowCancel = false;
    this.isShowUpdate = false;
    this.isShowSave = true;
  

    if (this.masterForm.invalid) {
      return;
    }
    console.log('this.isEdit', this.isEdit);

    if (!this.isEdit) {
      if (this.masterfilesArray.length == 0 && this.documentArray.length == 0) {
        this.alertService.sweetalertWarning(
          'Treatment Of Specified Document needed to Create Master.'
        );
        return;
      }
    }

    // if (this.isEdit) {
    //   if (this.masterfilesArray.length == 0 && this.urlArray.length == 0) {
    //     this.alertService.sweetalertWarning(
    //       'Treatment Of Specified Document needed to Create Master.'
    //     );
    //     return;
    //   }
    // }
debugger
    for (let i = 0; i < this.masterfilesArray.length; i++) {
      if (this.remarkList[i] != undefined || this.remarkList[i] == undefined) {
        let remarksPasswordsDto = {};
        remarksPasswordsDto = {
          "documentType": "Back Statement/ Premium Reciept",
          "documentSubType": "",
          "remark": this.remarkList[i] ? this.remarkList[i] : '',
          "password": this.documentPassword[i] ? this.documentPassword[i] : ''
        };
        this.documentDataArray.push(remarksPasswordsDto);
      }
    }
    console.log('this.documentDataArray', this.documentDataArray);
    // else {
    // const data = this.form.getRawValue();

    // neurologicalDiseaseName: new FormControl(null),
    // specifiedDiseaseName:
    for(let i of  this.masterGridData) {
      if(i.patientName == this.masterForm.patientName.value ){
              this.alertService.sweetalertWarning(
           'Record for patient is already exist'
         );
         return;
      }
    }
    let data: any = {};
    if (this.form.controls.specifiedDiseaseName.value !== 'Neurological diseases with disability level >=40% per cent and above') {
      data = {
        specifiedDiseaseMasterId: this.masterForm.specifiedDiseaseMasterId.value,
        familyMemberInfoId: this.masterForm.familyMemberInfoId.value,
        patientName: this.masterForm.patientName.value,
        relationship: this.masterForm.relationship.value,
        // ageBracket: this.masterForm.ageBracket.value,
        neurologicalDiseaseName: '',
        specifiedDiseaseName: this.masterForm.specifiedDiseaseName.value,
      },
        data.proofSubmissionId = this.proofSubmissionId;
        data.remark = this.masterForm.remark.value;
        data.remarkPasswordList = this.documentDataArray;
    } else {
      data = {
        specifiedDiseaseMasterId: this.masterForm.specifiedDiseaseMasterId.value,
        familyMemberInfoId: this.masterForm.familyMemberInfoId.value,
        patientName: this.masterForm.patientName.value,
        relationship: this.masterForm.relationship.value,
        // ageBracket: this.masterForm.ageBracket.value,
        neurologicalDiseaseName: this.masterForm.neurologicalDiseaseName.value,
        specifiedDiseaseName: this.masterForm.specifiedDiseaseName.value,
      }
      data.proofSubmissionId = this.proofSubmissionId;
      data.remark = this.masterForm.remark.value;
      data.remarkPasswordList = this.documentDataArray;
    }
    delete data['ageBracket'];

    console.log('Treatment Of Specified Disease::', data);

    this.treatmentOfSpecifiedService.uploadMultipleMasterFiles(this.masterfilesArray, data)
      .subscribe((res) => {
        console.log(res);
        if (res) {
          if (res.data.results.length > 0) {
            this.isEdit = false;
            this.showdocument = false;
            this.masterGridData = res.data.results;
            if (res.data.results.length > 0) {
              this.masterGridData = res.data.results;

              this.alertService.sweetalertMasterSuccess(
                'Record saved Successfully.',
                'Go to "Transaction" Page to see Schedule.'
              );
              this.masterGridData.forEach((element, index) => {
                this.documentArray.push({

                  'dateofsubmission': new Date(),
                  'documentType': element.documentInformationList[0].documentType,
                  'documentName': element.documentInformationList[0].fileName,
                  'documentPassword': element.documentInformationList[0].documentPassword,
                  'documentRemark': element.documentInformationList[0].documentRemark,
                  'status': element.documentInformationList[0].status,
                  'approverName': element.documentInformationList[0].lastModifiedBy,
                  'Time': element.documentInformationList[0].lastModifiedTime,

                  // 'documentStatus' : this.premiumFileStatus,

                });

                if (element.documentInformationList[1]) {
                  this.documentArray.push({

                    'dateofsubmission': new Date(),
                    'documentType': element.documentInformationList[1].documentType,
                    'documentName': element.documentInformationList[1].fileName,
                    'documentPassword': element.documentInformationList[1].documentPassword,
                    'documentRemark': element.documentInformationList[1].documentRemark,
                    'status': element.documentInformationList[1].status,
                    'lastModifiedBy': element.documentInformationList[1].lastModifiedBy,
                    'lastModifiedTime': element.documentInformationList[1].lastModifiedTime,

                    // 'documentStatus' : this.premiumFileStatus,

                  });
                }
              });
            }

            this.alertService.sweetalertMasterSuccess(
              'Record saved Successfully.',
              'Go to "Transaction" Page to see Schedule.'
            );
          } else {
            this.alertService.sweetalertWarning(res.status.messsage);
          }
        } else {
          this.alertService.sweetalertError(
            'Something went wrong. Please try again.'
          );
        }
      });

    this.Index = -1;
    formDirective.resetForm();
    this.form.reset();
    this.documentDataArray = [];
    // this.form.get('active').setValue(true);
    // this.form.get('ecs').setValue(0);
    this.showUpdateButton = false;
    // this.paymentDetailGridData = [];
    this.urlArray = [];
    this.masterfilesArray = [];
    this.submitted = false;
    this.documentRemark = '';
    this.remarkList = [];
    this.documentPassword = [];
    this.isVisibleTable = false;
    this.isEdit = false;
    // }
  }


  //----------- On change Transactional Line Item Remark --------------------------
 public onChangeDocumentRemark(transactionDetail, transIndex, event) {
  console.log('event.target.value::', event.target.value);
  debugger
  this.editRemarkData =  event.target.value;
  
 console.log('this.transactionDetail', this.transactionDetail);
  // const index = this.editTransactionUpload[0].groupTransactionList.indexOf(transactionDetail);
  // console.log('index::', index);

  this.transactionDetail[0].interestOnSavingDeposit80TTTransactionList[transIndex].remark =  event.target.value;
 

}


onSaveRemarkDetails(summary, index){
    
  const data ={
    "transactionId": 0,
    "masterId":this.summaryDetails.specifiedDiseaseMasterId,
    "employeeMasterId":this.summaryDetails.employeeMasterId,
    "section":"VIA",
    "subSection":"SPECIFIEDDISEASE",
    "remark":this.editRemarkData,
    "proofSubmissionId":this.summaryDetails.proofSubmissionId,
    "role":"Employee",
    "remarkType":"Master"

  };
  this.Service
  .postLicMasterRemark(data)
  .subscribe((res) => {
    if(res.status.code == "200") {
      console.log(this.masterGridData);
      this.masterGridData[this.selectedremarkIndex].bubbleRemarkCount = res.data.results[0].bubbleRemarkCount;

      this.alertService.sweetalertMasterSuccess(
        'Remark Saved Successfully.',
        '',
   
      );
      this.enteredRemark = '';
      this.modalRef.hide();

    } else{
      this.alertService.sweetalertWarning("Something Went Wrong");
    }
  });
}



onResetRemarkDetails() {
  this.enteredRemark = '';
}


public docRemarkModal(
  documentViewerTemplate: TemplateRef<any>,
  index: any,
  specifiedDiseaseMasterId,
  summary, count
) {

  this.summaryDetails = summary;
  this.indexCount = count;
  this.selectedremarkIndex = count;
  this.treatmentOfSpecifiedService.getspecifiedDiseaseMasterRemarkList(
    specifiedDiseaseMasterId,
  ).subscribe((res) => {
    console.log('docremark', res);
    this.documentRemarkList  = res.data.results[0];
    this.remarkCount = res.data.results[0].length;
  });
  // console.log('documentDetail::', documentRemarkList);
  // this.documentRemarkList = this.selectedRemarkList;
  console.log('this.documentRemarkList', this.documentRemarkList);
  this.modalRef = this.modalService.show(
    documentViewerTemplate,
    Object.assign({}, { class: 'gray modal-s' })
  );
}



  onMasterUpload(event: { target: { files: string | any[] } }) {
    //console.log('event::', event);
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        this.masterfilesArray.push(file);
      }
    }
    //console.log('this.masterfilesArray::', this.masterfilesArray);
  }

  //----------------- Remove LicMaster Document -----------------------------
  removeSelectedLicMasterDocument(index: number) {
    this.masterfilesArray.splice(index, 1);
    console.log('this.filesArray::', this.masterfilesArray);
    console.log('this.filesArray.size::', this.masterfilesArray.length);
  }

  //----------- Family relationship shown on Policyholder selection ---------------
  OnSelectionfamilyMemberGroup() {
    const toSelect = this.familyMemberGroup.find(
      (c) => c.familyMemberName === this.form.get('patientName').value
    );
    debugger
    this.form.get('familyMemberInfoId').setValue(toSelect.familyMemberInfoId);
    this.form.get('relationship').setValue(toSelect.relation);
    this.form.get('ageBracket').setValue(toSelect.ageBracket);
    // this.userAgeBracket = toSelect.ageBracket;
    }

  //--------------- Deactivate the Remark -------------------
  deactivateRemark() {
    if (this.form.value.active === false) {
      // this.form.get('remark').enable();
      this.hideRemarkDiv = true;
      this.form.get('remark').setValidators([Validators.required]);
    } else {
      this.form.get('remark').clearValidators();
      this.hideRemarkDiv = false;
      // this.form.get('remark').disable();
      this.form.get('remark').reset();
    }
  }

  // //------------- On Master Edit functionality --------------------
  // editMaster(i: number) {
  //   this.scrollToTop();
  //   this.form.patchValue(this.masterGridData[i]);
  //   // console.log(this.form.getRawValue());
  //   this.Index = i;
  //   this.showUpdateButton = true;
  //   // console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
  //   this.form.get('proofSubmissionId').setValue(this.masterGridData[i].proofSubmissionId);
  //   this.isClear = true;
  //   this.proofSubmissionId =this.masterGridData[i].proofSubmissionId;
  //    this.urlArray = this.masterGridData[i].documentInformationList;
  //   // this.masterfilesArray = this.masterGridData[i].documentInformationList;
  // }


  // ------------- On Master Edit functionality --------------------
  public editMaster(specifiedDiseaseMasterId) {
    this.isVisibleTable = true
    this.isEdit = true;
    debugger
    this.isShowUpdate = true;
    this.isShowSave = false;
    this.isShowCancel = false;
    this.form.enable();
    this.form.get('relationship').disable();
    this.form.get('ageBracket').disable();
    this.scrollToTop();
    this.treatmentOfSpecifiedService.getSpecifiedDiseaseMaster().subscribe((res) => {
      console.log('masterGridData::', res);
      this.masterGridData = res.data.results;
      console.log(specifiedDiseaseMasterId);
      const obj = this.findByPolicyNo(specifiedDiseaseMasterId, this.masterGridData);
debugger
      // Object.assign({}, { class: 'gray modal-md' }),
      console.log('Edit Master', obj);
      if (obj != 'undefined' && obj.neurologicalDiseaseName == "") {
      
        this.form.patchValue(obj);
        this.visibilityFlag = false;
        this.Index = obj.specifiedDiseaseMasterId;
        this.showUpdateButton = true;
        this.isClear = true;
        // this.urlArray = obj.doctorCertificate;
        this.filesUrlArray = obj.doctorCertificate;
        this.proofSubmissionId = obj.proofSubmissionId;
        this.showdocument = false;
        this.documentArray = [];
        obj.doctorCertificate.forEach(element => {
          this.documentArray.push({
            'dateofsubmission': element.creatonTime,
            'documentType': element.documentType,
            'documentName': element.fileName,
            'documentPassword': element.documentPassword,
            'documentRemark': element.documentRemark,
            'status': element.status,
            'lastModifiedBy': element.lastModifiedBy,
            'lastModifiedTime': element.lastModifiedTime,

          })

        });
        console.log("documentArray::", this.documentArray);
        this.isVisibleTable = true;
      }else if(obj != 'undefined'){
                this.form.patchValue(obj);
        this.visibilityFlag = true;
        this.Index = obj.specifiedDiseaseMasterId;
        this.showUpdateButton = true;
        this.isClear = true;
        // this.urlArray = obj.doctorCertificate;
        this.filesUrlArray = obj.doctorCertificate;
        this.proofSubmissionId = obj.proofSubmissionId;
        this.showdocument = false;
        this.documentArray = [];
        obj.doctorCertificate.forEach(element => {
          this.documentArray.push({
            'dateofsubmission': element.creatonTime,
            'documentType': element.documentType,
            'documentName': element.fileName,
            'documentPassword': element.documentPassword,
            'documentRemark': element.documentRemark,
            'status': element.status,
            'lastModifiedBy': element.lastModifiedBy,
            'lastModifiedTime': element.lastModifiedTime,

          })

        });
        console.log("documentArray::", this.documentArray);
        this.isVisibleTable = true;
      }
    });
  }
  //View Master Functionality

  public viewMaster(specifiedDiseaseMasterId) {
    this.form.disable();
    this.isVisibleTable = true
    this.isEdit = true;
    this.isShowUpdate = true;
    this.isShowSave = false;
    this.isShowCancel = false;
    this.form.enable();
    this.form.get('relationship').disable();
    this.form.get('ageBracket').disable();
    this.scrollToTop();
    this.treatmentOfSpecifiedService.getSpecifiedDiseaseMaster().subscribe((res) => {
      console.log('masterGridData::', res);
      this.masterGridData = res.data.results;
      console.log(specifiedDiseaseMasterId);
      const obj = this.findByPolicyNo(specifiedDiseaseMasterId, this.masterGridData);

      // Object.assign({}, { class: 'gray modal-md' }),
      console.log('Edit Master', obj);
      if (obj != 'undefined' && obj.neurologicalDiseaseName == "") {
      
        this.form.patchValue(obj);
        this.visibilityFlag = false;
        this.Index = obj.specifiedDiseaseMasterId;
        this.showUpdateButton = true;
        this.isClear = true;
        // this.urlArray = obj.doctorCertificate;
        this.filesUrlArray = obj.doctorCertificate;
        this.proofSubmissionId = obj.proofSubmissionId;
        this.showdocument = false;
        this.documentArray = [];
        obj.doctorCertificate.forEach(element => {
          this.documentArray.push({
            'dateofsubmission': element.creatonTime,
            'documentType': element.documentType,
            'documentName': element.fileName,
            'documentPassword': element.documentPassword,
            'documentRemark': element.documentRemark,
            'status': element.status,
            'lastModifiedBy': element.lastModifiedBy,
            'lastModifiedTime': element.lastModifiedTime,

          })

        });
        console.log("documentArray::", this.documentArray);
        this.isVisibleTable = true;
      }else if(obj != 'undefined'){
                this.form.patchValue(obj);
        this.visibilityFlag = true;
        this.Index = obj.specifiedDiseaseMasterId;
        this.showUpdateButton = true;
        this.isClear = true;
        // this.urlArray = obj.doctorCertificate;
        this.filesUrlArray = obj.doctorCertificate;
        this.proofSubmissionId = obj.proofSubmissionId;
        this.showdocument = false;
        this.documentArray = [];
        obj.doctorCertificate.forEach(element => {
          this.documentArray.push({
            'dateofsubmission': element.creatonTime,
            'documentType': element.documentType,
            'documentName': element.fileName,
            'documentPassword': element.documentPassword,
            'documentRemark': element.documentRemark,
            'status': element.status,
            'lastModifiedBy': element.lastModifiedBy,
            'lastModifiedTime': element.lastModifiedTime,

          })

        });
        console.log("documentArray::", this.documentArray);
        this.isVisibleTable = true;
      }
    });
  }

  // // -------------On Master view functionality not working
  // public viewMasters(specifiedDiseaseMasterId) {
  //   this.form.disable();
  //   this.isShowSave = false;
  //   this.isShowCancel = true;
  //   this.isShowUpdate = false;
  //   this.isEdit = true;
  //   this.scrollToTop();
  //   this.treatmentOfSpecifiedService.getSpecifiedDiseaseMaster().subscribe((res) => {
  //     console.log('masterGridData::', res);
  //     this.masterGridData = res.data.results;
  //     console.log(specifiedDiseaseMasterId);
  //     const obj = this.findByPolicyNo(this.specifiedDiseaseMasterId, this.masterGridData);

  //     // Object.assign({}, { class: 'gray modal-md' }),
  //     console.log('Edit Master', obj);
  //     if (obj != 'undefined') {
  //       // this.paymentDetailGridData = obj.paymentDetails;
  //       this.form.patchValue(obj);
  //       this.visibilityFlag = true;
  //       this.Index = obj.specifiedDiseaseMasterId;
  //       this.showUpdateButton = true;
  //       this.isClear = true;
  //       // this.urlArray = obj.doctorCertificate;
  //       this.filesUrlArray = obj.documentInformationList;
  //       this.proofSubmissionId = obj.proofSubmissionId;
  //       this.showdocument = false;
  //       this.documentArray = [];
  //       obj.documentInformationList.forEach(element => {
  //         this.documentArray.push({
  //           'dateofsubmission': element.creatonTime,
  //           'documentType': element.documentType,
  //           'documentName': element.fileName,
  //           'documentPassword': element.documentPassword,
  //           'documentRemark': element.documentRemark,
  //           'status': element.status,
  //           'lastModifiedBy': element.lastModifiedBy,
  //           'lastModifiedTime': element.lastModifiedTime,

  //         })

  //       });
  //       console.log("documentArray::", this.documentArray);
  //       this.isVisibleTable = true;
  //     }
  //   });
  // }

  // Find patientName
  public findByPolicyNo(specifiedDiseaseMasterId, masterGridData) {
    return masterGridData.find((x) => x.specifiedDiseaseMasterId === specifiedDiseaseMasterId);
  }



  // scrollToTop Fuctionality
  public scrollToTop() {
    (function smoothscroll() {
      var currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 8);
      }
    })();
  }

  //------------ On Edit Cancel ----------------
  cancelEdit() {
    this.form.reset();
    // this.form.get('active').setValue(true);
    // this.form.get('ecs').setValue(0);
    this.showUpdateButton = false;
    this.isClear = false;
  }

  //------------------- On Master View functionality -(Function is Not Used in HTML )----------------
  viewMaste(i: number) {
    //this.scrollToTop();
    this.form.patchValue(this.masterGridData[i]);
    // console.log(this.form.getRawValue());
    this.Index = i;
    this.showUpdateButton = true;
    // console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
    this.masterfilesArray = this.masterGridData[i].documentInformationList;
    this.form
      .get('proofSubmissionId')
      .setValue(this.masterGridData[i].proofSubmissionId);
    this.isCancel = true;
  }


  // ---------- On View Cancel -------------------
  public resetView() {
    this.form.reset();
    this.masterfilesArray = [];
    this.isCancel = false;
    this.urlArray = [];
    this.visibilityFlag = false;
    this.isClear = false;
    this.form.get('active').setValue(true);
    this.form.get('ecs').setValue(0);
    this.showUpdateButton = false;
  }

  //---------- On View Cancel -------------------
  cancleView() {
    this.form.reset();
    // this.form.get('active').setValue(true);
    // this.form.get('ecs').setValue(0);
    this.showUpdateButton = false;
    this.isCancel = false;
  }

  //__________On Cancel View
  cancelView() {
    this.form.reset();
    this.form.enable();
    this.isShowCancel = false;
    this.isShowUpdate = false;
    this.isShowSave = true;
    this.form.get("relationship").disable();
    // this.form.get("ageBracket").disable();
    this.masterfilesArray = [];
    this.isCancel = false;
    this.urlArray = [];
    this.visibilityFlag = false;
    this.isClear = false;
    this.form.get('active').setValue(true);
    this.form.get('ecs').setValue(0);
    this.showUpdateButton = false;
  }


  UploadModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  OnSpecifiedDiseaseChange() {
    // this.masterfilesArray = [];
    if (this.form.value.specifiedDiseaseName !== 'Neurological diseases with disability level >=40% per cent and above') {
      this.visibilityFlag = false;
      // this.form.get('neurologicalDiseaseName').setValidators([Validators.required]);
      // this.form.get('neurologicalDiseaseName').updateValueAndValidity();

      this.form.get('neurologicalDiseaseName').clearValidators();
      this.form.get('neurologicalDiseaseName').updateValueAndValidity();
    } else {
      this.visibilityFlag = true;
      this.form.get('neurologicalDiseaseName').setValidators([Validators.required]);
      this.form.get('neurologicalDiseaseName').updateValueAndValidity();
    }
  }

  // ---------- For Doc Viewer -----------------------
  public nextDocViewer() {
    this.urlIndex = this.urlIndex + 1;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.urlArray[this.urlIndex].blobURI
    );
  }

  public previousDocViewer() {
    this.urlIndex = this.urlIndex - 1;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.urlArray[this.urlIndex].blobURI
    );
  }

  zoomin() {
    var myImg = document.getElementById("map");
    var currWidth = myImg.clientWidth;
    if (currWidth == 2500) return false;
    else {
      myImg.style.width = (currWidth + 100) + "px";
    }
  }
  zoomout() {
    var myImg = document.getElementById("map");
    var currWidth = myImg.clientWidth;
    if (currWidth == 100) return false;
    else {
      myImg.style.width = (currWidth - 100) + "px";
    }
  }

  public docViewer(template3: TemplateRef<any>, index: any, data: any) {
    console.log('---in doc viewer--');
    this.urlIndex = index;
    this.viewDocumentName = data.documentName;
    this.viewDocumentType = data.documentType


    console.log('urlArray::', this.urlArray);
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.urlArray[this.urlIndex].blobURI
    );
    console.log('urlSafe::', this.urlSafe);
    this.modalRef = this.modalService.show(
      template3,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }



}
