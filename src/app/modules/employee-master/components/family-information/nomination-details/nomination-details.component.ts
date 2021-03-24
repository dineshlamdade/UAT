import { Component, OnInit, ViewChild, Input, ViewEncapsulation } from '@angular/core';
// import { CoreService } from './core.service';
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import { BankInformationService } from './../../bank-information/bank-information.service';
// import { NotificationsService } from '@src/app/core/services/notifications.service';
import { FamilyInformationService } from './../family-information.service';
// import { NominationElement } from './periodic';
import { NominationElementDTO, NominationInformation, TotalPercentageDTO } from './../family-information.model';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { EventEmitterService } from './../../../employee-master-services/event-emitter/event-emitter.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedInformationService } from '../../../employee-master-services/shared-service/shared-information.service';
import { DatePipe } from '@angular/common';


export interface NominationElement {
  familyMemberInfoId: any;
  familyMemberName: any;
  providentFund: any;
  eps: any;
  salary: any;
  esic: any;
  gratuity: any;
  superAnnuation: any;
  lifeInsurance: any;
}
export interface ESICElement {
  familyMemberInfoId: any;
  familyMemberName: any;
  state: any;
  city: any;
  dispensaryName: any;
  dispensaryAddress: any;
}


@Component({
  selector: 'app-nomination-details',
  templateUrl: './nomination-details.component.html',
  styleUrls: ['./nomination-details.component.scss']
})
export class NominationDetailsComponent implements OnInit {

  displayedColumns: string[] = ['familyMemberInfoId', 'familyMemberName', 'pfPercentage', 'epsPercentage',
    'salaryPercentage', 'esicPercentage', 'gratuityPercentage', 'superAnnuationPercentage', 'lifeInsurancePercentage',
    'personalAccidentInsurancePercentage', 'mediclaimInsurancePercentage'];
  displayedRemainingFooters: string[] = ['Total (%)', 'Remaining Balance (%)', 'Document'];
  ESICColumns: string[] = ['familyMemberName', 'state', 'city', 'dispensaryName', 'dispensaryAddress'];
  states: Array<any> = [];
  editstates: Array<any> = [];
  Totalstates: Array<any> = [];
  cityList: Array<any> = [];
  dispensaryNameList: Array<any> = [];
  employeeMasterId: number;
  ELEMENT_DATA: []
  FamilyMemberList: Array<any> = [];
  DocumentMemberList: Array<any> = [];
  ESICDataSource: MatTableDataSource<any>;
  ESICMemberList: Array<any> = [];
  public FamilyMember = new NominationElementDTO('', '', '', '', '', '', '', '', '');
  public TotalPercentageDTO = new TotalPercentageDTO('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  dataSource: MatTableDataSource<any>;
  NominationInformation = new NominationInformation();
  public familyNominationRequestDTO: Array<any> = [];
  public familyESICDetailRequestDTO: Array<any> = [];
  AllNominationList: Array<any> = [];
  AllESICList: Array<any> = [];
  PFcount: number = 0;
  EPScount: number = 0;
  salarycount: number = 0;
  ESICcount: number = 0;
  Gratuitycount: number = 0;
  SuperAnutationcount: number = 0;
  LifeInsurancecount: number = 0;
  PersonalAccInsurancecount: number = 0;
  MediclaimInsurancecount: number = 0;
  PFcountBoolean: boolean;
  EPScountBoolean: boolean;
  salarycountBoolean: boolean;
  ESICcountBoolean: boolean;
  GratuitycountBoolean: boolean;
  SuperAnutationcountBoolean: boolean;
  LifeInsurancecountBoolean: boolean;
  PersonalAccInsurancecountBoolean: boolean;
  MediclaimInsurancecountBoolean: boolean;
  SaveBoolean: boolean;
  lastUpdated: any;
  NavigateToNominationSubscription: Subscription;
  extractedInfoID: Array<any> = [];
  extractedESICInfoID: Array<any> = [];
  lastUpdatedDate: any;
  ESICLocationLIST: Array<any> = [];
  ESICLocationCity: Array<any> = [];
  filteredCities: Array<any> = [];
  FilteredDispensaryNames: Array<any> = [];
  ESICLocationDispensaryName: Array<any> = [];
  fileUrl;
  @Input() setItemInActive: any;
  cityForm: FormGroup;
  nominationDataSource: Array<any> = [];
  esicDataSource: Array<any> = [];

  constructor(private FamilyInformationService: FamilyInformationService,
    private BankInformationService: BankInformationService,
    private EventEmitterService: EventEmitterService,
    private sanitizer: DomSanitizer,
    private CommonDataService: SharedInformationService,
    public datepipe: DatePipe,) { }

  ngOnInit(): void {
    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);
    const data = 'some text';
    const blob = new Blob([data], { type: 'application/octet-stream' });

    this.getNomination();

    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    this.FamilyInformationService.getAllESICLocation().subscribe(res => {

      this.ESICLocationLIST = res.data.results[0];

      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
      // this.ESICLocationLIST.forEach(city1 =>{
      //   this.ESICLocationCity.push(city1.district);
      // })
      // this.ESICLocationCity = city;

      // this.ESICLocationLIST.filter(dispensaryName1=>{
      //   this.ESICLocationDispensaryName.push(dispensaryName1.dispensary);
      // })
      // this.ESICLocationDispensaryName = dispensaryName;
    })

    // this.getESICGridInfo();
    // this.getAllNominations();




    // this.NavigateToNominationSubscription = this.EventEmitterService.setInActiveNominationRecord().subscribe(res => {
    //   
    //   res.isMemberActive == 'isMemberActive';
    //   this.dataSource.data.forEach(element => {

    //     if (res.isMemberActive == element.IsActive) {
    //       element.pfPercentage = 0;
    //       element.epsPercentage = 0;
    //       element.gratuityPercentage = 0;
    //       element.salaryPercentage = 0;
    //       element.superAnnuationPercentage = 0;
    //       element.lifeInsurancePercentage = 0;
    //       element.esicPercentage = 0;
    //       element.personalAccidentInsurancePercentage = 0;
    //       element.mediclaimInsurancePercentage = 0;
    //       element.IsActive = 0;
    //     }
    //   })
    // })
  }

