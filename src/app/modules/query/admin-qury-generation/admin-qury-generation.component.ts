import { Component, OnInit } from '@angular/core';
import { TemplateRef} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { QueryService } from '../query.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-admin-qury-generation',
  templateUrl: './admin-qury-generation.component.html',
  styleUrls: ['./admin-qury-generation.component.scss']
})
export class AdminQuryGenerationComponent implements OnInit {
  queryGenerationForm: FormGroup;
  moduleListData :any;
  getAllQueryGenerationData: any;
  querySubQueryTypeQAData: any;
  subQueryType: any;
  isSave:boolean = true;
  isSave2:boolean = false;
  isReset:boolean = true;
  isUpdate:boolean = false;
  isCancle :boolean = false;
  editflag: boolean = false;
  getByIdData: any;
  addQueryGenerationData: any;
  updateQueryGenerationData: any;
  queryGenerationEmpId:number=0;

  documentIndex: any;
  selectedDoc: any;
  public modalRef: BsModalRef;
  // public masterfilesArray: File[] = [];
  public urlArray: Array<any> = [];
  public urlIndex: number;
  public urlSafe: SafeResourceUrl;
  documentList: any = [];

  perticularEmpDetails: any;
  multipleEmpFlag:boolean = true;
  employeeMasterIdData: any;
  subQueryData: any;
  priorityData: any;
  listQAData: any = [];
  selectedModuleId: any;
  queryTemplateData: any;
  selectedModule: any;
  queryNumberData: any;
  listDoc: any = [];
  editQuerySummaery: any;
  employeeMasterId: any;
  addQuerywithDocsData: any;
  queryTempData: any;
  listSubQA: any;
  listSubQueryTypeData: any = [];
  viewFlag :boolean = false;
  queryDocs: any;
  fileName:any;
  editQueryTypeMasterId: any = '';
  hideEditTime:boolean= true;
  hideEditTime1:boolean=true;
  ListOfDocuments:any;
  documents: any;
// ...........for single query btns.........................................
  isSaveDraft:boolean=true;
  isPrevious:boolean=false;
  isSaveDraftNext:boolean=false;
  isSaveNext:boolean=false;
  isnext:boolean=false;
  getQueAnstemplistByIdData: any;
  descriptionData: any;
  listQAData1: any;
  defaultPriority: any;
  priorityType: any;
  listQAData2: any;
  isUpdateDraft:boolean=false;
  selectedQueryTemp: any;
  querySubject: any;
  queryDesc: any;
  viewDoc: File[];
  emplData: any;
  index: number;
  selectedEmployee: any;
  emlpoyeeSelectionData: any;
  employeeListId: any;
  templatedata: any;
  userData: any;

  constructor(public formBuilder : FormBuilder ,public queryService :QueryService , private alertService: AlertServiceService
    ,private router: Router,public sanitizer: DomSanitizer,
    private modalService: BsModalService,private authService: AuthService)

