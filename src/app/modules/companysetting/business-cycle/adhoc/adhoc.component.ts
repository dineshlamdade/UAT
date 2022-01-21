import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdhocService } from './adhoc.service';
import { AnyCnameRecord } from 'node:dns';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { DatePipe } from '@angular/common';
import { LockService } from 'src/app/modules/lock/lock.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
//import { AlertServiceService } from '../../../core/services/alert-service.service';

@Component({
  selector: 'app-adhoc',
  templateUrl: './adhoc.component.html',
  styleUrls: ['./adhoc.component.scss'],
  styles: [`
        .outofstock {
          background-color: #ddd!important;
          color: #000!important;
          font-weight: 500;
        }
        .disable1{
           background-color:#D3D3D3 !important;
          color: #000!important;
          font-weight: 500;
        }` ]
})
export class AdhocComponent implements OnInit {

  is_edit = true
  cycleDefifitionList: Array<any> = [];
  adhocForm: FormGroup;
  cycleNameList: Array<any> = [];
  @ViewChild('adhocForm') form: NgForm;
  adhocCycleList: any = [];
  activeHeadList: Array<any> = [];
  summarydata: Array<any> = [];
  editFormFlag: boolean = false;
  viewFormFlag: boolean = false;
  date: any;
  isArrearFlag: boolean = false;
  // fromDate: any;
  //toDate: any;
  businessCycleDefinition: any;

  periodName: any;
  selectedUser: Array<any> = [];
  selectedUser2: Array<any> = [];
  HighlightRow: any;
  HighlightRight: any;
  viewupdateButton = false;
  targetProducts: Array<any> = [];
  userHasSelectedMandatoryFieldOnly: any;
  disabled = true;
  businessCycleDefinitionId: any;
  selctedCycleName: any;
  selectedPeriodName: any;
  adhocCycleListNew: any;
  headMasterIds: Array<any> = [];
  minStartDate: any;
  maxStartDate: any;
  editData: any;
  periodId: any;
  activeHeadListCopy: any;
  checkValids: boolean = false;
  companyNameList: any = [];
  companyNames: any = [];
  CompanyGroupId: any;
  ServiceAreaList: any[] = [];
  ServiceAreaListEmp: any[] = [];
  areaSeriveList: any = [];
  businessCycleDefinationId: any;
  businessCycleId: any;
  getSetAreaList: any = [];
  areaSetList: any = [];
  allAreaCodes: any[];
  areas: any = [];
  payrollareaSetlist: any[];
  payrollAreaListFlag: boolean = false;
  public modalRef: BsModalRef;
  displayedColumns: string[];


  constructor(public adhocService: AdhocService, public toaster: ToastrService,
    private lockService: LockService, private modalService: BsModalService,
    public alertService: AlertServiceService, public datepipe: DatePipe) {

    this.adhocForm = new FormGroup({
      businessCycleDefinitionId: new FormControl('', [Validators.required]),
      businessCycleId: new FormControl(''),
      periodName: new FormControl('', [Validators.required]),
      periodId: new FormControl(''),
      remark: new FormControl(''),
      arrear: new FormControl(''),
      headMasterIds: new FormControl([]),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
      cycleName: new FormControl(''),
      headNature: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      copyFrom: new FormControl(''),
      areaMasterCode: new FormControl(''),
      companyId: new FormControl(''),
      areaList: new FormControl(''),
      areaSet: new FormControl('')
      // adhocCycleName : new FormControl('')
    })

    this.adhocForm.setErrors({ required: true });
    this.adhocForm.valueChanges.subscribe(newValue => {
      if (this.adhocForm.get('arrear').value || newValue.selectedUser?.length > 0 || this.adhocForm.get('remark').value) {
        this.adhocForm.setErrors(null);
      } else {
        this.adhocForm.setErrors({ required: true });
      }
    });

  }


