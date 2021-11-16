import { DatePipe, DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit, TemplateRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { FileService } from '../../../file.service';
import { MyInvestmentsService } from '../../../my-Investments.service';
import { InterestOnTtaService } from '../interest-on-tta.service';

@Component({
  selector: 'app-interest-on-tta-master',
  templateUrl: './interest-on-tta-master.component.html',
  styleUrls: ['./interest-on-tta-master.component.scss'],
})
export class InterestOnTtaMasterComponent implements OnInit {
  @Input() public accountNo: any;
  public showdocument = true;
  public modalRef: BsModalRef;
  public submitted = false;
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
  public  isShowSave   = true
  public   isShowUpdate = false
  public familyMemberNameList: Array<any> = [];

  public transactionDetail: Array<any> = [];
  public documentDetailList: Array<any> = [];
  public uploadGridData: Array<any> = [];
  public transactionInstitutionNames: Array<any> = [];
  public editTransactionUpload: Array<any> = [];
  public transactionPolicyList: Array<any> = [];
  public transactionInstitutionListWithPolicies: Array<any> = [];

  public stateNameList: Array<any> = [];
  public ifscCodeList: Array<any> = [];
  public bankNameLsit: Array<any> = [];
  public bankIFSC: any;

  public isEdit: boolean = false;

  documentPassword =[];
  remarkList =[];
  documentDataArray = [];
  filesUrlArray = [];

  public accountNumberlistedit: Array<any> = [];

  public TotalIFSCcodeList: Array<any> = [];
  public urlArray: Array<any> = [];
  public urlIndex: number;
  public glbalECS: number;
  public form: FormGroup;
  public Index: number;
  public showUpdateButton: boolean;
  public tabIndex = 0;
  public radioSelected: string;
  public familyRelationSame: boolean;

  public documentRemark: any;

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
  // public actualTotal: number;
  // public actualAmount: number;
  public hideRemarkDiv: boolean;
  public hideRemoveRow: boolean;
  public isClear: boolean;
  public isCancel: boolean;
  public financialYear: any;
  public financialYearStartDate: Date;
  public financialYearEndDate: Date;
  public today = new Date();

  documentArray: any[] =[];
  isVisibleTable = false;

  viewDocumentName: any;
  viewDocumentType: any;

  public transactionStatustList: any;
  public globalInstitution: String = 'ALL';
  public globalPolicy: String = 'ALL';
  public globalTransactionStatus: String = 'ALL';

  public globalAddRowIndex: number;
  public globalSelectedAmount: string;
  public selectedState: string;

  public disability: string;
  public severity: string;
  public isClaiming80U: boolean = true;
  public proofSubmissionId;
  codeInvalid: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private myInvestmentsService: MyInvestmentsService,
    private interestOnTtaService: InterestOnTtaService,
    private datePipe: DatePipe,
    private http: HttpClient,
    private fileService: FileService,
    private numberFormat: NumberFormatPipe,
    public dialog: MatDialog,
    private modalService: BsModalService,
    private alertService: AlertServiceService,
    @Inject(DOCUMENT) private document: Document,
    public sanitizer: DomSanitizer
  ) {
    this.masterPage();
    this.addNewRowId = 0;
    this.hideRemarkDiv = false;
    this.hideRemoveRow = false;
    this.isClear = false;
    this.isCancel = false;
    this.receiptAmount = this.numberFormat.transform(0);
    this.globalAddRowIndex = 0;
    this.globalSelectedAmount = this.numberFormat.transform(0);
    this.initiateMasterForm();
  }

  public ngOnInit(): void {
    this.getFinacialYear();
    this.getMasterIFSCCodeList();
    this.getMasterStateList();

    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
    // this.deactivateRemark();
    this.getPreviousEmployer();
    if (this.today.getMonth() + 1 <= 3) {
      this.financialYear =
        this.today.getFullYear() - 1 + '-' + this.today.getFullYear();
    } else {
      this.financialYear =
        this.today.getFullYear() + '-' + (this.today.getFullYear() + 1);
    }
    const splitYear = this.financialYear.split('-', 2);
    this.financialYearStartDate = new Date('01-Apr-' + splitYear[0]);
    this.financialYearEndDate = new Date('31-Mar-' + splitYear[1]);

    if (this.accountNo != undefined || this.accountNo != null) {
      const input = this.accountNo;
      this.editMaster(input.accountNumber);
      console.log('editMaster accountNumber', input.accountNumber);
    }
  }

  // initiate Reactive Master Form
  initiateMasterForm() {
    this.form = this.formBuilder.group({
      savingBankMasterId: new FormControl(0),
      ifscCode: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      remark: new FormControl(null),
      bankName: new FormControl(
        { value: null, disabled: true },
        Validators.required
      ),
      branchName: new FormControl(
        { value: null, disabled: true },
        Validators.required
      ),
      bankAddress: new FormControl(
        { value: null, disabled: true },
        Validators.required
      ),
      accountNumber: new FormControl(null, Validators.required),
      interestOnSavingDeposit80TTMasterId: new FormControl(0),
      documentRemark: new FormControl(null),
    });
  }

  // convenience getter for easy access to form fields
  get masterForm() {
    return this.form.controls;
  }

  // Business Financial Year API Call
  getFinacialYear() {
    this.myInvestmentsService.getBusinessFinancialYear().subscribe((res) => {
      this.financialYearStart = res.data.results[0].fromDate;
    });
  }

  // State Code List API call
  getMasterStateList() {
    this.interestOnTtaService.getStateInfoList().subscribe((res) => {
      this.stateNameList = res.data.results;
    });
  }

  //get ifsc detail
  IFSCDetails(bankIFSC) {
    if (bankIFSC.length == 11) {
      this.interestOnTtaService.getDataFromIFSC(bankIFSC).subscribe((res) => {
        console.log(res);
        this.form.patchValue({
          branchName: res.data.results[0].branchName,
          bankAddress: res.data.results[0].address,
          bankName: res.data.results[0].bankName,
        });
      });
    }
  }
  // search IFSC code
  onSelectIFSCCode(evt: any) {
    if (evt !== null && evt.length == 11) {
      this.interestOnTtaService.getDataFromIFSC(evt).subscribe((res) => {
        this.form.patchValue({
          branchName: res.data.results[0].branchName,
          bankAddress: res.data.results[0].address,
          bankName: res.data.results[0].bankName,
        });
      });
    }
  }

  getDataFromIFSC(bankIFSC) {
    if (bankIFSC.length < 11) {
      // this.BankInformationModel.bankName = '';
      // this.BankInformationModel.branchName = '';
      // this.BankInformationModel.bankAddress = '';
      // this.confirmAccountNumber = '';
      // this.BankInformationModel.accountNo = '';
      // this.BankInformationModel.nameAsPerBank = '';
    }
    if (bankIFSC.length == 11) {
      this.IFSCDetails(bankIFSC);
    }
    if (bankIFSC) {
      // this.gridEditIFSC1 = bankIFSC
      // this.IFSCGridDetails(bankIFSC);
    }
  }

  searchIFSC(searchTerm, bankIFSC) {
    // this.form.patchValue({
    //   branchName: '',
    //   bankAddress: '',
    //   bankName: '',
    // });

    if (searchTerm.query.length < 11) {
      this.ifscCodeList = [];
    }
    if (bankIFSC.length < 11) {
      // this.BankInformationModel.bankName = '';
      // this.BankInformationModel.branchName = '';
      // this.BankInformationModel.bankAddress = '';
      // this.confirmAccountNumber = '';
      // this.BankInformationModel.accountNo = '';
      // this.BankInformationModel.nameAsPerBank = '';
    }
    if (searchTerm.query.length == 2) {
      // setTimeout(() => {
      this.interestOnTtaService
        .searchIFSC(searchTerm.query, this.form.get('state').value)
        .subscribe((res) => {
          console.log(res);
          this.ifscCodeList = res.data.results[0];
          this.TotalIFSCcodeList = res.data.results[0];
          if (this.ifscCodeList.length > 0) {
            this.filterIFSCCodes(searchTerm.query);
          } else {
            // this.alertService.sweetalertError('Record Not Found');
            // this.notifyService.showError ('Recordnot found', "Error..!!")
          }
        });
      // }, 1500)
    }
    this.filterIFSCCodes(searchTerm.query);

    if (bankIFSC.length == 11) {
      const ifsc = this.TotalIFSCcodeList.filter((item) => {
        return item == searchTerm.query;
      });
      if (ifsc == searchTerm.query) {
        this.IFSCDetails(searchTerm.query);
      }
    }
  }

  filterIFSCCodes(searchTerm) {
    if (searchTerm.length > 2) {
      searchTerm = searchTerm.toLowerCase();
      const ifsc = this.TotalIFSCcodeList.filter((item) => {
        return JSON.stringify(item).toLowerCase().includes(searchTerm);
      });
      this.ifscCodeList = ifsc;
      // this.GridIFSCcodeList = ifsc;
      // this.showOptios = true;
    }
  }

  onSelectState(evt: any) {
    this.selectedState = evt;
    this.bankIFSC = '';
  }

  // IFSC Code List API call
  getMasterIFSCCodeList() {
    const state = this.masterForm.state.value;
    if (state !== null) {
      this.interestOnTtaService.getIFSCCodeList(state).subscribe((res) => {
        res.data.results[0].forEach((element) => {
          const obj = {
            label: element,
            value: element,
          };
          this.ifscCodeList.push(obj);
        });
      });
    }
  }

  // Get All Previous Employer
  getPreviousEmployer() {
    this.myInvestmentsService.getAllPreviousEmployer().subscribe((res) => {
      console.log(res.data.results);
      if (res.data.results.length > 0) {
        this.employeeJoiningDate = res.data.results[0].joiningDate;
      }
    });
  }

  // Get Master Page Data API call
  masterPage() {
    this.interestOnTtaService.get80TTAMaster().subscribe((res) => {
      console.log('masterGridData::', res);
      this.masterGridData = res.data.results;

      this.masterGridData.forEach((element) => {
        element.documentInformationList.forEach(element => {
          // if(element!=null)
          this.documentArray.push({
            'dateofsubmission':element.creatonTime,
            'documentType':element.documentType,
            'documentName': element.fileName,
            'documentPassword':element.documentPassword,
            'documentRemark':element.documentRemark,
            'status' : element.status,
            'lastModifiedBy' : element.lastModifiedBy,
            'lastModifiedTime' : element.lastModifiedTime,

          })
        });
        this.documentArray.push({
          'dateofsubmission':element.creatonTime,
          'documentType':element.documentType,
          'documentName': element.fileName,
          'documentPassword':element.documentPassword,
          'documentRemark':element.documentRemark,
          'status' : element.status,
          'lastModifiedBy' : element.lastModifiedBy,
          'lastModifiedTime' : element.lastModifiedTime,

        })
      });
  });

  }

  // Post Master Page Data API call
  public addMaster(formData: any, formDirective: FormGroupDirective): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log('this.isEdit', this.isEdit);

  if(!this.isEdit){

    if (this.masterfilesArray.length === 0 && this.urlArray.length === 0) {
      this.alertService.sweetalertWarning(
        'Deposit in Saving Account 80TTA Document needed to Create Master.'
      );
      return;
    }
  }

  for (let i = 0; i <= this.documentPassword.length; i++) {
    if(this.documentPassword[i] != undefined || this.documentPassword[i] == undefined){
      let remarksPasswordsDto = {};
      remarksPasswordsDto = {
        "documentType": "Back Statement/ Premium Reciept",
        "documentSubType": "",
        "remark": this.remarkList[i],
        "password": this.documentPassword[i]
      };
      this.documentDataArray.push(remarksPasswordsDto);
    }
  }
  console.log('this.documentDataArray', this.documentDataArray);
  // else {
      const data = this.form.getRawValue();
      data.proofSubmissionId = this.proofSubmissionId;
      data.remarkPasswordList = this.documentDataArray;

      console.log('Interest On 80TTA ::', data);
      console.log(data.accountNumber);
      console.log(this.accountNumberlistedit);

      // if (data.accountNumber) {
      //   this.masterGridData.forEach(results => {
      //     if (results.accountNumber == data.accountNumber) {
      //       this.codeInvalid = true;
      //     }
      //   });
      //   if (this.codeInvalid) {
      //     this.codeInvalid = false;
      //     this.alertService.sweetalertError(
      //       'Duplicate Account should Not be Acceptable.'
      //     );
      //     return;
      //   }
      // }

     /*  this.masterGridData.forEach((element) => {
        if (data.accountNumber == element.accountNumber) {
          this.alertService.sweetalertWarning(
            'Duplicate Account should Not be Acceptable'
          );
          return 0;
          this.form.reset();
        }
      }); */

      this.interestOnTtaService
        .uploadMultiple80TTAMasterFiles(this.masterfilesArray, data)
        .subscribe((res) => {
          console.log(res);
          if (res) {
            if (res.data.results.length > 0) {
              this.isEdit = false;
              this.showdocument = false;
              this.masterGridData = res.data.results;
              // this.masterGridData = res.data.results[0].documentInformationList;
              this.alertService.sweetalertMasterSuccess(
                'Record saved Successfully.',
                'Go to "Declaration & Actual" Page to see Schedule.'
              );

              if (res.data.results.length > 0) {
                this.masterGridData = res.data.results;


                this.masterGridData.forEach((element, index) => {
                  this.documentArray.push({

                    'dateofsubmission':new Date(),
                      'documentType':element.documentInformationList[0].documentType,
                      'documentName': element.documentInformationList[0].fileName,
                      'documentPassword':element.documentInformationList[0].documentPassword,
                      'documentRemark':element.documentInformationList[0].documentRemark,
                  //    'remark':element.documentInformationList[0].remark,
                      'status' : element.documentInformationList[0].status,
                      'approverName' : element.documentInformationList[0].lastModifiedBy,
                      'Time' : element.documentInformationList[0].lastModifiedTime,

                      // 'documentStatus' : this.premiumFileStatus,

                  });

                  if(element.documentInformationList[1]) {
                  this.documentArray.push({

                    'dateofsubmission':new Date(),
                      'documentType':element.documentInformationList[1].documentType,
                      'documentName': element.documentInformationList[1].fileName,
                      'documentPassword':element.documentInformationList[1].documentPassword,
                      'documentRemark':element.documentInformationList[1].documentRemark,
                   //  'remark':element.documentInformationList[1].remark,
                      'status' : element.documentInformationList[1].status,
                      'lastModifiedBy' : element.documentInformationList[1].lastModifiedBy,
                      'lastModifiedTime' : element.documentInformationList[1].lastModifiedTime,

                      // 'documentStatus' : this.premiumFileStatus,

                  });
                }
                });
              }
            } else {
              // this.alertService.sweetalertWarning(res.status.messsage);
              this.alertService.sweetalertError(
                'This Policy Holder Already Added.'
              );
            }
          } else {
            this.alertService.sweetalertError(
              'Something went wrong. Please try again.'
            );
          }
        });
      this.isShowUpdate = false;
      this.isShowSave = true;
      this.documentDataArray = [];
      this.Index = -1;
      formDirective.resetForm();
      this.form.reset();
      this.paymentDetailGridData = [];
      this.masterfilesArray = [];
      this.urlArray = [];
      this.submitted = false;
      this.documentRemark = '';
      this.showUpdateButton = false;
      this.remarkList = [];
      this.documentPassword = [];
      this.isVisibleTable = false;
      this.isEdit = false;
    // }
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

  // Remove LicMaster Document
  removeSelectedMasterDocument(index: number) {
    this.masterfilesArray.splice(index, 1);
    console.log('this.filesArray::', this.masterfilesArray);
    console.log('this.filesArray.size::', this.masterfilesArray.length);
  }

  //------------- On Master Edit functionality --------------------
  editMaster(accountNumber) {
    this.isShowUpdate = true
    this.isShowSave = false
    this.isEdit = true;
    this.scrollToTop();
    this.interestOnTtaService.get80TTAMaster().subscribe((res) => {
      console.log('masterGridData::', res);
      this.masterGridData = res.data.results;

      console.log(accountNumber);
      const obj = this.findByaccountNumber(accountNumber, this.masterGridData);

      // Object.assign({}, { class: 'gray modal-md' }),
      console.log('Edit Master', obj);
      if (obj != 'undefined') {
        this.paymentDetailGridData = obj.paymentDetails;
        this.form.patchValue(obj);
        this.Index = obj.accountNumber;
        this.showUpdateButton = true;
        this.isClear = true;
        // this.urlArray = obj.documentInformationList;
        this.filesUrlArray = obj.documentInformationList;
        this.proofSubmissionId = obj.proofSubmissionId;
        this.showdocument = false;
        this.documentArray = [];


        obj.documentInformationList.forEach(element => {
          this.documentArray.push({
            'dateofsubmission':element.creatonTime,
            'documentType':element.documentType,
            'documentName': element.fileName,
            'documentPassword':element.documentPassword,
            'documentRemark':element.documentRemark,
            'status' : element.status,
            'lastModifiedBy' : element.lastModifiedBy,
            'lastModifiedTime' : element.lastModifiedTime,

          })

        });
        console.log("documentArray::",this.documentArray);
        this.isVisibleTable = true;
      }
    });
  }

  findByaccountNumber(accountNumber, masterGridData) {
    return masterGridData.find((x) => x.accountNumber === accountNumber);
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

  // On Edit Cancel
  cancelEdit() {
    this.form.reset();
    this.urlArray = [];
    this.form.get('active').setValue(true);
    this.form.get('isClaiming80U').setValue(0);
    this.showUpdateButton = false;
    this.paymentDetailGridData = [];
    this.isClear = false;
  }

  // On Master Edit functionality
  viewMaster(i: number) {
    //this.scrollToTop();
    this.paymentDetailGridData = this.masterGridData[i].paymentDetails;
    this.form.patchValue(this.masterGridData[i]);
    // console.log(this.form.getRawValue());
    this.Index = i;
    this.showUpdateButton = true;

    this.isCancel = true;
  }

  // On View Cancel
  cancelView() {
    this.form.reset();
    this.form.get('active').setValue(true);
    this.form.get('isClaiming80U').setValue(0);
    this.showUpdateButton = false;
    this.paymentDetailGridData = [];
    this.isCancel = false;
  }
  UploadModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  //---------- On View Cancel -------------------
  resetView() {
    this.form.reset();
    this.urlArray = [];
    //this.form.get('active').setValue(true);
    // this.form.get('ecs').setValue(0);
    this.showUpdateButton = false;
    this.paymentDetailGridData = [];
    this.masterfilesArray = [];
    this.isCancel = false;
    this.urlArray = [];
  }

  //---------- For Doc Viewer -----------------------
  nextDocViewer() {
    this.urlIndex = this.urlIndex + 1;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.urlArray[this.urlIndex].blobURI
    );
  }

  previousDocViewer() {
    this.urlIndex = this.urlIndex - 1;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.urlArray[this.urlIndex].blobURI
    );
  }

  zoomin(){
    var myImg = document.getElementById("map");
    var currWidth = myImg.clientWidth;
    if(currWidth == 2500) return false;
     else{
        myImg.style.width = (currWidth + 100) + "px";
    }
}
 zoomout(){
    var myImg = document.getElementById("map");
    var currWidth = myImg.clientWidth;
    if(currWidth == 100) return false;
 else{
        myImg.style.width = (currWidth - 100) + "px";
    }
}


  docViewer(template3: TemplateRef<any>, index: any, data: any) {
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
  //----------------- Remove LicMaster Document -----------------------------
  removeSelectedDocument(index: number) {
    this.masterfilesArray.splice(index, 1);
  }

  /*   accountNumber  */

  toggleFieldTextType() {
    this.accountNo = !this.accountNo;
  }

  hideAccountNo(accountNo) {
    if (accountNo == true) {
      setTimeout(() => {
        this.accountNo = false;
      }, 3000);
    }
  }

   //Duplicate account should not be acceptable

   matchAccountNumber(event: any) {
    console.log('event...', event);
    this.masterGridData.forEach((element) => {
      this.accountNumberlistedit = element.accountNumber;
      if (event == element.accountNumber) {
        this.alertService.sweetalertWarning(
          'Duplicate Account should Not be Acceptable.'
        );
      }
      console.log(element.accountNumber);
      return 0;
    });
  }


}
