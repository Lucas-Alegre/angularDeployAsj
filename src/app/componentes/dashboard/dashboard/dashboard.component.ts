import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  localData: any;
  

  ngOnInit(): void {
    this.localData = localStorage.getItem('userEncontrado');
    
    this.localData = JSON.parse(this.localData)
  }
}
