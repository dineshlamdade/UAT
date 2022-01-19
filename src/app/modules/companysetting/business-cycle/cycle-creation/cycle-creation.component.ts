
import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { CompanySettingsService } from '../../company-settings.service';
import { SaveCycleCreation, UpdateflagCycleCreation } from '../../model/business-cycle-model';
import { AlertServiceService } from '../../../../core/services/alert-service.service';
import { ExcelserviceService } from '../../../excel_service/excelservice.service';

@Component({
  selector: 'app-cycle-creation',
  templateUrl: './cycle-creation.component.html',
  styleUrls: ['./cycle-creation.component.scss']
})
export class CycleCreationComponent implements OnInit {
  modalRef: BsModalRef;
  BusinessYear = [
    { label: '2010', value: '2010' },
    { label: '2011', value: '2011' },
    { label: '2012', value: '2012' },
    { label: '2013', value: '2013' },
    { label: '2014', value: '2014' },

    { label: '2015', value: '2015' },
    { label: '2016', value: '2016' },
    { label: '2017', value: '2017' },
    { label: '2018', value: '2018' },
    { label: '2019', value: '2019' },

    { label: '2020', value: '2020' },
    { label: '2021', value: '2021' },
    { label: '2022', value: '2022' },
    { label: '2023', value: '2023' },
    { label: '2024', value: '2024' },

    { label: '2025', value: '2025' },
    { label: '2026', value: '2026' },
    { label: '2027', value: '2027' },
    { label: '2028', value: '2028' },
    { label: '2029', value: '2029' },
    { label: '2030', value: '2030' },

  ];
  // today: any = new Date();
  updateFlag: boolean = false;
  // editedRecordIndexId: number = 0;
  todisabletodate: boolean = false;
  @Input() CycleDefinitionList: any;


  // declarationGridData: Array<any> = [];
  // familyMemberGroup: Array<any> = [];
  //frequencyOfPayment: Array<any> = [];

  //InstitutionNames: Array<any> = [];
  // transactionDetail: Array<any> = [];
  // uploadGridData: Array<any> = [];

  // familyMemberName: Array<any> = [];


  //Index: number;
  // showUpdateButton: boolean;
  // tabIndex = 0;
  // radioSelected: string;
  //familyRelationSame: boolean;
  //enableEditRow: number;
  //enableAddRow: number;
  // enablePolicyTable: number;
  //enableCheckbox: number;
  //enableCheckboxFlag: number;
  // enableCheckboxFlag3: boolean;
  // addRow1: boolean;
  // addRow2: number;
  //previousEmployeName: Array<any> = [];
  //totalDeclaredAmount: any;
  //totalActualAmount: any;
  //futureNewPolicyDeclaredAmount: number;
  //grandTotalDeclaredAmount: number;
  //grandTotalActualAmount: number;
  // grandDeclarationTotal: number;
  //grandActualTotal: number;
  //  grandRejectedTotal: number;
  //  grandApprovedTotal: number;
  // grandTabStatus: boolean;
  //  isCheckAll: boolean;
  // isDisabled: boolean;
  // enableSelectAll: boolean;

  displayUploadFile = false;
  // uploadedFiles: any[] = [];
  // msgs2: Message[];
  // : Date;
  // loaded = 0;
  //selectedFiles: FileList;
  // currentFileUpload: File;
  //receiptNumber: number;
  // receiptAmount: number;
  // receiptDate: Date;
  // selectedInstitution: string;

  //enableCheckboxFlag2: any;
  // greaterDateValidations: boolean;

  windowScrolled: boolean;
  // ---------------------------Bharati----------------------------------
  @ViewChild('template2') template2: TemplateRef<any>;

  // activeFrequencyList: Array<any> = [];

  // ServicesList: Array<any> = [];

  // CycleDefinitionList: Array<any> = [];
  CycleCreationList: Array<any> = [];
  CycleCreationList1: Array<any> = [];
  CycleDefinitionByid: Array<any> = [];
  previewCycleList: Array<any> = [];

  // serviceName = [];

  minDate: Date = new Date();




  BusinessYearform: FormGroup;
  CycleDefinationForm: FormGroup;

  CycleCreationForm: FormGroup;
  BusinessYearId: string;

  id: number = 0;

  bsConfig: Partial<BsDatepickerConfig>;
  myDateValue: Date;
  Name: string;

  CycleName: string;

  CycleupdateFlag1: boolean = false;
  disabled: boolean = true;

  flag: boolean;
  name: string;
  business: string;
  Frequency: string;
  fromDate: string;
  toDate: string;
  editformDate: string;

