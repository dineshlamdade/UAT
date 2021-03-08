
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { BankMasterAtCompanyService } from '../bank-master-at-company/bank-master-at-company.service';
import { JobMasterService } from './job-master.service';
@Component({
  selector: 'app-job-master',
  templateUrl: './job-master.component.html',
  styleUrls: ['./job-master.component.scss'],
})
export class JobMasterComponent implements OnInit {
  [x: string]: any;
  public modalRef: BsModalRef;
  public summaryHtmlDataList = [];
  public summaryCompanyHtmlDataList = [];
  public summaryCompanyHtmlDataList1 = [];
  public showButtonSaveAndReset = true;
  public isActivateButton: number;
  public isEditMode = false;
  public isSaveAndReset = true;
  public form: any = FormGroup;
  public masterGridDataList = [];
  public editedRecordIndex = 0;
  public getAllOtherMappingDetailsResponse: any;
  public summaryAllOtherMappingDetailsList = [];

  public checks = false;
  public checksCompany = false;
  public enableCheckAll = false;
  public enableCompanyCheckAll = false;
  public allhtmlTableDataList = [];
  public tableDataList = [];
  public tableDataList1 = [];
  public selectedCheckBox = [];
  public selectedCompanyListCheckBox = [];
  public hideFormControl = true;
  public groupCompanyDetailsList = [];
  public companyListResponse: any;
  public checkedList: any;
  public masterSelected: boolean;

  public jobMasterList = [
    { value: 'All', postUrl: '', putUrl: '', deleteUrl: '' },
    { value: 'Business Area', postUrl: '/business-area-master/add-businessarea', putUrl: '/business-area-master/update', deleteUrl: '/business-area-master/', postMappingToCompany: '/business-area-master-mapping/map-all', deleteMapping: '/business-area-master-mapping/' },
    { value: 'Cost Centre', postUrl: '/costcentre-master/add-costcentre', putUrl: '/costcentre-master/update', deleteUrl: '/costcentre-master/', postMappingToCompany: '/costcentre-mapping/map-all', deleteMapping: '/costcentre-mapping/' },
    { value: 'Department', postUrl: '/department-master/add-department', putUrl: '/department-master/update', deleteUrl: '/department-master/', postMappingToCompany: '/department-master-mapping/map-all', deleteMapping: '/department-master-mapping/' },
    { value: 'Division', postUrl: '/division-master/add-division', putUrl: '/division-master/update', deleteUrl: '/division-master/', postMappingToCompany: '/division-master-mapping/map-all', deleteMapping: '/division-master-mapping/' },
    { value: 'Sub Cost Centre', postUrl: '/subcostcentre-master/add-costcentre', putUrl: '/subcostcentre-master/update', deleteUrl: '/subcostcentre-master/', postMappingToCompany: '/subcostcentre-master-mapping/map-all', deleteMapping: '/subcostcentre-master-mapping/' },
    { value: 'Sub Department', postUrl: '/subdepartment-master/add-department', putUrl: '/subdepartment-master/update', deleteUrl: '/subdepartment-master/', postMappingToCompany: '/subdepartment-master-mapping/map-all', deleteMapping: '/subdepartment-master-mapping/' },
    { value: 'Sub Location', postUrl: '/sublocation-master/add-location', putUrl: '/sublocation-master/update', deleteUrl: '/sublocation-master/', postMappingToCompany: '/sublocation-master-mapping/map-all', deleteMapping: '/sublocation-master-mapping/' },
    { value: 'GL Code', postUrl: '/GLcode-master/add-Glcode', putUrl: '/GLcode-master/update', deleteUrl: '/GLcode-master/', postMappingToCompany: '/GLcodemaster-mapping/map-all', deleteMapping: '/GLcodemaster-mapping/' },
    { value: 'Grade', postUrl: '/grade-master/add-grade', putUrl: '/grade-master/update', deleteUrl: '/grade-master/', postMappingToCompany: '/grade-master-mapping/map-all', deleteMapping: '/grade-master-mapping/' },
    { value: 'Plant', postUrl: '/plant-master/add-plant', putUrl: '/plant-master/update', deleteUrl: '/plant-master/', postMappingToCompany: '/plantmaster-mapping/map-all', deleteMapping: '/plantmaster-mapping/' },
    { value: 'Profit Centre', postUrl: '/profitcentre-master/add-profit', putUrl: '/profitcentre-master/update', deleteUrl: '/profitcentre-master/', postMappingToCompany: '/profitcentre-mapping/map-all', deleteMapping: '/profitcentre-mapping/' },
    { value: 'Project', postUrl: '/project-master/add-project', putUrl: '/project-master/update', deleteUrl: '/project-master/', postMappingToCompany: '/projectmaster-mapping/map-all', deleteMapping: '/projectmaster-mapping/' },
    { value: 'Region', postUrl: '/region-master/add-region', putUrl: '/region-master/update', deleteUrl: '/region-master/', postMappingToCompany: '/regionmaster-mapping/map-all', deleteMapping: '/regionmaster-mapping/' },
    { value: 'Sub Area', postUrl: '/subarea-master/add-area', putUrl: 'subarea-master/update', deleteUrl: '/subarea-master/', postMappingToCompany: '/subarea-master-mapping/map-all', deleteMapping: '/subarea-master-mapping/' },
    { value: 'Strategic Business Unit', postUrl: '/strategicbusinessunit-master/add-unit', putUrl: '/strategicbusinessunit-master/update', deleteUrl: '/strategicbusinessunit-master/', postMappingToCompany: '/strategic-businessunit-mapping/map-all', deleteMapping: '/strategic-businessunit-mapping/' },
    { value: 'Work Location', postUrl: '/worklocation-master/add-location', putUrl: '/worklocation-master/update', deleteUrl: '/worklocation-master/', postMappingToCompany: '/worklocationmaster-mapping/map-all', deleteMapping: '/worklocationmaster-mapping/' },
  ];
  public viewMode = false;
  constructor(private formBuilder: FormBuilder, private modalService: BsModalService, private jobMasterService: JobMasterService, private alertService: AlertServiceService, private bankMasterAtCompanyService: BankMasterAtCompanyService) {
    this.form = this.formBuilder.group({
      masterType: new FormControl(''),
      masterCode: new FormControl(''),
      masterDescription: new FormControl(''),
      isActive: new FormControl(''),
    });
    this.masterSelected = false;
    this.form.get('isActive').setValue(true);
  }

