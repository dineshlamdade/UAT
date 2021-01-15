import { Component, OnInit, ViewChild, ElementRef,TemplateRef,Inject,HostListener ,ViewEncapsulation} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import {  FormArray, AbstractControl } from '@angular/forms';
import { DatePipe,DOCUMENT } from '@angular/common';
import { MyInvestmentsService } from '../../my-Investments/my-Investments.service';
import { payroll } from './payroll.service';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {FileService} from '../../my-Investments/file.service';

import { NumberFormatPipe } from '../../../core/utility/pipes/NumberFormatPipe';
import { from } from 'rxjs';
//sneha
import Swal from 'sweetalert2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
/////////////////bharati
import {saveBusinessYear,serviceDetails,saveCycleDefinition,saveCycleCreation,getchapter,flagCycleCreation,UpdateflagCycleCreation} from './payroll.model';
import { BsDatepickerConfig ,BsDatepickerViewMode} from 'ngx-bootstrap/datepicker';
import { de } from 'date-fns/locale';
import { element } from 'protractor';

@Component({
  selector: 'app-bc',
  templateUrl: './bc.component.html',
  styleUrls: ['./bc.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class payrollComponent implements OnInit {
  summaryGridData: Array<any> = [];
  summaryComputationGridDate: any;
  masterGridData: Array<any> = [];
  paymentDetailGridData: Array<any> = [];
  declarationGridData: Array<any> = [];
  familyMemberGroup: Array<any> = [];
  frequencyOfPayment: Array<any> = [];
 // BusinessYear: Array<any> = [];
  InstitutionNames: Array<any> = [];
  transactionDetail: Array<any> = [];
  uploadGridData: Array<any> = [];
  transactionInstitutionNames: Array<any> = [];
  familyMemberName: Array<any> = [];

  form: FormGroup;
  form1: FormGroup;
  Index: number;
  showUpdateButton: boolean;
  tabIndex = 0;
  radioSelected: string;
  familyRelationSame: boolean;
  enableEditRow: number;
  enableAddRow: number;
  enablePolicyTable: number;
  enableCheckbox: number;
  enableCheckboxFlag: number;
  enableCheckboxFlag3: boolean;
  addRow1: boolean;
  addRow2: number;
  previousEmployeName: Array<any> = [];
  totalDeclaredAmount: any;
  totalActualAmount: any;
  futureNewPolicyDeclaredAmount: number;
  grandTotalDeclaredAmount: number;
  grandTotalActualAmount: number;
  grandDeclarationTotal: number;
  grandActualTotal: number;
  grandRejectedTotal: number;
  grandApprovedTotal: number;
  grandTabStatus: boolean;
  isCheckAll: boolean;
  isDisabled: boolean;
  enableSelectAll: boolean;



  ////// ---------service
  declarationService: DeclarationService;
  displayUploadFile = false;
  uploadedFiles: any[] = [];
  // msgs2: Message[];
  date3: Date;
  loaded = 0;
  selectedFiles: FileList;
  currentFileUpload: File;
  receiptNumber: number;
  receiptAmount: number;
  receiptDate: Date;
  selectedInstitution: string;
  policyDuplicate: string;
//-------------------------------------------------------------------------
  sumDeclared: any;
  enableCheckboxFlag2: any;
  greaterDateValidations: boolean;
  //minDate: Date;
  financialYearStart: Date;
  windowScrolled: boolean;
  // ---------------------------Bharati----------------------------------
  @ViewChild('template2') template2: TemplateRef<any>;
  @ViewChild('multiSelect') multiSelect;
  FrequencyList:Array<any> = [];
  BusinessYear: Array<any> = [];
  ServicesList: Array<any> = [];
  //ServicesList: serviceDetails[];
  CycleDefinitionList: Array<any> = [];
  CycleCreationList: Array<any> = [];
  CycleDefinitionByid: Array<any> = [];
  previewCycleList: Array<any> = [];
  //tableData: any =[];
  serviceName=[];
  selectedLevel;
  minDate: Date;

  dropdownList = [];
  //selectedItems=[];
 // selectedItems:serviceDetails[];
  dropdownSettings = {};

  BusinessYearform:FormGroup;
  CycleDefinationForm:FormGroup;
  CycleCreationForm:FormGroup;
  CycleCreationForm1:FormGroup;
  BusinessYearId:string;
  BusinessyearList:Array<any> = [];
  id:number=0;
  updateFlag:boolean=false;
  bsConfig: Partial<BsDatepickerConfig>;
  myDateValue: Date;
  Name:string;
  minDate1:Date;
  CycleName:string;
  CycleupdateFlag:boolean=false;
  CycleupdateFlag1:boolean=false;
  disabled:boolean= true;
  todisabletodate:boolean= true;
  flag:boolean;
  name:string;
  business:string;
  Frequency:string;
  fromDate:string;
  toDate:string;
  editformDate:string;
  demoData: Array<getchapter> = [];
  editRowID: any = '';
  BusinessYearformorecycle:number;
  Previewname:string;
  Previewbusiness:string;
  PreviewFrequency:string;
  PreviewfromDate:string;
  PreviewtoDate:string;
  businessCycleDefinitionId:number;
  businessCycleDefinitionIdforMoreCycle:number;
  CycleCreationName:string;
  StausCode:string;
  selectedFrequency:string;
  adjustedToNextCycle:boolean=false;
  //businessCycleList=[];
  businessCycleList:Array<any> = [];
  data=[];
  businessYearUpdate:string;
  Multiselectflag:boolean=false;
  //template2:TemplateRef<any>;
  //template2: ElementRef;


  constructor(
    private formBuilder: FormBuilder,
    private Service: MyInvestmentsService,
    private datePipe: DatePipe,
    // private messageService: MessageService,
    private http: HttpClient,
   // private notifyService: NotificationsService,
    public datepipe: DatePipe,
    private fileService: FileService,
    private payrollService: payroll,
    private numberFormat: NumberFormatPipe,
    private modalService: BsModalService,
    @Inject(DOCUMENT) private document: Document)

    {

        this.BusinessYearform = this.formBuilder.group({
            id: new FormControl(null, ),
            description: new FormControl('', Validators.required),
            fromDate: new FormControl('', Validators.required),
            toDate: new FormControl('', Validators.required),

        });

this.ServicesList=[];

        this.CycleDefinationForm = this.formBuilder.group({
            id: new FormControl(null, ),
            name:['',[Validators.required, Validators.maxLength(10)]],//['', [Validators.required, Validators.maxLength(10)]],
            businessYearDefinitionId: new FormControl('', Validators.required),
            frequencyMasterId: new FormControl('', Validators.required),
            addDays:new FormControl('',Validators.required),
            services: new FormControl(null, ),
           // serviceName:this.formBuilder.array([])

          //serviceName:[this.ServicesList,[Validators.required]],
        //serviceName:this.ServicesList ,

       serviceName: this.ServicesList.length==0 ? [Validators.required] :[null],
     // serviceName: new FormControl(this.ServicesList.length>0, Validators.required),
          //serviceName:(this.ServicesList,Validators.required),
            //serviceName: new FormControl([this.dropdownList[0],this.dropdownList[2]], Validators.required)
        });

        this.CycleCreationForm = this.formBuilder.group({
          id: new FormControl(null, Validators.required),
          fromDate: new FormControl(null, Validators.required),
          toDate: new FormControl('', Validators.required),
      });

      this.CycleCreationForm1 = this.formBuilder.group({
        id: new FormControl(null,),
        businessCycleDefinitionId: new FormControl('', Validators.required),
        businessYear: new FormControl('', Validators.required),
    });


        // this.form = this.formBuilder.group({
        //     institutionName: new FormControl(null, Validators.required),
        //     policyNo: new FormControl(null, Validators.required),
        //     policyholdername: new FormControl(null, Validators.required),
        //     relationship: new FormControl({value: null, disabled: true}),
        //     familyMemberInfoId: new FormControl(null, Validators.required),
        //     active: new FormControl(true, Validators.required),
        //     remark: new FormControl({value: null, disabled: true}, Validators.required),
        //     frequencyOfPayment: new FormControl(null, Validators.required),
        //     premiumAmount: new FormControl(null, Validators.required),
        //     annualAmount: new FormControl({value: null, disabled: true}, Validators.required),
        //     startDate: new FormControl(null, Validators.required),
        //     endDate: new FormControl(null, Validators.required),
        //     ecs: new FormControl('0'),
        //     licMasterPaymentDetailsId: new FormControl(0),
        //     licMasterId: new FormControl(0),
        // });

        this.form1 = this.formBuilder.group({
            //name: [],
            Description: this.formBuilder.array([
              this.formBuilder.control(null)
            ]),
            FromDate: this.formBuilder.array([
                this.formBuilder.control(null)
              ]),
             ToDate: this.formBuilder.array([
                this.formBuilder.control(null)
              ])
          })
        // ----------------sneha-----------------
        // this.frequencyOfPayment = [
        //       {label: 'Monthly', value: 'Monthly'},
        //       {label: 'Yearly', value: 'Yearly'},
        //       {label: 'Half-Yearly', value: 'Halfyearly'},
        //       {label: 'Quarterly', value: 'Quarterly'}
        // ];

        this.BusinessYear=[
            {label: '2010', value: '2010'},
            {label: '2011', value: '2011'},
            {label: '2012', value: '2012'},
            {label: '2013', value: '2013'},
            {label: '2014', value: '2014'},

            {label: '2015', value: '2015'},
            {label: '2016', value: '2016'},
            {label: '2017', value: '2017'},
            {label: '2018', value: '2018'},
            {label: '2019', value: '2019'},

            {label: '2020', value: '2020'},
            {label: '2021', value: '2021'},
            {label: '2022', value: '2022'},
            {label: '2023', value: '2023'},
            {label: '2024', value: '2024'},

            {label: '2025', value: '2025'},
            {label: '2026', value: '2026'},
            {label: '2027', value: '2027'},
            {label: '2028', value: '2028'},
            {label: '2029', value: '2029'},
            {label: '2030', value: '2030'},

        ];


        this.frequencyOfPayment = [
            {label: 'Weekly', value: 'Monthly'},
            {label: 'Yearly', value: 'Yearly'},
            {label: 'Biweekly', value: 'Halfyearly'},
            {label: 'Daily', value: 'Quarterly'},
            {label: 'Semi Monthly', value: 'Semi'},
            {label: 'Monthly', value: 'yearly'},
            {label: 'Adhoc', value: 'AD'}

      ];

        this.grandTabStatus=false;
        this.isCheckAll=false;
        this.isDisabled=true;
        this.enableSelectAll=false;
    }


  modalRef: BsModalRef;
  modalRef1: BsModalRef;

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
        this.windowScrolled = true;
    }
   else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
        this.windowScrolled = false;
    }
}
scrollToTop() {
    (function smoothscroll() {
        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - (currentScroll / 8));
        }
    })();
}

  ngOnInit(): void {
      debugger
      this.myDateValue = new Date();
      this.bsConfig = Object.assign({}, { containerClass: 'theme-green custom' });

      this.getFrequency();
      this.getAllBusinessyear();
      this.getAllCycleDefinition();
      this.getAllCycleCreation();

     // getAllServices(): void {
        this.payrollService.getAllServicesName().subscribe(res => {
            debugger
            this.dropdownList = res.data.results;
          });
      //}

    // this.dropdownList = [
    //     { id: 1, label: 'New' },
    //     { id: 2, label: 'Contacted' },
    //     { id: 3, label: 'Interviewed' },
    //     { id: 4, label: 'Hired' },
    //     { id: 1, label: 'New' },
    //     { id: 2, label: 'Contacted' },
    //     { id: 3, label: 'Interviewed' },
    //     { id: 4, label: 'Hired' }
    //   ];
    debugger;
      // this.selectedItems = [
      // ];
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'serviceCodeId',
        textField: 'serviceName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: true
      };


    //   this.dropdownList = [
    //     { id: 1, label: 'New' },
    //     { id: 2, label: 'Contacted' },
    //     { id: 3, label: 'Interviewed' },
    //     { id: 4, label: 'Hired' }
    //   ];

    //   this.dropdownSettings = {
    //     singleSelection: false,
    //     idField: 'id',
    //     textField: 'label',
    //     selectAllText: 'Select All',
    //     unSelectAllText: 'UnSelect All',
    //     itemsShowLimit: 2,
    //     allowSearchFilter: true
    //   };

      this.enableAddRow = 0;
      this.enableCheckboxFlag = 1;
      this.enableCheckboxFlag3 = false;
      this.declarationService = new DeclarationService();

      // Business Financial Year API Call
      this.Service.getBusinessFinancialYear().subscribe(res => {
          this.financialYearStart = res.data.results[0].fromDate;
      });

      // Family Member List API call
      this.Service.getFamilyInfo().subscribe(res => {
          this.familyMemberGroup = res.data.results;
          res.data.results.forEach(element => {
              const obj = {
                  label: element.familyMemberName,
                  value: element.familyMemberName,
              };
              this.familyMemberName.push(obj);
          });
      });

      // Summary get Call on Page Load
      this.Service.getEightyCSummary().subscribe(res => {
          //console.log(res.data);
          this.summaryGridData = res.data.results[0].licMasterList;
          this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
          this.totalActualAmount = res.data.results[0].totalActualAmount;
          this.futureNewPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
          this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
          this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
      });

      this.Service.getpreviousEmployeName().subscribe(res => {
          console.log(res);
          if (!res.data.results[0]) {
            return ;
          }
          res.data.results.forEach(element => {
            const obj = {
              label: element,
              value: element,
            };
            this.previousEmployeName.push(obj);
          });
      });

      // Get All Institutes From Global Table
      this.Service.getAllInstitutesFromGlobal().subscribe(res => {
          //console.log(res);
          res.data.results.forEach(element => {
              const obj = {
                  label: element.insurerName,
                  value: element.insurerName,
              };
              this.InstitutionNames.push(obj);
          });
      });
  }

  ///////////////////////////////////////Bharati////////////////////////////
