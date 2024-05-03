import { Component, Input, OnInit } from '@angular/core';
import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import {
	DynamicDialogRef,
	DialogService,
	DynamicDialogConfig
} from 'primeng/dynamicdialog';
import { JsonPipe } from '@angular/common';
import { MapHeadersPipe } from 'src/app/pipes/map-headers.pipe';

@Component({
	selector: 'app-table-dialog',
	standalone: true,
	imports: [
		NgIf,
		NgSwitch,
		NgSwitchCase,
		DialogModule,
		ButtonModule,
		JsonPipe,
		MapHeadersPipe
	],
	providers: [DialogService],
	templateUrl: './table-dialog.component.html',
	styleUrl: './table-dialog.component.scss'
})
export class TableDialogComponent implements OnInit {
	selectedRow: any;
	rowData: any;
	colData: any;
	tableConfig: any;
	constructor(
		private dialog: DialogService,
		private dialogRef: DynamicDialogRef,
		public dialogConfig: DynamicDialogConfig
	) {}

	ngOnInit(): void {
		if (this.dialogConfig.data.selectedRow) {
			this.selectedRow = this.dialogConfig.data.selectedRow;
		}
		if (this.dialogConfig.data.rowData) {
			this.rowData = this.dialogConfig.data.rowData;
		}
		if (this.dialogConfig.data.colData) {
			this.colData = this.dialogConfig.data.colData;
		}
		if (this.dialogConfig.data.tableConfig) {
			this.tableConfig = this.dialogConfig.data.tableConfig;
		}
		console.log('dialog component data: ', this.dialogConfig);
	}

	closeWithConfirm(type: string) {
		// console.log('Dialog ref: ', this.dialogRef);
		// console.log('Close with confirm triggered');

		let resultObject: any = {};
		if (this.dialogRef) {
			console.log('Dialog Ref');
			console.log('Dialog Type: ', type);

			type === 'rank'
				? (resultObject = { rank: true })
				: (resultObject = { scores: true });

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
