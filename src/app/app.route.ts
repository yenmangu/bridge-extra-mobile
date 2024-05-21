import { Route } from '@angular/router';

export const ROUTES: Route[] = [
	{
		path: '',

		// loadComponent: () =>
		// 	import('./home/home.component').then(mod => mod.HomeComponent),
		redirectTo: 'tournaments',
		pathMatch: 'full'
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
		path: 'tournaments/scores/:torneo',
		data: { type: 'scores' },
		loadComponent: () =>
			import('./layout/tournament-details/tournament-details.component').then(
				mod => mod.TournamentDetailsComponent
			)
	},
	{
		path: 'tournaments/rank/:torneo',
		data: { type: 'rank' },
		loadComponent: () =>
			import('./layout/tournament-details/tournament-details.component').then(
				mod => mod.TournamentDetailsComponent
			)
	},

	{
		path: 'winners',
		loadComponent: () =>
			import('./winners/winners.component').then(mod => mod.WinnersComponent)
	},
	// {
	// 	path: 'players',
	// 	loadComponent: () =>
	// 		import('./players/players.component').then(mod => mod.PlayersComponent)
	// },
	{
		path: 'player-details/:player',
		data: {},
		loadComponent: () =>
			import('./old-player-data/old-player-data.component').then(
				mod => mod.OldPlayerDataComponent
			)
	},
	{
		path: 'players',
		data: { allPlayers: true },
		loadComponent: () =>
			import('./layout/player-tabs/player-tabs.component').then(
				mod => mod.PlayerTabsComponent
			)
	},
	{
		path: 'players/:player/overview',
		data: {},
		loadComponent: () =>
			import('./layout/player-tabs/player-tabs.component').then(
				mod => mod.PlayerTabsComponent
			)
	},
	{
		path: 'games',
		loadComponent: () =>
			import('./database-landing/database-landing.component').then(
				mod => mod.DatabaseLandingComponent
			)
	}
];