    {
    this.queryGenerationForm = this.formBuilder.group(
    {
        "queryGenerationEmpId":new FormControl(0),
        "queryNumber":new FormControl(0),
        "employeeMasterId":new FormControl(),//temp

        "employeeMasterIdList":new FormControl([]),
        "onBehalfOfEmployee":new FormControl(true),
        "sameContentForAllEmp":new FormControl(false),

        "applicationModuleId":new FormControl(null,[Validators.required]),
        "queryTypeMasterId":new FormControl(null,[Validators.required]),
        "subQueTypeMasterId":new FormControl(0),
        "queAnsMasterId":new FormControl(null,[Validators.required]),
        "priority":new FormControl(null),
        "queryDescription":new FormControl('',[Validators.required]),
        "subject":new FormControl('',[Validators.required]),
        "queryRootCause":new FormControl(null),
        "status":new FormControl('save'),
    })

    this.userData = this.authService.getprivileges()
      console.log("userData::", this.userData);
      this.employeeMasterId = this.userData.UserDetails.employeeMasterId;


    if(localStorage.getItem('dashboardSummary')!= null){
      let formdata = JSON.parse(localStorage.getItem('dashboardSummary'))
       this.queryGenerationForm.patchValue(formdata);
      //  this.getById(formdata.queryGenerationEmpId);
       console.log("formdata.queryGenerationEmpId",formdata)
       this.queryGenerationForm.enable();
       this.editQuery(formdata);
       console.log('formdata',formdata)
       this.queryGenerationForm.controls['queAnsMasterId'].setValue(formdata.queAnsMasterId);
      //  console.log('formdata.queAnsMasterId',formdata.queAnsMasterId)
       this.queryGenerationForm.controls['priority'].setValue(formdata.priority);
       this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(formdata.subQueTypeMasterId);
      //  this.editflag = true;
       if(formdata.status == 'Draft'){
        this.isUpdateDraft = true;
        this.isUpdate = false;
        this.isSaveDraft = false;
        this.isSave = true;
       }else{
       this.isUpdate = true;
       this.isUpdateDraft = false;
       this.isSaveDraft = true;
       this.isSave = false;

       }
       localStorage.removeItem('dashboardSummary');

    }

    if(localStorage.getItem('viewdashboardSummary')!= null){

      let formdata = JSON.parse(localStorage.getItem('viewdashboardSummary'))
       this.queryGenerationForm.patchValue(formdata);

      //  this.getById(formdata.queryGenerationEmpId);
       this.editQuery(formdata);
       this.queryGenerationForm.controls['queAnsMasterId'].setValue(formdata.queAnsMasterId);
       //  console.log('formdata.queAnsMasterId',formdata.queAnsMasterId)
        this.queryGenerationForm.controls['priority'].setValue(formdata.priority);
        this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(formdata.subQueTypeMasterId);
       this.queryGenerationForm.disable();
       this.isSaveDraft = false;
       this.isSave = false;
       this.isReset = false;
       this.hideEditTime = false;
       localStorage.removeItem('viewdashboardSummary')

    }
    /******************************** Same NR */
    if(localStorage.getItem('queryListEmpData') != null){
      this.employeeListId = []
      this.emplData = JSON.parse(localStorage.getItem('queryListEmpData'))
      this.emplData.forEach(element => {
        this.employeeListId.push(element.employeeMasterId)
      });
      this.index =0
      this.selectedEmployee = this.emplData[this.index]
    console.log("this.selectedEmployee",this.selectedEmployee)

      this.employeeMasterId = this.selectedEmployee.employeeMasterId
      this.getEmpMasterDetails(this.employeeMasterId);
      localStorage.removeItem('queryListEmpData')

      if(localStorage.getItem('emlpoyeeSelectionData') != null){
        this.emlpoyeeSelectionData = JSON.parse(localStorage.getItem('emlpoyeeSelectionData'))

        if(this.employeeListId.length == 1){
          this.isPrevious = false;
          this.isSaveNext = false;
          this.isSaveDraftNext = false;
          this.isSave = false;
          this.isSaveDraft = true;
          this.isSave2 = true;

        }else{
        this.isnext = true;
        this.isPrevious = true;
        this.isSaveNext = true;
        this.isSaveDraftNext = true;
        this.isSave = false;
        this.isSaveDraft = false;
        this.isSave2 = false;

      }

        if(this.emlpoyeeSelectionData.onBehalf == 'yes' && this.emlpoyeeSelectionData.sameContent == 'yes' ||
        this.emlpoyeeSelectionData.onBehalf == 'no' && this.emlpoyeeSelectionData.sameContent == 'yes'){
         this.multipleEmpFlag = false;
         this.isPrevious = false;
         this.isSaveNext = false;
         this.isSaveDraftNext = false;
        this.isSave = true;
        this.isnext = false;
        this.isSaveDraft = true;

        }else{
         this.multipleEmpFlag = true;
         this.isPrevious = true;
         this.isSaveNext = true;
         this.isSaveDraftNext = true;
        this.isSave = false;
        this.isnext = true;
        this.isSaveDraft = false;
        }
        if(this.emlpoyeeSelectionData.onBehalf == 'yes'){
          this.queryGenerationForm.controls['onBehalfOfEmployee'].setValue(true);
        }else{
          this.queryGenerationForm.controls['onBehalfOfEmployee'].setValue(false);
        }

        if(this.emlpoyeeSelectionData.sameContent == 'yes'){
          this.queryGenerationForm.controls['sameContentForAllEmp'].setValue(true);
        }else{
          this.queryGenerationForm.controls['sameContentForAllEmp'].setValue(false);
        }

      localStorage.clear();

      }

    }


   }

   nextRecord(){
    //  alert()
     this.index = this.index + 1;
     this.selectedEmployee = this.emplData[this.index];
     this.employeeMasterId = this.selectedEmployee.employeeMasterId;
     console.log("selectedEmployee",this.selectedEmployee)
     this.getEmpMasterDetails(this.employeeMasterId);

   }
   priviousRecord(){
    this.index = this.index - 1;
    this.selectedEmployee = this.emplData[this.index];
    this.employeeMasterId = this.selectedEmployee.employeeMasterId;
    this.getEmpMasterDetails(this.employeeMasterId);

  }

  ngOnInit(): void {
    this.getModuleName();
    this.getAllQueryListSummary();
  }

