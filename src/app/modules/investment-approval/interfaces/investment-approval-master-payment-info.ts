export interface InvestmentApprovalMasterPaymentInfo {
  masterPaymentDetailId: number;
  frequencyOfPayment: string;
  premiumAmount: number;
  annualAmount: number;
  fromDate: Date;
  toDate: Date;
  ecs: boolean;
}
