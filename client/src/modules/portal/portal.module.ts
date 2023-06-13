import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { PortalComponent } from './portal.component';
import { PortalService } from './portal.service';
import { PortalRoutingModule } from './portal-routing.module';
import { SharedModule } from 'shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocsComponent } from './docs/docs.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PortalRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleSigninButtonModule
  ],
  declarations: [PortalComponent, DocsComponent, HeaderComponent, FooterComponent, HomeComponent, LoginComponent, RegisterComponent],
  providers: [PortalService]
})
export class PortalModule { }
