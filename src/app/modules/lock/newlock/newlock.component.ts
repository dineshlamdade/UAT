import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SortEvent } from 'primeng/api';
import { CKEditorModule } from 'ckeditor4-angular';
import { CycleLockService } from '../cycle-lock.service';
export interface Customer {
  empcode;
  empName;
  designation;
  grade;
  establishment;
  department;
  area;
  companyname;
  service;

}
export interface User1 {

  area;
  service;
  cmpnyname;

}
export interface emplist {
  empno;
  area;
  service;
  cmpnyname;

}
export interface aswhen {
  companyname;
  service;
  type;
  cyclecreationdate;
  cyclename;
  fromdate;
  todate;

}
export interface sumarea {
  area;
  companyname;
  service;
  businessyear;
  cyclename;
  cycledefinition;
  fromdatearea;
  todatearea;
  lockdatearea;
  lockbyarea;

}
export interface sumbusiness {
  area;
  companyname;
  service;
  businessyear;

  fromdate;
  todate;
  lockdate;
  lockby;

}
export interface sumemp {
  empcode;
  empname;
  area;
  companyname;
  service;
  businessyear;
  cycledefinition;
  cyclename;
  fromdate;
  todate;
  lockdate;
  lockby;

}

export interface sumaswhn {

  companyname;
  service;
  businessyear;
  type;
  cyclename;
  remark;
  fromdate;
  todate;
  lockdate;
  lockby;

}
export interface arealist {

  area;
  service;
  cmpnyname;
}
interface group {
  name: string

}
interface City {
  name: string,
}
@Component({
  selector: 'app-newlock',
  templateUrl: './newlock.component.html',
  styleUrls: ['./newlock.component.scss']
})
export class NewlockComponent implements OnInit {
  public modalRef: BsModalRef;
  customers: Customer[];
  groups: group[];
  aswhens: aswhen[];
  sumbusinesss: sumbusiness[];
  cities: City[];
  users1: User1[];
  sumareas: sumarea[];
  arealists: arealist[];
  sumemps: sumemp[];
  sumaswhns: sumaswhn[];
  emplists: emplist[];
  val: any;
  displayedColumns: string[];
  dataSource: any[] = [];
  employeedata: any[] = [];
  areadata: any = []
  ;
  areadataSource: any;
  empdataSource: any;
  employeeMasterdata: any;
  constructor(private modalService: BsModalService,private CycleLockService: CycleLockService) { }

  ngOnInit(): void {
    this.customers = [
      { empcode: '1', empName: ' ', designation: ' ', grade: ' ', establishment: ' ', department: ' ', area: ' ', companyname: ' ', service: ' ' },
      { empcode: '11', empName: 'ssss', designation: ' ', grade: ' ', establishment: ' ', department: ' ', area: ' ', companyname: ' ', service: ' ' },
      { empcode: '111', empName: 'dddddd', designation: ' ', grade: ' ', establishment: ' ', department: ' ', area: ' ', companyname: ' ', service: ' ' },
      { empcode: '555', empName: 'dddddd', designation: ' ', grade: ' ', establishment: ' ', department: ' ', area: ' ', companyname: ' ', service: ' ' },
      { empcode: '222', empName: 'dddddd', designation: ' ', grade: ' ', establishment: ' ', department: ' ', area: ' ', companyname: ' ', service: ' ' },
      { empcode: '1', empName: 'dddddd', designation: ' ', grade: ' ', establishment: ' ', department: ' ', area: ' ', companyname: ' ', service: ' ' },
      { empcode: '1', empName: 'dddddd', designation: ' ', grade: ' ', establishment: ' ', department: ' ', area: ' ', companyname: ' ', service: ' ' },
      { empcode: '1', empName: 'dddddd', designation: ' ', grade: ' ', establishment: ' ', department: ' ', area: ' ', companyname: ' ', service: ' ' },
      { empcode: '1', empName: 'dddddd', designation: '', grade: ' ', establishment: ' ', department: ' ', area: ' ', companyname: ' ', service: ' ' },
      { empcode: '888', empName: 'dddddd', designation: '', grade: ' ', establishment: ' ', department: ' ', area: ' ', companyname: ' ', service: ' ' },
      { empcode: '1', empName: 'dddddd', designation: '', grade: ' ', establishment: ' ', department: ' ', area: ' ', companyname: ' ', service: ' ' },
      { empcode: '1', empName: 'dddddd', designation: '', grade: ' ', establishment: ' ', department: ' ', area: ' ', companyname: ' ', service: ' ' },
      { empcode: '66', empName: 'dddddd', designation: '', grade: ' ', establishment: '123', department: ' ', area: ' ', companyname: ' ', service: '' },

    ];
    this.users1 = [
      { area: 'area', service: 'aaa', cmpnyname: 'aaaa', },
      { area: 'area', service: 'aaa', cmpnyname: 'aaaa', },
      { area: 'area', service: 'aaa', cmpnyname: 'aaaa', },


    ];
    this.emplists = [
      { empno: '1', area: 'area', service: 'aaa', cmpnyname: 'aaaa', },
      { empno: '1', area: 'area', service: 'aaa', cmpnyname: 'aaaa', },
      { empno: '1', area: 'area', service: 'aaa', cmpnyname: 'aaaa', },


    ];
    this.arealists = [
      { area: 'area', service: 'aaa', cmpnyname: 'aaaa', },
      { area: 'area', service: 'aaa', cmpnyname: 'aaaa', },
      { area: 'area', service: 'aaa', cmpnyname: 'aaaa', },


    ];
    this.sumareas = [{
      area: '', companyname: '', service: '', businessyear: '', cyclename: '', cycledefinition: 'a', fromdatearea: 't', todatearea: '11', lockdatearea: 'aa', lockbyarea: 'SS'
    }
    ];
    this.sumbusinesss = [{
      area: '', companyname: '', service: '', businessyear: '', fromdate: '', todate: '', lockdate: '', lockby: ''
    }
    ];
    this.sumemps = [{
      empcode: '111', empname: 'Rihan', area: '', companyname: '', service: '', businessyear: '', cyclename: '', cycledefinition: '', fromdate: '', todate: '', lockdate: '', lockby: '',
    }
    ];

    this.sumaswhns = [{
      companyname: '', service: '', businessyear: '', type: '', cyclename: '', remark: 'a', fromdate: 't', todate: '11', lockdate: 'aa', lockby: 'SS'
    }
    ];



    this.aswhens = [
      {
        companyname: 'Paysquare',
        service: 'IT',
        type: 'As & When Cycle',
        cyclecreationdate: '22-jan-2021',
        cyclename: 'Weekly',
        fromdate: '23-jan-2021',
        todate: '29-jan-2021',

      },
      {
        companyname: 'Paysquare',
        service: 'IT',
        type: 'Supplementry Cycle',
        cyclecreationdate: '22-jan-2021',
        cyclename: 'Weekly',
        fromdate: '23-jan-2021',
        todate: '29-jan-2021',

      },
      {
        companyname: 'Paysquare',
        service: 'IT',
        type: 'Supplementry Cycle',
        cyclecreationdate: '22-jan-2021',
        cyclename: 'Weekly',
        fromdate: '23-jan-2021',
        todate: '29-jan-2021',

      },
      {
        companyname: 'Paysquare',
        service: 'IT',
        type: 'Supplementry Cycle',
        cyclecreationdate: '22-jan-2021',
        cyclename: 'Weekly',
        fromdate: '23-jan-2021',
        todate: '29-jan-2021',

      },
      {
        companyname: 'Paysquare',
        service: 'IT',
        type: 'Supplementry Cycle',
        cyclename: 'Weekly',
        cyclecreationdate: '22-jan-2021',

        fromdate: '23-jan-2021',
        todate: '29-jan-2021',

      },
      {
        companyname: 'Paysquare',
        service: 'IT',
        type: 'Supplementry Cycle',
        cyclename: 'Weekly',
        cyclecreationdate: '22-jan-2021',

        fromdate: '23-jan-2021',
        todate: '29-jan-2021',

      },
    ];
    this.groups = [
      { name: '101' },
      { name: '102' },
      { name: '103' },

    ];
    this.cities = [
      { name: 'Set 1' },
      { name: 'Set 2' },
      { name: 'Set 3' },

    ];


     this.getEmployeeData()
  }

