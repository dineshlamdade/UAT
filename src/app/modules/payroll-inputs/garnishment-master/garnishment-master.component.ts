import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,FormGroupDirective,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GarnishmentService } from './garnishment.service';


@Component({
  selector: 'app-garnishment-master',
  templateUrl: './garnishment-master.component.html',
  styleUrls: ['./garnishment-master.component.scss']
})
export class GarnishmentMasterComponent implements OnInit {
  garnishmentForm: FormGroup;
  garnishmentData: any;
  complianceHeadNanedata: any;
  institutionMasterData: any;
  countryList: any;

 

  constructor(private formbuilder: FormBuilder,private garnishmentService: GarnishmentService,private alertService: ToastrService) 
    {
    this.garnishmentForm = this.formbuilder.group({
      nameOfInstitution: new FormControl('', Validators.required),
      complianceHeadName: new FormControl(''),
      label: new FormControl(''),
      documentId: new FormControl(1),
      headMasterId: new FormControl(null, Validators.required),
      thirdPartyMasterId: new FormControl(0),
      description: new FormControl(null, Validators.required),
      contactNumber: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      contactPerson: new FormControl(null, Validators.required),
      emailId: new FormControl(null, Validators.required),
      address1: new FormControl(null, Validators.required),
      address2: new FormControl(null, Validators.required),
      address3: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      pinCode: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      villege: new FormControl(null, Validators.required),
      pan: new FormControl(null, Validators.required),
      accountNoInPayeeBook: new FormControl(null, Validators.required),
      standardName: new FormControl(null, Validators.required),
      formula: new FormControl(null, Validators.required),
      sdm: new FormControl(null, Validators.required),
      frequency: new FormControl(null, Validators.required),
      investmentSection: new FormControl(null, Validators.required),
      familyMember: new FormControl('1'),
      remark: new FormControl(null, Validators.required),
      active: new FormControl('0'),
      generalRemark: new FormControl(null, Validators.required),
    });
  }


  ngOnInit(): void {
    this.getAllMasterData()
    this.getComplianceHeadNane()
    this.getInstitutionMaster()
    this.getLocationInformationOrCountryList()
  }

  getAllMasterData(){
    this.garnishmentService.getAllGarnishmentMaster().subscribe(res =>{
      this.garnishmentData = res.data.results;
    })
  }

  /** Get Compliance Head Nane */
  getComplianceHeadNane(){
    this.garnishmentService.getComplianceHeadNane().subscribe(res =>{
      this.complianceHeadNanedata = res.data.results;
    })
  }

  /** Get Institution Master */
  getInstitutionMaster(){
    this.garnishmentService.getInstitutionMaster().subscribe(res =>{
      this.institutionMasterData = res.data.results;
    })
  }

  /** Get Location Information Or CountryList */
  getLocationInformationOrCountryList(){
    this.garnishmentService.getLocationInformationOrCountryList().subscribe(res =>{
      this.countryList = res.data.results;
    })
  }

}