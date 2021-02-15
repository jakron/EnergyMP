import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/resources/auth.service';
import { SecretService } from 'src/app/shared/services/secret.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private secretService: SecretService, private authService: AuthService,
  ) { }

  ngOnInit(): void {

  }
}