  getEmployeeData(){
    this.CycleLockService.getEmpData().subscribe(res=>{
      this.employeeMasterdata = res.data.results[0]
    })
  }

  smallpopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }
  lockarea(template2: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template2,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  Areapendingforlockpopup(Areapendingforlock: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      Areapendingforlock,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  Emplist(emplist: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      emplist,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }
  Arealistpop(arealist: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      arealist,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  aswhen(aswhen1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      aswhen1,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  Aswhen2(aswhen2: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      aswhen2,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  BusinessLockpop(BusinessLock: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      BusinessLock,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  BusinessPendingForLockPopup(BusinessPendingForLock: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      BusinessPendingForLock,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
    });
  }


  AreaListPasteData(event: ClipboardEvent) {
    let clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text');
    let row_data = pastedText.split('\n');
    //this.displayedColumns = row_data[0].split('\t');
    //this.displayedColumns = ["employeeCode", "employeeName"]
    this.displayedColumns = ["area"]
    //delete row_data[0];
    // Create table dataSource
    row_data.forEach(row_data => {
      let row = {};
      this.displayedColumns.forEach((a, index) => {
        row[a] = row_data.split('\t')[index]
      });
      this.areadata.push(row);
    })
    this.areadataSource = this.areadata;
    this.areadataSource.splice(this.areadataSource.length-1,1)
    //console.log(this.dataSource);
  }

  ResetareaData(){
    this.areadataSource = []
  }

  


  EmployeeListPasteData(event: ClipboardEvent) {
    let clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text');
    let row_data = pastedText.split('\n');
    // this.displayedColumns = row_data[0].split('\t');
    // this.displayedColumns = ["employeeCode", "employeeName"]
    this.displayedColumns = ["employeeCode"]

    
    //delete row_data[0];
    // Create table dataSource
    row_data.forEach(row_data => {
      let row = {};
      this.displayedColumns.forEach((a, index) => {
        row[a] = row_data.split('\t')[index]
      });
      // console.log(row)
      this.employeedata.push(row);
    })
    this.empdataSource = this.employeedata;
    this.empdataSource.splice(this.empdataSource.length-1,1)

    console.log("Before: " + JSON.stringify(this.empdataSource));
    
    this.employeeMasterdata.forEach(element => {
      this.empdataSource.forEach(emp => {
        let empcode = emp.employeeCode.split('\r')
        if(element.employeeCode+',' == empcode){
          emp.employeeMasterId = element.employeeMasterId
          emp.fullName = element.fullName 
        }
      });
    });
    console.log("After: " + JSON.stringify(this.empdataSource));
  }

  ResetempData(){
    this.empdataSource = []
  }
}