  getNomination() {
    this.FamilyInformationService.getFamilyGridSummary(this.employeeMasterId).subscribe((res: any) => {
      
      // if (!this.dataSource) {
      res.data.results[0].familyDetailsSummaryBeans.forEach(element => {
        if (element.status == 1) {
          const obj = {
            'familyMemberInfoId': element.familyMemberInfoId,
            'familyMemberName': element.familyMemberName,
            'isActive': element.status,
            'pfPercentage': 0,
            'epsPercentage': 0,
            'gratuityPercentage': 0,
            'salaryPercentage': 0,
            'superAnnuationPercentage': 0,
            'lifeInsurancePercentage': 0,
            'esicPercentage': 0,
            'personalAccidentInsurancePercentage': 0,
            'mediclaimInsurancePercentage': 0
          }
         // this.FamilyMemberList.push(obj);
        }

        // const TABLE_DATA: NominationElement[] = this.FamilyMemberList;
        // this.dataSource = new MatTableDataSource(TABLE_DATA);
      })
      // }
      this.FamilyInformationService.getAllNominations(this.employeeMasterId).subscribe((res: any) => {
        
        this.AllNominationList = res.data.results[0].familyNominationResponseDTO;
        this.TotalPercentageDTO = res.data.results[0].totalPercentageResponseDTO;
    
        this.FamilyMemberList.forEach((element1) => {
          this.AllNominationList.some(res => {
            if (element1.familyMemberInfoId == res.familyMemberInfoId) {
              res.familyMemberName = element1.familyMemberName;
            }
          })
        })
        
        this.nominationDataSource = res.data.results[0].familyNominationResponseDTO;
        this.lastUpdatedDate = new Date(Math.max.apply(null, this.AllNominationList.map(function (e) {
          return new Date(e.lastModifiedDateTime);
        })));
        this.lastUpdatedDate = this.datepipe.transform(this.lastUpdatedDate, "dd-MMM-yyyy");
        if(this.lastUpdatedDate == '01-Jan-1970'){
          this.lastUpdatedDate = ''; 
        }
        const newNomination = [];
        this.FamilyMemberList.filter(element => {
          newNomination.push(element.familyMemberInfoId);
        })
        const newNomination1 = []
        res.data.results[0].familyNominationResponseDTO.filter(element => {
          newNomination1.push(element.familyMemberInfoId);
        })
        // let extractedInfoID = [];
        this.extractedInfoID = this.differenceOf2Arrays(newNomination, newNomination1)

        if (this.extractedInfoID.length > 0) {
          this.extractedInfoID.filter(element => {
            this.FamilyMemberList.find((element1) => {
              if (element == element1.familyMemberInfoId) {
                this.AllNominationList.push(element1);

                this.AllNominationList.forEach(res => {
                  if (res.isActive == 0 && !res.familyNominationId) {
                    let index;
                    index = this.AllNominationList.findIndex(record => record.familyMemberInfoId == res.familyMemberInfoId);
                    this.AllNominationList.splice(index, 1);
                  }
                })
                // this.NavigateToNominationSubscription = this.EventEmitterService.setInActiveNominationRecord().subscribe(res => {
                if (this.setItemInActive) {
                  this.AllNominationList.forEach(element => {

                    if (this.setItemInActive.familyMemberInfoId == element.familyMemberInfoId) {
                      element.pfPercentage = 0;
                      element.epsPercentage = 0;
                      element.gratuityPercentage = 0;
                      element.salaryPercentage = 0;
                      element.superAnnuationPercentage = 0;
                      element.lifeInsurancePercentage = 0;
                      element.esicPercentage = 0;
                      element.personalAccidentInsurancePercentage = 0;
                      element.mediclaimInsurancePercentage = 0;
                      element.isActive = 0;
                      element.disable = true;
                    }
                  })
                  // })
                }
                // if(!this.setItemInActive){

                // }
                // const TABLE_DATA: NominationElement[] = this.AllNominationList;
                // return this.dataSource = new MatTableDataSource(TABLE_DATA);
                return this.nominationDataSource = this.AllNominationList;
              }
            });
          })
        } else {
          // this.NavigateToNominationSubscription = this.EventEmitterService.setInActiveNominationRecord().subscribe(res => {
          if (this.setItemInActive) {
            this.AllNominationList.forEach(element => {

              if (this.setItemInActive.familyMemberInfoId == element.familyMemberInfoId) {
                element.pfPercentage = 0;
                element.epsPercentage = 0;
                element.gratuityPercentage = 0;
                element.salaryPercentage = 0;
                element.superAnnuationPercentage = 0;
                element.lifeInsurancePercentage = 0;
                element.esicPercentage = 0;
                element.personalAccidentInsurancePercentage = 0;
                element.mediclaimInsurancePercentage = 0;
                element.isActive = 0;
                element.disable = true;
              }
            })
            // })
          }
          // const TABLE_DATA: NominationElement[] = this.AllNominationList;
          // return this.dataSource = new MatTableDataSource(TABLE_DATA);
          return this.nominationDataSource = this.AllNominationList;
        }
      }, (error: any) => {
        // this.nominationDataSource = this.FamilyMemberList;
        // this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
      })

      if (this.extractedInfoID.length == 0 && this.AllNominationList.length == 0) {
        // this.NavigateToNominationSubscription = this.EventEmitterService.setInActiveNominationRecord().subscribe(res => {
        if (this.setItemInActive) {
          this.AllNominationList.forEach(element => {

            if (this.setItemInActive.familyMemberInfoId == element.familyMemberInfoId) {
              element.pfPercentage = 0;
              element.epsPercentage = 0;
              element.gratuityPercentage = 0;
              element.salaryPercentage = 0;
              element.superAnnuationPercentage = 0;
              element.lifeInsurancePercentage = 0;
              element.esicPercentage = 0;
              element.personalAccidentInsurancePercentage = 0;
              element.mediclaimInsurancePercentage = 0;
              element.isActive = 0;
              element.disable = true;
            }
          })
          // })
        }
        // const TABLE_DATA: NominationElement[] = this.FamilyMemberList;
        // this.dataSource = new MatTableDataSource(TABLE_DATA);
        this.nominationDataSource = this.FamilyMemberList;
      }
      // if (!this.ESICDataSource) {
      res.data.results[0].familyDetailsSummaryBeans.forEach(element => {
        
        if (element.status == 1) {
          const obj1 = {
            'familyMemberInfoId': element.familyMemberInfoId,
            'familyMemberName': element.familyMemberName,
            // 'isActive': element.status,
            'state': '',
            'city': '',
            'dispensaryName': '',
            'dispensaryAddress': ''
          }
          this.ESICMemberList.push(obj1);
        }
        // const TABLE_DATA1: ESICElement[] = this.ESICMemberList;
        // this.ESICDataSource = new MatTableDataSource(TABLE_DATA1);
      })
      this.BankInformationService.getStates().subscribe(res => {
        this.states = res.data.results;
        this.Totalstates = res.data.results;
        this.editstates = res.data.results;


        this.FamilyInformationService.getESICGridInfo(this.employeeMasterId).subscribe((res: any) => {
          
          this.AllESICList = res.data.results[0];
          this.getStates();

          const newESIC = [];
          this.ESICMemberList.filter(element => {
            newESIC.push(element.familyMemberInfoId);
          })
          const newESIC1 = []
          res.data.results[0].filter(element => {
            newESIC1.push(element.familyMemberInfoId);
          })
          // let extractedInfoID = [];
          this.extractedESICInfoID = this.differenceOf2Arrays(newESIC, newESIC1)

          if (this.extractedESICInfoID.length > 0) {
            this.extractedESICInfoID.filter(element => {
              this.ESICMemberList.find((element1) => {
                if (element == element1.familyMemberInfoId) {
                  this.AllESICList.push(element1);
                  // const TABLE_DATA1: ESICElement[] = this.AllESICList;
                  // this.AllESICList.forEach(res => {
                  //   res.stateList = this.states;
                  //   res.familyMemberName = element1.familyMemberName;
                  // })
                  return this.esicDataSource = this.AllESICList;
                  // this.ESICDataSource = new MatTableDataSource(TABLE_DATA1);
                }
              });
            })
            this.ESICMemberList.forEach((element1) => {
              this.AllESICList.some(res => {
                res.stateList = this.states;
                if (element1.familyMemberInfoId == res.familyMemberInfoId) {
                  res.familyMemberName = element1.familyMemberName;
                }
              })
            })
          } else {
            const TABLE_DATA1: ESICElement[] = this.AllESICList;
            this.ESICMemberList.forEach((element1) => {
              this.AllESICList.some(res => {
                res.stateList = this.states;
                if (element1.familyMemberInfoId == res.familyMemberInfoId) {
                  res.familyMemberName = element1.familyMemberName;
                }
              })
            })
            return this.esicDataSource = this.AllESICList;
            // return this.ESICDataSource = new MatTableDataSource(TABLE_DATA1);
          }

        })
        if (this.extractedESICInfoID.length == 0 && this.AllESICList.length == 0) {
          const TABLE_DATA1: ESICElement[] = this.ESICMemberList;
          this.ESICMemberList.forEach(res => {
            res.stateList = this.states;
          })
          this.esicDataSource = this.ESICMemberList;
          // this.ESICDataSource = new MatTableDataSource(TABLE_DATA1);
        }
      })

      // }
    })
  }


