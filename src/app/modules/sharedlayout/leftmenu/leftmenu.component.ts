import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { EventEmitterService } from './../../employee-master/employee-master-services/event-emitter/event-emitter.service';
@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.scss'],
})
export class LeftmenuComponent implements OnInit {
  public menuDetails: Array<any>;
  public isCollapsed = true;

  public isEmployeeMaster = true;
  public isProjectCollapsed = true;
  public isJobportalCollapsed = true;

  public isPayrollInputsCollapsed = true;
  public isInvestmentCollapsed = true;
  public isEightyCCollapsed = true;
  public isChapetr6ACollapsed = true;

  public isOtherMaster = true;
  isUploadExcel= true;
  public isAuthCollapsed = true;
  public isStaticticsCollapsed = true;
  public isFriendsCollapsed = true;
  public isCollapsedLMS = true;
  public isCollapsedWorkflowSettings = true;
  public contactTab: boolean;
  public chatTab = true;
  public toggle1: boolean;
  public toggle2: boolean;
  public toggle3 = true;
  public toggle4: boolean;
  public toggle5: boolean;
  public toggle6: boolean;
  public toggle7: boolean;
  public toggle8: boolean;
  public toggle9: boolean;
  public toggle10: boolean;
  public fontSelect: any;
  public menuIconSelect: any;
  public staticscard = true;
  public friendscard = true;
  updateEmpIdSubscription: Subscription;
  employeeMasterId: number;
  ischaptersettingCollapsed = true;

  constructor(private router: Router, @Inject(AppComponent) private app: AppComponent,
    private EventEmitterService: EventEmitterService) {

    if ((this.router.url).includes('payroll')) {
      this.isCollapsed = false;
    }
    if ((this.router.url).includes('PayrollInputs')) {
      this.isPayrollInputsCollapsed = false;
    }
    if ((this.router.url).includes('investment')) {
      this.isInvestmentCollapsed = false;
    }
    if ((this.router.url).includes('80C')) {
      this.isEightyCCollapsed = false;
    }
    if ((this.router.url).includes('Chapter-VI-A')) {
      this.isChapetr6ACollapsed = false;
    }
    if ((this.router.url).includes('otherMaster')) {
      this.isOtherMaster = false;
    }
    if ((this.router.url).includes('auth')) {
      this.isAuthCollapsed = false;
    }
    if ((this.router.url).includes('uploadexcel')) {
      this.isUploadExcel = false;}
    if ((this.router.url).includes('companysetting')) {
      this.ischaptersettingCollapsed = false;
    }
    if ((this.router.url).includes('employee-master')) {
      this.isEmployeeMaster = false;
    }
  }

  public ngOnInit(): void {
    this.menuDetails = [{
      collapsed: false,
      icon: 'icon-rocket',
      name: 'Dashboard',
      routerlink: '/dashboard',
    },
    ////////////////////
    {
      collapsed: true,
      icon: 'icon-credit-card',
      name: 'Company Settings',
      subDetails: [{
        name: 'payroll',
        routerlink: '/companysetting/payroll',
      },
        // {
        //   name: '80C-PPF',
        //   routerlink: '/otherMaster/companyRegistrationDetails',
        // },
        // {
        //   name: 'Compliance Head',
        //   routerlink: '/otherMaster/complianceHead',
        // }
      ],
    },

    //////////////////////////////

    {
      collapsed: true,
      icon: 'icon-credit-card',
      name: 'Investment',
      subDetails: [{
        name: '80C-LIC',
        routerlink: '/investment/80C-LIC',
      },
      {
        name: '80C-PPF',
        routerlink: '/otherMaster/companyRegistrationDetails',
      },
      {
        name: 'Compliance Head',
        routerlink: '/otherMaster/complianceHead',
      }],
    },
    {
      collapsed: true,
      icon: 'icon-rocket',
      name: 'Other Master',
      subDetails: [{
        name: 'Company Group Master',
        routerlink: '/otherMaster/companyGroupMaster',
      },
      {
        name: 'Company Registration Details',
        routerlink: '/otherMaster/companyRegistrationDetails',
      },
      {
        name: 'Compliance Head',
        routerlink: '/otherMaster/complianceHead',
      }],
    },
    ];

    this.updateEmpIdSubscription = this.EventEmitterService.setUpdateEmployeeId().subscribe(res => {
      this.employeeMasterId = res;
      this.checkEmpId();
    })
  }

  checkEmpId() {
    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);

