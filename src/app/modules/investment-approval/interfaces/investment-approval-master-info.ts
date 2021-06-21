import { InvestmentApprovalMasterDocumentInfo } from './investment-approval-master-document-info';
import { InvestmentApprovalMasterPaymentInfo } from './investment-approval-master-payment-info';
import { InvestmentApprovalMasterRemarkInfo } from './investment-approval-master-remark-info';

export interface InvestmentApprovalMasterInfo {
  psidDetailList: [];
  psidDetail: {
    groupName: string;
    section: string;
    type: string;
    psid: string;
    dateOfSubmission: Date;
    proofSubmissionStatus: string;
  };
  masterDetail: {
    masterId: number;
    employeeMasterId: number;
    institutionName: string;
    policyNo: string;
    policyholdername: string;
    relationship: string;
    policyStartDate: Date;
    policyEndDate: Date;
    proofSubmissionId: string;
    masterStatus: string;
    paymentDetailList: InvestmentApprovalMasterPaymentInfo[];
    documentDetailList: InvestmentApprovalMasterDocumentInfo[];
    masterRemarkDetailList: InvestmentApprovalMasterRemarkInfo[];
  };
}
