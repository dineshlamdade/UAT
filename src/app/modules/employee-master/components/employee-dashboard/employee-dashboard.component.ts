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
       
       

        this.photoService.getImages().then(images => this.images = images);

        this.employeeDashboardService.getThoughtOfTheDay().subscribe(res => 
            { this.thoughtOfTheDay = res.data.results;   
            console.log('Thouht of the Day ',this.thoughtOfTheDay)         
            })

            this.employeeDashboardService.getNewJoineeData().subscribe(res => {
                this.newJoineeData = res.data.results;   
                console.log('new Joinee Data ',this.newJoineeData)         
                })
            
                this.employeeDashboardService.getWorkAnniversaryData().subscribe(res => {
                    this.workAnniversaryData = res.data.results;   
                    console.log('work Anniversary Data ',this.workAnniversaryData)         
                    })

                    this.employeeDashboardService.getBirthdayData().subscribe(res => {
                        this.birthdayData = res.data.results;   
                        console.log('Birthday Data ',this.birthdayData)         
                        })

               //https://dev.deliziahr.com:8082/hrms/v1/thought-ofthe-day/message
              //https://localhost:8082/hrms/v1/employee-offical/new-joinee
             // https://localhost:8082/hrms/v1/employee-offical/work-anniversary
            //  https://localhost:8082/hrms/v1/employee-offical/birthday

   }
 
  
}
