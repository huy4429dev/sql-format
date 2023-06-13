import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RecipeComponent } from './recipe.component';
import { RecipeService } from './recipe.service';
import { RecipeRoutingModule } from './recipe-routing.module';
import { SharedModule } from 'shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditItemComponent } from './edit/edit.component';
import { HistoryItemComponent } from './list-history/history.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RecipeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],
  declarations: [RecipeComponent, ListComponent, CreateComponent, EditItemComponent, HistoryItemComponent],
  providers: [RecipeService]
})
export class RecipeModule { }
