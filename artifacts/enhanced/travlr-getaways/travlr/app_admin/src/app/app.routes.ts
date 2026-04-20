import { Routes } from '@angular/router';
import { AddTripComponent } from './add-trip/add-trip.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
    { path: 'listtrips', component: TripListingComponent },

    // Protected routes
    { path: 'add-trip', component: AddTripComponent, canActivate: [AdminGuard] },
    { path: 'edit-trip/:id', component: EditTripComponent, canActivate: [AdminGuard] },

    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, pathMatch: 'full' },

    // No access page
    { path: 'no-access', loadComponent: () => import('./no-access/no-access.component').then(m => m.NoAccessComponent) }
];