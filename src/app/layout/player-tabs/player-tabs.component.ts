import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TabViewChangeEvent, TabViewModule } from 'primeng/tabview';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { HttpService } from 'src/app/shared/services/http.service';
import { RoutingService } from 'src/app/shared/services/routing.service';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { PlayerGamesComponent } from './player-games/player-games.component';
import { RecapComponent } from './recap/recap.component';
import {
	greymegGeneral,
	greymegGames,
	greymegMonth,
	greymegPartner,
	greymegGamesRecap
} from 'dev/player data/greymeg';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { TableConfig } from 'src/app/shared/interfaces/table-details';
import { baseTableConfig } from 'src/app/shared/data/base-table-config';
import { DataTableComponent } from '../table-layout/data-table/data-table.component';
import { SinglePlayer } from 'src/app/shared/interfaces/single-player';

interface Config {
	dataTypeString: string;
	tableName: string;
}

@Component({
	selector: 'app-player-tabs',
	standalone: true,
	imports: [
		TabViewModule,
		ProgressSpinnerModule,
		PlayerDetailsComponent,
		PlayerGamesComponent,
		RecapComponent,
		DataTableComponent,
		NgIf
	],
	templateUrl: './player-tabs.component.html',
	styleUrl: './player-tabs.component.scss'
})
export class PlayerTabsComponent implements OnInit, OnDestroy {
	allPlayers: boolean;
	playerName: string;
	playerDetails: SinglePlayer;
	allPlayerData: any[];

	tabData: any[];

	gamesPlayerData: any[];
	generalRecapData: any[];
	partnerRecapData: any[];
	monthRecapData: any[];
	gamesRecapData: any[];

	customTableConfig: Config | null = null;

	customConfigs: { [key: string]: Config } = {
		generalRecap: {
			dataTypeString: 'generalRecap',
			tableName: 'General Recap'
		},
		monthRecap: {
			dataTypeString: 'monthRecap',
			tableName: 'Month Recap'
		},
		partnersRecap: {
			dataTypeString: 'partnerRecap',
			tableName: 'Partner Recap'
		}
	};

	allPlayersTableConfig: TableConfig = baseTableConfig;

	devPlayer: SinglePlayer = {
		profileImage: '',
		name: 'Rob Shelford',
		playerName: 'RobShelford92',
		playerCode: ''
	};

	devData: any = {
		generalRecap: greymegGeneral,
		gamesPlayer: greymegGames,
		gamesRecap: greymegGamesRecap,
		monthRecap: greymegMonth,
		partnerRecap: greymegPartner
	};

	private destroy$: Subject<void> = new Subject();
	constructor(
		private route: ActivatedRoute,
		private httpService: HttpService,
		private routingService: RoutingService,
		private cdr: ChangeDetectorRef
	) {}
	ngOnInit(): void {
		if (history.state.player) {
			this.playerName = history.state.player;

			// this.getPlayerData(this.playerName);
			this.buildPlayerDetails({ playerNameCode: this.playerName });
		}
		this.route.data.pipe(takeUntil(this.destroy$)).subscribe(data => {
			if (data.allPlayers) {
				this.allPlayers = true;
				this.getPlayerData();
				this.setAllPlayersTableConfig();
			}
		});
	}

	extractPlayerName(playerNameCode: string): string[] {
		return playerNameCode.split('-');
	}

	buildPlayerDetails(data: { playerNameCode: string; data?: any }) {
		const [playerCode, playerName] = this.extractPlayerName(data.playerNameCode);
		const playerDetails: SinglePlayer = {
			playerCode: playerCode,
			playerName: playerName,
			name: '',
			profileImage: ''
		};
		this.playerDetails = playerDetails;
	}

	setAllPlayersTableConfig() {
		this.allPlayersTableConfig.dataTypeString = 'allPlayers';
		this.allPlayersTableConfig.tableName = 'All Players';
	}

	private getPlayerData(playerName?: string) {
		let options: any;
		if (playerName) {
			options = { player: playerName };
		} else {
			options = null;
			// for dev purposes
			options = { limit: 100 };
		}
		this.httpService
			.reqData('qGamesPlayers', null, options)
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: response => {
					console.log('Response: ', response.data);
					response.status === 'success'
						? (this.allPlayerData = response.data)
						: (this.allPlayerData = null);
					this.allPlayerData = response.data;
				},
				error: error => {
					console.error('Error retrieving data: ', error);
				}
			});
	}

	initialiseGeneralRecap() {
		this.getGeneralRecap();
		this.customTableConfig = this.customConfigs.generalRecap;
		this.cdr.markForCheck();
	}

	initialiseMonthRecap() {
		this.getMonthRecap();
		this.customTableConfig = this.customConfigs.monthRecap;
		this.cdr.markForCheck();
	}

	initialisePartnersRecap() {
		this.getPartnersRecap();
		this.customTableConfig = this.customConfigs.partnersRecap;
		this.cdr.markForCheck();
	}

	public getGeneralRecap() {
		return this.getData(this.playerName, 'qGeneralRecap');
	}

	private getMonthRecap() {
		return this.getData(this.playerName, 'qMonthRecap');
	}

	public getGamesRecap() {
		return this.getData(this.playerName, 'qGamesRecap');
	}

	public getPartnersRecap() {
		return this.getData(this.playerName, 'qPartnersRecap');
	}

	private getData(playerName, type: string) {
		return this.httpService
			.reqData(type, null, { player: playerName })
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: response => {
					if (response.status === 'success') {
						type === 'qMonthRecap'
							? (this.monthRecapData = response.data)
							: type === 'qGamesRecap'
							? (this.gamesRecapData = response.data)
							: type === 'qGeneralRecap'
							? (this.generalRecapData = response.data)
							: (this.partnerRecapData = response.data);
					}
				},
				error: error => {
					console.error('Error getting player recap data: ', error);
				}
			});
	}

	onReceiveData(event) {
		console.log('Event: ', event);
	}

	getPlayerDetails() {
		console.log('Getting player details');
	}

	onTabChange(event: TabViewChangeEvent) {
		console.log('Event on tab change: ', event);

		switch (event.index) {
			case 0:
				this.getPlayerDetails();
				break;
			case 1:
				this.initialiseGeneralRecap();
				break;
			case 2:
				this.initialiseMonthRecap();
				break;
			case 3:
				this.initialisePartnersRecap();
				break;
			default:
				break;
		}
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