  public ngOnInit(): void {

    this.jobMasterService.get('/business-area-master/details').subscribe((res) => {
      console.log('getBusinessAreaMasterDetails', res);
    });
    this.jobMasterService.get('/business-area-master-mapping/details').subscribe((res) => {
      console.log('getBusinessAreaMasterMappingDetails', res);
    });

    this.bankMasterAtCompanyService.getGroupCompanyDetails().subscribe((res) => {
      console.log('bank company', res);
      this.companyListResponse = res.data.results;
      let i = 0;
      res.data.results.forEach((element) => {
        if (element.companyActive == true) {
          const obj = {
            id: i++,
            groupCompanyId: element.groupCompanyId,
            companyName: element.companyName,
            companyActive: element.companyActive,
            isSelected: false,
          };
          this.groupCompanyDetailsList.push({ id: element.groupCompanyId, itemName: element.companyName });
          this.summaryCompanyHtmlDataList.push(obj);
          this.summaryCompanyHtmlDataList1.push(obj);
        }
      });
    });
    this.refreshHtmlTable();
    this.getAllOtheMappingDetails();
  }

  refreshHtmlTable() {
    this.allhtmlTableDataList = [];
    this.tableDataList = [];
    this.tableDataList1 = [];
    this.summaryHtmlDataList = [];
    this.masterGridDataList = [];

    this.jobMasterService.getAllOtherMasterDetails().subscribe((res) => {
      this.masterGridDataList = res.data.results;
      console.log('getAllOtherMasterDetails', res);
      let i = 1;
      let j = 0;
      res.data.results.forEach((element) => {

          const obj = {
            id: j++,
            SrNo: i++,
            masterId: element.masterId,
            masterCode: element.masterCode,
            masterDescription: element.masterDescription,
            masterType: element.masterType,
            isActive: element.isActive,
            isSelected: false,
          };
          this.summaryHtmlDataList.push(obj);
          this.allhtmlTableDataList.push(obj);
          this.tableDataList.push(obj);
          this.tableDataList1.push(obj);

      });
    });
  }
  saveBusinessAreaMasterMapping() {
    const saveData = ({
      masterCode: 'SampleCode',
      masterDescription: 'Description',
      createdBy: 'AnantT',
    });

    this.jobMasterService.post(saveData, 'business-area-master-mapping/map-all').subscribe((res) => {
      console.log('business-area-master-mapping/map-all', res);
      if (res.data.results.length !== 0) {
        this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
      } else {
        this.alertService.sweetalertWarning(res.status.messsage);
      }
    }, (error: any) => {
      this.alertService.sweetalertError(error['error']['status']['messsage']);
    });
  }
  saveMaster() {
    this.checks = false;
    this.enableCheckAll = false;
    this.selectedCheckBox = [];

    let isActive = 0;
    if (this.form.get('isActive').value == true) {
      isActive = 1;
    } else {
      isActive = 0;

    }
    const selectedIndex = this.jobMasterList.findIndex((o) => o.value === this.form.get('masterType').value);
    console.log('selected index' + selectedIndex);
    console.log('in update fucntion::', this.editedRecordIndex);
    if (this.editedRecordIndex > 0) {
      console.log('in update fucntion::', this.editedRecordIndex);
      const saveData = {
        masterId: this.editedRecordIndex,
        masterDescription: this.form.get('masterDescription').value,
        masterCode: this.form.get('masterCode').value,
        createdBy: 'AnantT',
        isActive,
      };
      this.jobMasterService.put(saveData, this.jobMasterList[selectedIndex].putUrl).subscribe((res) => {
        console.log(res.status.messsage);
        console.log(res);
        if (res.data.results.length !== 0) {
          this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
          this.form.reset();
          this.form.get('isActive').setValue(true);
          this.isEditMode = false;
          this.refreshHtmlTable();
          this.getAllOtheMappingDetails();
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      }, (error: any) => {
        this.alertService.sweetalertError(error['error']['status']['messsage']);
      });
    } else {

      const saveData = {
        masterDescription: this.form.get('masterDescription').value,
        masterCode: this.form.get('masterCode').value,
        createdBy: 'AnantT',
      };

      this.jobMasterService.post(saveData, this.jobMasterList[selectedIndex].postUrl).subscribe((res) => {
        console.log(res.status.messsage);
        console.log(res);
        if (res.data.results.length !== 0) {
          this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
          this.form.reset();
          this.form.get('isActive').setValue(true);
          this.refreshHtmlTable();
          this.getAllOtheMappingDetails();
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      }, (error: any) => {
        this.alertService.sweetalertError(error['error']['status']['messsage']);
      });
    }
  }

  deleteBusinessAreaMaster() {
    const id = 0;
    this.jobMasterService.delete(id, '/business-area-master').subscribe((res) => {
      console.log(res);
      this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
    }, (error: any) => {
      this.alertService.sweetalertError(error.error.status.messsage);
    }, () => { });
  }

  // deleteBusinessAreaMasterMapping() {
  //   let id = 0;
  //   this.jobMasterService.delete(id, '/business-area-master-mapping').subscribe((res) => {
  //     console.log(res);
  //     this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
  //   }, (error: any) => {
  //     this.alertService.sweetalertError(error.error['status'].messsage);
  //   }, () => { });
  // }

  DeleteMaster(masterId: number, masterType: string) {

    const selectedIndex = this.jobMasterList.findIndex((o) => o.value == masterType);
    this.jobMasterService.delete(masterId, this.jobMasterList[selectedIndex].deleteUrl).subscribe((res) => {
      console.log(res);
      this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
      this.refreshHtmlTable();
    }, (error: any) => {
      this.alertService.sweetalertError(error.error.status.messsage);
    }, () => { });
  }
  editMaster(masterId: number, masterType: string) {
    console.log(this.masterGridDataList[masterId]);
    const findIndex = this.masterGridDataList.findIndex((o) => o.masterId == masterId && o.masterType == masterType);
    this.editedRecordIndex = masterId;
    this.isEditMode = true;
    this.viewMode = false;
    this.form.patchValue(this.masterGridDataList[findIndex]);
  }
  onSelectJobMaster(evt: any) {
    this.enableCheckAll = false;
    this.selectedCheckBox = [];
    this.tableDataList = this.summaryHtmlDataList;
    console.log(evt);
    if (evt === 'All') {
      this.hideFormControl = false;
      this.tableDataList = this.summaryHtmlDataList;
      this.tableDataList1 = this.tableDataList;
    } else {
      this.hideFormControl = true;
      this.tableDataList = this.tableDataList.filter((o) => o.masterType === evt);
    }

    this.tableDataList1 = this.tableDataList;
    this.checks = false;

    console.log(evt);
  }
  cancelView() {
    this.editedRecordIndex = 0;
    this.isEditMode = false;
    this.form.reset();
    this.form.get('isActive').setValue(true);

  }

  onCheckboxChange(evt: any, id: number) {
   // this.enableCheckAll = false;
    // console.log(evt);
    // console.log(evt.target.checked);
    console.log('check Box',this.checks);
    // console.log(id);
    if (id == -1) {
      console.log('id == -1::');
      if (evt.target.checked == true) {
        this.checks = false;
        this.enableCheckAll = false;
        this.selectedCheckBox = [];
        this.enableCheckAll = true;
        for (let i = 0; i < this.tableDataList1.length; i++) {
          if (this.tableDataList1[i].isActive == 1) {
           this.selectedCheckBox.push(this.tableDataList1[i]);
          }
        }
      } else {
        this.checks = false;
        this.enableCheckAll = false;
        this.selectedCheckBox = [];
      }
    } else {
      if (evt.target.checked == true) {
        this.checks = false;
        this.selectedCheckBox.push(this.summaryHtmlDataList[id]);
        console.log('this.summaryHtmlDataList[id]', this.summaryHtmlDataList[id]);
      } else if (evt.target.checked === false) {
        this.checks = false;
        console.log('in removing section');
        this.selectedCheckBox.splice(this.summaryHtmlDataList[id], 1);
        console.log('this.summaryHtmlDataList[id]', this.summaryHtmlDataList[id]);
      } else {
        console.log('something error');
      }
    }
    console.log(this.selectedCheckBox);

  }


  deactiveActiveCheckBox() {
    console.log(this.form.get('isActive').value);
   }
  addItemType() { }

  onCheckCompanyboxChange(evt: any, id: number) {
    this.enableCompanyCheckAll = false;

    if (id == -1) {
      console.log('id == -1::');
      console.log('this.summaryCompanyHtmlDataList::', this.summaryCompanyHtmlDataList);
      if (evt.target.checked == true) {
        this.enableCompanyCheckAll = true;
        this.selectedCompanyListCheckBox = this.summaryCompanyHtmlDataList1;
      } else {
        this.enableCompanyCheckAll = false;
        this.selectedCompanyListCheckBox = [];
      }
    } else {

      if (evt.target.checked == true) {
         this.selectedCompanyListCheckBox.push(this.summaryCompanyHtmlDataList[id]);
      } else if (evt.target.checked === false) {
        console.log('in removing section');
        this.selectedCompanyListCheckBox.splice(this.summaryCompanyHtmlDataList[id], 1);
      } else {
        console.log('something error');
      }
    }
    console.log(this.selectedCompanyListCheckBox);
  }

  // onCheckCompanyboxChange1(evt: any, id: number) {
  //   this.enableCompanyCheckAll = false;
  //   if (id == -1) {
  //     console.log('id == -1::');
  //     if (evt.target.checked == true) {
  //       this.enableCompanyCheckAll = true;
  //       for(let i =0;i<this.tableDataList1.length;i++){
  //         if(this.tableDataList1[i].isActive == 1){
  //          this.selectedCompanyListCheckBox.push(this.tableDataList1[i]);
  //         }
  //       }
  //     } else {
  //       this.enableCompanyCheckAll = false;
  //       this.selectedCompanyListCheckBox = [];
  //     }
  //   } else {
  //     if (evt.target.checked == true) {
  //       this.selectedCompanyListCheckBox.push(this.summaryCompanyHtmlDataList[id]);
  //     } else if (evt.target.checked === false) {
  //       console.log('in removing section');
  //       this.selectedCompanyListCheckBox.splice(this.summaryCompanyHtmlDataList[id], 1);
  //     }
  //   }
  //   console.log(this.selectedCompanyListCheckBox);
  //    // if (evt.target.checked == true) {
  //   //   this.selectedCompanyListCheckBox.push(row);
  //   // } else if (evt.target.checked === false) {
  //   //   console.log('in removing section');
  //   //   this.selectedCompanyListCheckBox.splice(row, 1);
  //   // } else {
  //   //   console.log('something error');
  //   // }
  // }
  saveMapToCompany() {
    this.modalRef.hide();
    console.log('saveMapToCompany');
    // get job master selected data
    let Business_Area = [];
    let Cost_Centre = [];
    const Department = [];
    const Division = [];
    let Sub_Cost_Centre = [];
    let Sub_Department = [];
    let Sub_Location = [];
    let GL_Code = [];
    const Grade = [];
    let Profit_Centre = [];
    const Project = [];
    const Region = [];
    const SubArea = [];
    let Strategic_Business_Unit = [];
    const Plant = [];
    let Work_Location = [];
    for (let i = 0; i < this.selectedCheckBox.length; i++) {
      for (let j = 0; j < this.selectedCompanyListCheckBox.length; j++) {
        if (this.selectedCheckBox[i].masterType == 'Business Area') {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Business_Area.push(obj);

        }
        if (this.selectedCheckBox[i].masterType == 'Cost Centre') {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Cost_Centre.push(obj);

        }
        if (this.selectedCheckBox[i].masterType == 'Department') {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Department.push(obj);

        }
        if (this.selectedCheckBox[i].masterType == 'Division') {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Division.push(obj);

        }
        if (this.selectedCheckBox[i].masterType == 'Sub Cost Centre') {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Sub_Cost_Centre.push(obj);

        }
        if (this.selectedCheckBox[i].masterType == 'Sub Department') {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Sub_Department.push(obj);

        }
        if (this.selectedCheckBox[i].masterType == 'GL Code') {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          GL_Code.push(obj);

        }
        if (this.selectedCheckBox[i].masterType == 'Grade') {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Grade.push(obj);

        }
        if (this.selectedCheckBox[i].masterType == 'Plant') {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Plant.push(obj);

        }
        if (this.selectedCheckBox[i].masterType == 'Sub Location') {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Sub_Location.push(obj);

        }
        if (this.selectedCheckBox[i].masterType == 'Project') {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Project.push(obj);

        }
        if (this.selectedCheckBox[i].masterType == 'Profit Centre') {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Profit_Centre.push(obj);
        }
        if (this.selectedCheckBox[i].masterType == 'Region') {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Region.push(obj);

        }
        if (this.selectedCheckBox[i].masterType == 'Sub Area') {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          SubArea.push(obj);

        }
        if (this.selectedCheckBox[i].masterType == 'Strategic Business Unit') {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Strategic_Business_Unit.push(obj);

        }
        if (this.selectedCheckBox[i].masterType == 'Work Location') {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Work_Location.push(obj);

        }
      }
    }
    /// end of two for loop i & j ...
    if (Business_Area.length > 0) {
      const selectedIndex = this.jobMasterList.findIndex((o) => o.value === 'Business Area');
      this.jobMasterService.post(Business_Area, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe((res) => {
        console.log('Business Area', res);
        if (res.data.results.length !== 0) {
          this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      }, (error: any) => {
        this.alertService.sweetalertError(error['error']['status']['messsage']);
      });

    }
    if (Cost_Centre.length > 0) {
      const selectedIndex = this.jobMasterList.findIndex((o) => o.value === 'Cost Centre');
      this.jobMasterService.post(Cost_Centre, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe((res) => {
        console.log('Cost Centre', res);
        if (res.data.results.length !== 0) {
          this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      }, (error: any) => {
        this.alertService.sweetalertError(error['error']['status']['messsage']);
      });

    }
    if (Department.length > 0) {
      const selectedIndex = this.jobMasterList.findIndex((o) => o.value === 'Department');
      this.jobMasterService.post(Department, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe((res) => {
        console.log('Department', res);
        if (res.data.results.length !== 0) {
          this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      }, (error: any) => {
        this.alertService.sweetalertError(error['error']['status']['messsage']);
      });

    }
    if (Division.length > 0) {
      const selectedIndex = this.jobMasterList.findIndex((o) => o.value === 'Division');
      this.jobMasterService.post(Division, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe((res) => {
        console.log('Division', res);
        if (res.data.results.length !== 0) {

          this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      }, (error: any) => {
        this.alertService.sweetalertError(error['error']['status']['messsage']);
      });

    }
    if (Sub_Cost_Centre.length > 0) {
      const selectedIndex = this.jobMasterList.findIndex((o) => o.value === 'Sub Cost Centre');
      this.jobMasterService.post(Sub_Cost_Centre, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe((res) => {
        console.log('Sub Cost Centre', res);
        if (res.data.results.length !== 0) {
          this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      }, (error: any) => {
        this.alertService.sweetalertError(error['error']['status']['messsage']);
      });

    }
    if (Sub_Department.length > 0) {
      const selectedIndex = this.jobMasterList.findIndex((o) => o.value === 'Sub Department');
      this.jobMasterService.post(Sub_Department, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe((res) => {
        console.log('Sub Department', res);
        if (res.data.results.length !== 0) {
          this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      }, (error: any) => {
        this.alertService.sweetalertError(error['error']['status']['messsage']);
      });

    }
    if (Sub_Location.length > 0) {
      const selectedIndex = this.jobMasterList.findIndex((o) => o.value === 'Sub Location');
      this.jobMasterService.post(Sub_Location, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe((res) => {
        console.log('Sub Location', res);
        if (res.data.results.length !== 0) {

          this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      }, (error: any) => {
        this.alertService.sweetalertError(error['error']['status']['messsage']);
      });

    }
    if (GL_Code.length > 0) {
      const selectedIndex = this.jobMasterList.findIndex((o) => o.value === 'GL Code');
      this.jobMasterService.post(GL_Code, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe((res) => {
        console.log('GL Code', res);
        if (res.data.results.length !== 0) {
          this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      }, (error: any) => {
        this.alertService.sweetalertError(error['error']['status']['messsage']);
      });

    }
    if (Grade.length > 0) {
      const selectedIndex = this.jobMasterList.findIndex((o) => o.value === 'Grade');
      this.jobMasterService.post(Grade, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe((res) => {
        console.log('Grade', res);
        if (res.data.results.length !== 0) {
          this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      }, (error: any) => {
        this.alertService.sweetalertError(error['error']['status']['messsage']);
      });

    }
    if (Plant.length > 0) {
      const selectedIndex = this.jobMasterList.findIndex((o) => o.value === 'Plant');
      this.jobMasterService.post(Plant, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe((res) => {
        console.log('Plant', res);
        if (res.data.results.length !== 0) {
          this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      }, (error: any) => {
        this.alertService.sweetalertError(error['error']['status']['messsage']);
      });

    }
    if (Profit_Centre.length > 0) {
      const selectedIndex = this.jobMasterList.findIndex((o) => o.value === 'Profit Centre');
      this.jobMasterService.post(Profit_Centre, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe((res) => {
        console.log('Profit Centre', res);
        if (res.data.results.length !== 0) {
          this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      }, (error: any) => {
        this.alertService.sweetalertError(error['error']['status']['messsage']);
      });

    }
    if (Project.length > 0) {
      const selectedIndex = this.jobMasterList.findIndex((o) => o.value === 'Project');
      this.jobMasterService.post(Project, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe((res) => {
        console.log('Project', res);
        if (res.data.results.length !== 0) {
          this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      }, (error: any) => {
        this.alertService.sweetalertError(error['error']['status']['messsage']);
      });

    }
    if (Region.length > 0) {
      const selectedIndex = this.jobMasterList.findIndex((o) => o.value === 'Region');
      this.jobMasterService.post(Region, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe((res) => {
        console.log('Region', res);
        if (res.data.results.length !== 0) {
          this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      }, (error: any) => {
        this.alertService.sweetalertError(error['error']['status']['messsage']);
      });

    }
    if (SubArea.length > 0) {
      const selectedIndex = this.jobMasterList.findIndex((o) => o.value === 'Sub Area');
      this.jobMasterService.post(SubArea, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe((res) => {
        console.log('SubArea', res);
        if (res.data.results.length !== 0) {
          this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      }, (error: any) => {
        this.alertService.sweetalertError(error['error']['status']['messsage']);
      });

    }
    if (Strategic_Business_Unit.length > 0) {
      const selectedIndex = this.jobMasterList.findIndex((o) => o.value === 'Strategic Business Unit');
      this.jobMasterService.post(Strategic_Business_Unit, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe((res) => {
        console.log('Strategic Business Unit', res);
        if (res.data.results.length !== 0) {
          this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      }, (error: any) => {
        this.alertService.sweetalertError(error['error']['status']['messsage']);
      });

    }
    if (Work_Location.length > 0) {
      const selectedIndex = this.jobMasterList.findIndex((o) => o.value === 'Work Location');
      this.jobMasterService.post(Work_Location, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe((res) => {
        console.log('Work Location', res);
        if (res.data.results.length !== 0) {
          this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      }, (error: any) => {
        this.alertService.sweetalertError(error['error']['status']['messsage']);
      });
    }

  }

  isAllSelected(evt: any) {
    if (evt.target.value == false) {
      this.checkUncheckAll();
    } else {
      this.enableCompanyCheckAll = true;
      this.masterSelected = this.summaryCompanyHtmlDataList.every(function(item: any) {
        return item.isSelected == true;
      });
      // this.getCheckedItemList();
    }
  }

  getCheckedItemList() {
    this.checkedList = [];
    for (let i = 0; i < this.summaryCompanyHtmlDataList.length; i++) {
      if (this.summaryCompanyHtmlDataList[i].isSelected) {
        this.checkedList.push(this.summaryCompanyHtmlDataList[i]);
      }
    }
    this.checkedList = JSON.stringify(this.checkedList);
  }

  checkUncheckAll() {
    for (let i = 0; i < this.summaryCompanyHtmlDataList.length; i++) {
      this.summaryCompanyHtmlDataList[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

  UploadModal(template: TemplateRef<any>) {
   this.checksCompany = false;
   this.enableCompanyCheckAll = false;
   this.selectedCompanyListCheckBox = [];
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' }),
    );
  }
  getAllOtheMappingDetails() {
    this.summaryAllOtherMappingDetailsList = [];
    this.getAllOtherMappingDetailsResponse = {};

    this.jobMasterService.getAllOtheMappingDetails().subscribe((res) => {
      this.getAllOtherMappingDetailsResponse = res.data.results;
      console.log('getAllOtherMappingResponse', res);
      let i = 1;
      res.data.results.forEach((element) => {
        if (element.isActive == 1) {
          const obj = {
            SrNo: i++,
            masterMappingId: element.masterMappingId,
            masterId: element.masterId,
            groupCompanyId: element.groupCompanyId,
            masterMappingType: element.masterMappingType,
            masterCode: element.masterCode,
            companyName: element.companyName,
            isActive: element.isActive,
          };
          this.summaryAllOtherMappingDetailsList.push(obj);

        }
      });
    });

  }
  DeleteMasterMapping(masterId: number, masterType: string) {
    const selectedIndex = this.jobMasterList.findIndex((o) => o.value === masterType);

    this.jobMasterService.delete(masterId, this.jobMasterList[selectedIndex].deleteMapping).subscribe((res) => {
      console.log(res);
      this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
      this.getAllOtheMappingDetails();
    }, (error: any) => {
      this.alertService.sweetalertError(error.error.status.messsage);
    }, () => { });
  }
  onClickAssignmentSummary() {

    this.getAllOtheMappingDetails();
  }
}