  editRowID: any = '';
  BusinessYearformorecycle: number;
  Previewname: string;
  Previewbusiness: string;
  PreviewFrequency: string;
  PreviewfromDate: string;
  PreviewtoDate: string;
  businessCycleDefinitionId: number;
  businessCycleDefinitionIdforMoreCycle: number;
  CycleCreationName: string;

  selectedFrequency: string;
  adjustedToNextCycle: boolean = false;

  businessCycleList: Array<any> = [];
  data = [];
  businessYearUpdate: string;
  cycleCreationForm: FormGroup;
  header: any[];
  excelData: any[];
  previewCycleDefinationData: any;
  previewCycleData: any = [];
  selectedRowIndex: any;
  minFromDate: Date;



  constructor(private modalService: BsModalService, private datepipe: DatePipe,
    private companySetttingService: CompanySettingsService, private formBuilder: FormBuilder,
    private alertService: AlertServiceService, private excelservice: ExcelserviceService) {

  }

  ngOnInit() {
    this.cycleCreationForm = this.formBuilder.group({
      businessCycleDefinitionId: new FormControl('', Validators.required),
      // businessYear: new FormControl( '', Validators.required )
    });

    this.getAllCycleCreationList();
    this.getAllCycleCreation();
  }

  ngAfterViewInit() {
    this.companySetttingService.CycleDefinitionList().subscribe(res => {
      this.CycleDefinitionList = res.data.results;
    });
  }

  DeleteCycleCreationById(businessCycleDefinitionId, BusinessYear) {

    this.updateFlag = false;

    this.companySetttingService.DeleteCycleCreationById(businessCycleDefinitionId, BusinessYear).subscribe((res) => {
      this.alertService.sweetalertMasterSuccess(res.status.message, '');
      this.getAllCycleCreationList();
      this.getAllCycleCreation();
      //   this.CycleCreationForm.reset();
    },
      (error: any) => {
        this.alertService.sweetalertError(error["error"]["status"]["message"]);
      })
  }
  deletePreviewCycleDiscard() {
    ;
    this.updateFlag = false;
    this.companySetttingService.DeletePreviewCycleDiscard(this.businessCycleDefinitionId, this.Previewbusiness)
      .subscribe(res => { //: saveBusinessYear[]
        this.alertService.sweetalertMasterSuccess(res.status.message, '');
        this.getAllCycleCreation();
        this.cycleCreationForm.reset();
      },
        (error: any) => {
          this.alertService.sweetalertError(error["error"]["status"]["message"]);
        });
  }
  busineesCycleDefinationChange(value) {
    this.businessCycleDefinitionId = parseInt(value);
  }

  extralargepopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-xl' })
    );


  }


  previewCycleDefination() {
    // this.modalRef = this.modalService.show(
    //  template2,
    //  Object.assign({}, {
    //    class: 'gray modal-xl'
    //  })
    // );
    let data = {
      "businessCycleDefinitionId": this.businessCycleDefinitionId
    }
    this.previewCycleData = []
    this.companySetttingService.previewCycleDefination(data).subscribe(res => {
      // res.data.results.forEach(element => {
        
      // });
      
      this.previewCycleDefinationData = res.data.results;

      this.Previewname = res.data.results[0].businessCycleDefinition.cycleName;
      this.Previewbusiness = res.data.results[0].businessYear;
      this.PreviewFrequency = res.data.results[0].businessCycleDefinition.frequency.name;
      this.PreviewfromDate = res.data.results[0].businessCycleDefinition.businessYearDefinition.fullFromDate;
      this.PreviewtoDate = res.data.results[0].businessCycleDefinition.businessYearDefinition.fullToDate;

      this.previewCycleDefinationData.forEach(element => {
       

        this.previewCycleData.push({
          "periodId": element.periodId,
          "cycleDisplayName": element.cycleDisplayName,
          "isExtended": element.extended,
          "periodName": element.periodName,
          "isLocked": element.locked,
          "fromDate": this.datepipe.transform(element.fromDate, 'dd-MMM-yyyy'),
          "toDate": this.datepipe.transform(element.toDate, 'dd-MMM-yyyy'),
          "businessYear": element.businessYear,
          "noOfDays": element.noOfDays,
          "noOfCycles": element.noOfCycles,
          "isForceToYearEnd": element.forceToYearEnd,
          "remark": element.remark,
          "isUsed": element.used,
          "isActive": element.active,
          "isAdjustedToNextCycle": false,
          "createdBy": element.createdBy,
          "lastModifiedBy": element.lastModifiedBy,
          // "createDateTime": element.createDateTime,
          // "lastModifiedDateTime":element.lastModifiedDateTime,
          "AWPHGName": element.awphgname,
          "isArrear": false,
          "isSupplimentary": element.supplimentary,
          "isAdhoc": element.adhoc,
          "businessYearDefinitionId": element.businessCycleDefinition.businessYearDefinition.businessYearDefinitionId,
          "businessCycleDefinitionId": element.businessCycleDefinition.id
        })
      });

      console.log("this.previewCycleDefinationData + " + JSON.stringify(this.previewCycleDefinationData))


    },
      (error: any) => {
        this.alertService.sweetalertError(error["error"]["status"]["message"]);
      })

  }


  GetCycleCreationById(businessCycleDefinitionId, BusinessYear, data) {
    window.scrollTo(0, 0);
    this.todisabletodate = true;
    this.updateFlag = false;
    this.CycleDefinitionByid = [];
    this.previewCycleData = []
    this.businessCycleDefinitionId = businessCycleDefinitionId
    this.BusinessYear = BusinessYear
    let data1 = {
      "businessCycleDefinition": {
        "id": businessCycleDefinitionId
      },
      "businessYear": BusinessYear
    }

    this.previewCycleData = []

    this.companySetttingService.viewCycleCreation(data1)
      .subscribe(response => { //: saveBusinessYear[]

        this.CycleDefinitionByid = response.data.results;
        //console.log( 'cycle creation array', this.CycleDefinitionByid )

        this.name = response.data.results[0].businessCycleDefinition.cycleName;
        this.business = response.data.results[0].businessYear;
        this.Frequency = response.data.results[0].businessCycleDefinition.frequency.name;
        // this.fromDate = response.data.results[0].businessCycleDefinition.businessYearDefinition.fromDate;
        // this.toDate = response.data.results[0].businessCycleDefinition.businessYearDefinition.toDate;

        // Changed on 02 Dec 2021
        // this.fromDate = response.data.results[0].fromDate;
        // this.toDate = response.data.results[0].toDate;

        this.fromDate = response.data.results[0].businessCycleDefinition.businessYearDefinition.fullFromDate;
        this.toDate = response.data.results[0].businessCycleDefinition.businessYearDefinition.fullToDate;

        this.businessCycleDefinitionId = businessCycleDefinitionId;
        // this.businessYearUpdate = BusinessYear;
        this.data = this.CycleDefinitionByid;
        this.adjustedToNextCycle = false;

        this.CycleDefinitionByid.forEach(element => {
         let fromdate = new Date(element.fromDate).getMonth()
         // let todate = new Date(element.toDate).getMonth()

          let getFromDateDay =  new Date(element.toDate).getDay()
          let getFromDateMonth
          if(new Date(element.toDate).getMonth() == 12){
            getFromDateMonth =  '01'
          }else{
            getFromDateMonth =  new Date(element.toDate).getMonth()
          }
          let getFromDateYear =  new Date(element.toDate).getFullYear()

          // let maxDate = getFromDateYear + '/' + getFromDateMonth + '/' + getFromDateDay

        
          // console.log(maxDate)

          //element.maxDate = new Date()
    
        // element.maxDate = element.maxDate.setMonth(fromdate + 1);
       //  element.maxDate = element.maxDate.setFullYear(element.fromDate.getFullYear());
        //  element.maxDate = new Date(element.maxDate)

          // element.minDate = element.minDate.setMonth(fromdate)
          element.minDate = new Date(element.fromDate) 

          // if(getFromDateMonth == 1 || getFromDateMonth == 3 || getFromDateMonth == 5 || getFromDateMonth == 7 || getFromDateMonth == 8 ||
          //   getFromDateMonth == 10 || getFromDateMonth == 12)
          // {
          //   getFromDateMonth = getFromDateMonth
          // }else{
          //   getFromDateMonth = getFromDateMonth + 1
          // }

          const d = new Date(getFromDateYear, getFromDateMonth+1, 31, 0, 0, 0, 0);
          element.maxDate = d
          
          // console.log("element is: "+ JSON.stringify(element))
          this.previewCycleData.push({
            "periodId": element.periodId,
            "cycleDisplayName": element.cycleDisplayName,
            "isExtended": element.extended,
            "periodName": element.periodName,
            "isLocked": element.locked,
            "fromDate": this.datepipe.transform(element.fromDate, 'dd-MMM-yyyy'),
            "toDate": this.datepipe.transform(element.toDate, 'dd-MMM-yyyy'),
            "businessYear": element.businessYear,
            "noOfDays": element.noOfDays,
            "noOfCycles": element.noOfCycles,
            "isForceToYearEnd": element.forceToYearEnd,
            "remark": element.remark,
            "isUsed": element.used,
            "isActive": element.active,
            "isAdjustedToNextCycle": false,
            "createdBy": element.createdBy,
            "lastModifiedBy": element.lastModifiedBy,
            // "createDateTime": element.createDateTime,
            // "lastModifiedDateTime":element.lastModifiedDateTime,
            "AWPHGName": element.awphgname,
            "isArrear": false,
            "isSupplimentary": element.supplimentary,
            "isAdhoc": element.adhoc,
            "businessYearDefinitionId": element.businessCycleDefinition.businessYearDefinition.businessYearDefinitionId,
            "businessCycleDefinitionId": element.businessCycleDefinition.id

          })

          // console.log(JSON.stringify(this.previewCycleData) + 'json')
        })

        this.getAllCycleCreation();
        // this.CycleCreationForm.reset();
      });




  }


  ForcetoYearEndofcycleCreation() {

    // this.updateFlag=false;
    this.data.forEach(element => {
      element.toDate = this.datepipe.transform(element.toDate, "dd-MMM-yyyy");
    });
    const cycledata1: UpdateflagCycleCreation = Object.assign({});
    cycledata1.businessCycleList = this.data;
    cycledata1.adjustedToNextCycle = this.adjustedToNextCycle;

    this.companySetttingService.EdittoDate(this.businessCycleDefinitionId, this.BusinessYear)
      .subscribe((res: any) => {

        this.alertService.sweetalertMasterSuccess(res.status.message, '');
        this.todisabletodate = true;
      },
        (error: any) => {

          this.alertService.sweetalertError(error["error"]["status"]["message"]);
        });

  }

  getAllCycleCreation(): void {
    this.CycleCreationList = [];
    this.companySetttingService.CycleDefinitionList().subscribe(res => {

      this.CycleCreationList = res.data.results;
    });
  }

  getAllCycleCreationList() {
    this.CycleCreationList1 = [];
    this.companySetttingService.getAllCycleCreation().subscribe(res => {

      this.CycleCreationList1 = res.data.results;
    });

  }

  //Post document
  // addCycleCreation(): void {

  //   this.previewCycleList = [];

  //   // businessCycleDefinitionId: number;
  //   // businessCycleDefinition: any;
  //   // businessYear: number;



  //   const addCycleCreation: SaveCycleCreation = Object.assign( {}, this.cycleCreationForm.value );

  //   console.log( 'add cycle creation', addCycleCreation );


  //   //
  //   //
  //   const businessCycleDefinition = {
  //     businessCycleDefinitionId: addCycleCreation.businessCycleDefinitionId,

  //     businessYear: addCycleCreation.businessYear
  //   }
  //   console.log( JSON.stringify( businessCycleDefinition ) );
  //   // if ( addCycleCreation.id == undefined || addCycleCreation.id == 0 ) {
  //   this.companySetttingService.AddCycleCreation( businessCycleDefinition ).subscribe( ( res: any ) => {
  //    // console.log( 'add cycle creation', res );

  //     this.previewCycleList = res.data.results;
  //     this.businessCycleDefinitionId = res.data.results[0].businessCycleDefinition.businessYearDefinitionId;
  //     this.Previewname = res.data.results[0].businessCycleDefinition.cycleName;
  //     this.Previewbusiness = res.data.results[0].businessYear;
  //     this.PreviewFrequency = res.data.results[0].businessCycleDefinition.frequency.name;
  //     this.PreviewfromDate = res.data.results[0].businessCycleDefinition.businessYearDefinition.fullFromDate;
  //     this.PreviewtoDate = res.data.results[0].businessCycleDefinition.businessYearDefinition.fullToDate;
  //     this.alertService.sweetalertMasterSuccess( res.status.message, '' );

  //     if ( res.status.code == '200' ) {
  //       this.flag = true
  //     } else {
  //       this.flag = false;
  //     }

  //     //  this.getAllCycleCreation();
  //     this.cycleCreationForm.reset();
  //     // this.UploadModal2( this.template2 );
  //   },
  //     ( error: any ) => {
  //       this.alertService.sweetalertError( error["error"]["status"]["message"] );
  //     } );




  // }

  OntoDateChange(value, data, rowIndex) {
    this.selectedRowIndex = rowIndex
    if (this.previewCycleData.length > 0) {
      this.previewCycleData.forEach((element, index) => {
        if (element.periodId == data.periodId) {
          let ind = index;
          this.previewCycleData.splice(ind, 1, {
            "periodId": element.periodId,
            "cycleDisplayName": element.cycleDisplayName,
            "isExtended": element.extended,
            "periodName": element.periodName,
            "isLocked": element.isLocked,
            "fromDate": this.datepipe.transform(element.fromDate, 'dd-MMM-yyyy'),
            "toDate": this.datepipe.transform(value, 'dd-MMM-yyyy'),
            "businessYear": element.businessYear,
            "noOfDays": element.noOfDays,
            "noOfCycles": element.noOfCycles,
            "isForceToYearEnd": element.isForceToYearEnd,
            "remark": element.remark,
            "isUsed": element.isUsed,
            "isActive": element.isActive,
            "isAdjustedToNextCycle": false,
            "createdBy": element.createdBy,
            "lastModifiedBy": element.lastModifiedBy,
            // "createDateTime": element.createDateTime,
            // "lastModifiedDateTime":element.lastModifiedDateTime,
            "AWPHGName": element.AWPHGName,
            "isArrear": false,
            "isSupplimentary": element.isSupplimentary,
            "isAdhoc": element.isAdhoc,
            "businessYearDefinitionId": element.businessYearDefinitionId,
            "businessCycleDefinitionId": element.businessCycleDefinitionId
          })

        } else {
          let length = this.previewCycleData.length - 1
          if (this.previewCycleData[length].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 1].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 2].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 3].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 4].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 5].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 6].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 7].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 8].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 9].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 10].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 11].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 12].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 13].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 14].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 15].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 16].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 17].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 18].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 19].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 20].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 21].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 22].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 23].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 24].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 25].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 26].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 27].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 28].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 29].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 30].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 31].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 32].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 33].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 34].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 35].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 36].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 37].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 38].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 39].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 40].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 41].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 42].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 43].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 44].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 45].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 46].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 47].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 48].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 49].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 50].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 51].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 52].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 53].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 54].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 55].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 56].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 57].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 58].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 59].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 60].periodId == data.periodId) { return; }
          else {
            this.previewCycleData.push({
              "periodId": data.periodId,
              "cycleDisplayName": data.cycleDisplayName,
              "isExtended": data.extended,
              "periodName": data.periodName,
              "isLocked": data.locked,
              "fromDate": this.datepipe.transform(data.fromDate, 'dd-MMM-yyyy'),
              "toDate": this.datepipe.transform(value, 'dd-MMM-yyyy'),
              "businessYear": data.businessYear,
              "noOfDays": data.noOfDays,
              "noOfCycles": data.noOfCycles,
              "isForceToYearEnd": data.forceToYearEnd,
              "remark": data.remark,
              "isUsed": data.used,
              "isActive": data.active,
              "isAdjustedToNextCycle": false,
              "createdBy": data.createdBy,
              "lastModifiedBy": data.lastModifiedBy,
              // "createDateTime": data.createDateTime,
              // "lastModifiedDateTime":data.lastModifiedDateTime,
              "AWPHGName": data.awphgname,
              "isArrear": false,
              "isSupplimentary": data.supplimentary,
              "isAdhoc": data.adhoc,
              "businessYearDefinitionId": data.businessCycleDefinition.businessYearDefinition.businessYearDefinitionId,
              "businessCycleDefinitionId": data.businessCycleDefinition.id
            })
          }

        }
      });
    } else {
      // alert(data.fromDate)

      this.minFromDate = new Date();
      this.minFromDate.setDate(data.fromDate.getDate() + 1);
      alert(this.minFromDate)

      this.previewCycleData.push({
        "periodId": data.periodId,
        "cycleDisplayName": data.cycleDisplayName,
        "isExtended": data.extended,
        "periodName": data.periodName,
        "isLocked": data.locked,
        "fromDate": this.datepipe.transform(data.fromDate, 'dd-MMM-yyyy'),
        "toDate": this.datepipe.transform(value, 'dd-MMM-yyyy'),
        "businessYear": data.businessYear,
        "noOfDays": data.noOfDays,
        "noOfCycles": data.noOfCycles,
        "isForceToYearEnd": data.forceToYearEnd,
        "remark": data.remark,
        "isUsed": data.used,
        "isActive": data.active,
        "isAdjustedToNextCycle": false,
        "createdBy": data.createdBy,
        "lastModifiedBy": data.lastModifiedBy,
        // "createDateTime": data.createDateTime,
        // "lastModifiedDateTime":data.lastModifiedDateTime,
        "AWPHGName": data.awphgname,
        "isArrear": false,
        "isSupplimentary": data.supplimentary,
        "isAdhoc": data.adhoc,
        "businessYearDefinitionId": data.businessCycleDefinition.businessYearDefinition.businessYearDefinitionId,
        "businessCycleDefinitionId": data.businessCycleDefinition.id
      })
    }
    console.log("OntoDateChange data: " + JSON.stringify(this.previewCycleData))

  }


  addRemark(value, data) {
    // debugger
    if (this.previewCycleData.length > 0) {
      this.previewCycleData.forEach((element, index) => {
        if (element.periodId == data.periodId) {
          let ind = index;
          this.previewCycleData.splice(ind, 1, {
            "periodId": element.periodId,
            "cycleDisplayName": element.cycleDisplayName,
            "isExtended": element.extended,
            "periodName": element.periodName,
            "isLocked": element.isLocked,
            "fromDate": this.datepipe.transform(element.fromDate, 'dd-MMM-yyyy'),
            "toDate": element.toDate,
            "businessYear": element.businessYear,
            "noOfDays": element.noOfDays,
            "noOfCycles": element.noOfCycles,
            "isForceToYearEnd": element.isForceToYearEnd,
            "remark": value,
            "isUsed": element.isUsed,
            "isActive": element.isActive,
            "isAdjustedToNextCycle": false,
            "createdBy": element.createdBy,
            "lastModifiedBy": element.lastModifiedBy,
            // "createDateTime": element.createDateTime,
            // "lastModifiedDateTime":element.lastModifiedDateTime,
            "AWPHGName": element.AWPHGName,
            "isArrear": false,
            "isSupplimentary": element.isSupplimentary,
            "isAdhoc": element.isAdhoc,
            "businessYearDefinitionId": element.businessYearDefinitionId,
            "businessCycleDefinitionId": element.businessCycleDefinitionId
          })
        } else {
          let length = this.previewCycleData.length - 1
          if (this.previewCycleData[length].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 1].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 2].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 3].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 4].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 5].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 6].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 7].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 8].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 9].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 10].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 11].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 12].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 13].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 14].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 15].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 16].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 17].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 18].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 19].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 20].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 21].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 22].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 23].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 24].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 25].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 26].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 27].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 28].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 29].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 30].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 31].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 32].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 33].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 34].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 35].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 36].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 37].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 38].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 39].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 40].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 41].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 42].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 43].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 44].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 45].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 46].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 47].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 48].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 49].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 50].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 51].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 52].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 53].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 54].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 55].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 56].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 57].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 58].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 59].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 60].periodId == data.periodId) { return; }
          else {
            this.previewCycleData.push({
              "periodId": element.periodId,
              "cycleDisplayName": element.cycleDisplayName,
              "isExtended": element.extended,
              "periodName": element.periodName,
              "isLocked": element.locked,
              "fromDate": this.datepipe.transform(element.fromDate, 'dd-MMM-yyyy'),
              "toDate": element.toDate,
              "businessYear": element.businessYear,
              "noOfDays": element.noOfDays,
              "noOfCycles": element.noOfCycles,
              "isForceToYearEnd": element.forceToYearEnd,
              "remark": value,
              "isUsed": element.used,
              "isActive": element.active,
              "isAdjustedToNextCycle": false,
              "createdBy": element.createdBy,
              "lastModifiedBy": element.lastModifiedBy,
              // "createDateTime": element.createDateTime,
              // "lastModifiedDateTime":element.lastModifiedDateTime,
              "AWPHGName": element.awphgname,
              "isArrear": false,
              "isSupplimentary": element.supplimentary,
              "isAdhoc": element.adhoc,
              "businessYearDefinitionId": data.businessCycleDefinition.businessYearDefinition.businessYearDefinitionId,
              "businessCycleDefinitionId": data.businessCycleDefinition.id
            })
          }
        }
      });
    } else {
      this.previewCycleData.push({
        "periodId": data.periodId,
        "cycleDisplayName": data.cycleDisplayName,
        "isExtended": data.extended,
        "periodName": data.periodName,
        "isLocked": data.locked,
        "fromDate": this.datepipe.transform(data.fromDate, 'dd-MMM-yyyy'),
        "toDate": this.datepipe.transform(data.toDate, 'dd-MMM-yyyy'),
        "businessYear": data.businessYear,
        "noOfDays": data.noOfDays,
        "noOfCycles": data.noOfCycles,
        "isForceToYearEnd": data.forceToYearEnd,
        "remark": value,
        "isUsed": data.used,
        "isActive": data.active,
        "isAdjustedToNextCycle": false,
        "createdBy": data.createdBy,
        "lastModifiedBy": data.lastModifiedBy,
        // "createDateTime": data.createDateTime,
        // "lastModifiedDateTime":data.lastModifiedDateTime,
        "AWPHGName": data.awphgname,
        "isArrear": false,
        "isSupplimentary": data.supplimentary,
        "isAdhoc": data.adhoc,
        "businessYearDefinitionId": data.businessCycleDefinition.businessYearDefinition.businessYearDefinitionId,
        "businessCycleDefinitionId": data.businessCycleDefinition.id
      })
    }

    // console.log("remark data: " + JSON.stringify(this.previewCycleData))
  }

  addCycleDisplayName(value, data) {
    // debugger
    if (this.previewCycleData.length > 0) {
      this.previewCycleData.forEach((element, index) => {
        if (element.periodId == data.periodId) {
          let ind = index;
          this.previewCycleData.splice(ind, 1, {
            "periodId": element.periodId,
            "cycleDisplayName": value,
            "isExtended": element.extended,
            "periodName": element.periodName,
            "isLocked": element.isLocked,
            "fromDate": this.datepipe.transform(element.fromDate, 'dd-MMM-yyyy'),
            "toDate": element.toDate,
            "businessYear": element.businessYear,
            "noOfDays": element.noOfDays,
            "noOfCycles": element.noOfCycles,
            "isForceToYearEnd": element.isForceToYearEnd,
            "remark": element.remark,
            "isUsed": element.isUsed,
            "isActive": element.isActive,
            "isAdjustedToNextCycle": false,
            "createdBy": element.createdBy,
            "lastModifiedBy": element.lastModifiedBy,
            // "createDateTime": element.createDateTime,
            // "lastModifiedDateTime":element.lastModifiedDateTime,
            "AWPHGName": element.AWPHGName,
            "isArrear": false,
            "isSupplimentary": element.isSupplimentary,
            "isAdhoc": element.isAdhoc,
            "businessYearDefinitionId": element.businessYearDefinitionId,
            "businessCycleDefinitionId": element.businessCycleDefinitionId
          })
        } else {
          let length = this.previewCycleData.length - 1
          if (this.previewCycleData[length].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 1].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 2].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 3].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 4].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 5].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 6].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 7].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 8].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 9].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 10].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 11].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 12].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 13].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 14].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 15].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 16].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 17].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 18].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 19].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 20].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 21].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 22].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 23].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 24].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 25].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 26].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 27].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 28].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 29].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 30].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 31].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 32].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 33].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 34].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 35].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 36].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 37].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 38].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 39].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 40].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 41].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 42].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 43].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 44].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 45].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 46].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 47].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 48].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 49].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 50].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 51].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 52].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 53].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 54].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 55].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 56].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 57].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 58].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 59].periodId == data.periodId) { return; }
          if (this.previewCycleData[length - 60].periodId == data.periodId) { return; }
          else {
            this.previewCycleData.push({
              "periodId": element.periodId,
              "cycleDisplayName": value,
              "isExtended": element.extended,
              "periodName": element.periodName,
              "isLocked": element.locked,
              "fromDate": this.datepipe.transform(element.fromDate, 'dd-MMM-yyyy'),
              "toDate": element.toDate,
              "businessYear": element.businessYear,
              "noOfDays": element.noOfDays,
              "noOfCycles": element.noOfCycles,
              "isForceToYearEnd": element.forceToYearEnd,
              "remark": element.remark,
              "isUsed": element.used,
              "isActive": element.active,
              "isAdjustedToNextCycle": false,
              "createdBy": element.createdBy,
              "lastModifiedBy": element.lastModifiedBy,
              // "createDateTime": element.createDateTime,
              // "lastModifiedDateTime":element.lastModifiedDateTime,
              "AWPHGName": element.awphgname,
              "isArrear": false,
              "isSupplimentary": element.supplimentary,
              "isAdhoc": element.adhoc,
              "businessYearDefinitionId": data.businessCycleDefinition.businessYearDefinition.businessYearDefinitionId,
              "businessCycleDefinitionId": data.businessCycleDefinition.id
            })
          }
        }
      });
    } else {
      this.previewCycleData.push({
        "periodId": data.periodId,
        "cycleDisplayName": value,
        "isExtended": data.extended,
        "periodName": data.periodName,
        "isLocked": data.locked,
        "fromDate": this.datepipe.transform(data.fromDate, 'dd-MMM-yyyy'),
        "toDate": this.datepipe.transform(data.toDate, 'dd-MMM-yyyy'),
        "businessYear": data.businessYear,
        "noOfDays": data.noOfDays,
        "noOfCycles": data.noOfCycles,
        "isForceToYearEnd": data.forceToYearEnd,
        "remark": data.remark,
        "isUsed": data.used,
        "isActive": data.active,
        "isAdjustedToNextCycle": false,
        "createdBy": data.createdBy,
        "lastModifiedBy": data.lastModifiedBy,
        // "createDateTime": data.createDateTime,
        // "lastModifiedDateTime":data.lastModifiedDateTime,
        "AWPHGName": data.awphgname,
        "isArrear": false,
        "isSupplimentary": data.supplimentary,
        "isAdhoc": data.adhoc,
        "businessYearDefinitionId": data.businessCycleDefinition.businessYearDefinition.businessYearDefinitionId,
        "businessCycleDefinitionId": data.businessCycleDefinition.id
      })
    }

    // console.log("cycleDisplayName data: " + JSON.stringify(this.previewCycleData))
  }

  forceEnd() {
    let data = {
      "businessCycleList": this.previewCycleData
    }
    this.companySetttingService.forceEnd(this.businessCycleDefinitionId, this.BusinessYear, data).subscribe(res => {
      this.alertService.sweetalertMasterSuccess(res.status.message, '');
    },
      (error: any) => {

        this.alertService.sweetalertError(error["error"]["status"]["message"]);
      });
  }

  addCycleCreation() {
    // alert()
    // console.log("save preview cycle data: " + JSON.stringify(this.previewCycleData));
    this.companySetttingService.addBusinessCycle(this.previewCycleData).subscribe(res => {
      this.alertService.sweetalertMasterSuccess(res.status.message, '');
      this.getAllCycleCreationList()

      this.companySetttingService.CycleDefinitionList().subscribe(res => {
        this.CycleDefinitionList = res.data.results;
      });
    },
      (error: any) => {

        this.alertService.sweetalertError(error["error"]["status"]["message"]);
      });
  }


  updateBusinessCycle() {
    let data = {
      "businessCycleList": this.previewCycleData
    }
    this.companySetttingService.updateBusinessCycle(this.businessCycleDefinitionId, this.BusinessYear, data).subscribe(res => {
      this.alertService.sweetalertMasterSuccess(res.status.message, '');
      this.getAllCycleCreationList()
      this.companySetttingService.CycleDefinitionList().subscribe(res => {
        this.CycleDefinitionList = res.data.results;
      },
        (error: any) => {

          this.alertService.sweetalertError(error["error"]["status"]["message"]);
        });
    })
  }





  UploadModal2(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }


  UploadModal1(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  getBussinessyearName(name): void {
    this.Name = name;
  }


  addextendedYear() {
    // alert(this.businessCycleDefinitionId)
    let data = {
      "businessCycleDefinitionId": this.businessCycleDefinitionId,
      "businessYear": this.BusinessYearformorecycle
    }
    this.companySetttingService.addextendedYear(data).subscribe(res => {


      this.alertService.sweetalertMasterSuccess(res.status.message, "");
      this.getAllCycleCreationList()
    },
      (error: any) => {
        this.alertService.sweetalertError(error["error"]["status"]["message"]);
      })




  }
  getBussinessyear(bussinessyear: number, businessCycleDefinitionid, id): void {
    this.BusinessYearformorecycle = ++bussinessyear;
    this.businessCycleDefinitionIdforMoreCycle = businessCycleDefinitionid;
    this.businessCycleDefinitionId = id
  }

  exportAsXLSX(): void {
    this.excelData = [];
    this.header = []
    this.header = ["S.No.", "Cycle Definition", "Business Year", "From Date", "To Date", "No. of Cycles"]
    //this.excelData = this.attendanceData
    this.CycleCreationList1.forEach((element, index) => {


      let obj = {
        "S.No.": index + 1,
        // "Cycle Definition": element.businessCycleDefinition.cycleName,
        "Cycle Definition": element.cycleName,
        "Business Year": element.businessYear,
        "From Date": this.datepipe.transform(new Date(element.fromDate), 'dd-MM-yyyy'),
        "To Date": this.datepipe.transform(new Date(element.toDate), 'dd-MM-yyyy'),
        "No. of Cycles": element.noOfCycles




      }
      this.excelData.push(obj)
    });
    // console.log(this.excelData)
    this.excelservice.exportAsExcelFile(this.excelData, 'Business Cycle', 'Business Cycle', this.header);
  }


  ViewCycleExportAsXLSX(): void {
    this.excelData = [];
    this.header = []
    this.header = ["S.No.", "Cycle Name", "Display Cycle Name", "From Date", "To Date", "No. Of Days", "Remark"]
    //this.excelData = this.attendanceData
    this.CycleDefinitionByid.forEach((element, index) => {


      let obj = {
        "S.No.": index + 1,
        "Cycle Name": element.periodName,
        "Display Cycle Name": element.displayCycleName,
        "From Date": this.datepipe.transform(new Date(element.fromDate), 'dd-MM-yyyy'),
        "To Date": this.datepipe.transform(new Date(element.toDate), 'dd-MM-yyyy'),
        "No. Of Days": parseInt(element.noOfDays),
        "Remark": element.remark,




      }
      this.excelData.push(obj)
    });
    // console.log(this.excelData)
    this.excelservice.exportAsExcelFile(this.excelData, 'ViewCycleExportAsXLSX', 'ViewCycleExportAsXLSX', this.header);
  }


}