  queryGenerationFormSubmit(value)
  {
    if(value == 'Save'){
     this.queryGenerationForm.controls['status'].setValue('Save');
    }else{
    this.queryGenerationForm.controls['status'].setValue('Draft');
    }

    if(!this.editflag){
      this.addQueryGeneration();
    }else{
      this.updateQueryGeneration(value);

    }

  if (this.queryGenerationForm.invalid) {
    return;
  }
  this.reset();
  }
// .........................................api calling..................................................
  getModuleName()
{
  this.queryService.getModuleName().subscribe(res => {
    this.moduleListData = res.data.results;
  })
}
getAllQueryListSummary() //summary table
{
this.queryService.getAllQueryList().subscribe(res =>
  {
    this.getAllQueryGenerationData = res.data.results;
    this.getAllQueryGenerationData.forEach(element => {
    this.queryNumberData = element.queryNumber;

    });
    this.getEmpMasterDetails(this.employeeMasterId);

  })
}

getById(queryGenerationEmpId) { //used for the edit

  this.queryService.getById(queryGenerationEmpId).subscribe(res => {

    this.getByIdData = res.data.results[0];
    console.log(JSON.stringify(this.getByIdData))

    this.querySubQueryTypeQA(this.getByIdData.applicationModuleId);

    this.listDoc = this.getByIdData.listDoc;
    this.viewDoc = this.listDoc;
    this.queryGenerationForm.controls['priority'].setValue(this.getByIdData.priority);
    this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(this.getByIdData.subQueTypeMasterId);
    // this.getSubQueryListData(this.getByIdData.queryTypeMasterId)
    this.queryGenerationForm.controls['queryTypeMasterId'].setValue(this.getByIdData.queryTypeMasterId);


  })
}
querySubQueryTypeQA(applicationModuleId)  //for all dropdown
  {
    this.queryService.querySubQueryTypeQA(applicationModuleId).subscribe(res => {
      this.querySubQueryTypeQAData = res.data.results;
      this.querySubQueryTypeQAData.forEach(element => {
        if (element.subQuery == false) {
          this.listQAData = element.listQA;
        }
        else {
          element.listSubQueryTypeData.forEach(element => {
            this.listQAData = element.listSubQA;

          });
        }
        if (this.editflag || this.viewFlag) {

          this.getSubQueryListData(this.getByIdData.queryTypeMasterId);
          this.editQueryTypeMasterId = this.getByIdData.queryTypeMasterId
          this.queryGenerationForm.controls['queryTypeMasterId'].setValue(this.getByIdData.queryTypeMasterId);
        }
      });
    })
  }

  getSubQueryListData(value) {
    this.listQAData=[];
    this.querySubQueryTypeQAData.forEach(element => {
      if (element.queryTypeMasterId == parseInt(value)) {
        this.subQueryData = element.listSubQueryTypeData;
        // console.log(" this.subQueryData", this.subQueryData)
        this.priorityData = element.listPriority;
        this.priorityData.forEach(element => {
          if(element.defaultPriority == true)
          this.priorityType = element.priorityType;
        this.queryGenerationForm.controls['priority'].setValue(this.priorityType);
        // console.log("this.priorityType",this.priorityType)
        });
        if (element.subQuery == false) {
          this.listQAData = element.listQA;
          console.log("element.listQA",element.listQA)
        }
      else {
          element.listSubQueryTypeData.forEach(element => {
            element.listSubQA.forEach(element => {
              this.listQAData.push(element)

            });

          });

        }
        if (this.editflag || this.viewFlag) {

          this.gettempdatafromsubquery(this.getByIdData.subQueTypeMasterId);
          this.queryGenerationForm.controls['queAnsMasterId'].setValue(this.getByIdData.queAnsMasterId);
        }
      }
    });
  }


