import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
public token: any;
public userName: string;
  constructor(private authService: AuthService) { }

  public ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0].classList.add('offcanvas-active');
    this.token = this.authService.getprivileges();
    // console.log(this.token)
    this.userName = this.token.UserDetails.userName;
    const expiryDate = (new Date(this.token.exp * 1000));
    const initalDate = (new Date(this.token.iat * 1000));
    // console.log(expiryDate);
    // console.log(initalDate);

  }

}
