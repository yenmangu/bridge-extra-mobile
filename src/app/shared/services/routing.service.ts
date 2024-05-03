import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Tournament } from '../interfaces/tournament-data';

@Injectable({
	providedIn: 'root'
})
export class RoutingService {
	constructor(private router: Router) {}

	public handleTournamentRoute(tournamentName, type): void {
		console.log('Tournament Data in routingService: ', tournamentName);
		if (type === 'rank') {
			this.router.navigate([`/tournaments/rank/${tournamentName}`]);
		}
		if (type === 'scores') {
			this.router.navigate([`/tournaments/scores/${tournamentName}`]);
		}
	}
}
