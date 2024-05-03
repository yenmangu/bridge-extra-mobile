import {
	bootstrapApplication,
	provideProtractorTestingSupport
} from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ROUTES } from './app/app.route';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
	providers: [
		[
			provideProtractorTestingSupport,
			provideHttpClient(),
			provideRouter(ROUTES),
			provideAnimations()
		]
	]
}).catch(err => console.error(err));
