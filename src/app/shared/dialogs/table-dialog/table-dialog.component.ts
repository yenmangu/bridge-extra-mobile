import { Component, Input, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgIf, NgSwitch, NgSwitchCase, NgTemplateOutlet } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import {
	DynamicDialogRef,
	DialogService,
	DynamicDialogConfig
} from 'primeng/dynamicdialog';
import { JsonPipe } from '@angular/common';
import { MapHeadersPipe } from 'src/app/pipes/map-headers.pipe';
import { RemovePlayerCodePipe } from 'src/app/pipes/remove-player-code.pipe';
import { TableConfig } from '../../interfaces/table-details';

@Component({
	selector: 'app-table-dialog',
	standalone: true,
	imports: [
		NgIf,
		NgSwitch,
		NgSwitchCase,
		NgTemplateOutlet,
		DialogModule,
		ButtonModule,
		JsonPipe,
		MapHeadersPipe,
		RemovePlayerCodePipe
	],
	providers: [DialogService],
	templateUrl: './table-dialog.component.html',
	styleUrl: './table-dialog.component.scss'
})
export class TableDialogComponent implements OnInit {
	@ViewChild('playerTemplate') playerTemplate: TemplateRef<any>;
	selectedRow: any;
	rowData: any;
	colData: any;
	tableConfig: TableConfig;
	playerDialog: boolean = false;
	showExtended: boolean;
	constructor(
		private dialog: DialogService,
		private dialogRef: DynamicDialogRef,
		public dialogConfig: DynamicDialogConfig
	) {}

	ngOnInit(): void {
		if (this.dialogConfig.data.selectedRow) {
			this.selectedRow = this.dialogConfig.data.selectedRow;
		}
		if (this.dialogConfig.data.tableConfig) {
			this.tableConfig = this.dialogConfig.data.tableConfig;
		}
		if (this.dialogConfig.data.config) {
			this.rowData = this.dialogConfig.data.config.rowData;
			this.colData = this.dialogConfig.data.config.colData;
			this.showExtended = this.dialogConfig.data.config.showExtended;
		}
		console.log('dialog component data: ', this.dialogConfig);
		if (this.tableConfig.dataTypeString === 'allPlayers') {
			this.playerDialog = true;
		}
	}

	closeWithConfirm(type: string) {
		// console.log('Dialog ref: ', this.dialogRef);
		// console.log('Close with confirm triggered');

		let resultObject: any = {};
		if (this.dialogRef) {
			console.log('Dialog Ref');
			console.log('Dialog Type: ', type);

			type === 'rank'
				? (resultObject = { rank: true, type: 'rank' })
				: type === 'scores'
				? (resultObject = { scores: true, type: 'scores' })
				: type === 'playerDetails'
				? (resultObject = { playerDetails: true, type: 'playerDetails' })
				: (resultObject = { type: undefined });

			// this.dialogRef.close(true);
		} else {
			resultObject = { message: 'no result' };
		}
		console.log('Result Object: ', resultObject);
		resultObject.confirmed = true;

		this.dialogRef.close(resultObject);
	}
	cancel() {
		if (this.dialogRef) {
			this.dialogRef.close();
		}
	}
}
