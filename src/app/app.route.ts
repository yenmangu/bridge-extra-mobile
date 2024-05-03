import { Route } from '@angular/router';

export const ROUTES: Route[] = [
	{
		path: '',
		loadComponent: () =>
			import('./home/home.component').then(mod => mod.HomeComponent)
	},
	{
		path: 'test',
		loadComponent: () =>
			import('./db-test/db-test.component').then(mod => mod.DbTestComponent)
	},
	{
		path: 'tournaments',
		loadComponent: () =>
			import('./tournaments/tournaments.component').then(
				mod => mod.TournamentsComponent
			)
	},
	{
		path: 'tournaments/rank/:torneo',
		data: {},
		loadComponent: () =>
			import('./tournament-details/tournament-details.component').then(
				mod => mod.TournamentDetailsComponent
			)
	},
	{
		path: 'tournaments/scores/:torneo',
		data: {},
		loadComponent: () =>
			import('./tournament-scores/tournament-scores.component').then(
				mod => mod.TournamentScoresComponent
			)
	},
	{
		path: 'winners',
		loadComponent: () =>
			import('./winners/winners.component').then(mod => mod.WinnersComponent)
	},
	{
		path: 'players',
		loadComponent: () =>
			import('./players/players.component').then(mod => mod.PlayersComponent)
	},
	{
		path: 'games',
		loadComponent: () =>
			import('./database-landing/database-landing.component').then(
				mod => mod.DatabaseLandingComponent
			)
	}
];