  gettempdatafromsubquery(value){

    this.subQueryData.forEach(element => {
      if(element.subQueTypeMasterId == value){
       this.listQAData = element.listSubQA
      console.log(" this.templatedata", this.listQAData)
      }

    });
  }
moduleChange(value) // when module is changed then template also changed.
{
  this.selectedModuleId = value;
  this.querySubQueryTypeQA( this.selectedModuleId);
}

queryTempChange(value)
{
          this.listQAData.forEach(element => {
            if(element.queAnsMasterId == value){
          this.querySubject = element.questionSubject;
          this.queryDesc = element.description
          this.queryGenerationForm.controls['subject'].setValue(this.querySubject);
          this.queryGenerationForm.controls['queryDescription'].setValue(this.queryDesc);
        }
          });
          // console.log("this.listQAData", this.listQAData);
}

addQueryGeneration(){ //post api for saving data

  console.log("this.emlpoyeeSelectionData",this.emlpoyeeSelectionData);

  if(localStorage.getItem('emlpoyeeSelectionData') != null ){

  if(this.emlpoyeeSelectionData.onBehalf == 'yes' && this.emlpoyeeSelectionData.sameContent == 'no')
  {
    this.queryGenerationForm.controls['employeeMasterIdList'].setValue(this.employeeListId);

      if(this.listDoc.length == 0){
        this.queryGenerationForm.controls['applicationModuleId'].setValue(parseInt(this.queryGenerationForm.controls['applicationModuleId'].value));
        this.queryGenerationForm.controls['queryTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queryTypeMasterId'].value));
        this.queryGenerationForm.controls['queAnsMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queAnsMasterId'].value));
        this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));
        this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));
        this.queryGenerationForm.controls['employeeMasterId'].setValue(this.employeeMasterId);

        let data = []
        data.push(this.queryGenerationForm.value)
        let queryGenerationEmployeeData  = {
          "queryRequestDTO": data
          }
          const formData  = new FormData();
          formData.append('queryGenerationEmployeeData', JSON.stringify(queryGenerationEmployeeData));
          this.queryService.addQueryGeneration(formData).subscribe(res =>
          {
            this.addQueryGenerationData = res.data.results;
            this.getAllQueryListSummary();
            this.alertService.sweetalertMasterSuccess('Query Generated Successfully.', '' );
            localStorage.clear();
            this.queryGenerationForm.controls['queryDescription'].reset();
            this.reset();
          })
          }else{
            this.addQuerywithDocs();
          }

        }

  else if(this.emlpoyeeSelectionData.onBehalf == 'yes' && this.emlpoyeeSelectionData.sameContent == 'yes')
        {
        this.queryGenerationForm.controls['employeeMasterIdList'].setValue(this.employeeListId);

            if(this.listDoc.length == 0){
              this.queryGenerationForm.controls['applicationModuleId'].setValue(parseInt(this.queryGenerationForm.controls['applicationModuleId'].value));
              this.queryGenerationForm.controls['queryTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queryTypeMasterId'].value));
              this.queryGenerationForm.controls['queAnsMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queAnsMasterId'].value));
              this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));
              this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));
              this.queryGenerationForm.controls['employeeMasterId'].setValue(this.employeeMasterId);

              let data = []
              data.push(this.queryGenerationForm.value)
              let queryGenerationEmployeeData  = {
                "queryRequestDTO": data
                }
                const formData  = new FormData();
                formData.append('queryGenerationEmployeeData', JSON.stringify(queryGenerationEmployeeData));
                this.queryService.addQueryGeneration(formData).subscribe(res =>
                {
                  this.addQueryGenerationData = res.data.results;
                  this.getAllQueryListSummary();
                  this.alertService.sweetalertMasterSuccess('Query Generated Successfully.', '' );
                  localStorage.clear();
                  this.queryGenerationForm.controls['queryDescription'].reset();
                  this.reset();
                })
                }else{
                  this.addQuerywithDocs();
                }
              // });

        }

  else if(this.emlpoyeeSelectionData.onBehalf == 'no' && this.emlpoyeeSelectionData.sameContent == 'yes')
              {

              this.queryGenerationForm.controls['employeeMasterIdList'].setValue(this.employeeListId);
              // this.queryGenerationForm.controls['sameContentForAllEmp'].setValue('true');

                  if(this.listDoc.length == 0){
                    this.queryGenerationForm.controls['applicationModuleId'].setValue(parseInt(this.queryGenerationForm.controls['applicationModuleId'].value));
                    this.queryGenerationForm.controls['queryTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queryTypeMasterId'].value));
                    this.queryGenerationForm.controls['queAnsMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queAnsMasterId'].value));
                    this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));
                    // this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));
                    this.queryGenerationForm.controls['employeeMasterId'].setValue(0);

                    let data = []
                    data.push(this.queryGenerationForm.value)
                    let queryGenerationEmployeeData  = {
                      "queryRequestDTO": data
                      }
                      const formData  = new FormData();
                      formData.append('queryGenerationEmployeeData', JSON.stringify(queryGenerationEmployeeData));
                      this.queryService.addQueryGeneration(formData).subscribe(res =>
                      {
                        this.addQueryGenerationData = res.data.results;
                        this.getAllQueryListSummary();
                        this.alertService.sweetalertMasterSuccess('Query Generated Successfully.', '' );
                        console.log('No yes senario',JSON.stringify(this.addQueryGenerationData))
                        localStorage.clear();
                        this.queryGenerationForm.controls['queryDescription'].reset();
                        this.reset();
                      })
                      }else{
                        this.addQuerywithDocs();
                      }

        }

  else if(this.emlpoyeeSelectionData.onBehalf == 'no' && this.emlpoyeeSelectionData.sameContent == 'no')
                    {

                    this.queryGenerationForm.controls['employeeMasterIdList'].setValue(this.employeeListId);
                    // this.queryGenerationForm.controls['sameContentForAllEmp'].setValue('true');

                        if(this.listDoc.length == 0){
                          this.queryGenerationForm.controls['applicationModuleId'].setValue(parseInt(this.queryGenerationForm.controls['applicationModuleId'].value));
                          this.queryGenerationForm.controls['queryTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queryTypeMasterId'].value));
                          this.queryGenerationForm.controls['queAnsMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queAnsMasterId'].value));
                          this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));
                          this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));
                          this.queryGenerationForm.controls['employeeMasterId'].setValue(this.employeeMasterId);

                          let data = []
                          data.push(this.queryGenerationForm.value)
                          let queryGenerationEmployeeData  = {
                            "queryRequestDTO": data
                            }
                            const formData  = new FormData();
                            formData.append('queryGenerationEmployeeData', JSON.stringify(queryGenerationEmployeeData));
                            this.queryService.addQueryGeneration(formData).subscribe(res =>
                            {
                              this.addQueryGenerationData = res.data.results;
                              this.getAllQueryListSummary();
                              this.alertService.sweetalertMasterSuccess('Query Generated Successfully.', '' );
                              localStorage.clear();
                              this.queryGenerationForm.controls['queryDescription'].reset();
                              this.reset();
                            })
                            }else{
                              this.addQuerywithDocs();
                            }

        }


        else{
          if(this.listDoc.length == 0){
            this.queryGenerationForm.controls['applicationModuleId'].setValue(parseInt(this.queryGenerationForm.controls['applicationModuleId'].value));
            this.queryGenerationForm.controls['queryTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queryTypeMasterId'].value));
            this.queryGenerationForm.controls['queAnsMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queAnsMasterId'].value));
            this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));
            this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));
            this.queryGenerationForm.controls['employeeMasterId'].setValue(this.employeeMasterId);

            let data = []
            data.push(this.queryGenerationForm.value)
            let queryGenerationEmployeeData  = {
              "queryRequestDTO": data
              }
              const formData  = new FormData();
              formData.append('queryGenerationEmployeeData', JSON.stringify(queryGenerationEmployeeData));
              this.queryService.addQueryGeneration(formData).subscribe(res =>
              {
                this.addQueryGenerationData = res.data.results;
                this.getAllQueryListSummary();
                this.alertService.sweetalertMasterSuccess('Query Generated Successfully.', '' );
                localStorage.clear();
                this.queryGenerationForm.controls['queryDescription'].reset();

                this.reset();
              })
              }else{
                this.addQuerywithDocs();
              }

        }
      }