  filterCity(state, ESIC) {
    
    let cities = [];
    console.log(this.ESICLocationLIST);
    this.ESICLocationLIST['esicdispensaryDB'].forEach(city => {
      if (ESIC.state == city.state) {
        cities.push(city.district);
      }
    })
    ESIC.cities = cities.filter(this.onlyUnique);
    if(ESIC.cities.length == 0){
      delete ESIC.cities;
    }
    ESIC.city = '';
    ESIC.dispensaryName = '';
    ESIC.dispensaryAddress = '';
    // if(state){
    //   ESIC.city = '';
    // }
  }

  filterDispensaryName(city, ESIC) {

    let dispensaryNames = [];
    this.ESICLocationLIST['esicdispensaryDB'].forEach(dispensaryName => {
      if (city == dispensaryName.district) {
        dispensaryNames.push(dispensaryName.dispensary);
      }
    })
    ESIC.dispensaryList = dispensaryNames.filter(this.onlyUnique);
  }

  clearFieldsOnState(ESIC) {
    ESIC.city = '';
    ESIC.dispensaryName = '';
    ESIC.dispensaryAddress = '';
    ESIC.cities = [];
    ESIC.dispensaryList = [];
  }
  clearFieldsOnCity(ESIC) {
    // ESIC.city = '';
    ESIC.dispensaryName = '';
    ESIC.dispensaryAddress = '';
    // ESIC.cities = [];
    ESIC.dispensaryList = [];
  }
  clearFieldsOnDispensary(ESIC) {
    // ESIC.city = '';
    // ESIC.dispensaryName = '';
    ESIC.dispensaryAddress = '';
    // ESIC.cities = [];
    // ESIC.dispensaryList = [];
  }

