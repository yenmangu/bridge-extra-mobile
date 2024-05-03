import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../shared/services/http.service';
import { Tournament } from '../shared/interfaces/tournament-data';
import { DataTableComponent } from '../layout/table-layout/data-table/data-table.component';
import { TableConfig } from '../shared/interfaces/table-details';
import { JsonPipe, NgIf } from '@angular/common';
@Component({
	selector: 'app-tournament-scores',
	standalone: true,
	imports: [JsonPipe, NgIf, DataTableComponent],
	templateUrl: './tournament-scores.component.html',
	styleUrl: './tournament-scores.component.scss'
})
export class TournamentScoresComponent implements OnInit {
	tournamentScoreData: any[] = [];
	tournamentId: string;
	tableConfig: TableConfig;
	constructor(
		private httpService: HttpService,
		private route: ActivatedRoute,
		private router: Router
	) {}
	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.tournamentId = params['torneo'];
		});
		this.getTournamentScores(this.tournamentId);
		this.tableConfig = {
			dataTypeString: 'TournamentScores',
			tableName: this.tournamentId,
			visibleRows: 10,
			rowsPerPage: [5, 10, 15, 20],
			extraClasses: ['p-datatable-striped'],
			minWidth: ''
		};
	}

	getTournamentScores(selectedTournament: string) {
		this.httpService
			.reqData('qScores', null, { torneo: selectedTournament })
			.subscribe({
				next: response => {
					console.log('Server Response: ', response);
					if (response.data) {
						//do something
						this.tournamentScoreData = response.data;
					}
				},
				error: error => {
					console.error('Error fetching tournament scores: ', error);
				}
			});
	}
}
