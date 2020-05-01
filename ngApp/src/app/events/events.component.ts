import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events=[]
  constructor(
    private service:EventsService
  ) { }

  ngOnInit(): void {
    this.service.getEvents().subscribe(
      res=>{
        this.events=res
        console.log(this.events)
      },
      err=>console.log(err)
    )
  }

}
