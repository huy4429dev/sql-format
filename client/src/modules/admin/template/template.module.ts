import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { TemplateComponent } from './template.component';
import { TemplateService } from './template.service';
import { TemplateRoutingModule } from './template-routing.module';
import { SharedModule } from 'shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditItemComponent } from './edit/edit.component';
import { HistoryItemComponent } from './list-history/history.component';
import { TemplateDropdownComponent } from './template-dropdown/template-dropdown.component';
import { CdkMenuModule } from '@angular/cdk/menu';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TemplateRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MonacoEditorModule.forRoot(),
    NgxPaginationModule,
    CdkMenuModule
  ],
  declarations: [TemplateComponent, ListComponent, CreateComponent, EditItemComponent, HistoryItemComponent, TemplateDropdownComponent],
  providers: [TemplateService]
})
export class TemplateModule { }
