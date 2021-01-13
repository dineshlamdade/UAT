import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {
  private copyFromConfirmation = new Subject<any>();
  private UpdateEmployeeId = new Subject<any>();
  private contactFormInitiate = new Subject<any>();
  private identityFormInitiate = new Subject<any>();
  private ClearBirthDate = new Subject<any>();
  private shareCountryData = new Subject<any>();
  private bankFormInitiate = new Subject<any>();
  private PreviousEmploymentInfoInitiate = new Subject<any>();
  private ConfirmDeleteIdentityForm = new Subject<any>();
  private ConfirmDeletePreviousEmpForm = new Subject<any>();
  private EmploymentInfoInitiate = new Subject<any>();
  private JoiningInformationForm = new Subject<any>();
  private ReJoiningInformationForm = new Subject<any>();
  private closeCurrentForm = new Subject<any>();
  private BirthDateToEmploymentForm = new Subject<any>();
  private SubmitTransferExitForm = new Subject<any>();
  private ToEmployeeMaster = new Subject<any>();
  private SelectionEmploymentBoolean = new Subject<any>();
  private EducationSkillsFormInitiate = new Subject<any>();
  private EducationPopupFormSave = new Subject<any>();
  private ConfirmDeleteEducationSkills = new Subject<any>();
  private PayrollAreaFormInitiate = new Subject<any>();
  private PayrollPopupFormSave = new Subject<any>();
  private ConfirmDeletePayrollArea = new Subject<any>();
  private NewPayrollPopupFormSave = new Subject<any>();
  private FamilyFormInitiate = new Subject<any>();
  private FamilyPopupFormSave = new Subject<any>();
  private JobInformationInitiate = new Subject<any>();
  private NextJobTab = new Subject<any>();
  private NextToAssignment = new Subject<any>();
  private AddjoineeSubject = new Subject<any>();
  private JoiningDataSubject = new Subject<any>();
  private ReJoiningDataSubject = new Subject<any>();
  private TransferToDataSubject = new Subject<any>();
  private ExitDataSubject = new Subject<any>();


  constructor() { }

  setCopyFromConfirmation(confirmMsg) {
    this.copyFromConfirmation.next(confirmMsg);
  }

  getCopyFromConfirmation() {
    return this.copyFromConfirmation.asObservable();
  }

  getUpdateEmployeeId(employeeMasterId) {
    this.UpdateEmployeeId.next(employeeMasterId);
  }

  setUpdateEmployeeId() {
    return this.UpdateEmployeeId.asObservable();
  }

  getcontactFormInitiate() {
    this.contactFormInitiate.next();
  }
  setcontactFormInitiate() {
    return this.contactFormInitiate.asObservable();
  }


  getidentityFormInitiate() {
    this.identityFormInitiate.next();
  }
  setidentityFormInitiate() {
    return this.identityFormInitiate.asObservable();
  }

  getClearBirthDate() {
    this.ClearBirthDate.next();
  }
  setClearBirthDate() {
    return this.ClearBirthDate.asObservable();
  }

  getCountryData(country) {
    this.shareCountryData.next(country);
  }
  setCountryData() {
    return this.shareCountryData.asObservable();
  }

  getBankFormInitiate() {
    this.bankFormInitiate.next();
  }
  setBankFormInitiate() {
    return this.bankFormInitiate.asObservable();
  }

  getPreviousEmploymentInfoInitiate() {
    this.PreviousEmploymentInfoInitiate.next();
  }
  setPreviousEmploymentInfoInitiate() {
    return this.PreviousEmploymentInfoInitiate.asObservable();
  }

  getConfirmDeleteIdentityForm() {
    this.ConfirmDeleteIdentityForm.next();
  }
  setConfirmDeleteIdentityForm() {
    return this.ConfirmDeleteIdentityForm.asObservable();
  }

  getConfirmDeletePreviousEmpForm(employee) {
    this.ConfirmDeletePreviousEmpForm.next(employee);
  }
  setConfirmDeletePreviousEmpForm() {
    return this.ConfirmDeletePreviousEmpForm.asObservable();
  }

  getEmploymentInfoInitiate() {
    this.EmploymentInfoInitiate.next();
  }
  setEmploymentInfoInitiate() {
    return this.EmploymentInfoInitiate.asObservable();
  }

  getJoiningInformationForm() {
    this.JoiningInformationForm.next(true);
  }
  setJoiningInformationForm() {
    return this.JoiningInformationForm.asObservable();
  }

  getReJoiningInformationForm() {
    this.ReJoiningInformationForm.next(true);
  }
  setReJoiningInformationForm() {
    return this.ReJoiningInformationForm.asObservable();
  }
  getcloseCurrentForm() {
    this.closeCurrentForm.next(true);
  }
  setcloseCurrentForm() {
    return this.closeCurrentForm.asObservable();
  }
  getBirthDateToEmploymentForm(dateOfBirth) {
    this.BirthDateToEmploymentForm.next(dateOfBirth);
  }
  setBirthDateToEmploymentForm() {
    return this.BirthDateToEmploymentForm.asObservable();
  }

  getSubmitTransferExitForm(transaction) {
    this.SubmitTransferExitForm.next(transaction);
  }
  setSubmitTransferExitForm() {
    return this.SubmitTransferExitForm.asObservable();
  }
  getToEmployeeMaster(selectionBoolean) {
    this.ToEmployeeMaster.next(selectionBoolean);
  }
  setToEmployeeMaster() {
    return this.ToEmployeeMaster.asObservable();
  }
  getSelectionEmploymentBoolean(selectionBoolean) {
    this.SelectionEmploymentBoolean.next(selectionBoolean);
  }
  setSelectionEmploymentBoolean() {
    return this.SelectionEmploymentBoolean.asObservable();
  }

  getEducationSkillsFormInitiate() {
    this.EducationSkillsFormInitiate.next();
  }
  setEducationSkillsFormInitiate() {
    return this.EducationSkillsFormInitiate.asObservable();
  }

  getEducationPopupFormSave(employeeEducationRequestModel) {
    this.EducationPopupFormSave.next(employeeEducationRequestModel);
  }
  setEducationPopupFormSave() {
    return this.EducationPopupFormSave.asObservable();
  }

  getConfirmDeleteEducationSkills(ItemDelete) {
    this.ConfirmDeleteEducationSkills.next(ItemDelete);
  }
  setConfirmDeleteEducationSkills() {
    return this.ConfirmDeleteEducationSkills.asObservable();
  }

  getPayrollAreaFormInitiate() {
    this.PayrollAreaFormInitiate.next();
  }
  setPayrollAreaFormInitiate() {
    return this.PayrollAreaFormInitiate.asObservable();
  }

  getPayrollPopupFormSave(PayrollAreaRequestModel) {
    this.PayrollPopupFormSave.next(PayrollAreaRequestModel);

  }
  setPayrollPopupFormSave() {
    return this.PayrollPopupFormSave.asObservable();
  }

  getNewPayrollPopupFormSave(PayrollAreaRequestModel) {
    this.NewPayrollPopupFormSave.next(PayrollAreaRequestModel);

  }
  setNewPayrollPopupFormSave() {
    return this.NewPayrollPopupFormSave.asObservable();
  }

  getConfirmDeletePayrollArea(confirmMsg) {
    this.ConfirmDeletePayrollArea.next(confirmMsg);
  }
  setConfirmDeletePayrollArea() {
    return this.ConfirmDeletePayrollArea.asObservable();
  }

  getFamilyFormInitiate() {
    this.FamilyFormInitiate.next();
  }
  setFamilyFormInitiate() {
    return this.FamilyFormInitiate.asObservable();
  }

  getFamilyPopupFormSave(array) {
    this.FamilyPopupFormSave.next(array);
  }
  setFamilyPopupFormSave() {
    return this.FamilyPopupFormSave.asObservable();
  }

  getJobInformationInitiate() {
    this.JobInformationInitiate.next();
  }
  setJobInformationInitiate() {
    return this.JobInformationInitiate.asObservable();
  }

  getNextJobTab(jobTab) {
    this.NextJobTab.next(jobTab);
  }
  setNextJobTab() {
    return this.NextJobTab.asObservable();
  }
  getNextToAssignment(assignment){
    this.NextToAssignment.next(assignment);
  }
  setNextToAssignment() {
    return this.NextToAssignment.asObservable();
  }

  getAddjoinee(user){
    this.AddjoineeSubject.next(user);
  }
  setAddjoinee() {
    return this.AddjoineeSubject.asObservable();
  }

  getJoiningData(joinee){
    this.JoiningDataSubject.next(joinee);
  }
  setJoiningData() {
    return this.JoiningDataSubject.asObservable();
  }

  getReJoiningData(rejoinee){
    this.ReJoiningDataSubject.next(rejoinee);
  }
  setReJoiningData() {
    return this.ReJoiningDataSubject.asObservable();
  }

  getTransferToData(TransferTo){
    this.TransferToDataSubject.next(TransferTo);
  }
  setTransferToData() {
    return this.TransferToDataSubject.asObservable();
  }

  getExitData(ExitData){
    this.ExitDataSubject.next(ExitData);
  }
  setExitData() {
    return this.ExitDataSubject.asObservable();
  }
}
