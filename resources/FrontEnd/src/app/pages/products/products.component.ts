import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnDestroy, OnInit, NgZone } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  
}


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('void', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('*', style({height: '*', visibility: 'visible'})),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ProductsComponent implements  AfterViewInit {

    
    constructor(private messagingService:MessagingService,private cookieService:CookieService,private serverRequests:ServerRequestsService, private zone:NgZone,private dateAdapter: DateAdapter<any>) { }

    ngAfterViewInit(): void {

        
    }
}
