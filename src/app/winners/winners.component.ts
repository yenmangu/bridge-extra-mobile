import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../layout/table-layout/data-table/data-table.component';
import { HttpService } from '../shared/services/http.service';
import { JsonPipe, NgIf } from '@angular/common';
import { WinnersData } from '../shared/interfaces/winners-data';
import { TableConfig } from '../shared/interfaces/table-details';
import { baseTableConfig } from '../shared/data/base-table-config';

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
	constructor(private httpService: HttpService) {}

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
}