//  onDateChange(newDate: Date) {
//     console.log(newDate);
//   }
onStatusChange(event)
{
  debugger
  this.selectedFrequency=event.target.value;
  if(this.selectedFrequency==="5")
  {
    this.CycleDefinationForm.controls['addDays'].setValidators([Validators.required]);
  }
  else{
   //
    //this.CycleDefinationForm.patchValue:[{' addDays': null, disabled: true }],
//     const control = new FormControl('Nancy');

    this.CycleDefinationForm.patchValue({addDays:null});

    this.CycleDefinationForm.get('addDays').clearValidators();
 this.CycleDefinationForm.get('addDays').updateValueAndValidity();

  }
  debugger;
}
selected(){
  this.selectedFrequency=this.selectedLevel.name;
}

Edit(val){
  this.editRowID= val;
}

onItemSelect(item: any) {
    debugger
    this.Multiselectflag=true;
   // this.CycleDefinationForm.controls.serviceName.push(item.serviceName)
  // this.ServicesList=[];
    this.ServicesList.push(item.serviceName)
    console.log(item);
  }
  onItemDeSelect(item: any) {
    debugger
   // this.CycleDefinationForm.controls.serviceName.push(item.serviceName)
  // this.ServicesList=[];
   var index=this.ServicesList.indexOf(item.serviceName)
   if (index > -1) {
    this.ServicesList.splice(index,1)
   }
    console.log(item);
  }

  onSelectAll(items: any) {
debugger
    // this.ServicesList.forEach(function(f){
    //   addCycleDefinition.serviceName.push(f);
    // });

    items.forEach(element => {
      this.ServicesList.push(element.serviceName)
    });
    //this.ServicesList.push(items.serviceName)
    debugger
    console.log(items);
  }

  OnDateChange(event): void {
    debugger;
   this.minDate1=event;//this.datepipe.transform(event, "dd-MMM");//event.toISOString() ;
   this.minDate=event.getTime() ;
//    if ((this.Id == undefined || this.Id == '00000000-0000-0000-0000-000000000000')) {
//       this.EventDetails.patchValue({ RegistrationClosedDate:this.minDate });
//     }

  }

  OntoDateChange(event): void {
    debugger
    this.todisabletodate=false;
  }

  ResetBusiness():void{
    this.BusinessYearform.reset();
    this.updateFlag=false;
  }


  resetCycledefinition():void{
    debugger;
    this.CycleDefinationForm.reset();
   // this.CycleDefinationForm.patchValue({ serviceName: [null] });
   // this.ServicesList=[];
  }


  CancelBusiness():void{
    this.disabled=true;
    this.CycleDefinationForm.reset();
    this.updateFlag=false;
    this.CycleupdateFlag=false;
    this.CycleupdateFlag1=false;
  }
   //get all FrequencyList
  getFrequency(): void {
    this.payrollService.getFrequency().subscribe(res => {
        debugger
        this.FrequencyList = res.data.results;
      });
  }

  //get all Businessyear
  getAllBusinessyear(): void {
    this.payrollService.getAllBusinessYear().subscribe(res => {
        debugger
        this.BusinessyearList = res.data.results;
      });
  }
  //get all cycle-definition
  getAllCycleDefinition(): void {
    this.payrollService.getAllCycleDefinition().subscribe(res => {
        debugger
        this.CycleDefinitionList = res.data.results;
      });
  }

   //get all cycle-Creation
   getAllCycleCreation(): void {
    this.payrollService.getAllCycleCreation().subscribe(res => {
        debugger
        this.CycleCreationList = res.data.results;
      });
  }

    //add & update new BusinessYear
  addBusinessYear(): void{
      debugger
        const addBusinessYear:saveBusinessYear=Object.assign({},this.BusinessYearform.value);
        if( addBusinessYear.id==undefined || addBusinessYear.id==0)
        {
            addBusinessYear.fromDate = this.datepipe.transform(addBusinessYear.fromDate, "dd-MMM");
            addBusinessYear.toDate = this.datepipe.transform(addBusinessYear.toDate, "dd-MMM");
            this.payrollService.AddBusinessYear(addBusinessYear).subscribe((res:any )=> {
            debugger

            this.sweetalertMasterSuccess("Success..!!", res.status.message);
            this.getAllBusinessyear();
            this.BusinessYearform.reset();
            },
             (error: any) => {
                this.sweetalertError(error["error"]["status"]["message"]);
              });
        }
        else{
            debugger
          //Update BusinessYear service
          addBusinessYear.fromDate = this.datepipe.transform(addBusinessYear.fromDate, "dd-MMM");
          addBusinessYear.toDate = this.datepipe.transform(addBusinessYear.toDate, "dd-MMM");
          this.payrollService.UpdateBusinessYear(addBusinessYear.id,addBusinessYear).subscribe((res:any )=> {
          debugger
          this.sweetalertMasterSuccess("Updated..!!", res.status.message);
          this.getAllBusinessyear();
          this.BusinessYearform.reset();
          this.updateFlag=false;
          },
          (error: any) => {
             this.sweetalertError(error["error"]["status"]["message"]);
             // this.notifyService.showError(error["error"]["status"]["message"], "Error..!!")
           });
        }
  }

 //add new cycle-definition & update
  addCycleDefinition(): void{
    debugger
      const addCycleDefinition:saveCycleDefinition=Object.assign({},this.CycleDefinationForm.value);
      if( addCycleDefinition.id==undefined || addCycleDefinition.id==0)
      {
        const employerContributionMethod = this.CycleDefinationForm.get('serviceName');
         addCycleDefinition.serviceName=[];
          this.ServicesList.forEach(function(f){
        addCycleDefinition.serviceName.push(f);
      });
          this.payrollService.AddCycleDefinition(addCycleDefinition).subscribe((res:any )=> {
          debugger

          this.sweetalertMasterSuccess("Success..!!", res.status.message);
          this.getAllCycleDefinition();
            },
           (error: any) => {
              this.sweetalertError(error["error"]["status"]["message"]);
            });
          this.ServicesList=[];
          this.CycleDefinationForm.reset();
      }
      else{
          debugger
       this.serviceName=[];
       this.serviceName.push(addCycleDefinition.services)
       addCycleDefinition.serviceName=this.serviceName;
        this.payrollService.UpdateCycleDefinition(addCycleDefinition.id,addCycleDefinition).subscribe((res:any )=> {
        debugger
        this.sweetalertMasterSuccess("Updated..!!", res.status.message);
        this.getAllCycleDefinition();
        this.CycleDefinationForm.reset();
        this.CycleupdateFlag=false;
        this.CycleupdateFlag1=false;
        },
        (error: any) => {
           this.sweetalertError(error["error"]["status"]["message"]);
         });
      }
}