else{
      if(this.listDoc.length == 0){
        this.queryGenerationForm.controls['applicationModuleId'].setValue(parseInt(this.queryGenerationForm.controls['applicationModuleId'].value));
        this.queryGenerationForm.controls['queryTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queryTypeMasterId'].value));
        this.queryGenerationForm.controls['queAnsMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queAnsMasterId'].value));
        this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));
        this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));
        this.queryGenerationForm.controls['employeeMasterId'].setValue(this.employeeMasterId);

        let data = []
        data.push(this.queryGenerationForm.value)
        let queryGenerationEmployeeData  = {
          "queryRequestDTO": data
          }
          const formData  = new FormData();
          formData.append('queryGenerationEmployeeData', JSON.stringify(queryGenerationEmployeeData));
          this.queryService.addQueryGeneration(formData).subscribe(res =>
          {
            this.addQueryGenerationData = res.data.results;
            this.getAllQueryListSummary();
            this.alertService.sweetalertMasterSuccess('Query Generated Successfully.', '' );
            localStorage.clear();
            this.queryGenerationForm.controls['queryDescription'].reset();
            this.reset();
          })
          }else{
            this.addQuerywithDocs();
          }
        }
}

updateQueryGeneration(value) //put api for update data
{

  if(this.listDoc.length == 0){
  this.queryGenerationForm.controls['queAnsMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queAnsMasterId'].value));
  this.queryGenerationForm.controls['applicationModuleId'].setValue(parseInt(this.queryGenerationForm.controls['applicationModuleId'].value));
  this.queryGenerationForm.controls['queryTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queryTypeMasterId'].value));
  this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));
  this.queryGenerationForm.controls['employeeMasterId'].setValue(this.employeeMasterId);

  if(value == 'Save'){
    this.queryGenerationForm.controls['status'].setValue('Save');
   }else{
   this.queryGenerationForm.controls['status'].setValue('Draft');
   }

  let data = []
  data.push(this.queryGenerationForm.value)
  let queryGenerationEmployeeData  = {
    "queryRequestDTO": data
    }
    const formData  = new FormData();
    formData.append('queryGenerationEmployeeData', JSON.stringify(queryGenerationEmployeeData));
    this.queryService.updateQueryGeneration(formData).subscribe(res =>
    {
      this.addQueryGenerationData = res.data.results;
    console.log("Without Doc**********",queryGenerationEmployeeData)

      this.getAllQueryListSummary();
      this.alertService.sweetalertMasterSuccess('Query Updated Successfully', '' );
      this.router.navigate(['/admin-dashboard']);
      localStorage.clear();
      this.queryGenerationForm.controls['queryDescription'].reset();

      this.editflag =false;

      this.reset();
    })

  }else{
    this.updateQuerywithDoc(value);
  }

}

