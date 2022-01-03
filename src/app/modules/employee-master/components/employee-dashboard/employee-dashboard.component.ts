import { Component, OnInit } from '@angular/core';
import { EmployeeDashboardService } from './employee-dashboard.service';
import { GalleryService } from './gallery.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {

  images: any[];
    thoughtOfTheDay: any;
    newJoineeData: any;
    birthdayData: any;
    workAnniversaryData: any;
    display: boolean;

    constructor(private photoService: GalleryService,
        private employeeDashboardService: EmployeeDashboardService) { }



    responsiveOptions:any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];
    ngOnInit() {
       
       

        //this.photoService.getImages().then(images => this.images = images);
//Thought Of the Day API
        this.employeeDashboardService.getThoughtOfTheDay().subscribe(res =>   {
        this.thoughtOfTheDay = res.data.results[0].quote;    
        })
// new joinee API 
        this.employeeDashboardService.getNewJoineeData().subscribe(res => {
        this.newJoineeData = res.data.results;      
        console.log('newJoineeData Daata',this.newJoineeData);
     })
        //anniversary API     
        this.employeeDashboardService.getWorkAnniversaryData().subscribe(res => {
        this.workAnniversaryData = res.data.results;    
        console.log('workAnniversaryData Daata',this.workAnniversaryData); 
        })
//birthday API
        this.employeeDashboardService.getBirthdayData().subscribe(res => {
        this.birthdayData = res.data.results;
        console.log('birthday Daata',this.birthdayData);    
        })
   } 
}
