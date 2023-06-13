import { NgModule, ModuleWithProviders } from '@angular/core';

// Components:
import { LoadingComponent } from './components/loading/loading.component';

// Pipes:
import { UppercasePipe } from './pipes/uppercase.pipe';
import { Header } from './theme/header/header';
import { Footer } from './theme/footer/footer';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HighlightSearch } from './pipes/highlight-text.pipe';
import { NotifyComponent } from './components/notify/notify.component';
import { PopupDeleteComponent } from './components/popup-delete/popup-delete.component';
import { MenuPaginationComponent } from './components/menu-pagination/menu-pagination.component';
import {CdkMenuModule} from '@angular/cdk/menu';
import { BulkDeletePopupComponent } from './components/bulk-delete-popup/bulk-delete-popup.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      CdkMenuModule
    ],
    declarations: [
        Header,
        Footer,
        LoadingComponent,
        NotifyComponent,
        UppercasePipe,
        HighlightSearch,
        PopupDeleteComponent,
        MenuPaginationComponent,
        BulkDeletePopupComponent,
    ],
    exports: [
        Header,
        Footer,
        LoadingComponent,
        NotifyComponent,
        UppercasePipe,
        HighlightSearch,
        PopupDeleteComponent,
        MenuPaginationComponent
    ]
})
export class SharedModule {}