addQuerywithDocs()
{

  console.log("this.emlpoyeeSelectionData",this.emlpoyeeSelectionData);
  if(localStorage.getItem('emlpoyeeSelectionData') != null ){

    if(this.emlpoyeeSelectionData.onBehalf == 'yes' && this.emlpoyeeSelectionData.sameContent == 'no')
    {
      this.queryGenerationForm.controls['employeeMasterIdList'].setValue(this.employeeListId);

        if(this.listDoc.length == 0){
          this.queryGenerationForm.controls['applicationModuleId'].setValue(parseInt(this.queryGenerationForm.controls['applicationModuleId'].value));
          this.queryGenerationForm.controls['queryTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queryTypeMasterId'].value));
          this.queryGenerationForm.controls['queAnsMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queAnsMasterId'].value));
          this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));
          this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));
          this.queryGenerationForm.controls['employeeMasterId'].setValue(this.employeeMasterId);

          let data = []
          data.push(this.queryGenerationForm.value)
          let queryGenerationEmployeeData  = {
            "queryRequestDTO": data
            }
            const formData  = new FormData();
            formData.append('queryGenerationEmployeeData', JSON.stringify(queryGenerationEmployeeData));
            this.queryService.addQueryGeneration(formData).subscribe(res =>
            {
              this.addQueryGenerationData = res.data.results;
              this.getAllQueryListSummary();
              this.alertService.sweetalertMasterSuccess('Query Generated Successfully.', '' );
              localStorage.clear();
               this.queryGenerationForm.controls['queryDescription'].reset();
              this.reset();
            })
            }else{
              this.addQuerywithDocs();
            }

          }

   else if(this.emlpoyeeSelectionData.onBehalf == 'yes' && this.emlpoyeeSelectionData.sameContent == 'yes')
          {
          this.queryGenerationForm.controls['employeeMasterIdList'].setValue(this.employeeListId);

              if(this.listDoc.length == 0){
                this.queryGenerationForm.controls['applicationModuleId'].setValue(parseInt(this.queryGenerationForm.controls['applicationModuleId'].value));
                this.queryGenerationForm.controls['queryTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queryTypeMasterId'].value));
                this.queryGenerationForm.controls['queAnsMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queAnsMasterId'].value));
                this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));
                this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));
                this.queryGenerationForm.controls['employeeMasterId'].setValue(this.employeeMasterId);

                let data = []
                data.push(this.queryGenerationForm.value)
                let queryGenerationEmployeeData  = {
                  "queryRequestDTO": data
                  }
                  const formData  = new FormData();
                  formData.append('queryGenerationEmployeeData', JSON.stringify(queryGenerationEmployeeData));
                  this.queryService.addQueryGeneration(formData).subscribe(res =>
                  {
                    this.addQueryGenerationData = res.data.results;
                    this.getAllQueryListSummary();
                    this.alertService.sweetalertMasterSuccess('Query Generated Successfully.', '' );
                    localStorage.clear();
                    this.queryGenerationForm.controls['queryDescription'].reset();
                    this.reset();
                  })
                  }else{
                    this.addQuerywithDocs();
                  }
                // });

          }

    else if(this.emlpoyeeSelectionData.onBehalf == 'no' && this.emlpoyeeSelectionData.sameContent == 'yes')
                {

                this.queryGenerationForm.controls['employeeMasterIdList'].setValue(this.selectedEmployee);

                    if(this.listDoc.length == 0){
                      this.queryGenerationForm.controls['applicationModuleId'].setValue(parseInt(this.queryGenerationForm.controls['applicationModuleId'].value));
                      this.queryGenerationForm.controls['queryTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queryTypeMasterId'].value));
                      this.queryGenerationForm.controls['queAnsMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queAnsMasterId'].value));
                      this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));
                      this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));
                      this.queryGenerationForm.controls['employeeMasterId'].setValue(0);

                      let data = []
                      data.push(this.queryGenerationForm.value)
                      let queryGenerationEmployeeData  = {
                        "queryRequestDTO": data
                        }
                        const formData  = new FormData();
                        formData.append('queryGenerationEmployeeData', JSON.stringify(queryGenerationEmployeeData));
                        this.queryService.addQueryGeneration(formData).subscribe(res =>
                        {
                          this.addQueryGenerationData = res.data.results;
                          this.getAllQueryListSummary();
                          this.alertService.sweetalertMasterSuccess('Query Generated Successfully.', '' );
                          localStorage.clear();
                          this.queryGenerationForm.controls['queryDescription'].reset();
                          this.reset();
                        })
                        }else{
                          this.addQuerywithDocs();
                        }

          }

   else if(this.emlpoyeeSelectionData.onBehalf == 'no' && this.emlpoyeeSelectionData.sameContent == 'no')
                      {

                      this.queryGenerationForm.controls['employeeMasterIdList'].setValue(this.employeeListId);

                          if(this.listDoc.length == 0){
                            this.queryGenerationForm.controls['applicationModuleId'].setValue(parseInt(this.queryGenerationForm.controls['applicationModuleId'].value));
                            this.queryGenerationForm.controls['queryTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queryTypeMasterId'].value));
                            this.queryGenerationForm.controls['queAnsMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queAnsMasterId'].value));
                            this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));
                            this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));
                            this.queryGenerationForm.controls['employeeMasterId'].setValue(this.employeeMasterId);

                            let data = []
                            data.push(this.queryGenerationForm.value)
                            let queryGenerationEmployeeData  = {
                              "queryRequestDTO": data
                              }
                              const formData  = new FormData();
                              formData.append('queryGenerationEmployeeData', JSON.stringify(queryGenerationEmployeeData));
                              this.queryService.addQueryGeneration(formData).subscribe(res =>
                              {
                                this.addQueryGenerationData = res.data.results;
                                console.log(JSON.stringify(this.addQueryGenerationData));
                                this.getAllQueryListSummary();
                                this.alertService.sweetalertMasterSuccess('Query Generated Successfully.', '' );
                                localStorage.clear();
                                this.queryGenerationForm.controls['queryDescription'].reset();
                                this.reset();
                              })
                              }else{
                                this.addQuerywithDocs();
                              }

          }

