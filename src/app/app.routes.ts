import { Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SetupGuard } from './guards/setup.guard';
import { SetupComponent } from './setup/setup.component';
import { WatchComponent } from './watch/watch.component';
import { ErrorComponent } from './error/error.component';
import { SeriesComponent } from './series/series.component';
import {ItemComponent} from "./item/item.component";

export const routes: Routes = [
    { path: 'movies', component: MoviesComponent, canActivate: [SetupGuard]  },
    { path: 'series', component: SeriesComponent, canActivate: [SetupGuard]  },
    { path: '', component: HomeComponent, canActivate: [SetupGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [SetupGuard]  },
    { path: 'watch', component: WatchComponent, canActivate: [SetupGuard]  },
    { path: 'setup', component: SetupComponent },
    { path: 'item', component: ItemComponent },
    { path: '**', component: ErrorComponent }
];
