import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../shared/services/http.service';
import { PlayerTabsComponent } from '../layout/player-tabs/player-tabs.component';
import { DataTableComponent } from '../layout/table-layout/data-table/data-table.component';

import {
	greymegGeneral,
	greymegGames,
	greymegMonth,
	greymegPartner,
	greymegGamesRecap
} from '../../../dev/player data/greymeg';

@Component({
	selector: 'app-old-player-data',
	standalone: true,
	imports: [PlayerTabsComponent],
	templateUrl: './old-player-data.component.html',
	styleUrl: './old-player-data.component.scss'
})
export class OldPlayerDataComponent implements OnInit {
	playerName: string;
	playerData: any[];
	gamesPlayerData: any[];
	generalRecapData: any[];
	partnerRecapData: any[];
	monthRecapData: any[];
	gamesRecapData: any[];

	devData: any = {
		generalRecap: greymegGeneral,
		gamesPlayer: greymegGames,
		gamesRecap: greymegGamesRecap,
		monthRecap: greymegMonth,
		partnerRecap: greymegPartner
	};
	constructor(private route: ActivatedRoute, private httpService: HttpService) {}
	ngOnInit(): void {
		if (history.state.player) {
			this.playerName = history.state.player;
			this.getPlayerData(this.playerName);
			this.getMonthRecap(this.playerName);
		}
	}

	private getPlayerData(playerName) {
		this.httpService
			.reqData('qGamesPlayers', null, { player: playerName })
			.subscribe({
				next: response => {
					console.log('Response: ', response.data);
					response.status === 'success'
						? (this.playerData = response.data)
						: (this.playerData = null);
					this.playerData = response.data;
				},
				error: error => {
					console.error('Error retrieving data: ', error);
				}
			});
	}

	private getMonthRecap(playerName) {
		this.httpService
			.reqData('qMonthRecap', null, { player: playerName })
			.subscribe({
				next: response => {
					response.status === 'success'
						? (this.monthRecapData = response.data)
						: (this.monthRecapData = null);
				},
				error: error => {
					console.error('Error retrieving recap data: ', error);
				}
			});
	}
}
