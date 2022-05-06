import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit, NgZone, HostListener } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { ServerRequestsService } from './services/server-requests.service';
import { DOCUMENT } from '@angular/common';
import { WindowRefService } from './services/window-ref.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MessagingService } from './services/messaging.service';
import { v4 as uuidv4 } from 'uuid';

declare var $:any;
declare var window:any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy{

  LeftMainMenuItemsClickable:boolean=true;
  LeftMainMenuIsOpen:boolean=false;
  LargeScreenUniqueID:string='';
  MediumScreenUniqueID:string='';
  SmallScreenUniqueID:string='';
  TinyScreenUniqueID:string='';
  ScreenSize:string='';

  @HostListener('window:resize', ['$event'])
  WindowResize(event: any) {
      if(window.innerWidth>996){
          this.ScreenSize=this.LargeScreenUniqueID;
      }else if(window.innerWidth<995 && window.innerWidth>576){
          this.ScreenSize=this.MediumScreenUniqueID;
      }else if(window.innerWidth<575 && window.innerWidth>275){
          this.ScreenSize=this.SmallScreenUniqueID;
      }else{
          this.ScreenSize=this.TinyScreenUniqueID;
      }
  }
  
  constructor(private messagingService:MessagingService,private router:Router, private cookieService:CookieService,private windowRef:WindowRefService,private translateService:TranslateService, private serverRequests:ServerRequestsService){
      

  }
  
  ngOnInit(){

    

  }

  ngAfterViewInit(){

      this.LargeScreenUniqueID=uuidv4();
      this.LargeScreenUniqueID=this.LargeScreenUniqueID.replace('-','');

      this.MediumScreenUniqueID=uuidv4();
      this.MediumScreenUniqueID=this.MediumScreenUniqueID.replace('-','');

      this.SmallScreenUniqueID=uuidv4();
      this.SmallScreenUniqueID=this.SmallScreenUniqueID.replace('-','');

      this.TinyScreenUniqueID=uuidv4();
      this.TinyScreenUniqueID=this.TinyScreenUniqueID.replace('-','');

      this.WindowResize(null);

      this.serverRequests.GetLoggedInUserDetails().subscribe((response:string)=>{
          //console.log(response);
          this.windowRef.nativeWindow.localStorage.setItem('LoggedUserDetails',response);
      });

      this.serverRequests.GetLanguage().subscribe((response:string)=>{
          let CurrentLanguage:string=$.trim(response);
          $('[data-toggle="tooltip"]').tooltip('dispose');
          this.translateService.setDefaultLang(CurrentLanguage);
          $('select.LanguageSelector').val(CurrentLanguage);
          this.translateService.use(CurrentLanguage);
          this.cookieService.set('Language',CurrentLanguage);
          
          setTimeout(()=>{
            $('select.LanguageSelector').trigger('change');
            $('[data-toggle="tooltip"]').tooltip();
          },100);
      });
  }

  ngOnDestroy(){

  }

  SetCurrentLanguageFromCookie(This:AppComponent){

    let CurrentLanguage:string=this.cookieService.get('Language');
    if(CurrentLanguage==''){
        setTimeout(()=>{
           This.SetCurrentLanguageFromCookie(This);
        },10);
    }else{
        $('[data-toggle="tooltip"]').tooltip('dispose');
        This.translateService.setDefaultLang(CurrentLanguage);
        $('select.LanguageSelector').val(CurrentLanguage);
        This.translateService.use(CurrentLanguage);
        setTimeout(()=>{
          $('[data-toggle="tooltip"]').tooltip();
        },1000);
    }

  }

  DirectToAuthorsPage(EventArgs:any){
      //this.router.navigate(['/authors']);
  }

  DirectToProductsPage(EventArgs:any){

    if(this.LeftMainMenuItemsClickable){
        this.LeftMainMenuItemsClickable=false;
        EventArgs.stopPropagation();
        this.router.navigate(['/products']);
        //this.LeftMainMenuIsOpen=!this.LeftMainMenuIsOpen;
        this.messagingService.sendMessage(JSON.stringify({ EventName:'LeftMainMenuItemClicked', TimeStamp:Date.now(), ScreenSize:this.ScreenSize }));
        setTimeout(()=>{
          this.LeftMainMenuItemsClickable=true;
        },1000);
        //alert('A');
    }
      
      
  }

  DirectToUsersPage(EventArgs:any){
      this.router.navigate(['/users']);
  }

  DirectToDashboardPage(EventArgs:any){
      if(this.LeftMainMenuItemsClickable){
        
          this.LeftMainMenuItemsClickable=false;
          EventArgs.stopPropagation();
          this.router.navigate(['/default']);
          //this.LeftMainMenuIsOpen=!this.LeftMainMenuIsOpen;
          this.messagingService.sendMessage(JSON.stringify({ EventName:'LeftMainMenuItemClicked', TimeStamp:Date.now(), ScreenSize:this.ScreenSize }));
          setTimeout(()=>{
            this.LeftMainMenuItemsClickable=true;
          },1000);
      }
  }

  MenuOpenClose(MenuIsOpen:boolean){
      this.LeftMainMenuIsOpen=MenuIsOpen;
  }

}
