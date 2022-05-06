import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

//Pages
import { DefaultComponent } from './pages/default/default.component';
import { ShortPageComponent } from './pages/short-page/short-page.component';
import { LongPageComponent } from './pages/long-page/long-page.component';
//Pages

//Components
import { LeftMainMenuOpenCloseComponent } from './components/left-main-menu-open-close/left-main-menu-open-close.component';

import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
//Components

//Services
import { ServerRequestsService } from './services/server-requests.service';
import { WindowRefService } from './services/window-ref.service';
import { AuthorsComponent } from './pages/authors/authors.component';
import { Products1Component } from './pages/products/products1/products1.component';
import { Products2Component } from './pages/products/products2/products2.component';
import { ProductsComponent } from './pages/products/products.component';
import { UsersComponent } from './pages/users/users.component';
import { MessagingService } from './services/messaging.service';

//Services

import {CdkDetailRowDirective} from './pages/products/products1/cdk-detail-row.directive';

import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { ObserversModule } from '@angular/cdk/observers';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { PortalModule } from '@angular/cdk/portal';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, environment.url + '/resources/FrontEnd/dist/front-end/assets/i18n/', '.json?v='+(new Date()).getMilliseconds());
}

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    ShortPageComponent,
    LongPageComponent,
    LogoutButtonComponent,
    LeftMainMenuOpenCloseComponent,
    LanguageSelectorComponent,
    AuthorsComponent,
    Products1Component,
    Products2Component,
    ProductsComponent,
    UsersComponent,
    CdkDetailRowDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    A11yModule,
    BidiModule,
    ObserversModule,
    OverlayModule,
    PlatformModule,
    PortalModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    AngularMaterialModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
        }
    })
  ],
  providers: [ { provide: MAT_DATE_LOCALE, useValue: 'en-US' }, {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
  {provide: MAT_DATE_FORMATS, useValue: {
    parse: {
      dateInput: 'LL',
    },
    display: {
      dateInput: 'YYYY-MM-DD',
      monthYearLabel: 'YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'YYYY',
    },
  }}, { provide: LocationStrategy, useClass: HashLocationStrategy },ServerRequestsService,WindowRefService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
