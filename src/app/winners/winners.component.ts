import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../layout/table-layout/data-table/data-table.component';
import { HttpService } from '../shared/services/http.service';
import { JsonPipe, NgIf } from '@angular/common';
import { WinnersData } from '../shared/interfaces/winners-data';
import { TableConfig } from '../shared/interfaces/table-details';
import { baseTableConfig } from '../shared/data/base-table-config';
import { RoutingService } from '../shared/services/routing.service';

@Component({
	selector: 'app-winners',
	standalone: true,
	imports: [JsonPipe, NgIf, DataTableComponent],
	templateUrl: './winners.component.html',
	styleUrl: './winners.component.scss'
})
export class WinnersComponent implements OnInit {
	winnersData: WinnersData[] = [];
	tableConfig: TableConfig = baseTableConfig;
	constructor(
		private httpService: HttpService,
		private routingService: RoutingService
	) {}

	ngOnInit(): void {
		this.getWinnersData();
		this.setTableConfig();
	}

	getWinnersData() {
		this.httpService.reqData('qWinners').subscribe({
			next: response => {
				if (response.status === 'success') {
					this.winnersData = response.data;
				}
			},
			error: error => {
				console.error('Error finding data: ', error);
			}
		});
	}

	setTableConfig() {
		this.tableConfig.dataTypeString = 'WinnersData';
		this.tableConfig.tableName = 'Winners Data';
	}

	onReceiveRowData(event: any) {
		console.log('OnReceiveRowData initiated');
		console.log('Event: ', event);
		if (event.type) {
			if (event.type === 'playerDetails') {
				const playerName: string = event.selectedCell.data;
				console.log('Player name: ', playerName);
				this.routingService.handlePlayerDetailsRouting(playerName);
			} else {
				this.routingService.handleTournamentRoute(
					event.selectedCell.data,
					event.type
				);
			}
		} else {
			console.error('Error reacting to event');
		}
	}
}
