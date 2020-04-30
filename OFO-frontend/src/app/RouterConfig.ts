import { ImpressumComponent } from './impressum/impressum.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HelpComponent } from './help/help.component';
import { MyEventComponent } from './my-event/my-event.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';
import { FriendsFreetimeComponent } from './friends-freetime/friends-freetime.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { MyEventsComponent } from './my-events/my-events.component';
import { CreateEventComponent } from './create-event/create-event.component';
export const RouterConfig = [
  {
    path: '',
    redirectTo: '/myevents',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'share/:id',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'register/:id',
    component: RegisterComponent
  },
  {
    path: 'myevents',
    component: MyEventsComponent,
    canActivate : [AuthGuardService]
  },
  {
    path: 'createEvent',
    component: CreateEventComponent,
    canActivate : [AuthGuardService]
  },
  {
    path: 'profile',
    component: MyprofileComponent,
    canActivate : [AuthGuardService]
  },
  {
    path: 'freetime',
    component: FriendsFreetimeComponent,
    canActivate : [AuthGuardService]
  },
  {
    path: 'myevent/:id',
    component: MyEventComponent,
    canActivate : [AuthGuardService]
  },
  {
    path: 'help',
    component: HelpComponent,
    canActivate : [AuthGuardService]
  },
  {
    path: 'impressum',
    component: ImpressumComponent,
    canActivate : [AuthGuardService]
  },
  {
    path: '**',
    component: NotFoundComponent,
    canActivate : [AuthGuardService]
  }
];
