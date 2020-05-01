import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {

  specialevents=[]
  constructor(
    private service:EventsService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.service.getSpecialEvents().subscribe(
      res=>{
        this.specialevents=res
        console.log(this.specialevents)
      },
      err=>{
        if(err instanceof HttpErrorResponse){
          if(err.status==401){
            this.route.navigate(['/login'])
          }else if(err.status==500){
            this.route.navigate(['/login'])
          }
        }
      }
    )
  }

}
