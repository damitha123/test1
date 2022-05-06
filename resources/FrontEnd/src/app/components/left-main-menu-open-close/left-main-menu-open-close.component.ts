import { Component, OnInit, EventEmitter, Output, Input, NgZone } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Subscription } from 'rxjs';
import { MessagingService } from 'src/app/services/messaging.service';

declare var $:any;
declare var window:any;

@Component({
  selector: 'left-main-menu',
  templateUrl: './left-main-menu-open-close.component.html',
  styleUrls: ['./left-main-menu-open-close.component.scss']
})
export class LeftMainMenuOpenCloseComponent implements OnInit {

  MessagingServiceSubscription:any=null;
  private LeftMainMenuIsOpenSubject = new Subject<boolean>();
  @Input('LeftMainMenuIsOpen') LeftMainMenuIsOpen:boolean=false;
  @Output() MenuOpenClose = new EventEmitter<boolean>();
  MenuIsOpen:boolean=false;
  LastTimeStamp:number=Date.now();
  LastTimeStampInitialized:boolean=false;
  @Input('UniqueID') UniqueID:string='';
  

  constructor(private zone:NgZone,private messagingService:MessagingService,private translateService:TranslateService) { }

  ngOnInit(){

  }

  ngAfterViewInit(){

      

      

      this.AddMessagingSubscription();

      /* this.LeftMainMenuIsOpenSubject.subscribe((LeftMenuIsOpen:boolean)=>{
          if(this.LeftMainMenuIsOpen!=LeftMenuIsOpen){
            //this.LeftMainMenuIsOpen=LeftMenuIsOpen;
            this.ToggleMenu(null);
          }
          
      }); */
    
  }

  AddMessagingSubscription(){

    this.MessagingServiceSubscription=this.messagingService.getMessage().subscribe((Message:string)=>{

      if(Message!=''){
          
          let Message1=JSON.parse(Message);
          if(Message1.EventName=='LeftMainMenuItemClicked'){

            //this.MessagingServiceSubscription.unsubscribe();
            if(!this.LastTimeStampInitialized){
              this.LastTimeStamp=Date.now();
              this.LastTimeStampInitialized=true;
              let buttons = $('.MenuToggler');
              
              if(buttons.length>0){
                
                $.each(buttons,(i:number,v:any)=>{
                  
                  if($(v).css('display')!='none'&&$($(v).parent().parent().parent().prev()).val()==Message1.ScreenSize){
                      //alert($($(v).parent().parent().parent().prev()).val());
                      $(v).trigger('click');
                  }
                  //alert($($(v).parent().parent().parent().prev()).val());
                });
                
              }
              
              
            }else{
              let TimeStamp:number=Message1.TimeStamp;
              let diff =  Math.abs(TimeStamp-this.LastTimeStamp);
              let milliseconds = diff; 
              if(milliseconds>1000){
                  let buttons = $('.MenuToggler');
                  
                  if(buttons.length>0){
                    
                    $.each(buttons,(i:number,v:any)=>{
                      if($(v).css('display')!='none'&&$($(v).parent().parent().parent().prev()).val()==Message1.ScreenSize){
                          //alert($($(v).parent().parent().parent().prev()).val());
                          $(v).trigger('click');
                      }
                      //alert($($(v).parent().parent().parent().prev()).val());
                    });
                    
                  }
                  
                  
                  this.LastTimeStamp=Date.now();
                  
                  //alert('');
                  
              }
            }
            /* setTimeout(()=>{
              this.AddMessagingSubscription();
            },100); */
            
            
          }else if(Message1.EventName=="LeftMenuOpened"){
            this.MenuIsOpen=true;
          }else if(Message1.EventName=="LeftMenuClosed"){
            this.MenuIsOpen=false;
          }
      }
      
  });

  }

  ngOnDestroy(){
      if(this.MessagingServiceSubscription!=null){
          this.MessagingServiceSubscription.unsubscribe();
      }
  }

  ToggleMenu(EventArgs:any){

        this.zone.run(()=>{

            if(EventArgs!=null){
                EventArgs.stopPropagation();
            }

            if(!this.LastTimeStampInitialized){
                this.LastTimeStamp=Date.now();
                this.LastTimeStampInitialized=true;
            }
            

            $('button[data-toggle="tooltip"]').tooltip('dispose');

            if(this.MenuIsOpen){
                $('#InnerLeftMainMenu').css('display','none');
                $('#LeftMainMenu').animate({ width: 0 },'fast',()=>{
                  this.MenuIsOpen=false;
                  if(this.MenuIsOpen){
                    this.messagingService.sendMessage(JSON.stringify({ EventName:'LeftMenuOpened'}));
                  }else{
                    this.messagingService.sendMessage(JSON.stringify({ EventName:'LeftMenuClosed'}));
                  }
                });
                
            }else{
                $('#InnerLeftMainMenu').css('display','unset');
                $('#LeftMainMenu').animate({ width: '274px' },'fast',()=>{
                  this.MenuIsOpen=true;
                  if(this.MenuIsOpen){
                    this.messagingService.sendMessage(JSON.stringify({ EventName:'LeftMenuOpened'}));
                  }else{
                    this.messagingService.sendMessage(JSON.stringify({ EventName:'LeftMenuClosed'}));
                  }
                });
                
            }

            
            

            //this.MenuOpenClose.emit(this.MenuIsOpen);
            //this.LeftMainMenuIsOpenSubject.next(this.MenuIsOpen);

            setTimeout(()=>{
                $('[data-toggle="tooltip"]').tooltip();
                
            },10);


        });

        
  }



}
