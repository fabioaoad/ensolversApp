import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {catchError, Observable, of, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ItemsResponse} from "./interfaces/interface";

@Injectable({
  providedIn: 'root'
})
export class EnsolversService {
  private  baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient ) { }



  //Crear ITEMS - POST
  registro( name: string ){
    const url  = `${ this.baseUrl }/auth/newitem`;
    const body = { name };
   // console.log(url);
    return this.http.post( url,body );
  }



  getItems(): Observable<any>{
    const url  = `${ this.baseUrl }/auth/items`;
    return this.http.get<ItemsResponse[]>( url );
  }

  // Recupero un Item
  getItem(id: any): Observable<any>{
    const url  = `${ this.baseUrl }/auth/item/${ id}`;
    return this.http.get<ItemsResponse>( url );
  }

  // Actualiza un item
  updateItem(id: any, body: any): Observable<any>{
    //console.log('id de servicoio',id);
    //console.log('enviar de servicoio',body);
    const url  = `${ this.baseUrl }/auth/update/${ id}`;

    return this.http.put<ItemsResponse>(url,body);
    //return this.http.put<ItemsResponse>();
  }

  // Elimina un item
  deleteItem(id: any): Observable<any>{
    const url  = `${ this.baseUrl }/auth/delete/${ id}`;
    return this.http.delete<ItemsResponse>( url );
  }










}

