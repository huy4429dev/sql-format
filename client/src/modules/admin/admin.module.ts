import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { AdminComponent } from './admin.component';
import { AdminService } from './admin.service';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    FormsModule,
  ],
  declarations: [AdminComponent],
  providers: [AdminService]
})
export class AdminModule { }
