import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { PreviousEmployerService } from '../previousemployer.service';
import { NumberFormatPipe } from '../../../../core/utility/pipes/NumberFormatPipe';
import { AlertServiceService } from '../../../../core/services/alert-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-previousemployersummary',
  templateUrl: './previousemployersummary.component.html',
  styleUrls: ['./previousemployersummary.component.scss']
})
export class PreviousemployersummaryComponent implements OnInit {

  public previousEmployerSummaryDetailList: Array<any> = [];

  
  public tabIndex = 0;
  public declaredAmount: any;
  public actualAmount: any;
  public futureNewPolicyDeclaredAmount: any;
  public grandTotalDeclaredAmount: number;
  public grandTotalActualAmount: number;
  public grandDeclarationTotal: number;
  public grandActualTotal: number;
  public grandRejectedTotal: number;
  public grandApprovedTotal: number;
  public grandTabStatus: boolean;
  public selectedInstitution: string;
  public name: string;
  public dateOfLeaving: Date;
  public typeOfRegime: Date;

  showData = false;
  public modalRef: BsModalRef;

  /*   @Input() institution: string; */
  @Input() propertyHouseName: string;
  @Output() myEvent = new EventEmitter<any>();
  @Output() policyNumber = new EventEmitter<any>();

  constructor(
    private PreviousEmployerService: PreviousEmployerService,
    private numberFormat: NumberFormatPipe,
    private alertService: AlertServiceService,
    private modalService: BsModalService
  ) {

    localStorage.removeItem("mode")
  }

  public ngOnInit(): void {
    // Summary get Call on Page Load
    this.summaryPage();
  }

  redirectToDeclarationActual(propertyName: string, mode: string) {
    this.tabIndex = 2;
    localStorage.setItem("mode",mode)
    const data = {
      propertyHouseName: propertyName,
      tabIndex: this.tabIndex,
      canEdit: mode == 'edit' ? true : false,
    };
    /*  this.propertyName = propertyName; */
    console.log('propertyName::', propertyName);
    //console.log('policyNo::', policyNo);
    this.myEvent.emit(data);
  }
  jumpToMasterPage(propertyName: string) {
    this.tabIndex = 1;
    const data = {
      number: propertyName,
      tabIndex: this.tabIndex,
    };
    this.policyNumber.emit(data);
  }

  opencomputationModal(template1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template1,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

      // ---------------------Summary ----------------------
  // Summary get Call
  summaryPage() {
    this.PreviousEmployerService.gethousePreviousEmployerSummary().subscribe((res) => {
      console.log(res);
      console.log('previousemployerSummaryGridData::', res);
      this.previousEmployerSummaryDetailList=res.data.results[0].previousEmployerSummaryDetailList;
      this.name = res.data.results[0].name;
      this.dateOfLeaving = res.data.results[0].dateOfLeaving;
      this.typeOfRegime = res.data.results[0].typeOfRegime;
     
    });
  }
}

  