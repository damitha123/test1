import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnDestroy, OnInit, NgZone } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { CookieService } from 'ngx-cookie-service';
import { MessagingService } from 'src/app/services/messaging.service';
import { ServerRequestsService } from 'src/app/services/server-requests.service';
import { CdkDetailRowDirective } from './cdk-detail-row.directive';

declare var $:any;
declare var window:any;



export interface ProductBasic {
  id:number;
  name: string;
  authors: any[];
  date: string;
  
}


@Component({
  selector: 'app-products1',
  templateUrl: './products1.component.html',
  styleUrls: ['./products1.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('void', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('*', style({height: '*', visibility: 'visible'})),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class Products1Component implements OnInit, AfterViewInit, OnDestroy {

    MessagingSubscription:any=null;
    GetAllProductsSubscription:any=null;
    displayedColumns: string[] = ['name', 'date','expandCollapse'];
    products:ProductBasic[]=[];
    NameValue:string='';
    DateValue:string=(new Date()).toISOString().split('T')[0];
    AuthorValue:string='';
    NameType:string='NotFiltered';
    DateType:string='NotFiltered';
    AuthorType:string='NotFiltered';
    CurrentPage:number=1;
    StartDate:Date=new Date(2021, 1, 15);
    EndDate:Date=new Date(2021, 1, 25);
    TotalRows:number=0;
    TotalPages:number=0;
    //singleChildRowDetail!: CdkDetailRowDirective;
     

    constructor(private messagingService:MessagingService,private cookieService:CookieService,private serverRequests:ServerRequestsService, private zone:NgZone,private dateAdapter: DateAdapter<any>) { }

    ngAfterViewInit(): void {

        let Language:string=this.cookieService.get('Language');
        if(Language=='en'){
          this.dateAdapter.setLocale('en-US');
        }else{
          this.dateAdapter.setLocale('zh-CN');
        }
        
        this.MessagingSubscription=this.messagingService.getMessage().subscribe((Message:string)=>{

            if(Message!=''){
              let Message1:any=JSON.parse(Message);
              if(Message1.EventName=='LanguageChanged'){
                if(Message1.Language=='en'){
                  this.dateAdapter.setLocale('en-US');
                }else{
                  this.dateAdapter.setLocale('zh-CN');
                }
              }
            }

        });
      
        this.zone.run(() => {
            //$('.MenuToggler').trigger('click');
        });

        this.GetData();

        $(".LettersOnly").alpha({
          allowUpper    : true,
          allowLower    : true,
          allowCaseless : false
        });

        $(".IsoDate").alphanum({
          allow :    '-', 
          allowUpper    : false,
          disallow : 'abcdefghijklmnopqrstuvwxyz'
        });  

    }

    ngOnDestroy(): void {
        if(this.GetAllProductsSubscription!=null){
            this.GetAllProductsSubscription.unsubscribe();
        }
    }

    ngOnInit(): void {

    }

    ApplyClicked(EventArgs:any){

          this.CurrentPage=1;

          this.GetData();

    }

    GetData(){

      let Options = { Page:this.CurrentPage, NameType:this.NameType, NameValue:this.NameValue, DateType:this.DateType, DateValue:this.DateValue, StartDate:this.StartDate, EndDate:this.EndDate, AuthorType:this.AuthorType, AuthorValue:this.AuthorValue };
        
      if(this.GetAllProductsSubscription!=null){
          this.GetAllProductsSubscription.unsubscribe();
      }
      this.GetAllProductsSubscription=this.serverRequests.GetProducts(Options).subscribe((response:string)=>{
            
        if(response!=''){
          let Response=$.parseJSON(response);
                this.TotalRows=Response.TotalRows;
                this.TotalPages=Math.ceil(this.TotalRows/10);
                let Products=Response.Data;
                let Products1=$.map(Products,(el:any)=>{
                    let AuthorsArray:any[]=el.authors;
                    /* let Authors:string='';
                    $.each(AuthorsArray,(k:number,v:any)=>{
                      if(Authors==''){
                        Authors=v.name;
                      }else{
                        Authors+='<br/>'+v.name;
                      }
                    }); */
                    return { id:el.id, type:'master', name:el.name, close:false, authors:el.authors, date:(new Date(el.date)).toISOString().split('T')[0] };
                });
                let Products2:any[]=[];
                $.each(Products1,(k:number,v:any)=>{
                  Products2.push(v);
                  v.type='child';
                  v.expanded=false;
                  Products2.push(v);
                });
                this.products=Products2;        }
        
        
    });

    }

    PageChanged(EventArgs:any){
        //console.log(EventArgs);
        //alert(EventArgs.pageIndex);
        this.CurrentPage=EventArgs.pageIndex+1;
        this.GetData();
    }

    /* private openedRow: CdkDetailRowDirective|any;
    onToggleChange(cdkDetailRow: CdkDetailRowDirective,row: any) : void {
      
      if (this.singleChildRowDetail && this.openedRow && this.openedRow.expanded) {
        this.openedRow.toggle();      
      }
      
  
      if(!row.close)
      {
          row.close = true;
      } else
      { 
          row.close = false;
      }
      this.openedRow = cdkDetailRow.expanded ? cdkDetailRow : undefined;
    }
 */
}