  checkValid() {
    if (this.adhocForm.get('arrear').value || this.selectedUser?.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  ngOnInit(): void {
    this.getAllCycleDefinition();
    this.getAdhocCycle();
    this.getActiveHead();
    this.getSummaryData();
    this.getAllCompanyName();
    this.getAreaSetData();
  }


  /** Get Company List data Rucha 19th Jan 22 */
  getAllCompanyName() {
    this.lockService.getAllCompanysName().subscribe((res) => {
      this.companyNameList = res.data.results;
      res.data.results.forEach((element) => {
        const obj = {
          label: element.companyName,
          value: element.groupCompanyId,
        };
        this.companyNames.push(obj);
      });
    });
  }

  /** On Selecton of Company Get Payroll Area List Rucha 19th Jan 22 */
  onSelectServiceName(evt: any) {

    // console.log(evt)
    this.CompanyGroupId = evt
    this.ServiceAreaList = []
    this.ServiceAreaListEmp = []
   
    this.lockService.getAreawServicesName(this.CompanyGroupId, this.businessCycleId, this.businessCycleDefinationId).subscribe(
      (res) => {
        this.areaSeriveList = res.data.results[0];
        res.data.results[0].forEach((element) => {
          const obj = {

            name: element.payrollAreaCode,
            code: element.payrollAreaId,

          };
          this.ServiceAreaList.push(obj);
          this.ServiceAreaListEmp.push(obj)
        });
      },
      (error: any) => {
        this.alertService.sweetalertError(
          error['error']['status']['message']
        );
      }
    );
    //}
    // }
    //  else {
    // if (evt == '') {
    //   this.ServiceAreaList = [];
    // } 
    // else {
    //   this.ServiceAreaList = [];
    this.lockService.getAreawServicesName(evt, this.businessCycleId, this.businessCycleDefinationId).subscribe(
      (res) => {
        this.areaSeriveList = res.data.results[0];
        console.log('areaSeriveList', this.areaSeriveList);
        res.data.results[0].forEach((element) => {
          const obj = {
            //   label: element.areaMasterCode,
            //   value: element.payrollAreaId,
            name: element.payrollArea.payrollAreaCode,
            code: element.payrollArea.payrollAreaId,

          };
          this.ServiceAreaList.push(obj);
        });
      },
      (error: any) => {
        this.alertService.sweetalertError(
          error['error']['status']['message']
        );
      }
    );
    //}
    // }
  }

  /** Get Area set list Rucha 19th Jan 22 */
  getAreaSetData() {
    this.lockService.getAreaSetData().subscribe((res) => {
      this.getSetAreaList = res.data.results;
      res.data.results[0].forEach((element) => {
        const obj = {
          name: element.areaSetName,
          code: element.areaSetMasterId,
        };
        this.areaSetList.push(obj);
      });
    })
  }

  /** on Selection of payroll Area Rucha 19th Jan 22 */
  onSelectArea(evt) {
    if (evt.value.length >= 1) {
      this.adhocForm.get('areaList').disable();
      this.adhocForm.get('areaSet').disable();
    }
    else {
      this.adhocForm.get('areaList').enable();
      this.adhocForm.get('areaSet').enable();
    }
  }

  /** on Selection of Area Set Rucha 19th Jan 22 */
  onSelectAreaSet(evt) {

    this.payrollareaSetlist = []
    if (evt != '') {
      this.adhocForm.get('areaList').disable();
      this.adhocForm.get('areaMasterCode').disable();
    }
    else {
      this.adhocForm.get('areaList').enable();
      this.adhocForm.get('areaMasterCode').enable();
    }

    this.payrollareaSetlist.push(parseInt(evt))
  }


  /** on Click on area list checkbox Rucha 19th Jan 22 */
  onSelectAreaList(evt) {
    if (evt.checked) {
      this.payrollAreaListFlag = true;
      this.adhocForm.get('areaMasterCode').disable();
      this.adhocForm.get('areaSet').disable();
    }
    else {
      this.payrollAreaListFlag = false;
      this.adhocForm.get('areaMasterCode').enable();
      this.adhocForm.get('areaSet').enable();
    }
  }

  /** area list popup Rucha 19th Jan 22 */
  Arealistpop(arealist: TemplateRef<any>) {
    if (this.payrollAreaListFlag) {
      this.modalRef = this.modalService.show(
        arealist,
        Object.assign({}, { class: 'gray modal-lg' })
      );
    }
  }

  /** Area list copy paste into textarea Rucha 19th Jan 22 */
  areaListPasteData(event: ClipboardEvent) {
    let clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text');
    let row_data = pastedText.split('\n');

    this.displayedColumns = ["payrollAreaCode"]
    this.areas = [];
    for (let i = 0; i < row_data.length; i++) {
      let data = row_data[i].replace('\r', '');
      // console.log("paste data: " + data)
      this.areas.push(data)
    }

    let lastIndex = this.areas.length - 1
    this.areas.splice(lastIndex, 1)
    // this.adhocForm.get('areaMasterCode').setValue(this.areas)
  }


  onSubmit() {
    //debugger
  
    this.allAreaCodes = [];
    const selectedPayrollAreaCodes = this.adhocForm.get('areaMasterCode').value;
    console.log("selected payrollare: " + selectedPayrollAreaCodes)
    if (this.areas.length == 0) {
      if (selectedPayrollAreaCodes.length > 0) {
        selectedPayrollAreaCodes.forEach((element) => {
          this.allAreaCodes.push(element.name);
        });
      } else {
        // this.alertService.sweetalertWarning('Please select Group code');
        // return false;
      }
    } else {
      this.allAreaCodes = selectedPayrollAreaCodes
    }

    
    this.targetProducts.forEach(element => {
      this.headMasterIds.push(element.headMasterId)
    })
    const periodNameList = this.cycleNameList.filter(element => element.periodId == this.adhocForm.value.periodName)
    // console.log('period name list is',periodNameList[0].periodName)
    let period = this.cycleNameList.find(x => x.periodId == this.adhocForm.get('periodName').value)
    const data = [{
      businessCycleId: period.id,
      // businessCycleId:2790,
      //businessCycleId:this.cycleNameList.find(x=>x.id==this.adhocForm.get('periodId').value),
      periodName: periodNameList[0].periodName,
      headMasterIds: this.headMasterIds,
      arrear: this.adhocForm.value.arrear,
      remark: this.adhocForm.value.remark,
      //  fromDate:this.adhocForm.value.fromDate,
      fromDate: this.datepipe.transform(this.adhocForm.value.fromDate, "dd-MMM-yyyy"),
      toDate: this.datepipe.transform(this.adhocForm.value.toDate, "dd-MMM-yyyy"),
      companyId:parseInt(this.adhocForm.get('companyId').value),
      payrollAreaCodeList:this.allAreaCodes,
      periodId: parseInt(this.adhocForm.get('periodName').value)
      //  toDate:this.adhocForm.value.toDate
    }]
    console.log('data is',data);
    // this.adhocService.saveAdhocCycle(data).subscribe((res) => {
    //   // console.log('result is adhoc',res);
    //   //this.toaster.success('',"Adhoc cycle saved successfully");
    //   this.alertService.sweetalertMasterSuccess('Success', 'Adhoc Cycle Saved Successfully');

    //   this.getSummaryData();
    //   this.targetProducts = [];
    //   this.cycleNameList = [];
    //   this.getAdhocCycle();
    //   this.getActiveHead()
    //   this.adhocForm.reset();
    //   this.editFormFlag = false;
    //   this.viewFormFlag = false;
    //   this.selectedUser = [];
    //   this.selectedUser2 = [];
    // })
    this.headMasterIds = [];

  }


  onUpdate() {
    // console.log('Adhoc cylece',this.adhocForm.value);
    // console.log('Adhoc cylece',this.targetProducts);
    this.targetProducts.forEach(element => {
      this.headMasterIds.push(element.headMasterId)
    })

    const periodNameList = this.cycleNameList.filter(element => element.periodId == this.adhocForm.get('periodName').value);
    //console.log('period name list is',periodNameList[0].periodName)
    let period = this.cycleNameList.find(x => x.periodId == this.adhocForm.get('periodName').value)
    const data = [{
      //businessCycleId:2790,
      businessCycleId: this.businessCycleDefinitionId,
      //businessCycleId:2796,
      periodName: this.periodName,
      // businessCycleId:period.id,
      // periodName:periodNameList[0].periodName,
      headMasterIds: this.headMasterIds,
      // arrear:this.adhocForm.value.arrear,
      arrear: this.adhocForm.controls['arrear'].value,
      //remark:this.adhocForm.value.remark,
      remark: this.adhocForm.controls['remark'].value,
      fromDate: this.datepipe.transform(this.adhocForm.value.fromDate, "dd-MMM-yyyy"),
      toDate: this.datepipe.transform(this.adhocForm.value.toDate, "dd-MMM-yyyy"),


    }]
    // console.log('data is',data);
    this.adhocService.updateData(data).subscribe((res) => {
      //this.toaster.success('',"Updated successfully");
      this.alertService.sweetalertMasterSuccess('Success', 'Adhoc Cycle Updated Successfully');
      this.adhocForm.controls['copyFrom'].enable();
      this.getSummaryData();
      this.getAdhocCycle();
      this.targetProducts = [];
      this.cycleNameList = [];
      this.adhocForm.reset();
      this.editFormFlag = false;
      this.viewFormFlag = false;
      this.getActiveHead();
    })

    this.headMasterIds = [];

  }


  getAllCycleDefinition() {
    this.adhocService.getAllCycleDefinition().subscribe((res) => {
      this.cycleDefifitionList = res.data.results;
      // console.log(this.cycleDefifitionList);
    })
  }


  getCycleNameById(id) {
    this.cycleNameList = [];
    this.cycleDefifitionList.forEach(ele => {
      if (ele.id == id) {
        this.businessCycleDefinationId = ele.id
        this.selctedCycleName = ele.cycleName
      }

    })
    this.adhocService.getCycleNameById(id).subscribe((response) => {
      this.cycleNameList = response.data.results;
    });
   
    this.cycleNameList = []
    this.adhocForm.controls.periodName.reset();
    this.adhocForm.controls.cycleName.reset();
    this.adhocForm.controls.startDate.reset();
    this.adhocForm.controls.endDate.reset();
  }

  getAdhocCycle() {
    this.adhocCycleListNew = [];
    this.adhocService.getAdhocCycle().subscribe((res) => {
      this.adhocCycleList = res.data.results;
      //  console.log(this.adhocCycleList)
      // res.data.results[0].forEach(element => {
      //   this.adhocCycleList.push({
      //     label : element.periodId,
      //     value : element.periodName
      //   })

      // })


      // this.adhocCycleList = res.data.results.businessYeardefinition;
      //  console.log(this.adhocCycleList);
    })
  }

  getActiveHead() {
    this.adhocService.getActiveHead().subscribe((res) => {
      this.activeHeadList = res.data.results;
      // console.log(this.activeHeadList);
      this.activeHeadListCopy = res.data.results;
    })
  }

  getSummaryData() {
    this.adhocService.getSummaryData().subscribe((res) => {
      // console.log("result check",res);
      this.summarydata = res.data.results;

      // console.log('adhoc summary list',this.summarydata);
    })
  }


  //copyFrom code done
  onChangeCopyFrom() {
    this.activeHeadList = this.activeHeadListCopy;
    // const selected = this.adhocForm.get('copyFrom').value;
    let period = this.adhocCycleList.find(x => x.periodName == this.adhocForm.get('copyFrom').value)
    //const location =   this.summarydata.filter(x=>x.periodName == period);
    const value = period.awphgname.split(',');
    let copyHeadMaster = [];
    value.forEach(element => {
      copyHeadMaster.push({
        headId: parseInt(element)
      })
    });

    // console.log('value is',value);
    this.targetProducts = [];
    //this.activeHeadList = this.activeHeadListCopy;
    this.targetProducts = this.activeHeadList.filter(ar => copyHeadMaster.find(rm => rm.headId == ar.headMasterId))
    this.activeHeadList = this.activeHeadList.filter(ar => !this.targetProducts.find(rm => rm.headMasterId == ar.headMasterId))
    // this.targetProducts.push({
    //this.adhocForm.reset()

    // })
  }

  formReset() {
    this.adhocForm.reset();
    this.targetProducts = [];
    this.selectedUser = [];
    this.selectedUser2 = []
    this.cycleNameList = [];
    this.editFormFlag = false;
    this.viewFormFlag = false;
    this.adhocForm.enable();
    this.getActiveHead();
    this.adhocForm.controls.startDate.disable()
    this.adhocForm.controls.endDate.disable();
    this.adhocForm.controls.cycleName.disable();


  }

  onChangeCycle(periodId: any) {
    this.businessCycleId = periodId;
    //debugger;
    if (periodId == '') {
      this.adhocForm.patchValue({
        toDate: ''
      });
    } else {
      let cycleName;
      let location = this.cycleNameList.find(a => a.periodId == periodId);
      const businessId = location.businessCycleDefinition.id;
      this.cycleNameList.forEach(ele => {
        if (ele.periodId == periodId) {
          this.selectedPeriodName = ele.periodName
          this.businessCycleDefinition = ele
        }
      })

      let i = 1
      this.adhocCycleList.forEach(element => {
        if (element.periodId == periodId && element.businessCycleDefinition.id == businessId) {
          // console.log('period id is',periodId)
          i = i + 1
        }
      });
      this.periodName = this.selectedPeriodName + '-A&W' + i
      this.adhocForm.controls['cycleName'].setValue(this.periodName)
      this.adhocForm.controls['startDate'].setValue(new Date(this.businessCycleDefinition.fromDate))
      this.adhocForm.controls['endDate'].setValue(new Date(this.businessCycleDefinition.toDate))
      this.minStartDate = new Date(this.businessCycleDefinition.fromDate)
      this.maxStartDate = new Date(this.businessCycleDefinition.toDate)
    }

  }

  RowSelected(u: any, ind) {
    // console.log( u );
    let ind1 = this.activeHeadList.findIndex(o => o.headMasterId == u.headMasterId);
    let index = this.selectedUser.findIndex(o => o.headMasterId == u.headMasterId);
    let isContain = this.selectedUser.some(o => o.headMasterId == u.headMasterId);
    // console.log( isContain, index );
    if (isContain == true) {
      this.activeHeadList[ind1].isHighlight = false;
      this.selectedUser.splice(index, 1);
    } else {
      this.activeHeadList[ind1].isHighlight = true;
      this.selectedUser.push(u);
    }
    // console.log( 'selected row is', u );
    // console.log( 'selected user', this.selectedUser );
  }


  RowSelectedtargetProducts(u: any, i): void {
    // console.log( u );
    if (u.disabled == true) {

    } else {

      this.HighlightRight = i;
      let temp = this.targetProducts;
      this.targetProducts = new Array();
      let index = this.selectedUser2.findIndex(o => o.headMasterId == u.headMasterId);
      let isContain = this.selectedUser2.some(o => o.headMasterId == u.headMasterId);
      // console.log( isContain, index );
      if (isContain == true) {
        this.selectedUser2.splice(index, 1);
      } else {
        this.selectedUser2.push(u);
      }
      this.targetProducts = temp;

      this.targetProducts.forEach((element, i) => {
        if (i == this.HighlightRight) {
          if (isContain == true) {
            element.isHighlightright = false
            element.isHighlight = false
          }
          else {
            element.isHighlightright = true
            element.isHighlight = false
          }
        }
      });

    }
  }


  lefttablePusg(): void {
    this.selectedUser.forEach((element, index) => {
      element.isHighlightright = false;
      this.targetProducts.push(element);
    });

    this.selectedUser.forEach(element => {
      var index = this.activeHeadList.indexOf(element)
      this.selectedUser = [];
      if (index > -1) {
        this.activeHeadList.splice(index, 1);
      }
    });

    this.userHasSelectedMandatoryFieldOnly = this.targetProducts.every(o => o.disabled == true);
    if (this.userHasSelectedMandatoryFieldOnly) {
      this.adhocForm.setErrors({ 'invalid': true });

    } else {
      // console.log( 'in else block' );
      this.adhocForm.setErrors(null);

    }
  }

  righttablePusg(u: any): void {
    this.selectedUser2.forEach(element => {
      if (element.headMasterId == null) {
        // console.log( 'head master id is not found' );
      } else {
        // console.log( 'headMasterId', element.headMasterId );
      }
    });

    this.selectedUser2.forEach(element => {
      element.isHighlight = false;
      this.activeHeadList.push(element);
    });
    // var v = this.selectedUser;
    this.selectedUser2.forEach(element => {
      var index = this.targetProducts.indexOf(element, index)

      this.selectedUser2 = [];
      if (index > -1) {
        this.targetProducts.splice(index, 1)
      }
    });
    this.userHasSelectedMandatoryFieldOnly = this.targetProducts.every(o => o.disabled == true);
    if (this.userHasSelectedMandatoryFieldOnly) {
      this.adhocForm.setErrors({ 'invalid': true });

    } else {
      // console.log( 'in else block 123' );
      this.adhocForm.setErrors(null);
    }
  }

  doubleClickOnLeftTable(u: any) {
    this.RowSelected(u, -1);
    this.lefttablePusg();
  }
  doubleClickOnRightTable(u: AnyCnameRecord) {
    this.RowSelectedtargetProducts(u, -1);
    this.righttablePusg(u);

  }

  onFromDateChange() {

    this.adhocForm.get('toDate').patchValue((this.adhocForm.get('fromDate').value));

  }


  editAreaSet(data) {
    // console.log('result is',data);
    // this.activeHeadList = this.activeHeadListCopy;
    // this.editData= data;
    this.getCycleNameById(data.businessCycleDefinition.id);
    this.editFormFlag = true;
    this.viewFormFlag = false;
    this.adhocForm.enable();
    this.adhocForm.patchValue(data);


    this.businessCycleDefinitionId = data.id;
    this.periodName = data.periodName;
    // this.supplimentary=data.supplimentary;
    this.periodId = data.periodId;

    // this.adhocForm.get['businessCycleId'].setValue(data.businessCycleId);
    this.adhocForm.controls['periodName'].patchValue(data.periodId);
    this.adhocForm.controls['cycleName'].setValue(data.periodName);
    setTimeout(() => {
      const from = this.cycleNameList.find(a => a.periodId == data.periodId);
      this.adhocForm.controls['startDate'].patchValue(new Date(from.fromDate));
      // const to =new Date( this.cycleNameList.find(a=>a.periodId==data.periodId)[0].toDate);
      this.adhocForm.controls['endDate'].patchValue(new Date(from.toDate));
    }, 1000);

    this.adhocForm.controls['fromDate'].patchValue(new Date(data.fromDate));
    //this.adhocForm.controls['fromDate'].setValue(new Date(data.fromDate));
    this.adhocForm.controls['toDate'].patchValue(new Date(data.toDate));
    // this.adhocForm.controls['toDate'].setValue(new Date(data.toDate));
    this.adhocForm.controls['remark'].patchValue(data.remark);

    let cycleDef = this.cycleDefifitionList.find(el => el.id === data.businessCycleDefinition.id);
    if (cycleDef) {
      this.adhocForm.controls['businessCycleDefinitionId'].patchValue(cycleDef.id);
    }

    //copy from
    // let period = this.adhocCycleList.find(x=>x.id== data.id) 
    // let period = data;
    if (data.awphgname != null) {
      const value = data.awphgname.split(',');
      let copyHeadMaster = [];
      value.forEach(element => {
        copyHeadMaster.push({
          headId: parseInt(element)
        })
      });

      // console.log('value is',value);
      this.targetProducts = [];
      this.activeHeadList = this.activeHeadListCopy;
      this.targetProducts = this.activeHeadList.filter(ar => copyHeadMaster.find(rm => rm.headId == ar.headMasterId))
      this.activeHeadList = this.activeHeadList.filter(ar => !this.targetProducts.find(rm => rm.headMasterId == ar.headMasterId))

    }

    this.adhocForm.controls['businessCycleDefinitionId'].disable();
    this.adhocForm.controls['periodName'].disable();
    this.adhocForm.controls['cycleName'].disable();
    this.adhocForm.controls['startDate'].disable();
    this.adhocForm.controls['endDate'].disable();
    this.adhocForm.controls['copyFrom'].disable();

    //  this.adhocForm.controls['fromDate'].disable();
    // this.adhocForm.controls['toDate'].disable();

    // this.adhocForm.controls['startDate'].setValue(new Date(this.businessCycleDefinition.fromDate))
    // this.adhocForm.controls['endDate'].setValue(new Date(this.businessCycleDefinition.toDate))
    // let cylcenm = this.cycleNameList.find(el => el.periodId === data.businessCycleDefinition.periodId);
    // if (cylcenm) {
    //   this.adhocForm.controls['periodName'].patchValue(cylcenm.periodId);
    // }

  }

  viewAreaSet(data) {
    this.getCycleNameById(data.businessCycleDefinition.id);
    this.editFormFlag = false;
    this.viewFormFlag = true;
    this.adhocForm.disable();
    this.adhocForm.patchValue(data);
    this.adhocForm.controls['periodName'].patchValue(data.periodId);
    this.adhocForm.controls['cycleName'].setValue(data.periodName);
    setTimeout(() => {
      const from = this.cycleNameList.find(a => a.periodId == data.periodId);
      this.adhocForm.controls['startDate'].patchValue(new Date(from.fromDate));
      // const to =new Date( this.cycleNameList.find(a=>a.periodId==data.periodId)[0].toDate);
      this.adhocForm.controls['endDate'].patchValue(new Date(from.toDate));
    }, 1000);
    // this.adhocForm.controls['startDate'].patchValue(new Date(data.fromDate));
    // this.adhocForm.controls['endDate'].patchValue(new Date(data.toDate));
    this.adhocForm.controls['fromDate'].patchValue(new Date(data.fromDate));
    this.adhocForm.controls['toDate'].patchValue(new Date(data.toDate));
    this.adhocForm.controls['remark'].patchValue(data.remark);

    // this.adhocForm.controls.lefttablePusg.disable();

    //  this.adhocForm.controls['headMasterIds'].disable();
    let cycleDef = this.cycleDefifitionList.find(el => el.id === data.businessCycleDefinition.id);
    if (cycleDef) {
      this.adhocForm.controls['businessCycleDefinitionId'].patchValue(cycleDef.id);
    }
    // let cycleNm = this.cycleNameList.find(el => el.periodId === data.businessCycleDefinition.periodId);
    // if (cycleNm) {
    //   this.adhocForm.controls['periodId'].patchValue(cycleNm.periodId);
    // }

    //copy from
    // let period = this.adhocCycleList.find(x=>x.id== data.id) 
    //const value = period.awphgname.split(',');
    let copyHeadMaster = [];
    // value.forEach(element => {
    //   copyHeadMaster.push({
    //     headId :parseInt(element)
    //   })
    // });
    if (data.awphgname != null) {
      const value = data.awphgname.split(',');
      let copyHeadMaster = [];
      value.forEach(element => {
        copyHeadMaster.push({
          headId: parseInt(element)
        })
      });
      //  console.log('value is',value);
      this.targetProducts = [];
      this.activeHeadList = this.activeHeadListCopy;
      this.targetProducts = this.activeHeadList.filter(ar => copyHeadMaster.find(rm => rm.headId == ar.headMasterId))
      this.activeHeadList = this.activeHeadList.filter(ar => !this.targetProducts.find(rm => rm.headMasterId == ar.headMasterId))
    }
  }

  deleteData(id) {
    // console.log('deleted id id',id);
    this.adhocService.deleteData(id).subscribe((res) => {
      this.alertService.sweetalertMasterSuccess(res.status.message, '');
      this.getAllCycleDefinition();
    })
  }

  setPolicyEndDate() { }

}
