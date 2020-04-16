import { AuthInterceptorService } from './auth-interceptor.service';
import { RouterConfig } from './RouterConfig';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateEventComponent } from './create-event/create-event.component';
import { MyEventsComponent } from './my-events/my-events.component';
import { MatTableModule } from '@angular/material/table';
import { OFOMenueComponent } from './ofomenue/ofomenue.component';
import { MatSelectModule } from '@angular/material/select';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { MatCardModule } from '@angular/material/card';
import { FriendsFreetimeComponent } from './friends-freetime/friends-freetime.component';
import { AddParticipateDialogComponent } from './add-participate-dialog/add-participate-dialog.component';
import { MatListModule } from '@angular/material/list';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { Participants2ViewPipe } from './participants2-view.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateEventComponent,
    MyEventsComponent,
    OFOMenueComponent,
    MyprofileComponent,
    FriendsFreetimeComponent,
    AddParticipateDialogComponent,
    Participants2ViewPipe,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSelectModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    RouterModule.forRoot(RouterConfig),
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
