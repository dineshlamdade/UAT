import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isFullScreen: boolean;
  public contactTab: boolean;
  public groupTab: boolean;
  public chatTab = true;
  public title: any;
  public userInfo: any;
  public userName: string;
  constructor(private service: AuthService,
              private route: Router) {
    this.title = route.url;
    this.title = this.title.replace(/\//g, '');
    this.title = this.title.toUpperCase();
  }

  public ngOnInit(): void {
    this.userInfo =[]
    this.userInfo = this.service.getprivileges();
    //console.log(this.userInfo);
    this.userName = this.userInfo.UserDetails.userName;
  }

  logout() {
   this.service.logout();
  }
  mToggoleMenu() {
    document.getElementsByTagName('body')[0].classList.toggle('offcanvas-active');
    document.getElementsByClassName('overlay')[0].classList.toggle('open');

  }
  noteToggle() {
    document.getElementsByClassName('sticky-note')[0].classList.toggle('open');
    document.getElementsByClassName('overlay')[0].classList.toggle('open');
  }
  openRightMenu() {
    document.getElementById('rightbar').classList.toggle('open');
    document.getElementsByClassName('overlay')[0].classList.toggle('open');

  }
  openfullScreen() {

    const elem = document.documentElement;
    const methodToBeInvoked = elem.requestFullscreen ||
      elem.requestFullscreen || elem["mozRequestFullscreen"] || elem['msRequestFullscreen'];
    if (methodToBeInvoked) {
      methodToBeInvoked.call(elem);
    }
    this.isFullScreen = true;
  }

  closeFullScreen() {
    const docWithBrowsersExitFunctions = document as Document & {
      mozCancelFullScreen(): Promise<void>;
      webkitExitFullscreen(): Promise<void>;
      msExitFullscreen(): Promise<void>;
    };
    if (docWithBrowsersExitFunctions.exitFullscreen) {
      docWithBrowsersExitFunctions.exitFullscreen();
    } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) { /* Firefox */
      docWithBrowsersExitFunctions.mozCancelFullScreen();
    } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      docWithBrowsersExitFunctions.webkitExitFullscreen();
    } else if (docWithBrowsersExitFunctions.msExitFullscreen) { /* IE/Edge */
      docWithBrowsersExitFunctions.msExitFullscreen();
    }
    this.isFullScreen = false;
  }

  onTab(number) {
    this.chatTab = false;
    this.groupTab = false;
    this.contactTab = false;
    if (number == '1') {
      this.chatTab = true;
    } else if (number == '2') {
      this.groupTab = true;
    } else if (number == '3') {
      this.contactTab = true;
    }
  }

}
