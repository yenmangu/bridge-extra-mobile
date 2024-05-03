import { Component, Input, OnInit } from '@angular/core';
import { TableModule, TableService } from 'primeng/table';
import { SelectButtonModule } from 'primeng/selectbutton';

import { MapHeadersPipe } from '../pipes/map-headers.pipe';
import { TournamentDetails } from '../shared/interfaces/tournament-details';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { FormsModule } from '@angular/forms';
import { JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BreakpointsService } from '../shared/services/breakpoints.service';
import { TableSize, Column, TableConfig } from '../shared/interfaces/table-details';
import { DataTableService } from '../shared/services/data-table.service';
import { removeDatePipe } from '../pipes/remove-date.pipe';

import { DataTableComponent } from '../layout/table-layout/data-table/data-table.component';

@Component({
	selector: 'app-tournament-details-table',
	standalone: true,
	imports: [
		NgFor,
		NgIf,
		NgClass,
		JsonPipe,
		removeDatePipe,
		MapHeadersPipe,
		TruncatePipe,
		TableModule,
		SelectButtonModule,
		InputTextModule,
		ButtonModule,
		FormsModule
	],
	providers: [DialogService, DynamicDialogRef],
	templateUrl: './tournament-details-table.component.html',
	styleUrl: './tournament-details-table.component.scss'
})
export class TournamentDetailsTableComponent<T> implements OnInit {
	@Input() tournamentDetails: TournamentDetails[];
	@Input() tableData: T[];
	// @Input() tableConfig: TableConfig | undefined;

	currentBP: { key: string; maxWidth: number };
	currentWidth: any;

	totalRecords;
	tableCols: Column[];

	visibleRows: number = 10;
	first: number = 0;
	extraClassString: string = 'p-datatable-striped';
	constructor(
		private dialogService: DialogService,
		private breakpointsService: BreakpointsService,
		public tablesService: DataTableService
	) {}

	ngOnInit(): void {
		this.breakpointsService.activeBreakpoint$.subscribe(
			bp => (this.currentBP = bp)
		);
		this.breakpointsService.currentWidth$.subscribe(
			width => (this.currentWidth = width)
		);
		console.log(this.tournamentDetails);
		if (this.tournamentDetails.length > 0) {
			this.tableCols = this.tablesService.assignHeaderColumns(
				this.tournamentDetails
			);
			this.totalRecords = this.tournamentDetails.length;
		}
	}
}
