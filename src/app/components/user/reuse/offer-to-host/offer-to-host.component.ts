import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { User } from 'src/app/models/user';
import { Trip } from 'src/app/models/trip';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-offer-to-host',
  templateUrl: './offer-to-host.component.html',
  styleUrls: ['./offer-to-host.component.css']
})
export class OfferToHostComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  @Input() trip;
  modalRef: any;
  user;
  isdiable;
  constructor(private modalService: NgbModal, private service: UserService, private toast: ToastrService) { }

  ngOnInit() {

  }
  open(trip) {
    this.modalRef = this.modalService.open(this.content, { windowClass: 'modal-holder' });
    this.isdiable = false;
    this.trip = trip;
    this.service.getPeopleProfile(trip.applicationUserId).subscribe(
      res => {
        this.user = res;
       // this.modalRef = this.modalService.open(this.content, { windowClass: 'modal-holder' });
      }
    );

  }
  send(offerForm) {
    this.isdiable = true;
   // console.log(offerForm.value)
    let body={
      destination:this.trip.destination,
      arrivalDate:this.trip.arrivalDate,
      departureDate:this.trip.departureDate,
      travelerNumber:this.trip.travelerNumber,
      message:offerForm.value.message
    }
    this.service.sendHostOffer(body, this.trip.applicationUserId).subscribe(
      res => {
       // console.log(res);
        if (res.status == 200)
          this.toast.success('You had sent a Offer');
        else {
          this.toast.error('Fail');
        }
        this.modalRef.close();
      },
      err => {
        this.toast.error("Your Offer had been ignored or waiting for accept")
        this.modalRef.close();
      }
    )
  }

}
