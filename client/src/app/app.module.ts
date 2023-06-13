import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app.routes';
import { AppComponent } from './app.component';
import { SharedModule } from './../shared/shared.module';
import { SocialLoginModule, GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';

@NgModule({

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    // StoreModule.forRoot(reducers, {
    //   metaReducers,
    // }),
    // EffectsModule.forRoot([MenusEffects]),
    CoreModule.forRoot(),

    SharedModule,
    SocialLoginModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthHttpInterceptor,
    //   multi: true,
    // },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('956266444628-0b3q38cgpok0j52gkeavos6m120h94i4.apps.googleusercontent.com'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
})
export class AppModule { }
