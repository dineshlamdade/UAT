import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class EducationSkillsInformationService {

  constructor(private httpClient: HttpClient) { }

  // Education API calls
  postEducationInfoForm(employeeEducationRequestModel) {

    return this.httpClient.post(environment.baseUrl8082 + '/education-skill-details/education', employeeEducationRequestModel, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  putEducationInfoForm(employeeEducationRequestModel) {

    return this.httpClient.put(environment.baseUrl8082 + '/education-skill-details/education/' + employeeEducationRequestModel.employeeEducationID, employeeEducationRequestModel, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getAllEducationSummary(employeeMasterId) {

    return this.httpClient.get(environment.baseUrl8082 + '/education-skill-details/education/employee-master/' + employeeMasterId, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  deleteEducationGridItem(deleteEducationId) {

    return this.httpClient.delete(environment.baseUrl8082 + '/education-skill-details/education/' + deleteEducationId, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  // Language API calls
  postLanguageInfoForm(employeeLanguageRequestModel) {

    return this.httpClient.post(environment.baseUrl8082 + '/education-skill-details/language', employeeLanguageRequestModel, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  putLanguageInfoForm(employeeLanguageRequestModel) {

    return this.httpClient.put(environment.baseUrl8082 + '/education-skill-details/language/' + employeeLanguageRequestModel.employeeLanguageinfoId, employeeLanguageRequestModel, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getAllLanguageSummary(employeeMasterId) {

    return this.httpClient.get(environment.baseUrl8082 + '/education-skill-details/language/employee-master/' + employeeMasterId, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  deleteLanguageGridItem(deleteLanguageId) {

    return this.httpClient.delete(environment.baseUrl8082 + '/education-skill-details/language/' + deleteLanguageId, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }


  // Skills API calls
  postSkillsInfoForm(SkillsInformation) {

    return this.httpClient.post(environment.baseUrl8082 + '/education-skill-details/skill', SkillsInformation, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  putSkillsInfoForm(SkillsInformation) {

    return this.httpClient.put(environment.baseUrl8082 + '/education-skill-details/skill/' + SkillsInformation.employeeSkillInfoId, SkillsInformation, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getAllSkillsSummary(employeeMasterId) {

    return this.httpClient.get(environment.baseUrl8082 + '/education-skill-details/skill/employee-master/' + employeeMasterId, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  deleteSkillsGridItem(deleteSkillId) {

    return this.httpClient.delete(environment.baseUrl8082 + '/education-skill-details/skill/' + deleteSkillId, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getEducationList() {

    return this.httpClient.get(environment.baseUrl8082 + '/education/coursename', { headers: { 'X-TenantId': 'PaysquareGlobal' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getLanguagesList() {

    return this.httpClient.get(environment.baseUrl8082 + '/language-information/name', { headers: { 'X-TenantId': 'PaysquareGlobal' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getSkillsList() {

    return this.httpClient.get(environment.baseUrl8082 + '/skill-information/name', { headers: { 'X-TenantId': 'PaysquareGlobal' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }


  // Certificates API calls
  postCertificateInfoForm(employeeCertificateRequestModel) {

    return this.httpClient.post(environment.baseUrl8082 + '/education-skill-details/certificate', employeeCertificateRequestModel, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  putCertificateInfoForm(employeeCertificateRequestModel) {

    return this.httpClient.put(environment.baseUrl8082 + '/education-skill-details/certificate/' + employeeCertificateRequestModel.employeeCertificateId, employeeCertificateRequestModel, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getAllCertificateSummary(employeeMasterId) {

    return this.httpClient.get(environment.baseUrl8082 + '/education-skill-details/certificate/employee-master/' + employeeMasterId, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getCertificateById(employeeCertificateId) {

    return this.httpClient.get(environment.baseUrl8082 + '/education-skill-details/certificate/' + employeeCertificateId, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getAllCertificates() {

    return this.httpClient.get(environment.baseUrl8083 + '/certificate-master/details', { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getAllCertificateMapping() {

    return this.httpClient.get(environment.baseUrl8083 + '/certificate-master-mapping/details/', { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }
}
