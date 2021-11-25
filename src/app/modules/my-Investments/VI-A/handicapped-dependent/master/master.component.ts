import { DatePipe, DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  Inject,
  Input,
  OnInit,
  TemplateRef,
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
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { FileService } from '../../../file.service';
import { MyInvestmentsService } from '../../../my-Investments.service';
import { HandicappedDependentService } from '../handicapped-dependent.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {
  @Input() public disabilityTypeName : any;

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

  public familyMemberNameList: Array<any> = [];
  public disabilityTypeList: Array<any> = [];
  public severityLevelList: Array<any> = [];

  public transactionDetail: Array<any> = [];
  public documentDetailList: Array<any> = [];
  public uploadGridData: Array<any> = [];
  public transactionInstitutionNames: Array<any> = [];
  public editTransactionUpload: Array<any> = [];
  public transactionPolicyList: Array<any> = [];
  public transactionInstitutionListWithPolicies: Array<any> = [];
  public urlArray: Array<any> = [];
  public urlIndex: number;
  public glbalECS: number;
  public form: FormGroup;
  public Index: number;
  public showUpdateButton: boolean;
  public isEdit: boolean = false;
  public isCancelShow: boolean = false;
  public isUpdateShow: boolean = false;
  public isSaveShow: boolean = true;

  public tabIndex = 0;
  public radioSelected: string;
  public familyRelationSame: boolean;
  documentPassword =[];
  remarkList =[];
  documentDataArray = [];
  filesUrlArray = [];
  documentArray: any[] =[];

  viewDocumentName: any;
  viewDocumentType: any;

  public documentRemark: any;
  isVisibleTable = false;

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
  public financialYear: any;
  public financialYearStartDate: Date;
  public financialYearEndDate: Date;
  public today = new Date();

  public transactionStatustList: any;
  public globalInstitution: String = 'ALL';
  public globalPolicy: String = 'ALL';
  public globalTransactionStatus: String = 'ALL';

  public globalAddRowIndex: number;
  public proofSubmissionId;
  public globalSelectedAmount: string;

  public disability : string;
  public severity : string;
  // public isClaiming80U: boolean = true;
  public isSaveVisible: boolean = true;

  public  isRadioButtonDisabled:boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private myInvestmentsService: MyInvestmentsService,
    private handicappedDependentService: HandicappedDependentService,
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

    this.disabilityTypeList = [
      { label: 'Hearing impairment', value: 'Hearing impairment' },
      { label: 'Mental retardation', value: 'Mental retardation' },
      { label: 'Mental illness', value: 'Mentalillness' },
      { label: 'Autism', value: 'Autism' },
      { label: 'Cerebral palsy', value: 'Cerebral palsy' },
      { label: 'Blindness', value: 'Blindness' },
      { label: 'Low vision', value: 'Lowvision' },
      { label: 'Laprosy cured', value: 'Laprosy cured' },
      { label: 'Laco motor disability', value: 'Laco motor disability' },
    ];
    this.severityLevelList = [
      { label: '40.01% to 80%', value: '40.01% to 80%' },
      { label: '80.01% to 100%', value: '80.01% to 100%' },

    ];
    this.masterPage();
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
    this.initiateMasterForm();
    this.getMasterFamilyInfo();
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
   // this.deactivateRemark();
    this.getPreviousEmployer();

    if (this.disabilityTypeName != undefined || this.disabilityTypeName != null) {
      const input = this.disabilityTypeName;
      this.editMaster(input.disabilityType);
      console.log('editMaster disabilityType', input.disabilityType);
      this.viewMaster(input.disabilityType);
      console.log('editMaster disabilityType', input.disabilityType);
    }
  }

  // initiate Reactive Master Form
  initiateMasterForm() {
    this.form = this.formBuilder.group({
      isClaiming80U : new FormControl ('0'),
      disabilityType: new FormControl(null, Validators.required),
      severity: new FormControl(null, Validators.required),
      familyMemberName: new FormControl(null, Validators.required),
      relationship: new FormControl({value: null, disabled: true },Validators.required),
      familyMemberInfoId: new FormControl(null, Validators.required),

      remark: new FormControl(null),

      handicappedDependentDetailMasterId:new FormControl()
    });
  }


  // Family Member List API call
  getMasterFamilyInfo() {
    this.myInvestmentsService.getFamilyInfo().subscribe((res) => {
      console.log('getFamilyInfo', res);
      this.familyMemberGroup = res.data.results;

      res.data.results.forEach((element) => {
        const obj = {
          label: element.familyMemberName,
          value: element.familyMemberName,
        };
        if (element.relation !== 'Self') {
          this.masterGridData.forEach((element) => {

            // remove saved family member from dropdown
            const index = this.familyMemberNameList.findIndex(item => item.label == element.familyMemberName)

            if (index > -1) {
              this.familyMemberNameList.splice(index, 1);
            }
          })
          this.familyMemberNameList.push(obj);
        }
      });
    });
  }

  // Family relationship shown on Policyholder selection
  OnSelectionfamilyMemberGroup() {
    if (this.form.get('familyMemberName').value == null) {
      this.form.get('relationship').setValue(null);
      this.isRadioButtonDisabled = true;
    }

    const toSelect = this.familyMemberGroup.find(
      (element) => element.familyMemberName == this.form.get('familyMemberName').value

    );

    console.log("familyMemberInfoId:,",this.familyMemberNameList)
    this.form.get('familyMemberInfoId').setValue(toSelect.familyMemberInfoId);
    this.form.get('relationship').setValue(toSelect.relation);

    this.isRadioButtonDisabled = false;
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

  // convenience getter for easy access to form fields
  get masterForm() {
    return this.form.controls;
  }


  // Get Master Page Data API call
  masterPage() {
    this.handicappedDependentService.getHandicappedDependentMaster().subscribe((res) => {
      console.log('masterGridData::', res);
      this.masterGridData = res.data.results;
      this.disability = res.data.results[0].disability;
      this.severity = res.data.results[0].severity;
      this.masterGridData.forEach((element) => {

                // remove saved family member from dropdown
                const index = this.familyMemberNameList.findIndex(item => item.label == element.familyMemberName)

                if (index > -1) {
                  this.familyMemberNameList.splice(index, 1);
                }
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
  public addMaster(formData: any, formDirective: FormGroupDirective,): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;

    }
    console.log('this.isEdit', this.isEdit);

  if(!this.isEdit){

    if (this.masterfilesArray.length === 0 && this.urlArray.length === 0  ) {
      this.alertService.sweetalertWarning(
        'Handicapped Dependent Document needed to Create Master.'
      );
      return;
    }
  }

  for (let i = 0; i < this.documentPassword.length; i++) {
    if(this.documentPassword[i] == undefined || this.documentPassword[i] != undefined){
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

      console.log('Handicapped Dependent ::', data);

      this.handicappedDependentService
        .uploadMultipleHandicappedDependentMasterFiles(this.masterfilesArray, data)
        .subscribe((res) => {
          console.log(res);
          if (res) {
            if (res.data.results.length > 0) {
              this.isEdit = false;
              this.showdocument = false;
              this.masterGridData = res.data.results;
              console.log('Handicapped Master ::', res.data.results);
              // this.masterGridData = res.data.results[0].documentInformationList;
              this.masterGridData.forEach((element) => {
              });
              if (res.data.results.length > 0) {
                this.masterGridData = res.data.results;


                this.masterGridData.forEach((element, index) => {
                  this.documentArray.push({

                    'dateofsubmission':new Date(),
                      'documentType':element.documentInformationList[0].documentType,
                      'documentName': element.documentInformationList[0].fileName,
                      'documentPassword':element.documentInformationList[0].documentPassword,
                      'documentRemark':element.documentInformationList[0].documentRemark,
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
                      'status' : element.documentInformationList[1].status,
                      'lastModifiedBy' : element.documentInformationList[1].lastModifiedBy,
                      'lastModifiedTime' : element.documentInformationList[1].lastModifiedTime,

                      // 'documentStatus' : this.premiumFileStatus,

                  });
                }
                });
              }
              this.alertService.sweetalertMasterSuccess(
                'Record saved Successfully.',
                'Go to "Declaration & Actual" Page to see Schedule.'
              );
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

      this.Index = -1;
      formDirective.resetForm();
      this.form.reset();
      this.form.get('isClaiming80U').setValue(0);
      this.documentDataArray  = [];
      this.paymentDetailGridData = [];
      this.masterfilesArray = [];
      this.submitted = false;
      this.urlArray = [];
      this.documentRemark = [];
      this.documentRemark = '';
      this.remarkList = [];
      this.documentPassword = [];
      this.isVisibleTable = false;
      this.isEdit = false;

      this.showUpdateButton = false;
    // }
    // this.form.patchValue({
    //   accountType: 'Tier_1',
    // });
    // this.getIdentityInformation();
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



  // // On Master Edit functionality
  // editMaster(i: number) {
  //   //this.scrollToTop();
  //   this.paymentDetailGridData = this.masterGridData[i].paymentDetails;
  //   this.form.patchValue(this.masterGridData[i]);
  //   // console.log(this.form.getRawValue());
  //   this.Index = i;
  //   this.showUpdateButton = true;
  //   this.isClear = true;
  //   this.masterfilesArray = this.masterGridData[i].documentInformationList
  // }
  // Deactivate the Remark
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
  //------------- On Master Edit functionality --------------------
  editMaster(disabilityType) {
    this.isCancelShow = false;
    this.isSaveShow = false;
    this.isUpdateShow = true;
    this.isEdit = true;
    this.scrollToTop();
    this.handicappedDependentService.getHandicappedDependentMaster().subscribe((res) => {

      console.log('masterGridData::', res);

      this.masterGridData = res.data.results;

      console.log('masterGridData::', res);

      this.disability = res.data.results[0].disability;
      this.severity = res.data.results[0].severity;
      console.log(disabilityType)
      const obj =  this.findBydisabilityType(disabilityType,this.masterGridData);

      // Object.assign({}, { class: 'gray modal-md' }),
      console.log("Edit Master",obj);
      if (obj!= 'undefined'){
      this.paymentDetailGridData = obj.familyMemberName;
      this.paymentDetailGridData = obj.paymentDetails;
      this.form.patchValue(obj);
      this.Index = obj.disabilityType;
      this.showUpdateButton = true;
      this.isClear = true;
      // this.urlArray = obj.documentInformationList;
      this.filesUrlArray = obj.documentInformationList;
      this.showdocument = false;
      this.proofSubmissionId = obj.proofSubmissionId;
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
  findBydisabilityType(disabilityType,masterGridData){
    return masterGridData.find(
      (x) => x.disabilityType === disabilityType);
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
  resetView() {
    this.isCancelShow = false;
    this.isSaveShow = true;
    this.isUpdateShow = false;
    this.isVisibleTable = false;
    this.form.reset();
    this.documentDataArray  = [];
    this.documentArray = [];
    this.form.get('isClaiming80U').setValue(0);
    this.urlArray = [];
    this.paymentDetailGridData = [];
    this.isClear = false;
    this.showUpdateButton = false;
    this.urlArray = [];
    this.masterfilesArray = [];
    this.documentRemark = [];
  }



  // On Master Edit functionality
  // viewMaster(disabilityType) {
  //   this.scrollToTop();
  //   this.paymentDetailGridData = this.masterGridData[i].paymentDetails;
  //   this.form.patchValue(this.masterGridData[i]);
  //   this.form.get('isClaiming80U').setValue(0);
  //   this.Index = i;
  //   this.showUpdateButton = true;
  //   this.isCancel = true;
  // }
  viewMaster(disabilityType) {
    this.isCancelShow = true;
    this.isSaveShow = false;
    this.isUpdateShow = false;
    this.form.disable();
    this.isEdit = true;
    this.scrollToTop();
    this.isCancel = true;
    this.handicappedDependentService.getHandicappedDependentMaster().subscribe((res) => {

      console.log('masterGridData::', res);

      this.masterGridData = res.data.results;

      console.log('masterGridData::', res);

      this.disability = res.data.results[0].disability;
      this.severity = res.data.results[0].severity;
      console.log(disabilityType)
      const obj =  this.findBydisabilityType(disabilityType,this.masterGridData);

      // Object.assign({}, { class: 'gray modal-md' }),
      console.log("Edit Master",obj);
      if (obj!= 'undefined'){
      this.paymentDetailGridData = obj.familyMemberName;
      this.paymentDetailGridData = obj.paymentDetails;
      this.form.patchValue(obj);
      this.Index = obj.disabilityType;
      this.showUpdateButton = true;
      this.isClear = true;
      // this.urlArray = obj.documentInformationList;
      this.filesUrlArray = obj.documentInformationList;
      this.showdocument = false;
      this.proofSubmissionId = obj.proofSubmissionId;
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
  // On View Cancel
  cancelView() {
    this.form.enable()
    this.form.get('relationship').disable()
    this.isCancelShow = false;
     this.isSaveShow = true;
     this.isUpdateShow = false;
     this.isCancelShow = false;
     this.isSaveShow = true;
     this.isUpdateShow = false;
     this.isVisibleTable = false;
     this.form.reset();
     this.documentDataArray  = [];
     this.documentArray = [];
     this.form.get('isClaiming80U').setValue(0);
     this.urlArray = [];
     this.paymentDetailGridData = [];
     this.isClear = false;
     this.showUpdateButton = false;
     this.urlArray = [];
     this.masterfilesArray = [];
     this.documentRemark = [];
  }
  UploadModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  resetForm() {
    this.form.reset();
  }


  onRadioChange(checked) {
    console.log(checked)
    this.isSaveVisible = true;

    if(checked) {
      this.isSaveVisible = false;
      this.alertService.sweetalertError(
        'Benefit of 80DD is not Applicable for selected family member, if family member is already claiming benefit under 80U.'  );
    }
  }

    //---------- For Doc Viewer -----------------------
    nextDocViewer() {

      this.urlIndex = this.urlIndex + 1;
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.urlArray[this.urlIndex].blobURI,
      );
    }

    previousDocViewer() {

      this.urlIndex = this.urlIndex - 1;
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.urlArray[this.urlIndex].blobURI,
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
    docViewer(template3: TemplateRef<any>,index:any, data: any) {
      console.log("---in doc viewer--");
      this.urlIndex = index;


      console.log('urlIndex::' , this.urlIndex);
      console.log("urlArray::", this.urlArray);
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
        // this.urlArray[this.urlIndex].blobURI,
        this.filesUrlArray[this.urlIndex].blobURI
      );
      console.log("urlSafe::",  this.urlSafe);
      this.modalRef = this.modalService.show(
        template3,
        Object.assign({}, { class: 'gray modal-xl' }),
      );
    }
    //----------------- Remove LicMaster Document -----------------------------
  removeSelectedLicMasterDocument(index: number) {
    this.masterfilesArray.splice(index, 1);

  }
}
