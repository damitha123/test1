import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ServerRequestsService } from 'src/app/services/server-requests.service';
import { WindowRefService } from 'src/app/services/window-ref.service';
import { environment } from 'src/environments/environment';

declare var $:any;
declare var window:any;

@Component({
  selector: 'logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent implements OnInit, AfterViewInit, OnDestroy {

  NameOfTheLoggedInUser:string='';
  UserAvaterSrc:string='';
  UserID:number=0;

  constructor(private windowRef:WindowRefService, private serverRequests:ServerRequestsService) { }

  ngAfterViewInit(): void {
  
    setTimeout(()=>{
        this.CheckWhetherLoggedUserDetailsHaveArrived(this);
    },10);

  }

  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {

  }

  CheckWhetherLoggedUserDetailsHaveArrived(This:LogoutButtonComponent){
    
      let MustCheckAgain:boolean=false;
      let LoggedInUserDetails:any = This.windowRef.nativeWindow.localStorage.getItem('LoggedUserDetails');
      if(LoggedInUserDetails==null){
        MustCheckAgain=true;
      }else{
        if(LoggedInUserDetails==''){
          MustCheckAgain=true;
        }
      }
      if(MustCheckAgain){
        setTimeout(()=>{
            This.CheckWhetherLoggedUserDetailsHaveArrived(This);
        },10);
      }else{
          let LoggedUser=JSON.parse(LoggedInUserDetails.toString());
          This.UserID=LoggedUser.id;
          This.UserAvaterSrc=environment.url+'/resources/img/users/'+This.UserID.toString()+'.face';
          This.NameOfTheLoggedInUser=LoggedUser.name;
      }
  }

  Logout(EventArgs:any){

      this.windowRef.nativeWindow.localStorage.removeItem('Reloaded');

      this.serverRequests.Logout().subscribe((response:string)=>{

          let ResponseText:string=$.trim(response);
          if(ResponseText=='Done'){
              this.windowRef.nativeWindow.localStorage.removeItem('LoggedUserDetails');
              window.location=environment.url+'/public';
          }

      });

  }

}
