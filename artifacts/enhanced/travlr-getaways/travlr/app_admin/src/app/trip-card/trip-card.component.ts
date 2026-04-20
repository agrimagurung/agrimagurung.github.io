import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { Trip } from '../models/trip';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { TripDataService } from '../services/trip-data.service';   // ⭐ ADD THIS

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class TripCardComponent implements OnInit {
  @Input('trip') trip!: Trip;

  constructor(
    private router: Router,
    public authService: AuthenticationService,
    private tripDataService: TripDataService   // ⭐ ADD THIS
  ) {}

  ngOnInit() {}

  public editTrip(trip: Trip): void {
    localStorage.removeItem("tripCode");
    localStorage.setItem("tripCode", trip.code);
    this.router.navigate(['edit-trip', trip.code]);
  }

  public deleteTrip(code: string): void {     // ⭐ ADD THIS
    if (confirm('Are you sure you want to delete this trip?')) {
      this.tripDataService.deleteTrip(code).subscribe({
        next: () => {
          // Refresh trip list after deletion
          this.router.navigate(['/listtrips']).then(() => {
            window.location.reload();
          });
        },
        error: (err) => {
          console.error('Error deleting trip:', err);
        }
      });
    }
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}