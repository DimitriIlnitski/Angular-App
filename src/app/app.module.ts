import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListFilterCourseNamePipe } from './shared/pipes/list-filter-course-name.pipe';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './services/custom-route-reuse.strategy';
import { SharedModule } from './shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingBlockComponent } from './loading-block/loading-block.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    FooterComponent,
    LoadingBlockComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    ListFilterCourseNamePipe,
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
