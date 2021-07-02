import { InvestmentApprovalMasterDocumentInfo } from './investment-approval-master-document-info';
import { InvestmentApprovalTransactionRemarkInfo } from './investment-approval-transaction-remark-info';

export interface InvestmentApprovalTransactionInfo {
  psidDetail: {
    groupName: string;
    section: string;
    type: string;
    psid: string;
    dateOfSubmission: Date;
    proofSubmissionStatus: string;
    lastModifiedDateTime: Date;
  };
  transactionDetail: [
    {
      institutionName: string;
      policyNo: string;
      policyholdername: string;
      frequency: string;
      masterPSID: string;
      declarationTotal: number;
      actualTotal: number;
      totalApprovedAmount: number;
      totalRejectedAmount: number;
      transactionDetailList: [
        {
          transactionId: number;
          previousEmployer: string;
          declaredAmount: number;
          dateOfPayment: Date;
          dueDate: Date;
          actualAmount: number;
          amountRejected: string;
          amountApproved: string;
          remark: string;
          remarkList: InvestmentApprovalTransactionRemarkInfo[];
          transactionStatus: string;
          proofSubmissionId: string;
        }
      ];
    }
  ];
  documentList: InvestmentApprovalMasterDocumentInfo[];
  grandTotalActual: number;
  grantTotalApproved: number;
  grandTotalRejected: number;
}
