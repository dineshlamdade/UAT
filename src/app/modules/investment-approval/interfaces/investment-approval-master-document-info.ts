import { InvestmentApprovalDocumentRemarkInfo } from './investment-approval-document-remark-info';

export interface InvestmentApprovalMasterDocumentInfo {
  documentInformationId: number;
  fileName: string;
  blobURI: string;
  documentType: string;
  dateOfSubmission: Date;
  password: string;
  remark: string;
  lastModifiedBy: string;
  proofSubmissionId: string;
  lastModifiedDateTime: Date;
  documentStatus: string;
  documentRemarkDetailList: InvestmentApprovalDocumentRemarkInfo[];
}
