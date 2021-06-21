export interface InvestmentApprovalDocumentRemarkInfo {
  id: number;
  masterId: number;
  employeeMasterId: number;
  proofSubmissionId: string;
  remark: string;
  remarkBy: string;
  remarkDate: Date;
  role: string;
}
