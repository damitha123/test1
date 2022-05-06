import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { MessagingService } from 'src/app/services/messaging.service';
import { ServerRequestsService } from 'src/app/services/server-requests.service';

declare var $:any;
declare var window:any;

@Component({
  selector: 'language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private messagingService:MessagingService,private cookieService:CookieService,private serverRequests:ServerRequestsService, private translateService:TranslateService) { }

  ngAfterViewInit(): void {
    
    
  }
  ngOnDestroy(): void {
    
    
  }

  ngOnInit(): void {

  }

  LanguageChanged(EventArgs:any){

      let NewLanguage:string=EventArgs.target.value;
      this.serverRequests.LanguageChanged(NewLanguage).subscribe((response:string)=>{
          let ResponseText:string=$.trim(response);
          if(ResponseText=='Done'){
              $('[data-toggle="tooltip"]').tooltip('dispose');
              $('select.LanguageSelector').val(NewLanguage);
              this.translateService.use(NewLanguage);
              this.cookieService.set('Language',NewLanguage);
              this.messagingService.sendMessage(JSON.stringify({ EventName:'LanguageChanged', Language:NewLanguage }));
              setTimeout(()=>{
                $('[data-toggle="tooltip"]').tooltip();
              },500);
              
          }
      });

  }

}
