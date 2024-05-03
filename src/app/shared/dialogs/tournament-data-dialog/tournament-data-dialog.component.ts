import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import {
	DialogService,
	DynamicDialogConfig,
	DynamicDialogRef
} from 'primeng/dynamicdialog';

@Component({
	selector: 'app-tournament-data-dialog',
	standalone: true,
	imports: [DialogModule, ButtonModule],
	providers: [DialogService],
	templateUrl: './tournament-data-dialog.component.html',
	styleUrl: './tournament-data-dialog.component.scss'
})
export class TournamentDataDialogComponent implements OnInit {
	selectedRow: any;
	constructor(
		private dialogRef: DynamicDialogRef,
		private dialogConfig: DynamicDialogConfig
	) {}

	ngOnInit(): void {
		this.selectedRow = this.dialogConfig.data.selectedRow;
	}

	closeWithConfirm() {
		if (this.dialogRef) {
			this.dialogRef.close(true);
		}
	}
	cancel() {
		if (this.dialogRef) {
			this.dialogRef.close();
		}
	}
}
