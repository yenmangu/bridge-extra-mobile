import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HttpService } from '../shared/services/http.service';
import { Tournament } from '../shared/interfaces/tournament-data';
import { JsonPipe, NgIf } from '@angular/common';
// import { TournamentDetailsTableComponent } from '../tournament-details-table/tournament-details-table.component';
import { TournamentDetails } from '../shared/interfaces/tournament-details';

// DEV
import { DataTableComponent } from '../layout/table-layout/data-table/data-table.component';
import { TableConfig } from '../shared/interfaces/table-details';

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
		private router: Router
	) {}

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.tournamentId = params['torneo'];
			console.log('tournament: ', this.tournamentId);
		});
		this.getTournamentDetails(this.tournamentId);
		this.tableConfig = {
			dataTypeString: 'TournamentDetails',
			tableName: this.tournamentId,
			visibleRows: 10,
			rowsPerPage: [5, 10, 15, 20],
			extraClasses: ['p-datatable-striped'],
			minWidth: ''
		};
	}

	getTournamentDetails(selectedTournament: string) {
		console.log('Selected Tournament: ', selectedTournament);
		const tournament = selectedTournament;

		this.httpService.reqData('qGameRank', null, { torneo: tournament }).subscribe({
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
}
