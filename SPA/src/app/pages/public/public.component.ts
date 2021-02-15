import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/resources/auth.service';
import { IUser } from 'src/app/modules/auth/resources/IUser';
import { SecretService } from 'src/app/shared/services/secret.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {
  constructor(private secretService: SecretService, private authService: AuthService) { }

  data: IUser[] = [];
  email: string;
  page = 1;
  pageSize = 3;
  columns: string[] = ['Id', 'Email', 'UserName'];
  sortedColumn: string;

  ngOnInit(): void {
    this.authService.getUserClaims().subscribe((secrets: any) => {
      console.log(secrets);
      this.data = secrets;
    });
  }
  Search() {
    if (this.email === '') {
      this.ngOnInit();
    } else {
      this.data = this.data.filter(x => {
        return x.Email.toLocaleLowerCase().match(this.email.toLocaleLowerCase());
      });
    }
  }
  onDelete(id) {
    this.authService.deleteUser(id).subscribe((x: any) => {
      console.log('x', x);
      this.data = x;
    });
  }
}