else{
  this.queryGenerationForm.controls['queAnsMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queAnsMasterId'].value));
  this.queryGenerationForm.controls['applicationModuleId'].setValue(parseInt(this.queryGenerationForm.controls['applicationModuleId'].value));
  this.queryGenerationForm.controls['queryTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queryTypeMasterId'].value));
  this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));
  this.queryGenerationForm.controls['employeeMasterId'].setValue(this.employeeMasterId);

    let data = []
    data.push(this.queryGenerationForm.value)
    let queryGenerationEmployeeData  = {
      "queryRequestDTO": data,
      }
      console.log(JSON.stringify(queryGenerationEmployeeData));
      const formData  = new FormData();
      formData.append('queryGenerationEmployeeData', JSON.stringify(queryGenerationEmployeeData));
      this.employeeMasterId = this.employeeMasterId;
      for (const queryDoc of this.listDoc) {
        formData.append('queryDocs', queryDoc,this.employeeMasterId + queryDoc.name);
      }
      formData.forEach((value, key) => {
        console.log(key,' ', value);
      });
      this.queryService.addQuerywithDocs(formData).subscribe(res =>
      {
        this.addQueryGenerationData = res.data.results;
        this.alertService.sweetalertMasterSuccess('Query Generated Successfully', '' );
        this.queryGenerationForm.controls['queryDescription'].reset();
        localStorage.clear();
        this.getAllQueryListSummary();
        this.reset();

      })
    }
    }
    else{
      this.queryGenerationForm.controls['queAnsMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queAnsMasterId'].value));
      this.queryGenerationForm.controls['applicationModuleId'].setValue(parseInt(this.queryGenerationForm.controls['applicationModuleId'].value));
      this.queryGenerationForm.controls['queryTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queryTypeMasterId'].value));
      this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));
      this.queryGenerationForm.controls['employeeMasterId'].setValue(this.employeeMasterId);
        let data = []
        data.push(this.queryGenerationForm.value)
        let queryGenerationEmployeeData  = {
          "queryRequestDTO": data,
          }
          console.log(JSON.stringify(queryGenerationEmployeeData));
          const formData  = new FormData();
          formData.append('queryGenerationEmployeeData', JSON.stringify(queryGenerationEmployeeData));
          this.employeeMasterId = this.employeeMasterId;
          console.log("employeeMasterId",this.employeeMasterId)
          for (const queryDoc of this.listDoc) {
            formData.append('queryDocs', queryDoc,this.employeeMasterId + queryDoc.name);
          }
          formData.forEach((value, key) => {
            console.log(key,' ', value);
          });
          this.queryService.addQuerywithDocs(formData).subscribe(res =>
          {
            this.addQueryGenerationData = res.data.results;
            this.alertService.sweetalertMasterSuccess('Query Generated Successfully', '' );
            this.queryGenerationForm.controls['queryDescription'].reset();
            localStorage.clear();
            this.getAllQueryListSummary();
            this.reset();

          })
        }
}


updateQuerywithDoc(value)
{
  this.queryGenerationForm.controls['queAnsMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queAnsMasterId'].value));
  this.queryGenerationForm.controls['applicationModuleId'].setValue(parseInt(this.queryGenerationForm.controls['applicationModuleId'].value));
  this.queryGenerationForm.controls['queryTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['queryTypeMasterId'].value));
  this.queryGenerationForm.controls['subQueTypeMasterId'].setValue(parseInt(this.queryGenerationForm.controls['subQueTypeMasterId'].value));

this.queryGenerationForm.controls['employeeMasterId'].setValue(this.employeeMasterId);
// this.queryGenerationForm.controls['status'].setValue('Draft');
  if(value == 'Save'){
    this.queryGenerationForm.controls['status'].setValue('Save');
   }else{
   this.queryGenerationForm.controls['status'].setValue('Draft');
   }
  let data = []
  data.push(this.queryGenerationForm.value)
  let queryGenerationEmployeeData  = {
    "queryRequestDTO": data,
    }
    console.log(JSON.stringify(queryGenerationEmployeeData));
    const formData  = new FormData();
    formData.append('queryGenerationEmployeeData', JSON.stringify(queryGenerationEmployeeData));
    // this.employeeMasterId = 1;
    console.log("employeeMasterId",this.employeeMasterId)
    for (const queryDoc of this.listDoc) {
      formData.append('queryDocs', queryDoc,this.employeeMasterId + queryDoc.name);
    }
    formData.forEach((value, key) => {
      console.log(key,' ', value);
    });

      this.queryService.updateQuerywithDoc(formData).subscribe(res =>
      {
        this.addQueryGenerationData = res.data.results;
        console.log("update with documents",this.addQueryGenerationData);
        this.alertService.sweetalertMasterSuccess('Query Updated Successfully', '' );
            this.router.navigate(['/admin-dashboard']);
            this.queryGenerationForm.controls['queryDescription'].reset();

        this.getAllQueryListSummary();

        this.reset();
      })
}

