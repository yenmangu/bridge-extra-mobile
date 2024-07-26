import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HttpService } from '../../shared/services/http.service';
import { Tournament } from '../../shared/interfaces/tournament-data';
import { JsonPipe, NgIf } from '@angular/common';
// import { TournamentDetailsTableComponent } from '../tournament-details-table/tournament-details-table.component';
import { TournamentDetails } from '../../shared/interfaces/tournament-details';

// DEV
import { DataTableComponent } from '../table-layout/data-table/data-table.component';
import { TableConfig } from '../../shared/interfaces/table-details';
import { RoutingService } from '../../shared/services/routing.service';
// END DEV
@Component({
	selector: 'app-tournament-details',
	standalone: true,
	imports: [
		JsonPipe,
		NgIf,
		// TournamentDetailsTableComponent,
		// Whilst developing the app-data-table
		DataTableComponent
	],
	templateUrl: './tournament-details.component.html',
	styleUrl: './tournament-details.component.scss'
})
export class TournamentDetailsComponent implements OnInit {
	tournamentDetails: TournamentDetails[] = [];
	tournamentId: string;
	tournamentData: Tournament;
	routeData: any;
	static dataType: string = 'TournamentDetails';

	// DEV

	tableConfig: TableConfig;

	// END DEV
	constructor(
		private httpService: HttpService,
		private route: ActivatedRoute,
		private router: Router,
		private routingService: RoutingService
	) {}

	ngOnInit(): void {
		this.route.data.subscribe(data => {
			this.routeData = data;
			console.log('Route Data: ', data);
		});
		this.route.params.subscribe(params => {
			this.tournamentId = params['torneo'];
			console.log('tournament: ', this.tournamentId);
		});

		this.getTournamentDetails(this.tournamentId);
		if (this.routeData && this.routeData.type) {
			this.tableConfig = {
				dataTypeString: `TournamentDetails${
					this.routeData.type === 'rank' ? '_rank' : '_scores'
				}`,
				tableName: this.tournamentId,
				visibleRows: 10,
				rowsPerPage: [5, 10, 15, 20],
				extraClasses: ['p-datatable-striped'],
				minWidth: ''
			};
		}
	}

	getTournamentDetails(selectedTournament: string) {
		console.log('Selected Tournament: ', selectedTournament);
		const tournament = selectedTournament;

		let view;
		if (this.routeData.type === 'rank') {
			view = 'qGameRank';
		}
		if (this.routeData.type === 'scores') {
			view = 'qScores';
		}

		this.httpService.reqData(view, null, { torneo: tournament }).subscribe({
			next: response => {
				if (response.status === 'success') {
					this.tournamentDetails = response.data;
				}
			},
			error: error => {
				console.error('Error fetching data: ', error);
			}
		});
	}
	old_getTournamentDetails(selectedTournament: string) {
		this.httpService.reqTournamentRankData(selectedTournament).subscribe({
			next: response => {
				console.log('Server response: ', response);
				if (response.data) {
					this.tournamentDetails = response.data;
					// console.log(`${this.tournamentId} details: `, this.tournamentDetails);
				}
			},
			error: error => {
				console.error('Error fetching data: ', error);
			}
		});
	}
	onReceiveRowData(event) {
		console.log('Event: ', event);
		let playerName;
		if (event.selectedRow && event.selectedCell) {
			playerName = event.selectedCell.data;
		}
		event.type === 'playerDetails'
			? this.routingService.handlePlayerDetailsRouting(playerName)
			: console.error('Error receiving row data from parent');
	}
}
