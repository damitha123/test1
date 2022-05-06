import { AfterViewInit, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { CookieService } from 'ngx-cookie-service';
import { MessagingService } from 'src/app/services/messaging.service';
import { ServerRequestsService } from 'src/app/services/server-requests.service';

declare var $:any;
declare var window:any;



export interface ProductBasic {
  id:number;
  name: string;
  authors: any[];
  date: string;
  type:string;
  expanded:boolean|any;
}

@Component({
  selector: 'products2',
  templateUrl: './products2.component.html',
  styleUrls: ['./products2.component.scss']
})
export class Products2Component implements OnInit, AfterViewInit, OnDestroy {

    MessagingSubscription:any=null;
    GetAllProductsSubscription:any=null;
    displayedColumns: string[] = ['name', 'date','authors'];
    products:any[]=[];
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

    constructor(private messagingService:MessagingService,private cookieService:CookieService,private serverRequests:ServerRequestsService, private zone:NgZone,private dateAdapter: DateAdapter<any>) { }

    ngOnInit(): void {

    }

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
                let No:number=0;
                let Products1:any[]=$.map(Products,(el:any)=>{
                    let AuthorsArray:any[]=el.authors;
                    let No1:number=0;
                    $.each(AuthorsArray,(k:number,v:any)=>{
                      v.no=No1;
                      No1++;
                    });
                    el.authors=AuthorsArray;
                    No++;
                    return { id:el.id, no:No, type:'master', expanded:false, name:el.name, close:false, authors:el.authors, date:(new Date(el.date)).toISOString().split('T')[0] };
                });
                let Products2:any[]=[];
                
                $.each(Products1,(k:number,v:any)=>{
                  Products2.push(v);
                  let V={ id:''+v.id+'x', no:v.no, type:'child', expanded:false, name:v.name, close:false, authors:v.authors, date:(new Date(v.date)).toISOString().split('T')[0] };;
                  Products2.push(V);
                });
                this.products=Products2;
                //alert(this.products.length+'\n'+this.products[0].name);
            }
          
              
        });

    }

    PageChanged(EventArgs:any){
        //console.log(EventArgs);
        //alert(EventArgs.pageIndex);
        this.CurrentPage=EventArgs.pageIndex+1;
        this.GetData();
    }

    ApplyClicked(EventArgs:any){

        this.CurrentPage=1;

        this.GetData();

    }

    Toggle(ID:number){
        $.each(this.products,(k:number,v:any)=>{
            if(v.id==''+ID+'x'||v.id==ID){
              v.expanded=!v.expanded;
            }
        });
    }
}