addCycleCreation(): void{
  debugger
    this.previewCycleList=[];
    const addCycleCreation:saveCycleCreation=Object.assign({},this.CycleCreationForm1.value);
    if( addCycleCreation.id==undefined || addCycleCreation.id==0)
    {
        this.payrollService.AddCycleCreation(addCycleCreation).subscribe((res:any )=> {
        debugger
       this.previewCycleList=res.data.results;
            this.businessCycleDefinitionId=res.data.results[0].businessCycleDefinition.id;
            this.Previewname=res.data.results[0].businessCycleDefinition.name;
            this.Previewbusiness=res.data.results[0].businessYear;
            this.PreviewFrequency=res.data.results[0].businessCycleDefinition.frequency.name;
            this.PreviewfromDate=res.data.results[0].businessCycleDefinition.businessYearDefinition.fromDate;
            this.PreviewtoDate=res.data.results[0].businessCycleDefinition.businessYearDefinition.toDate;
            this.StausCode=res.status.code;
            if( this.StausCode=='200')
            {
              this.flag=true
            }
            {
              this.flag=false;
            }

        this.getAllCycleCreation();
        this.CycleCreationForm1.reset();
        this.UploadModal2(this.template2);
        },
         (error: any) => {
            this.sweetalertError(error["error"]["status"]["message"]);

          });
    }
    else{

    }
}

  EditBussinessyear(BusinessId):void{
      debugger
      alert(BusinessId);

  }
  getBussinessyearName(name):void {
    this.Name=name;
  }

  getCycleCreationName(name):void {
    this.CycleCreationName=name;
  }
  getBussinessyear(bussinessyear:number,businessCycleDefinitionid):void
  {
    debugger;
   this.BusinessYearformorecycle=++bussinessyear;
   this.businessCycleDefinitionIdforMoreCycle=businessCycleDefinitionid;
  }

  getCycleName(name):void {
    this.CycleName=name;
  }

  DeleteCycleDefinitionById(id): void {
    debugger;
    this.CycleupdateFlag=false;
    this.CycleupdateFlag1=false;
    this.payrollService.DeleteCycleDefinitionById(id)
      .subscribe(response => { //: saveBusinessYear[]
          debugger
          this.getAllCycleDefinition();
          this.BusinessYearform.reset();
        });
    }

  DeleteBussinessyearById(id): void {
    debugger;
    this.updateFlag=false;
    this.payrollService.DeleteBusinessYearById(id)
      .subscribe(response => { //: saveBusinessYear[]
          debugger
          this.getAllBusinessyear();
          this.BusinessYearform.reset();
        });
    }

    DeleteCycleCreationById(businessCycleDefinitionId,BusinessYear)
    {
      debugger;
      this.updateFlag=false;
      this.payrollService.DeleteCycleCreationById(businessCycleDefinitionId,BusinessYear)
        .subscribe(response => { //: saveBusinessYear[]
            debugger
            this.getAllCycleCreation();
            this.CycleCreationForm.reset();
          });
    }

    deletePreviewCycleDiscard()
    {
      debugger;
      this.updateFlag=false;
      this.payrollService.DeletePreviewCycleDiscard(this.businessCycleDefinitionId,this.Previewbusiness)
        .subscribe(response => { //: saveBusinessYear[]
            debugger
            this.getAllCycleCreation();
            this.CycleCreationForm1.reset();
          });
    }

    setflagAdjustedToNextCycle(businessCycleDefinitionId,BusinessYear,data,flag):void{
      debugger
      this.businessCycleDefinitionId=businessCycleDefinitionId;
      this.businessYearUpdate=BusinessYear;
      this.data=data;
      this.adjustedToNextCycle=flag;
    }

    ForcetoYearEndofcycleCreation():void{
      debugger
     // this.updateFlag=false;
     this.data.forEach(element => {
           element.toDate = this.datepipe.transform(element.toDate, "dd-MMM-yyyy");
       });
     const cycledata1:UpdateflagCycleCreation=Object.assign({});
     cycledata1.businessCycleList=this.data;
     cycledata1.adjustedToNextCycle=this.adjustedToNextCycle;

      this.payrollService.EdittoDate(this.businessCycleDefinitionId,this.businessYearUpdate,cycledata1)
        .subscribe((res:any) => {
            debugger
            this.sweetalertMasterSuccess("Success..!!", res.status.message);
            this.todisabletodate=true;
        },
        (error: any) => {
          this.sweetalertError(error["error"]["status"]["message"]);
        });

    }

  EdittoDateofcycle():void{
    debugger
    //this.updateFlag=false;
   this.data.forEach(element => {
         element.toDate = this.datepipe.transform(element.toDate, "dd-MMM-yyyy");
     });
   const cycledata1:UpdateflagCycleCreation=Object.assign({});
   cycledata1.businessCycleList=this.data;
   cycledata1.adjustedToNextCycle=this.adjustedToNextCycle;

    this.payrollService.EdittoDate(this.businessCycleDefinitionId,this.businessYearUpdate,cycledata1)
      .subscribe((res:any) => {
          debugger
          this.sweetalertMasterSuccess("Success..!!", res.status.message);
          this.todisabletodate=true;
      },
      (error: any) => {
        this.sweetalertError(error["error"]["status"]["message"]);
      });

  }

    GetCycleCreationById(businessCycleDefinitionId,BusinessYear)
    {
      debugger;
      this.todisabletodate=true;
      this.updateFlag=false;
      this.CycleDefinitionByid=[];
      this.payrollService.getCycleCreationById(businessCycleDefinitionId,BusinessYear)
        .subscribe(response => { //: saveBusinessYear[]
            debugger
            this.CycleDefinitionByid=response.data.results;
            console.log('cycle creation array',this.CycleDefinitionByid)
          //   this.CycleDefinitionByid.forEach(element => {
          //     element.fromDate = new Date(element.fromDate);
          //     element.toDate = new Date(element.toDate);
          // });


            // this.CycleCreationForm.patchValue({ fromDate: response.data.results[0].fromDate });
            // this.CycleCreationForm.patchValue({ toDate: response.data.results[0].toDate });
            //this.demoData=response['result'][0];
            // this.editformDate=response.data.results[0].fromDate;

            this.name=response.data.results[0].businessCycleDefinition.name;
            this.business=response.data.results[0].businessYear;
            this.Frequency=response.data.results[0].businessCycleDefinition.frequency.name;
            this.fromDate=response.data.results[0].businessCycleDefinition.businessYearDefinition.fromDate;
            this.toDate=response.data.results[0].businessCycleDefinition.businessYearDefinition.toDate;

            this.businessCycleDefinitionId=businessCycleDefinitionId;
            this.businessYearUpdate=BusinessYear;
            this.data=this.CycleDefinitionByid;
            this.adjustedToNextCycle=false;

            // this.getAllCycleCreation();
            // this.CycleCreationForm.reset();
          });

    }


  GetBussinessyearById(id): void {
    debugger;
    this.updateFlag=true;
    this.payrollService.GetBusinessYearById(id)
      .subscribe(response => { //: saveBusinessYear[]
          debugger
        //  this.notifyService.showSuccess(response.status.messsage, "Success..!!");

         // response.data.results[0];
         this.BusinessYearform.patchValue({ id: response.data.results[0].id });
        this.BusinessYearform.patchValue({ description: response.data.results[0].description });
        this.BusinessYearform.patchValue({ fromDate: response.data.results[0].fromDate });
        this.BusinessYearform.patchValue({ toDate: response.data.results[0].toDate });
       // this.EventDetails.patchValue({ EventHostEmail: response['result'].EventHostEmail });
        //this.EventDetails.patchValue({ EventTimeZone: response['result'].EventTimeZone });
      });
      }

      GetCycleDefinitionbyIdDisable(id): void {
        this.CycleupdateFlag=true;
        this.CycleupdateFlag1=false;
        this.disabled= false;
        this.payrollService.GetCycleDefinitionById(id)
        .subscribe(response => {
        this.CycleDefinationForm.patchValue({ id: response.data.results[0].id });
        this.CycleDefinationForm.patchValue({ name: response.data.results[0].name });
       this.CycleDefinationForm.patchValue({ businessYearDefinitionId: response.data.results[0].businessYearDefinition.id });
       this.CycleDefinationForm.patchValue({ frequencyMasterId: response.data.results[0].frequency.id });
       this.CycleDefinationForm.patchValue({ services: response.data.results[0].serviceName });
       this.CycleDefinationForm.patchValue({ addDays: response.data.results[0].addDays });
      });

      }



  GetCycleDefinitionbyId(id): void {
    debugger;
    this.CycleupdateFlag=true;
    this.CycleupdateFlag1=true;
    this.payrollService.GetCycleDefinitionById(id)
      .subscribe(response => { //: saveBusinessYear[]
          debugger
        //  this.notifyService.showSuccess(response.status.messsage, "Success..!!");
//this.selectedItems=[];
         // response.data.results[0];
         this.CycleDefinationForm.patchValue({ id: response.data.results[0].id });
         this.CycleDefinationForm.patchValue({ name: response.data.results[0].name });
        this.CycleDefinationForm.patchValue({ businessYearDefinitionId: response.data.results[0].businessYearDefinition.id });
        this.CycleDefinationForm.patchValue({ frequencyMasterId: response.data.results[0].frequency.id });
        this.CycleDefinationForm.patchValue({ services: response.data.results[0].serviceName });
        this.CycleDefinationForm.patchValue({ addDays: response.data.results[0].addDays });
        //this.selectedItems.push(response.data.results[0].serviceName);
//////////////////////////////////////////////////////////////////////////////////////////////
        // this.ServicesList=[];
        // this.ServicesList.push(response.data.results[0].serviceName)
        // this.CycleDefinationForm.patchValue({ serviceName:  this.ServicesList});
        // this.dropdownList= this.ServicesList;
////////////////////////////////////////////////////////////////////////////////////////
    //this.CycleDefinationForm.patchValue({ serviceName:  this.ServicesList});
   //   this.selectedItems=(this.ServicesList);


       // this.CycleDefinationForm.get('serviceName').setValue(response.data.results[0].serviceName);
     // this.CycleDefinationForm.patchValue({ serviceName: this.ServicesList.push(response.data.results[0].serviceName) });
      // this.selectedItems.push(response.data.results[0].serviceName);

       // this.EventDetails.patchValue({ EventHostEmail: response['result'].EventHostEmail });
        //this.EventDetails.patchValue({ EventTimeZone: response['result'].EventTimeZone });
      });
      }

      CreateMoreCycleforNextYear()
      {
        debugger
        const addCycleCreation:saveCycleCreation=Object.assign({},this.CycleCreationForm1.value);
         addCycleCreation.businessCycleDefinitionId=this.businessCycleDefinitionIdforMoreCycle;
         addCycleCreation.businessYear=this.BusinessYearformorecycle;
            if( addCycleCreation.id==undefined || addCycleCreation.id==0)
            {
                this.payrollService.AddCycleCreation(addCycleCreation).subscribe((res:any )=> {
                debugger
                this.sweetalertMasterSuccess("Success..!!", res.status.message);
                this.getAllCycleCreation();
                this.CycleCreationForm1.reset();
                },
                (error: any) => {
                    this.sweetalertError(error["error"]["status"]["message"]);
                    // this.notifyService.showError(error["error"]["status"]["message"], "Error..!!")
                  });
            }
        }

  getPhonesFormControls(): AbstractControl[] {
    return (<FormArray> this.form1.get('Description')).controls,
    (<FormArray> this.form1.get('FromDate')).controls,
    (<FormArray> this.form1.get('ToDate')).controls
  }


  addPhone(): void {
    (this.form1.get('Description') as FormArray).push(
      this.formBuilder.control(null)
    );
    (this.form1.get('FromDate') as FormArray).push(
        this.formBuilder.control(null)
      );
      (this.form1.get('ToDate') as FormArray).push(
        this.formBuilder.control(null)
      );
  }

  removePhone(index) {
    (this.form1.get('Description') as FormArray).removeAt(index);
    (this.form1.get('FromDate') as FormArray).removeAt(index);
    (this.form1.get('ToDate') as FormArray).removeAt(index);
  }

  onOpenCalendar(container) {
      debugger
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('month');
  }
  ///////////////////////////////////////Bharati////////////////////////////
