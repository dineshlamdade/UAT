import { InvestmentApprovalDashboardEmployeeInfo } from './investment-approval-dashboard-employee-info';

export interface InvestmentApprovalDashboardInfo {
  masterStatusCount: {
    approved: number;
    sendBack: number;
    submitted: number;
    reSubmitted: number;
    total: number;
  };
  transactionCount: {
    approved: number;
    sendBack: number;
    submitted: number;
    reSubmitted: number;
    total: number;
  };
  assignedProofSubmissionList: InvestmentApprovalDashboardEmployeeInfo[];
  itGroupsSectionsList: []
}
