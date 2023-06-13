import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from 'shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditItemComponent } from './edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MonacoEditorModule.forRoot(),
    NgxPaginationModule

  ],
  declarations: [UserComponent, ListComponent, CreateComponent, EditItemComponent],
  providers: [UserService]
})
export class UserModule { }
