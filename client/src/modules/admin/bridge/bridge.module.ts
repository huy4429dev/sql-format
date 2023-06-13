import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { BridgeComponent } from './bridge.component';
import { BridgeService } from './bridge.service';
import { BridgeRoutingModule } from './bridge-routing.module';
import { SharedModule } from 'shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BridgeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule

  ],
  declarations: [BridgeComponent, ListComponent, CreateComponent],
  providers: [BridgeService]
})
export class BridgeModule { }
