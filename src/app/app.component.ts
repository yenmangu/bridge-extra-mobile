import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, FooterComponent } from './layout';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, HeaderComponent, FooterComponent],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'bridge-extra-mobile';
}
