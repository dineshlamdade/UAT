import { InvestmentApprovalEmployeeInfo } from './investment-approval-employee-info';
import { InvestmentApprovalMasterDocumentInfo } from './investment-approval-master-document-info';
import { InvestmentApprovalMasterInfo } from './investment-approval-master-info';
import { InvestmentApprovalMasterPaymentInfo } from './investment-approval-master-payment-info';

export const EmployeeInfo: InvestmentApprovalEmployeeInfo = {
  employeeMasterId: 1008,
  fullName: 'Vaibhav',
  employeeType: 'Permannent',
  designation: 'Software Developer',
  employeeCode: 'P123',
  joiningDate: new Date(2020, 7, 1),
  grade: 'G1',
  establishment: 'Confirmed',
};

export const PaymentDetails: InvestmentApprovalMasterPaymentInfo[] = [
  {
    masterPaymentDetailId: 1,
    frequencyOfPayment: 'Monthly',
    fromDate: new Date(2021, 1, 1),
    toDate: new Date(2045, 1, 1),
    premiumAmount: 1200,
    annualAmount: 144000,
    ecs: true,
  },
  {
    masterPaymentDetailId: 2,
    frequencyOfPayment: 'Yearly',
    fromDate: new Date(2020, 1, 1),
    toDate: new Date(2020, 12, 31),
    premiumAmount: 14400,
    annualAmount: 144000,
    ecs: true,
  },
];

export const DocumentDetails: InvestmentApprovalMasterDocumentInfo[] = [
  // {
  //   documentInformationId: 1,
  //   fileName: 'sunset-5990540_1920.jpg',
  //   blobURI:
  //     'https://paysquare-images.s3.ap-south-1.amazonaws.com/sunset-5990540_1920.jpg',
  //   documentType: 'Premium Receipt',
  //   dateOfSubmission: new Date(2021, 3, 31),
  //   password: '1231',
  //   remark: '',
  //   lastModifiedBy: 'Vaibhav',
  //   proofSubmissionId: '123232',
  //   lastModifiedDateTime: new Date(2021, 3, 31),
  //   documentStatus: 'Submitted',

  // },
  // {
  //   documentInformationId: 2,
  //   fileName: 'testpdf14.pdf',
  //   blobURI:
  //     'https://paysquare-images.s3.ap-south-1.amazonaws.com/testpdf14.pdf',
  //   documentType: 'Premium Receipt',
  //   dateOfSubmission: new Date(2021, 3, 31),
  //   password: '6768',
  //   remark: '',
  //   lastModifiedBy: 'Vaibhav',
  //   proofSubmissionId: '1232325454',
  //   lastModifiedDateTime: new Date(2021, 3, 31),
  //   documentStatus: 'Approved',
  // },
];

//export const MasterInfo: InvestmentApprovalMasterInfo = {
  // psidDetail: {
  //   groupName: '80C',
  //   section: 'LIC',
  //   type: 'Master',
  //   psid: '21051254345345345',
  //   dateOfSubmission: new Date(2021, 5, 4),
  //   proofSubmissionStatus: 'Submitted',
  // },
  // masterDetail: {
  //   masterId: 1,
  //   employeeMasterId: 1,
  //   institutionName: 'LIC',
  //   policyNo: '123554',
  //   policyholdername: 'Vihan',
  //   relationship: 'Son',
  //   policyStartDate: new Date(2020, 1, 1),
  //   policyEndDate: new Date(2045, 1, 1),
  //   proofSubmissionId: '12343',
  //   masterStatus: 'Submitted',
  //   paymentDetailList: PaymentDetails,
  //   documentDetailList: DocumentDetails,
  // },
//};
