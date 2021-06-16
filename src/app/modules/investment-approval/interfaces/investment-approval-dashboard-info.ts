import { InvestmentApprovalDashboardEmployeeInfo } from './investment-approval-dashboard-employee-info';

export interface InvestmentApprovalDashboardInfo {
  masterStatusCount: {
    approved: string;
    sendBack: string;
    submitted: string;
    reSubmitted: string;
    total: string;
  };
  transactionCount: {
    approved: string;
    sendBack: string;
    submitted: string;
    reSubmitted: string;
    total: string;
  };
  assignedProofSubmissionList: InvestmentApprovalDashboardEmployeeInfo[];
}
