import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimeZoneService } from './time-zone.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    private baseURL: string = 'http://localhost:8080';
    public timeZones: { [key: string]: string } = {}; // Declare timeZones property
    welcomeMessages: { [language: string]: string } = {}; // Object to store welcome messages by language
    private getUrl: string = this.baseURL + '/room/reservation/v1/';
    private postUrl: string = this.baseURL + '/room/reservation/v1';
    public submitted!: boolean;
    roomsearch!: FormGroup;
    rooms!: Room[];
    request!: ReserveRoomRequest;
    currentCheckInVal!: string;
    currentCheckOutVal!: string;

  constructor(
    private httpClient: HttpClient,
    private timeZoneService: TimeZoneService // Inject the timezone service here
  ) {}

  ngOnInit() {
        this.roomsearch = new FormGroup({
            checkin: new FormControl(' '),
            checkout: new FormControl(' '),
        });

        // Calls the API
        this.getWelcomeMessage();

        const roomsearchValueChanges$ = this.roomsearch.valueChanges;

        roomsearchValueChanges$.subscribe(x => {
            this.currentCheckInVal = x.checkin;
            this.currentCheckOutVal = x.checkout;
        });

      // BasedTimeZone is currently defaulted on LA America Time
      this.fetchConvertedTimes('America/Los_Angeles');
    }

  // Call the service to fetch time zone conversions
  fetchConvertedTimes(baseTimeZone: string): void {
    this.timeZoneService.getConvertedTimes(baseTimeZone).subscribe(
      (response) => {
        console.log('Time zone conversions:', response);
        this.timeZones = response; // Store the seperate time zones into response
      },
      (error) => {
        console.error('Error fetching time zones:', error);
      }
    );
  }



  // welcome message method calling the API
    getWelcomeMessage(): void {
        this.httpClient.get<any>(`${this.baseURL}/welcomemessage`).subscribe(
            (response) => {
                console.log('Welcome message API Response:', response);
                this.welcomeMessages = response;
            },
            (error) => {
                console.error('Error fetching welcome message:', error);
            }
        );
    }

    reserveRoom(value: string) {
        this.request = new ReserveRoomRequest(value, this.currentCheckInVal, this.currentCheckOutVal);
        this.createReservation(this.request);
    }

    createReservation(body: ReserveRoomRequest) {
        const bodyString = JSON.stringify(body); // Stringify payload
        const options = {
            headers: new HttpHeaders().append('key', 'value'),
        };

        this.httpClient.post(this.postUrl, body, options)
            .subscribe(res => console.log(res));
    }

    onSubmit({ value, valid }: { value: Roomsearch; valid: boolean }) {
        if (valid) {
            this.getAll().subscribe(response => {
                if (response && Array.isArray(response.content)) {
                    this.rooms = response.content;  // Assign the rooms array directly
                    console.log('Rooms:', this.rooms);
                } else {
                    console.error('Expected rooms array in "content response" but got:', response);
                }
            });
        } else {
            console.error('Form is not valid!');
        }
    }

    getAll(): Observable<any> {
        const reservationRequest = this.httpClient.get(
            this.baseURL + '/room/reservation/v1?checkin=' + this.currentCheckInVal + '&checkout=' + this.currentCheckOutVal,
            { responseType: 'json' }
        );

        return reservationRequest;
    }


    objectValues(obj: any): string[] {
        return Object.values(obj);
    }
}

// blocked out code

/*
var ROOMS: Room[]=[
  {
    "id": "13932123",
    "roomNumber" : "409",
    "price" :"20",
    "links" : ""
  },
  {
    "id": "139324444",
    "roomNumber" : "509",
    "price" :"30",
    "links" : ""
  },
  {
    "id": "139324888",
    "roomNumber" : "609",
    "price" :"40",
    "links" : ""
  }
]
*/

export interface Roomsearch {
    checkin: string;
    checkout: string;
}


export interface Room {
    id: string;
    roomNumber: string;
    price: string;
    links: string;
}

export class ReserveRoomRequest {
    roomId: string;
    checkin: string;
    checkout: string;

    constructor(roomId: string, checkin: string, checkout: string) {
        this.roomId = roomId;
        this.checkin = checkin;
        this.checkout = checkout;
    }
}
