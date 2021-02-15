import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ManagerComponent } from './pages/manager/manager.component';
import { PublicComponent } from './pages/public/public.component';
import { AuthGuard } from './modules/auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'admin', component: AdminComponent },
  // { path: 'manager', component: ManagerComponent },
  { path: 'public', component: PublicComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