//   onOpenCalendar1(container) {
//       debugger
//     container.monthSelectHandler = (event: any): void => {
//       container._store.dispatch(container._actions.select(event.date));
//     };
//     container.setViewMode('Date');
//   }
  // ---------------------Summary ----------------------

    // Summary get Call
    summaryPage() {
this.getAllCycleDefinition();
      // this.Service.getEightyCSummary().subscribe(res => {
      //     this.summaryGridData = res.data.results[0].licMasterList;
      //     this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
      //     this.totalActualAmount = res.data.results[0].totalActualAmount;
      //     this.futureNewPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
      //     this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
      //     this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
      //     //console.log(res);
      // });
    }

    // Post New Future Policy Data API call
    addFuturePolicy(): void {
        const data = {
            futureNewPolicyDeclaredAmount : this.futureNewPolicyDeclaredAmount
        }
        //console.log(data);
        this.Service.postEightyCSummaryFuturePolicy(data).subscribe(res => {
              //console.log(res);
              this.summaryGridData = res.data.results[0].licMasterList;
              this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
              this.totalActualAmount = res.data.results[0].totalActualAmount;
              this.futureNewPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
              this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
              this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
        });
    }

    jumpToMasterPage(n :number) {
        console.log(n);
        this.tabIndex = 1;
        this.editMaster(3);
    }

    jumpToDeclarationPage(data) {
      this.tabIndex = 2;
      this.selectedInstitution = data;
      this.selectedTransactionInstName(data);
    }

  // ------------------------------------Master----------------------------

    // End Date Validations with Start Date
    setEndDate() {
        this.minDate = this.form.value.startDate;
        const start = this.datePipe.transform(this.form.get('startDate').value, 'yyyy-MM-dd');
        const end = this.datePipe.transform(this.form.get('endDate').value, 'yyyy-MM-dd');
        if(start>end){
            this.form.controls['endDate'].reset()
        }
    }

    // End Date Validations with Current Finanacial Year
    checkFinancialYearStartDate() {
        const end = this.datePipe.transform(this.form.get('endDate').value, 'yyyy-MM-dd');
        const financialYearStartDate = this.datePipe.transform(this.financialYearStart, 'yyyy-MM-dd');
          if(end < financialYearStartDate) {
              this.sweetalertWarning("End Date should be greater than or equal to Current Financial Year : "+this.financialYearStart);
              this.form.controls['endDate'].reset();
          }
    }

    // Get Master Page Data API call
    masterPage() {
      this.getAllBusinessyear();
        // this.Service.getEightyCMaster().subscribe(res => {
        //     //console.log(res);
        //     this.masterGridData = res.data.results;
        //     this.masterGridData.forEach(element => {
        //         element.startDate = new Date(element.startDate);
        //         element.endDate = new Date(element.endDate);
        //     });
        // });
    }

    // Post Master Page Data API call
    addMaster(formData: any, formDirective: FormGroupDirective): void {
        if (this.form.invalid) {
            return;
        }

        const startDate = this.form.value.startDate;
        const endDate = this.form.value.endDate;

        if ((startDate > endDate) && (endDate !== null)) {
            this.greaterDateValidations = true;
            return;
        } else {
            this.greaterDateValidations = false;
        }

        const start = this.datePipe.transform(this.form.get('startDate').value, 'yyyy-MM-dd');
        const end = this.datePipe.transform(this.form.get('endDate').value, 'yyyy-MM-dd');
        const data = this.form.getRawValue();

        data.startDate = start;
        data.endDate = end;
        data.premiumAmount = data.premiumAmount.toString().replace(',', "");
        //console.log(data);

        this.Service.postEightyCMaster(data).subscribe(res => {
            //console.log(res);
            if(res.data.results.length > 0) {
                this.masterGridData = res.data.results;
                this.masterGridData.forEach(element => {
                    element.startDate = new Date(element.startDate);
                    element.endDate = new Date(element.endDate);
                });
                this.sweetalertMasterSuccess("Record saved Successfully.", "Go to Declaration & Actual Page to see Schedule.");
            } else {
                this.sweetalertWarning(res.status.messsage);
            }
          });

        this.Index = -1;
        //console.log(this.form.getRawValue());
        formDirective.resetForm();
        this.form.reset();
        this.form.get('active').setValue(true);
        this.form.get('ecs').setValue(0);
        this.showUpdateButton = false;
        this.paymentDetailGridData = [];
    }

    // Calculate annual amount on basis of premium and frquency
    calculateAnnualAmount() {
        let installment = this.form.value.premiumAmount;
        installment = installment.toString().replace(',', "");
        //console.log(installment);
        if (!this.form.value.frequencyOfPayment) {
            installment = 0;
        }
        if (this.form.value.frequencyOfPayment === 'Monthly') {
            installment = installment * 12;
        } else if (this.form.value.frequencyOfPayment === 'Quarterly') {
            installment = installment * 4;
        } else if (this.form.value.frequencyOfPayment === 'Halfyearly') {
            installment = installment * 2;
        } else {
            installment = installment * 1;
        }
        let formatedPremiumAmount = this.numberFormat.transform(this.form.value.premiumAmount)
        //console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
        this.form.get('premiumAmount').setValue(formatedPremiumAmount);
        this.form.get('annualAmount').setValue(installment);
    }

    // Family relationship shown on Policyholder selection
    OnSelectionfamilyMemberGroup() {
        const toSelect = this.familyMemberGroup.find(c => c.familyMemberName === this.form.get('policyholdername').value);
        this.form.get('familyMemberInfoId').setValue(toSelect.familyMemberInfoId);
        this.form.get('relationship').setValue(toSelect.relation);
    }

    // dateValidations() {
    //   const startDate = this.form.value.startDate;
    //   const endDate = this.form.value.endDate;
    //   if ((startDate > endDate) && (endDate !== null)) {
    //     this.greaterDateValidations = true;
    //     return;
    //     } else {
    //     this.greaterDateValidations = false;
    //     }
    // }

    deactivateRemark() {
        if (this.form.value.active === false) {
            this.form.get('remark').enable();
            this.form.get('remark').setValidators([Validators.required]);
        } else {
            this.form.get('remark').clearValidators();
            this.form.get('remark').disable();
            this.form.get('remark').reset();
        }
    }

    // On Master Edit functionality
    editMaster(i: number) {
        this.scrollToTop();
        this.paymentDetailGridData = this.masterGridData[i].paymentDetails;
        this.form.patchValue(this.masterGridData[i]);
        //console.log(this.form.getRawValue());
        this.Index = i;
        this.showUpdateButton = true;
        let formatedPremiumAmount = this.numberFormat.transform(this.masterGridData[i].premiumAmount)
        //console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
        this.form.get('premiumAmount').setValue(formatedPremiumAmount);
    }

  // ----------------------------------------------- Declaration --------------------------------------

    // On declaration page get API call for All Institutions added into Master
    declarationPage() {
        this.tabIndex=2;
        this.transactionInstitutionNames=[];
        const data = {
            label: 'All',
            value: 'All',
        };
        //console.log(data);
        this.transactionInstitutionNames.push(data);
        //console.log(this.transactionInstitutionNames);
        this.Service.getEightyCDeclarationInstitutions().subscribe(res => {
            res.data.results[0].forEach(element => {
                const obj = {
                    label: element,
                    value: element,
                };
                this.transactionInstitutionNames.push(obj);
            });
            //console.log(res);
        });
        this.resetAll();
        this.selectedTransactionInstName('All');
    }

    // On institution selection show all transactions list accordingly all policies
    selectedTransactionInstName(institutionName:any) {
        const data = institutionName;
        //console.log(data);
        this.Service.getTransactionInstName(data).subscribe(res => {
            console.log(res);
            this.transactionDetail = res.data.results[0].licTransactionDetail;
            this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
            this.grandActualTotal = res.data.results[0].grandActualTotal;
            this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
            this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
            this.transactionDetail.forEach(element => {
                element.lictransactionList.forEach(innerElement => {
                      if(innerElement.dateOfPayment !== null) {
                          innerElement.dateOfPayment = new Date(innerElement.dateOfPayment);
                      }
                });
            })
        });
        if(institutionName=='All') {
            this.grandTabStatus=true;
            this.isDisabled=true;
        } else{
            this.grandTabStatus=false;
            this.isDisabled=false;
        }
        this.resetAll();
    }

    // ON select to check input boxex
    onSelectUpload(data: any, event: { target: { checked: any; }; }, i: number, j: number, item) {
        const checked = event.target.checked;
        if (checked) {
            this.uploadGridData.push(data.licTransactionId);
        } else {
            const index = this.uploadGridData.indexOf(data.licTransactionId);
            this.uploadGridData.splice(index, 1);
        }
        if (this.uploadGridData.length) {
            this.enableCheckboxFlag3 = true;
            this.enableCheckboxFlag2 = item.institutionName;
        } else {
            this.enableCheckboxFlag3 = false;
            this.enableCheckboxFlag2 = null;
        }
        console.log(this.uploadGridData);
        console.log(this.uploadGridData.length);
        console.log(item.lictransactionList.length);

        if (this.uploadGridData.length==item.lictransactionList.length) {
          this.isCheckAll = true;
          this.enableSelectAll = true;
          this.enableCheckboxFlag2 = item.institutionName;
        } else {
          this.isCheckAll = false;
          this.enableSelectAll = false;
          this.enableCheckboxFlag2 = null;
          this.uploadGridData=[];
        }
    }

    // To Check / Uncheck Single checkbox
    singleSelect() {
        console.log('hi....');
    }

    // To Check / Uncheck All  Checkboxes
    checkUncheckAll(item: any) {
        //console.log('hi...');
        if(this.isCheckAll) {
            this.isCheckAll = false;
            this.enableSelectAll = false;
            this.enableCheckboxFlag2 = null;
        } else {
            this.isCheckAll = true;
            this.enableSelectAll = true;
            this.enableCheckboxFlag2 = item.institutionName;
            this.uploadGridData=[];
        }

    }

    editDeclrationRow(summary: { previousEmployerName: any; declaredAmount: any; dateOfPayment: any; actualAmount: any; }, i: any, j: any) {
        this.declarationService = new DeclarationService(summary);
    }

    updateDeclrationRow(i: string | number, j: string | number) {
        this.transactionDetail[j].actualTotal += this.declarationService.actualAmount - this.transactionDetail[j].lictransactionList[i].actualAmount;
        this.transactionDetail[j].lictransactionList[i] =  this.declarationService;
        this.declarationService = new DeclarationService();
    }

    SaveDeclrationRow(j) {
        if (!this.declarationService) {
            return;
        }
        this.transactionDetail[j].declarationTotal += this.declarationService.declaredAmount;
        this.transactionDetail[j].actualTotal +=  this.declarationService.actualAmount;
        this.grandActualTotal += this.declarationService.actualAmount;
        this.grandDeclarationTotal += this.declarationService.declaredAmount;
        this.transactionDetail[j].lictransactionList.push(this.declarationService);
        this.declarationService = new DeclarationService();

    }

      submitDeclaration() {
      // this.tabIndex = 0;
        console.log(this.transactionDetail);
        this.tabIndex = 0;
        this.transactionDetail.forEach(element => {
          element.lictransactionList.forEach(element => {
            element.dateOfPayment = this.datePipe.transform(element.dateOfPayment, 'yyyy-MM-dd');
          });
        });
        const data = this.transactionDetail;
        this.Service.postEightyCDeclarationTransaction(data).subscribe(res => {
          console.log(res);
          this.transactionDetail = res.data.results[0].licTransactionDetail;
          this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
          this.grandActualTotal = res.data.results[0].grandActualTotal;
          this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
          this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
          this.transactionDetail.forEach(element => {
            element.lictransactionList.forEach(element => {
              element.dateOfPayment = new Date(element.dateOfPayment);
            });
        });
        });
        this.resetAll();
    }




  resetAll() {
      this.enableEditRow = this.enablePolicyTable = this.addRow2 = -1;
      this.uploadGridData = [];
      this.enableCheckboxFlag3 = false;
      this.enableCheckboxFlag2 = null;
      this.declarationService = new DeclarationService();
  }

  ///// --------------------------------rahul-------------

    UploadFilePopUp() {
      this.displayUploadFile = true;
    }


    onUpload(event) {
      console.log(event);
      this.currentFileUpload = event.files;
      // for(let file of event.files) {
      //     this.uploadedFiles.push(file);

      // }
      // this.SuccessMessage();
      this.upload();
    }

    // SuccessMessage() {
    //   this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    // }

    // Uploads the file to backend server.
    upload() {
      // this.currentFileUpload = this.selectedFiles.item(0);
    const data = {
        licTransactionIDs: this.uploadGridData,
        receiptNumber: this.receiptNumber,
        receiptAmount: this.receiptAmount,
        receiptDate: this.receiptDate,
      };

    this.fileService.uploadSingleFile(this.currentFileUpload, data)
        .pipe(tap(event => {
            if (event.type === HttpEventType.UploadProgress) {
                this.loaded = Math.round(100 * event.loaded / event.total);
            }
        }))
        .subscribe(event => {
            if (event instanceof HttpResponse) {
                // this.snackBar.open('File uploaded successfully!', 'Close', {
                //   duration: 3000
                // });
                this.fileService.fetchFileNames();
            }
        });
    }

    sweetalert7(message:any) {
        Swal.fire({
          text: message,
        })
    }

    sweetalertWarning(message:any) {
        Swal.fire({
            title: message,
            showCloseButton: true,
            showCancelButton: false,
            toast:true,
            position:'top-end',
            showConfirmButton:false,
            background:'#e68a00',
            icon:'warning',
            timer: 15000,
            timerProgressBar: true,
        })
    }

    sweetalertInfo(message:any) {
        Swal.fire({
            title: message,
            showCloseButton: true,
            showCancelButton: false,
            toast:true,
            position:'top-end',
            showConfirmButton:false,
            icon:'info',
            timer: 15000,
            timerProgressBar: true,
        })
    }

    sweetalertMasterSuccess(message:any, text:any) {
        Swal.fire({
            title: message,
            text: text,
            showCloseButton: true,
            showCancelButton: false,
            toast:true,
            position:'top-end',
            showConfirmButton:false,
            icon:'success',
            timer: 15000,
            timerProgressBar: true,
        })
    }

    sweetalertError(message:any) {
        Swal.fire({
            title: message,
            showCloseButton: true,
            showCancelButton: false,
            toast:true,
            position:'top-end',
            showConfirmButton:false,
            icon:'error',
            timer: 15000,
            timerProgressBar: true,
        })
    }

    UploadModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'gray modal-md' })
        );
    }

    UploadModal1(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'gray modal-md' })
        );
    }


    UploadModalYesNo(template: TemplateRef<any>) {
      this.modalRef1 = this.modalService.show(
          template,
          Object.assign({}, { class: 'gray modal-md' })
      );
  }
    UploadModal2(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'gray modal-xl' })
        );
    }
    // private processData() {
    //   const statesSeen = {};
    //   const countiesSeen = {};

    //   this.declarationGridData = this.declarationGridData.sort((a, b) => {
    //     const stateComp = a.state.localeCompare(b.state);
    //     return stateComp ? stateComp : a.county.localeCompare(b.county);
    //   }).map(x => {
    //     const stateSpan = statesSeen[x.state] ? 0 :
    //       this.declarationGridData.filter(y => y.state === x.state).length;

    //     statesSeen[x.state] = true;

    //     const countySpan = countiesSeen[x.state] && countiesSeen[x.state][x.county] ? 0 :
    //       this.declarationGridData.filter(y => y.state === x.state && y.county === x.county).length;

    //     countiesSeen[x.state] = countiesSeen[x.state] || {};
    //     countiesSeen[x.state][x.county] = true;

    //     return { ...x, stateSpan, countySpan };
    //   });
    // }

  }

    class DeclarationService {
        previousEmployerName: string;
        declaredAmount: number;
        dateOfPayment: Date;
        actualAmount: number;
        licTransactionId = 0;
        constructor(obj?: any) {
            Object.assign(this, obj);
        }
    }
