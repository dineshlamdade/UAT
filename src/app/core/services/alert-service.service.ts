import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
declare const $: any;

@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {

  returnValue: boolean;
  constructor(private router: Router,
    ) { }

sweetalert7(message:any) {
        Swal.fire({
        text: message,
        })
    }

    sweetalertWarning(message:any) {
        Swal.fire({
            title: message,
            showCloseButton: true,
            showCancelButton: false,
            toast:true,
            position:'top-end',
            showConfirmButton:false,
            background:'#e68a00',
            icon:'warning',
            timer: 15000,
            timerProgressBar: true,
        })
    }

    sweetalertInfo(message:any) {
        Swal.fire({
            title: message,
            showCloseButton: true,
            showCancelButton: false,
            toast:true,
            position:'top-end',
            showConfirmButton:false,
            icon:'info',
            timer: 15000,
            timerProgressBar: true,
        })
    }

    sweetalertMasterSuccess(message:any, text:any) {
        Swal.fire({
            title: message,
            text: text,
            showCloseButton: true,
            showCancelButton: false,
            toast:true,
            position:'top-end',
            showConfirmButton:false,
            icon:'success',
            timer: 15000,
            timerProgressBar: true,
        })
    }

    sweetalertError(message:any) {
        Swal.fire({
            title: message,
            showCloseButton: true,
            showCancelButton: false,
            toast:true,
            position:'top-end',
            showConfirmButton:false,
            icon:'error',
            timer: 15000,
            timerProgressBar: true,
        })
    }

// lert( title: string, type: any, redirectPath: string) {
//   Swal.fire({
//     title: title,
//         buttonsStyling: true,
//        confirmButtonClass: 'btn btn-info',
//        customClass: 'animated tada',
//        type: type,
//   }).then((result) => {
//     if (result.value) {
//        this.router.navigate(['/' + redirectPath + '']);
//     }
//   });
// }

// alertReload( title: string, type: any) {
//   swal({
//     title: title,
//         buttonsStyling: true,
//        confirmButtonClass: 'btn btn-info',
//        customClass: 'animated tada',
//        type: type,
//   }).then((result) => {
//     if (result.value) {
//       window.location.reload();
//     }
//   });
// }

//   showNotification(msg: number, name: string) {
//     const message = ['Welcome to Delezia HR' + ' <br> <b>' + name + '</b> ', '' + ' <b>' + name + '</b> '];
//      $.notify({
//          icon: 'notifications',
//          message: message[msg],
//      }, {
//          type: 'primary',
//          timer: 4000,
//          placement: {
//              from: 'top',
//              align: 'right'
//          },
//          template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
//            // tslint:disable-next-line:max-line-length
//            '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
//            '<i class="material-icons" data-notify="icon">notifications</i> ' +
//            '<span data-notify="title">{1}</span> ' +
//            '<span data-notify="message">{2}</span>' +
//            '<div class="progress" data-notify="progressbar">' +
//              // tslint:disable-next-line:max-line-length
//              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
//            '</div>' +
//            '<a href="{3}" target="{4}" data-notify="url"></a>' +
//          '</div>'
//      });
//    }
alert( title: string, type: any, redirectPath: string) {
    Swal({
      title,
          buttonsStyling: true,
         confirmButtonClass: 'btn btn-info',
         customClass: 'animated tada',
         type,
    }).then((result) => {
      if (result.value) {
         this.router.navigate(['/' + redirectPath + '']);
      }
    });
  }

  alertReload( title: string, type: any) {
    Swal({
      title,
          buttonsStyling: true,
         confirmButtonClass: 'btn btn-info',
         customClass: 'animated tada',
         type,
    }).then((result) => {
      if (result.value) {
        window.location.reload();
      }
    });
  }

    showNotification(msg: number, name: string) {
      const message = ['Welcome to EHR India' + ' <br> <b>' + name + '</b> ', '' + ' <b>' + name + '</b> '];
      $.notify({
           icon: 'notifications',
           message: message[msg],
       }, {
           type: 'primary',
           timer: 4000,
           placement: {
               from: 'top',
               align: 'right',
           },
           template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
             // tslint:disable-next-line:max-line-length
             '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
             '<i class="material-icons" data-notify="icon">notifications</i> ' +
             '<span data-notify="title">{1}</span> ' +
             '<span data-notify="message">{2}</span>' +
             '<div class="progress" data-notify="progressbar">' +
               // tslint:disable-next-line:max-line-length
               '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
             '</div>' +
             '<a href="{3}" target="{4}" data-notify="url"></a>' +
           '</div>',
       });
     }

}