  getDispensaryAddress(nomination) {

    let dispensary1 = this.ESICLocationLIST['esicdispensaryDB'].filter(dispensary => {
      if (nomination.dispensaryName == dispensary.dispensary) {
        return dispensary;
      }
    })
    nomination.dispensaryAddress = dispensary1[0].address;
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  differenceOf2Arrays(array1, array2) {
    var temp = [];

    for (var i in array1) {
      if (array2.indexOf(array1[i]) === -1) temp.push(array1[i]);
    }
    for (i in array2) {
      if (array1.indexOf(array2[i]) === -1) temp.push(array2[i]);
    }
    return temp.sort((a, b) => a - b);
  }

  getTotalPF() {
    if (this.nominationDataSource) {
      return this.nominationDataSource.map(t => t.pfPercentage).reduce((acc, value) => acc + value, 0);
    }
  }
  getRemainingTotalPF() {
    return 100 - this.getTotalPF();
  }
  getTotalepsPercentage() {
    if (this.nominationDataSource) {
      return this.nominationDataSource.map(t => t.epsPercentage).reduce((acc, value) => acc + value, 0);
    }
  }
  getRemainingTotalepsPercentage() {
    return 100 - this.getTotalepsPercentage();
  }
  getTotalsalaryPercentage() {
    if (this.nominationDataSource) {
      return this.nominationDataSource.map(t => t.salaryPercentage).reduce((acc, value) => acc + value, 0);
    }
  }
  getRemainingTotalsalaryPercentage() {
    return 100 - this.getTotalsalaryPercentage();
  }
  getTotalesicPercentage() {
    if (this.nominationDataSource) {
      return this.nominationDataSource.map(t => t.esicPercentage).reduce((acc, value) => acc + value, 0);
    }
  }
  getRemainingTotalesicPercentage() {
    return 100 - this.getTotalesicPercentage();
  }
  getTotalgratuityPercentage() {
    if (this.nominationDataSource) {
      return this.nominationDataSource.map(t => t.gratuityPercentage).reduce((acc, value) => acc + value, 0);
    }
  }
  getRemainingTotalgratuityPercentage() {
    return 100 - this.getTotalgratuityPercentage();
  }
  getTotalsupeannuationPercentage() {
    if (this.nominationDataSource) {
      return this.nominationDataSource.map(t => t.superAnnuationPercentage).reduce((acc, value) => acc + value, 0);
    }
  }
  getRemainingSupeAnnuationPercentage() {
    return 100 - this.getTotalsupeannuationPercentage();
  }
  getTotallifeInsurancePercentage() {
    if (this.nominationDataSource) {
      return this.nominationDataSource.map(t => t.lifeInsurancePercentage).reduce((acc, value) => acc + value, 0);
    }
  }
  getRemainingLifeInsurancePercentage() {
    return 100 - this.getTotallifeInsurancePercentage();
  }
  getTotalMediclaimInsurancePercentage() {
    if (this.nominationDataSource) {
      return this.nominationDataSource.map(t => t.mediclaimInsurancePercentage).reduce((acc, value) => acc + value, 0);
    }
  }
  getRemainingMediclaimInsurancePercentage() {
    return 100 - this.getTotalMediclaimInsurancePercentage();
  }
  getTotalpersonalAccidentInsurance() {
    if (this.nominationDataSource) {
      return this.nominationDataSource.map(t => t.personalAccidentInsurancePercentage).reduce((acc, value) => acc + value, 0);
    }
  }
  getRemainingpersonalAccidentInsurance() {
    return 100 - this.getTotalpersonalAccidentInsurance();
  }
  saveNominationsDetails(nominationDataSource, esicDataSource) {
    
    // nominationDataSource.forEach(element => {
    //   this.PFcount = this.PFcount + element.pfPercentage;
    // });
    // nominationDataSource.forEach(element => {
    //   this.EPScount = this.EPScount + element.epsPercentage;
    // });
    // nominationDataSource.forEach(element => {
    //   this.salarycount = this.salarycount + element.salaryPercentage;
    // });
    // nominationDataSource.forEach(element => {
    //   this.ESICcount = this.ESICcount + element.esicPercentage;
    // });
    // nominationDataSource.forEach(element => {
    //   this.Gratuitycount = this.Gratuitycount + element.gratuityPercentage;
    // });
    // nominationDataSource.forEach(element => {
    //   this.SuperAnutationcount = this.SuperAnutationcount + element.superAnnuationPercentage;
    // });
    // nominationDataSource.forEach(element => {
    //   this.LifeInsurancecount = this.LifeInsurancecount + element.lifeInsurancePercentage;
    // });
    // nominationDataSource.forEach(element => {
    //   this.PersonalAccInsurancecount = this.PersonalAccInsurancecount + element.personalAccidentInsurancePercentage;
    // });
    // nominationDataSource.forEach(element => {
    //   this.MediclaimInsurancecount = this.MediclaimInsurancecount + element.mediclaimInsurancePercentage;
    // });
    // if (this.PFcount > 100 && this.PFcount != 0) {
    //   this.PFcountBoolean = true;
    //   this.CommonDataService.sweetalertError('Nomination Percentage for Provident Fund Should be 100%');
    // }
    // if (this.EPScount > 100 && this.EPScount != 0) {
    //   this.EPScountBoolean = true;
    //   this.CommonDataService.sweetalertError('Nomination Percentage for EPS Should be 100%');
    // }
    // if (this.salarycount > 100 && this.salarycount != 0) {
    //   this.salarycountBoolean = true;
    //   this.CommonDataService.sweetalertError('Nomination Percentage for Salary Should be 100%');
    // }
    // if (this.ESICcount > 100 && this.ESICcount != 0) {
    //   this.ESICcountBoolean = true;
    //   this.CommonDataService.sweetalertError('Nomination Percentage for ESIC Should be 100%');
    // }
    // if (this.Gratuitycount > 100 && this.Gratuitycount != 0) {
    //   this.GratuitycountBoolean = true;
    //   this.CommonDataService.sweetalertError('Nomination Percentage for Gratuity Should be 100%');
    // }
    // if (this.SuperAnutationcount > 100 && this.SuperAnutationcount != 0) {
    //   this.SuperAnutationcountBoolean = true;
    //   this.CommonDataService.sweetalertError('Nomination Percentage for Super Annuation Should be 100%');
    // }
    // if (this.LifeInsurancecount > 100 && this.LifeInsurancecount != 0) {
    //   this.LifeInsurancecountBoolean = true;
    //   this.CommonDataService.sweetalertError('Nomination Percentage for Life Insurance Should be 100%');
    // }
    // if (this.PersonalAccInsurancecount > 100 && this.PersonalAccInsurancecount != 0) {
    //   this.PersonalAccInsurancecountBoolean = true;
    //   this.CommonDataService.sweetalertError('Nomination Percentage for Personal Accident Insurance Should be 100%');
    // }
    // if (this.MediclaimInsurancecount > 100 && this.MediclaimInsurancecount != 0) {
    //   this.MediclaimInsurancecountBoolean = true;
    //   this.CommonDataService.sweetalertError('Nomination Percentage for Mediclaim Insurance Fund Should be 100%');
    // }
    // this.PFcount = 0;
    // this.EPScount = 0;
    // this.salarycount = 0;
    // this.ESICcount = 0;
    // this.Gratuitycount = 0;
    // this.SuperAnutationcount = 0;
    // this.LifeInsurancecount = 0;
    // this.PersonalAccInsurancecount = 0;
    // this.MediclaimInsurancecount = 0;
    // if (this.PFcountBoolean != true && this.EPScountBoolean != true && this.salarycountBoolean != true
    //   && this.ESICcountBoolean != true && this.GratuitycountBoolean != true && this.SuperAnutationcountBoolean != true
    //   && this.LifeInsurancecountBoolean != true && this.PersonalAccInsurancecountBoolean != true
    //   && this.MediclaimInsurancecountBoolean != true) {
    //   this.SaveBoolean = true;
    // }


    // if (this.SaveBoolean == true) {

      this.NominationInformation.familyNominationRequestDTO = nominationDataSource;
      this.NominationInformation.familyESICDetailRequestDTO = esicDataSource;
      this.NominationInformation.familyESICDetailRequestDTO.forEach(data => {
        delete data.cities;
        delete data.familyMemberName
      })
      this.NominationInformation.familyNominationRequestDTO.forEach(data => {
        delete data.disable;
        delete data.familyMemberInfo;
      })
      this.NominationInformation.familyESICDetailRequestDTO.forEach(data => {
        delete data.dispensaryList;
        delete data.stateList;

      })

      this.FamilyInformationService.postNominationDetails(this.NominationInformation).subscribe(res => {

        // this.nominationDataSource = res.data.results[0].familyNominationResponseDTO;
        this.getNomination();
        this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);

      }, (error: any) => {
        this.getNomination();
        this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
      })
    // }
    // this.SaveBoolean = false;
  }

