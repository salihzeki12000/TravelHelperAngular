import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, AfterViewInit, AfterContentInit } from '@angular/core';
import { Trip } from './../../../../models/trip'
import { OfferToHostComponent } from '../offer-to-host/offer-to-host.component';
import { Router, ActivatedRoute, ChildActivationStart } from '@angular/router';
@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {

  @Input() trip: Trip;
  @Input() isUser: boolean;
  @ViewChild('des') des: ElementRef;
  @ViewChild(OfferToHostComponent) offerToHost:OfferToHostComponent;
  height;
  show = false;
  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.onResize(event);
    }, 0);
  }
  onResize(event){
    this.height = this.des.nativeElement.offsetHeight / 16;
    this.show = (this.height > 6);
  }

  onClickTrip() {
    this.router.navigate(['/Users/PublicTrip', this.trip.publicTripId]);
  }
}
