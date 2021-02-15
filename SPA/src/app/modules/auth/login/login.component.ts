import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../resources/auth.service';
import { ProgressbarService } from 'src/app/shared/services/progressbar.service';
import { AlertService } from 'ngx-alerts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private progressService: ProgressbarService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onSubmit(f: NgForm) {
    this.alertService.info('Check login information');
    this.progressService.startLoading();
    const loginObserver = {
      next: (x) => {
        this.progressService.setSuccess();
        this.alertService.success('Welcome  ' + x.userName);
        localStorage.setItem('token', x.access_token);
        console.log('localStorage userToken', localStorage.getItem('token'));
        this.router.navigate(['/public']);
        this.progressService.completeLoading();
      },
      error: (err) => {
        this.progressService.setFailure();
        console.log(err);
        this.alertService.danger('Unable to Login');
        this.progressService.completeLoading();
      },
    };
    // this.authService.login(f.value).subscribe(loginObserver);
    this.authService.userAuthentication(f.value.email, f.value.password).subscribe(loginObserver);
  }
}
