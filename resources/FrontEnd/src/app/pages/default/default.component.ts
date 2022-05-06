import { AfterViewInit, Component, OnDestroy, OnInit, NgZone } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessagingService } from 'src/app/services/messaging.service';

declare var $:any;
declare var window:any;


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit, AfterViewInit, OnDestroy {

  Response:string='';
  MessagingSubscription:any=null;

  constructor(private zone:NgZone, private translateService:TranslateService,private messagingService:MessagingService) { }

  ngAfterViewInit(): void {
      
      this.zone.run(() => {
          //$('.MenuToggler').trigger('click');
      });

      this.MessagingSubscription=this.messagingService.getMessage().subscribe((Message:string)=>{

        if(Message!=''){
          let Message1:any=JSON.parse(Message);
          if(Message1.EventName=='LanguageChanged'){
              if(this.Response!=''){
                this.translateService.get('ThankYou').subscribe((translatedText:string)=>{
                    this.Response=translatedText;
                });
              }
          }
        }

    });
  

  }

  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {

  }

  ChooseToHireMe(EventArgs:any){
      this.translateService.get('ThankYou').subscribe((translatedText:string)=>{
          this.Response=translatedText;
      });
  }

}
