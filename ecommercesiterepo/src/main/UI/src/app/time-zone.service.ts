import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TimeZoneService {
  private baseURL: string = 'http://localhost:8080/api/timezone';

  constructor(private httpClient: HttpClient) {}


  //Method uses the provided base time zone to request time zone conversions from the backend server "/convert" and returns the corresponding time zone values to display on the frontend.
  getConvertedTimes(baseTimeZone: string): Observable<{ [key: string]: string }> {
    return this.httpClient.get<{ [key: string]: string }>(`${this.baseURL}/convert?baseTimeZone=${baseTimeZone}`);
  }
}