    if (this.employeeMasterId) {
      return true;
    }
  }

  ngAfterViewInit() {
    const pThis: any = this;
    setTimeout(() => {
      // debugger
      if (sessionStorage.getItem('Font2') != '' && sessionStorage.getItem('Font2') != null) {
        this.fontSelect = sessionStorage.getItem('Font2');
      } else {
        this.fontSelect = '';
      }
      if (sessionStorage.getItem('MenuIcon') != '' && sessionStorage.getItem('MenuIcon') != null) {
        this.menuIconSelect = sessionStorage.getItem('MenuIcon');
        if (this.menuIconSelect == 'list-a') {
          this.onSubMenuIcon(1);
        } else if (this.menuIconSelect == 'list-b') {
          this.onSubMenuIcon(2);
        } else if (this.menuIconSelect == 'list-c') {
          this.onSubMenuIcon(3);
        }
      } else {
        this.menuIconSelect = '';
      }

      if (sessionStorage.getItem('Toggle') != '' && sessionStorage.getItem('Toggle') != null) {
        this.toggle1 = true;
      } else {
        this.toggle1 = false;
      }
      if (sessionStorage.getItem('Toggle2') != '' && sessionStorage.getItem('Toggle2') != null) {
        this.toggle2 = true;
      } else {
        this.toggle2 = false;
      }
      if (sessionStorage.getItem('Toggle3') != '' && sessionStorage.getItem('Toggle3') != null) {
        pThis.toggle3 = true;
      } else {
        pThis.toggle3 = false;
      }
      if (sessionStorage.getItem('Toggle4') != '' && sessionStorage.getItem('Toggle4') != null) {
        this.toggle4 = true;
      } else {
        this.toggle4 = false;
      }
      if (sessionStorage.getItem('Toggle5') != '' && sessionStorage.getItem('Toggle5') != null) {
        this.toggle5 = true;
      } else {
        this.toggle5 = false;
      }
      if (sessionStorage.getItem('Toggle6') != '' && sessionStorage.getItem('Toggle6') != null) {
        this.toggle6 = true;
      } else {
        this.toggle6 = false;
      }
      if (sessionStorage.getItem('Toggle7') != '' && sessionStorage.getItem('Toggle7') != null) {
        this.toggle7 = true;
      } else {
        this.toggle7 = false;
      }
      if (sessionStorage.getItem('Toggle8') != '' && sessionStorage.getItem('Toggle8') != null) {
        this.toggle8 = true;
      } else {
        this.toggle8 = false;
      }
      if (sessionStorage.getItem('Toggle9') != '' && sessionStorage.getItem('Toggle9') != null) {
        this.toggle9 = true;
      } else {
        this.toggle9 = false;
      }
      if (sessionStorage.getItem('Toggle10') != '' && sessionStorage.getItem('Toggle10') != null) {
        this.toggle10 = true;
      } else {
        this.toggle10 = false;
      }

      const haderClassName = document.getElementById('page_top');
      if (sessionStorage.getItem('HeaderClass') != '' && sessionStorage.getItem('HeaderClass') != null) {
        haderClassName.classList.add(sessionStorage.getItem('HeaderClass'));
      } else {
        haderClassName.classList.remove('top_dark');
      }
      const minSideClassName = document.getElementById('header_top');
      if (sessionStorage.getItem('MinSideClass') != '' && sessionStorage.getItem('MinSideClass') != null) {
        minSideClassName.classList.add(sessionStorage.getItem('MinSideClass'));
      } else {
        minSideClassName.classList.remove('dark');
      }

      const className = document.getElementsByClassName('card');
      const className1 = document.getElementsByClassName('btn');
      const className2 = document.getElementsByClassName('progress');
      const classArray = [className, className1, className2];
      for (let index = 0; index < classArray.length; index++) {
        const classIndex = classArray[index];
        for (let index = 0; index < classIndex.length; index++) {
          const element = classIndex[index];
          if (sessionStorage.getItem('BoxShadow') != '' && sessionStorage.getItem('BoxShadow') != null) {
            element.classList.add('box_shadow');
          } else {
            element.classList.remove('box_shadow');
          }
        }
      }
      console.log(this.toggle3);
    });
  }

  onTab(number) {
    this.chatTab = false;
    this.contactTab = false;
    if (number == '1') {
      this.chatTab = true;
    } else if (number == '2') {
      this.contactTab = true;
    }
  }

  onFontStyle(type) {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('font-opensans');
    body.classList.remove('font-montserrat');
    body.classList.remove('font-roboto');
    if (type == 1) {
      body.classList.add('font-opensans');
      sessionStorage.setItem('Font1', 'font-opensans');
    } else if (type == 2) {
      body.classList.add('font-montserrat');
      sessionStorage.setItem('Font1', 'font-montserrat');
    } else if (type == 3) {
      body.classList.add('font-roboto');
      sessionStorage.setItem('Font1', 'font-roboto');
    }
  }

  onSubMenuIcon(type) {
    // debugger
    const submenuIconclass = document.getElementsByClassName('submenu');
    for (let index = 0; index < submenuIconclass.length; index++) {
      const element = submenuIconclass[index];
      element.classList.remove('list-a');
      element.classList.remove('list-b');
      element.classList.remove('list-c');
      sessionStorage.setItem('MenuIcon', '');
      if (type == 1) {
        element.classList.add('list-a');
        sessionStorage.setItem('MenuIcon', 'list-a');
      } else if (type == 2) {
        element.classList.add('list-b');
        sessionStorage.setItem('MenuIcon', 'list-b');
      } else if (type == 3) {
        element.classList.add('list-c');
        sessionStorage.setItem('MenuIcon', 'list-c');
      }

    }

  }

  toggleUserMenu() {
    const body = document.getElementsByClassName('user_div')[0];

    if (body.classList.contains('open')) {
      body.classList.remove('open');
    } else {
      body.classList.add('open');
    }
    document.getElementsByClassName('overlay')[0].classList.toggle('open');
  }

  toggleSettingMenu() {
    const body = document.getElementsByClassName('right_sidebar')[0];

    if (body.classList.contains('open')) {
      body.classList.remove('open');
    } else {
      body.classList.add('open');
    }
    document.getElementsByClassName('overlay')[0].classList.toggle('open');
  }

  onGeneralSetting(type, e) {

    const body = document.getElementsByTagName('body')[0];

    if (type == 1) {
      body.classList.toggle('dark-mode');
      if (e.target.checked) {
        this.toggle1 = true;
        sessionStorage.setItem('Toggle', 'true');
      } else {
        this.toggle1 = false;
        sessionStorage.setItem('Toggle', '');
      }
    } else if (type == 2) {
      if (e.target.checked) {
        this.toggle2 = true;
        sessionStorage.setItem('Toggle2', 'true');
      } else {
        this.toggle2 = false;
        sessionStorage.setItem('Toggle2', '');
      }
    } else if (type == 3) {
      if (e.target.checked) {
        this.toggle3 = true;
        sessionStorage.setItem('Toggle3', 'true');
      } else {
        this.toggle3 = false;
        sessionStorage.setItem('Toggle3', '');
      }

      document.getElementById('page_top').classList.toggle('top_dark');
      if (e.target.checked) {
        sessionStorage.setItem('HeaderClass', 'top_dark');
      } else {
        sessionStorage.setItem('HeaderClass', '');
      }
    } else if (type == 4) {
      if (e.target.checked) {
        this.toggle4 = true;
        sessionStorage.setItem('Toggle4', 'true');
      } else {
        this.toggle4 = false;
        sessionStorage.setItem('Toggle4', '');
      }
      document.getElementById('header_top').classList.toggle('dark');
      if (e.target.checked) {
        sessionStorage.setItem('MinSideClass', 'dark');
      } else {
        sessionStorage.setItem('MinSideClass', '');
      }
    } else if (type == 5) {
      if (e.target.checked) {
        this.toggle5 = true;
        sessionStorage.setItem('Toggle5', 'true');
      } else {
        this.toggle5 = false;
        sessionStorage.setItem('Toggle5', '');
      }
      body.classList.toggle('sidebar_dark');
    } else if (type == 6) {
      if (e.target.checked) {
        this.toggle6 = true;
        sessionStorage.setItem('Toggle6', 'true');
      } else {
        this.toggle6 = false;
        sessionStorage.setItem('Toggle6', '');
      }
      body.classList.toggle('iconcolor');
    } else if (type == 7) {
      if (e.target.checked) {
        this.toggle7 = true;
        sessionStorage.setItem('Toggle7', 'true');
      } else {
        this.toggle7 = false;
        sessionStorage.setItem('Toggle7', '');
      }
      body.classList.toggle('gradient');
    } else if (type == 8) {
      if (e.target.checked) {
        this.toggle8 = true;
        sessionStorage.setItem('Toggle8', 'true');
      } else {
        this.toggle8 = false;
        sessionStorage.setItem('Toggle8', '');
      }
      const className = document.getElementsByClassName('card');
      const className1 = document.getElementsByClassName('btn');
      const className2 = document.getElementsByClassName('progress');
      const classArray = [className, className1, className2];
      for (let index = 0; index < classArray.length; index++) {
        const classIndex = classArray[index];
        for (let index = 0; index < classIndex.length; index++) {
          const element = classIndex[index];
          if (e.target.checked) {
            element.classList.add('box_shadow');
            sessionStorage.setItem('BoxShadow', 'box_shadow');
          } else {
            element.classList.remove('box_shadow');
            sessionStorage.setItem('BoxShadow', '');
          }
        }
      }

    } else if (type == 9) {
      if (e.target.checked) {
        this.toggle9 = true;
        sessionStorage.setItem('Toggle9', 'true');
      } else {
        this.toggle9 = false;
        sessionStorage.setItem('Toggle9', '');
      }
      body.classList.toggle('rtl');
    } else if (type == 10) {
      if (e.target.checked) {
        this.toggle10 = true;
        sessionStorage.setItem('Toggle10', 'true');
      } else {
        this.toggle10 = false;
        sessionStorage.setItem('Toggle10', '');
      }
      body.classList.toggle('boxlayout');
    }
  }

  toggleMenu() {
    const body = document.getElementsByTagName('body')[0];

    if (body.classList.contains('offcanvas-active')) {
      body.classList.remove('offcanvas-active');
    } else {
      body.classList.add('offcanvas-active');
    }
  }
  cToggoleMenu() {
    const body = document.getElementsByTagName('body')[0].classList.remove('offcanvas-active');
    document.getElementsByClassName('overlay')[0].classList.toggle('open');
  }

  CardRemoveStatics() {
    this.staticscard = false;
  }
  CardRemoveFriends() {
    this.friendscard = false;
  }
}
