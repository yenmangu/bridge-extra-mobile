import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { TournamentListComponent } from './tournament-list/tournament-list.component';

@Component({
	selector: 'app-layout',
	standalone: true,
	imports: [
		HeaderComponent,
		FooterComponent,
		TournamentListComponent,
		RouterModule,
		RouterOutlet
	],
	templateUrl: './layout.component.html',
	styleUrl: './layout.component.scss'
})
export class LayoutComponent {}
