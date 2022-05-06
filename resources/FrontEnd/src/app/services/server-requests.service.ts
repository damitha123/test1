import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class ServerRequestsService {

  constructor(private httpClient:HttpClient) { }

  GetLoggedInUserDetails():Observable<string>{

    let Token:string=$('input[name="_token"]').val();
    let MyHeaders:HttpHeaders=new HttpHeaders();
    MyHeaders.append('X-CSRF-TOKEN',Token);
    MyHeaders.append('Cache-Control','no-cache, must-revalidate, no-store, max-age=0, private');
    let Vvalue:string=(new Date()).getMilliseconds().toString()+(Math.random()).toString()+(Math.random()).toString();
    let MySubject:Subject<string>=new Subject<string>();
    this.httpClient.post(environment.url+'/public/get-logged-in-user-details?v='+Vvalue, null, { responseType:'text', headers:MyHeaders }).subscribe({next:(response:string)=>{
      //console.log(response);
      MySubject.next(response);
    }, error:(err:HttpErrorResponse)=>{
      console.log(err);
    }});

    return MySubject.asObservable();
  }

  Logout():Observable<string>{

    let Token:string=$('input[name="_token"]').val();
    let MyHeaders:HttpHeaders=new HttpHeaders();
    MyHeaders.append('X-CSRF-TOKEN',Token);
    let Vvalue:string=(new Date()).getMilliseconds().toString();
    let MySubject:Subject<string>=new Subject<string>();
    this.httpClient.post(environment.url+'/public/logout', null, { responseType:'text', headers:MyHeaders }).subscribe({next:(response:string)=>{
      MySubject.next(response);
    }, error:(err:HttpErrorResponse)=>{
      console.log(err);
    }});

    return MySubject.asObservable();
  }

  LanguageChanged(NewLanguage:string):Observable<string>{

    let Token:string=$('input[name="_token"]').val();
    let MyHeaders:HttpHeaders=new HttpHeaders();
    MyHeaders.append('X-CSRF-TOKEN',Token);
    let Vvalue:string=(new Date()).getMilliseconds().toString();
    let MySubject:Subject<string>=new Subject<string>();
    this.httpClient.post(environment.url+'/public/language-changed', { Language:NewLanguage }, { responseType:'text', headers:MyHeaders }).subscribe({next:(response:string)=>{
      MySubject.next(response);
    }, error:(err:HttpErrorResponse)=>{
      console.log(err);
    }});

    return MySubject.asObservable();
  }

  GetLanguage():Observable<string>{

    let Token:string=$('input[name="_token"]').val();
    let MyHeaders:HttpHeaders=new HttpHeaders();
    MyHeaders.append('X-CSRF-TOKEN',Token);
    let Vvalue:string=(new Date()).getMilliseconds().toString();
    let MySubject:Subject<string>=new Subject<string>();
    this.httpClient.get(environment.url+'/public/get-language?v='+Vvalue, { responseType:'text', headers:MyHeaders }).subscribe({next:(response:string)=>{
      MySubject.next(response);
    }, error:(err:HttpErrorResponse)=>{
      console.log(err);
    }});

    return MySubject.asObservable();
  }

  GetAllProducts():Observable<string>{

    let Token:string=$('input[name="_token"]').val();
    let MyHeaders:HttpHeaders=new HttpHeaders();
    MyHeaders.append('X-CSRF-TOKEN',Token);
    let Vvalue:string=(new Date()).getMilliseconds().toString();
    let MySubject:Subject<string>=new Subject<string>();
    this.httpClient.get(environment.url+'/public/get-all-products?v='+Vvalue, { responseType:'text', headers:MyHeaders }).subscribe({next:(response:string)=>{
      MySubject.next(response);
    }, error:(err:HttpErrorResponse)=>{
      console.log(err);
    }});

    return MySubject.asObservable();
  }

  GetProducts(Options:any):Observable<string>{

    let Token:string=$('input[name="_token"]').val();
    let MyHeaders:HttpHeaders=new HttpHeaders();
    MyHeaders.append('X-CSRF-TOKEN',Token);
    let Vvalue:string=(new Date()).getMilliseconds().toString();
    let MySubject:Subject<string>=new Subject<string>();
    this.httpClient.post(environment.url+'/public/get-products', { Options: Options }, { responseType:'text', headers:MyHeaders }).subscribe({next:(response:string)=>{
      MySubject.next(response);
    }, error:(err:HttpErrorResponse)=>{
      console.log(err);
    }});

    return MySubject.asObservable();
  }

}