  /** Gets the total cost of all transactions. */
  getTotalPFCost(pfPercentage) {
    // return this.dataSource.data.map(t => t.providentFund).reduce((acc, value) => acc + value, 0);
  }
  getStates() {
    this.BankInformationService.getStates().subscribe(res => {
      this.states = res.data.results;
      this.Totalstates = res.data.results;
      this.editstates = res.data.results;
    })
  }
  getESICGridInfo() {

    this.FamilyInformationService.getESICGridInfo(this.employeeMasterId).subscribe((res: any) => {

      // const TABLE_DATA1: ESICElement[] = res.data.results[0];
      // this.ESICDataSource = new MatTableDataSource(TABLE_DATA1);
      this.esicDataSource = res.data.results[0];
    })
  }

  getAllNominations() {

    this.FamilyInformationService.getAllNominations(this.employeeMasterId).subscribe((res: any) => {

      this.TotalPercentageDTO = res.data.results[0].totalPercentageResponseDTO;
      // const TABLE_DATA: NominationElement[] = res.data.results[0].familyNominationResponseDTO;
      // this.dataSource = new MatTableDataSource(TABLE_DATA);
      this.nominationDataSource = res.data.results[0].familyNominationResponseDTO;

    })
  }

  filterStates(event, ESIC) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.states.length; i++) {
      let state = this.states[i];
      if (state.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(state);
      }
    }
    ESIC.stateList = filtered;
  }

  filterCities(event, ESIC) {

    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < ESIC.cities.length; i++) {
      let city = ESIC.cities[i];
      if (city.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(city);
      }
    }
    this.filteredCities = filtered;
  }

  filterDispensaryList(event, ESIC) {

    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < ESIC.dispensaryList.length; i++) {
      let dispensary = ESIC.dispensaryList[i];
      if (dispensary.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(dispensary);
      }
    }
    this.FilteredDispensaryNames = filtered;
  }

  resetNomination() {
   
    this.getNomination();
  }

  esicPercentageValidation(esicPercentage) {
    
    if (esicPercentage == 0) {
      return
    }
    if (esicPercentage != 100) {
      this.CommonDataService.sweetalertError('Nomination for ESIC should be 100% for a single family member');
    }
  }
}
