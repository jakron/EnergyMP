import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { ProgressbarService } from 'src/app/shared/services/progressbar.service';
import { AuthService } from '../resources/auth.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
})
export class ConfirmEmailComponent implements OnInit {
  emailConfirmed = false;
  urlParams: any = {};

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    public progressBar: ProgressbarService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.urlParams.token = this.route.snapshot.queryParamMap.get('token');
    this.urlParams.userid = this.route.snapshot.queryParamMap.get('userid');
    this.confirmEmail();
  }

  confirmEmail() {

  }
}