getEmpMasterDetails(employeeMasterId)
{
  // alert(employeeMasterIdData)
// employeeMasterIdData = 60;

  this.queryService.getEmpMasterDetails(employeeMasterId).subscribe(res =>
    {
      this.perticularEmpDetails = res.data.results[0][0];
    })
}

editQuery(queryGenerationSummary) {

  this.querySubQueryTypeQAData = null
  this.listQAData = [];
  this.editflag = true;
  this.queryGenerationForm.enable();
  this.queryGenerationForm.patchValue(queryGenerationSummary);
  this.isUpdate = true;
  this.isSave = true;
  this.isReset = false;
  this.isCancle = true;
  this.isUpdateDraft = true;
  // this.hideEditTime = false;
  if(this.listDoc.length == 0)
  {
  // this.editflag = false;
  this.hideEditTime1 = false;
  }else
  {
  this.hideEditTime1 = true;

  }
  this.getById(queryGenerationSummary.queryGenerationEmpId);
  this.queryGenerationEmpId = queryGenerationSummary.queryGenerationEmpId;
  this.editQuerySummaery = queryGenerationSummary;
  this.queryGenerationForm.controls['queryNumber'].disable();
  if(queryGenerationSummary.listDoc != null){
  this.urlArray = queryGenerationSummary.listDoc;
}else
{
  this.urlArray = [];
}

}
viewQuery(queryGenerationSummary)
{
 this.viewFlag = true;
 this.editflag = false;
 this.queryGenerationForm.patchValue(queryGenerationSummary);
 this.queryGenerationForm.disable();
//  this.queryTemplateData.disable();
 this.isUpdate =false;
 this.isSave = false;
 this.isReset = false;
 this.isCancle = true;
 this.hideEditTime = false;
 this.editQuerySummaery = queryGenerationSummary;
//  this.queryGenerationForm.controls['queryDescription'].disable();
 this.getById(queryGenerationSummary.queryGenerationEmpId);
 this.queryGenerationEmpId = queryGenerationSummary.queryGenerationEmpId;
}

reset(){
  this.queryGenerationForm.enable();
  this.queryGenerationForm.reset();
  this.queryGenerationForm.controls['queryDescription'].reset();
  this.queryGenerationForm.controls['subject'].reset();
  this.queryTemplateData = [];
  this.querySubQueryTypeQAData = [];
  this.getByIdData = [];
  this.listDoc = []; //reset the upload document
  this.hideEditTime = true;
  this.listQAData = [];

}
cancel()
{
this.reset();
this.queryGenerationForm.controls['queryNumber'].disable();
this.queryGenerationForm.controls['queryDescription'].reset();
this.isSave = true;
this.isReset = true;
this.isUpdate = false;
this.isCancle = false;
this.hideEditTime = true;
this.listQAData = [];

}
// ........................upload Document..............................................................
public UploadModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-md' })
  );
}

public onMasterUpload(
  event: { target: { files: string | any[] } },
  docType: string
) {
  console.log('event::', event);
  console.log('docType::', docType);

  if (event.target.files.length > 0) {
    for (const file of event.target.files) {
          const data = {
            name: file.name,
          };

          this.urlArray.push(data);
          this.listDoc.push(file);
    }

  }
}

public removeSelectedLicMasterDocument(index: number, docType: string) {
      this.listDoc.splice(index, 1);
}


public docViewer(template1: TemplateRef<any>, i: any) {
  this.ListOfDocuments = document;
  this.urlIndex = i;
  console.log(JSON.stringify(this.listDoc));
  //document.documents.forEach(element => {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.listDoc[this.urlIndex].queryBlobURI
    );

  //});

  console.log('urlSafe::', this.urlSafe);
  this.modalRef = this.modalService.show(
    template1,
    Object.assign({}, { class: 'gray modal-xl' })
  );
}
// Previous Doc Viewer
public previousDocViewer() { //not yet used
  this.urlIndex = this.urlIndex - 1;
  this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
    this.ListOfDocuments[this.urlIndex].queryBlobURI
  );
}

// Next Doc Viewer
public nextDocViewer() { //not yet used
this.urlIndex = this.urlIndex + 1;
this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
 this.ListOfDocuments[this.urlIndex].queryBlobURI
);
}

}



