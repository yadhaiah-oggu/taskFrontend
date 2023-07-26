import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  isLoggedIn: boolean = true;

  ngOnInit() {
    // Check if the user is authenticated (e.g., token is present in localStorage)
    const token = localStorage.getItem('token');
    // Convert to a boolean value
  }
}
