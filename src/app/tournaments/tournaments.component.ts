import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/services/http.service';
import { TournamentListComponent } from '../layout/tournament-list/tournament-list.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NgIf } from '@angular/common';
import { Tournament } from '../shared/interfaces/tournament-data';
import { RegexService } from '../shared/services/regex.service';
import { RoutingService } from '../shared/services/routing.service';
import { ConstantsService } from '../shared/services/constants.service';
import { TableConfig } from '../shared/interfaces/table-details';

@Component({
	selector: 'app-tournaments',
	standalone: true,
	imports: [NgIf, TournamentListComponent, ProgressSpinnerModule],
	templateUrl: './tournaments.component.html',
	styleUrl: './tournaments.component.scss'
})
export class TournamentsComponent implements OnInit {
	tournamentData: Tournament[] = [];
	tableConfig: TableConfig;
	tableReady: boolean = false;

	selectedRow: any;
	options: any;

	constructor(
		private httpService: HttpService,
		private regexService: RegexService,
		private routingService: RoutingService,
		private constants: ConstantsService
	) {}

	ngOnInit(): void {
		this.tableReady = false;
		this.getTournamentData();
		if (this.tournamentData.length > 0) {
		}
		if (this.selectedRow) {
			console.log(this.selectedRow);
		}
		this.tableConfig = this.constants.baseTableConfig;
		this.tableConfig.dataTypeString = 'tournamentList';
		this.tableConfig.tableName = 'All Tournaments';
	}

	private getTournamentData() {
		this.httpService.reqData('qGameList').subscribe(response => {
			const { status, data } = response;
			if (status === 'success') {
				this.tournamentData = data;
			}
			console.log('Data receieved');
			this.tableReady = true;
		});
	}

	onTournamentReceive(event: any) {
		console.log('Reacting to child with: ', event);
		const tournamentName = event.rowSelected.torneo;
		if (event.rank && event.rank === true) {
			this.routingService.handleTournamentRoute(tournamentName, 'rank');
		}
		if (event.scores && event.scores === true) {
			this.routingService.handleTournamentRoute(tournamentName, 'scores');
		}
	}
}
