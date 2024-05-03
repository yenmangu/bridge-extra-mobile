import {
	Component,
	Input,
	OnInit,
	OnDestroy,
	ViewChild,
	TemplateRef,
	ElementRef,
	EventEmitter,
	Output
} from '@angular/core';
import {
	Table,
	TableModule,
	TableService,
	TableRowSelectEvent,
	TablePageEvent
} from 'primeng/table';
import { SelectButtonModule, SelectButtonChangeEvent } from 'primeng/selectbutton';

import { MapHeadersPipe } from '../../../pipes/map-headers.pipe';
import { TournamentDetails } from '../../../shared/interfaces/tournament-details';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { FormsModule } from '@angular/forms';
import { JsonPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BreakpointsService } from '../../../shared/services/breakpoints.service';
import {
	TableSize,
	Column,
	TableConfig
} from '../../../shared/interfaces/table-details';
import { DataTableService } from '../../../shared/services/data-table.service';
import { removeDatePipe } from '../../../pipes/remove-date.pipe';
import { TableControlService } from '../../../shared/services/table-control.service';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { TooltipModule } from 'primeng/tooltip';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { TableDialogComponent } from '../../../shared/dialogs/table-dialog/table-dialog.component';
import { ConstantsService } from 'src/app/shared/services/constants.service';
import { TableSizeService } from 'src/app/shared/services/table-size.service';
import { TablePaginateService } from 'src/app/shared/services/table-paginate.service';
import { PaginateOption } from 'src/app/shared/interfaces/paginate-options';
import { SingleEntryDialogComponent } from 'src/app/shared/dialogs/single-entry-dialog/single-entry-dialog.component';
import { DialogConfigService } from 'src/app/shared/services/dialog-config.service';

@Component({
	selector: 'app-data-table',
	standalone: true,
	imports: [
		NgFor,
		NgIf,
		NgClass,
		NgStyle,
		JsonPipe,
		removeDatePipe,
		MapHeadersPipe,
		TruncatePipe,
		TableModule,
		TableDialogComponent,
		SelectButtonModule,
		InputTextModule,
		ButtonModule,
		FormsModule,
		TooltipModule,
		DirectivesModule
	],
	providers: [DialogService, DynamicDialogRef],
	templateUrl: './data-table.component.html',
	styleUrl: './data-table.component.scss'
})
export class DataTableComponent<T> implements OnInit, OnDestroy {
	@Input() tableData: T[];
	// @Input() tableData: T[];
	@Input() tableConfig: TableConfig | undefined;
	@Input() additionalConfig: any | undefined;
	@Output() rowSelected: EventEmitter<any> = new EventEmitter();
	@ViewChild('t_1') dataTable: Table;
	@ViewChild('tooltip') tooltip: TemplateRef<any>;
	@ViewChild('searchInput') searchInput: ElementRef;

	currentBP: { key: string; maxWidth: number };
	currentWidth: any;
	tableName: string;
	extraClasses: string[];
	minWidth: string;
	totalRecords;
	tableCols: Column[];

	visibleRows: number = 10;
	first: number = 0;
	rowsPerPageOptions: any[];

	selectedSize: TableSize;

	selectedRow: T | undefined;

	rowData: T | undefined;
	colData: Column | undefined;

	prevButtonDisabled: boolean = true;
	nextButtonDisabled: boolean = false;

	// public sizes: TableSize[] = [
	// 	{ name: 'Small', class: 'p-datatable-sm', font: 'text-sm' },
	// 	{ name: 'Normal', class: '', font: '' },
	// 	{ name: 'Large', class: 'p-datatable-lg', font: 'text-lg' }
	// ];

	clickStyle: string = 'cursor';

	private ngUnsubscribe = new Subject<void>();

	constructor(
		private breakpointsService: BreakpointsService,
		public tablesService: DataTableService,
		public constants: ConstantsService,
		private dialog: DialogService,
		private dialogRef: DynamicDialogRef,
		private tableControl: TableControlService,
		private tableSizeService: TableSizeService,
		private tablePaginate: TablePaginateService,
		private dialogConfigService: DialogConfigService
	) {}

	ngOnInit(): void {
		this.breakpointsService.activeBreakpoint$.subscribe(
			bp => (this.currentBP = bp)
		);
		this.breakpointsService.currentWidth$.subscribe(
			width => (this.currentWidth = width)
		);
		console.log(this.tableData);
		if (this.tableData.length > 0) {
			this.tableCols = this.tablesService.assignHeaderColumns(
				this.tableData,
				this.tableConfig.dataTypeString
			);
			// console.log('table cols: ', this.tableCols);
			this.totalRecords = this.tableData.length;
			this.tablesService.mapFieldVals(this.tableData);
		}
		this.setConfig();

		this.tablePaginate.prevDisabled$
			.pipe(takeUntil(this.ngUnsubscribe))
			.subscribe((disabled: boolean) => {
				// Handle prev button disabled state change
				this.prevButtonDisabled = disabled;
			});

		this.tablePaginate.nextDisabled$
			.pipe(takeUntil(this.ngUnsubscribe))
			.subscribe((disabled: boolean) => {
				// Handle next button disabled state change
				this.nextButtonDisabled = disabled;
			});

		// Paginate
		this.tablePaginate.paginateControl$
			.pipe(takeUntil(this.ngUnsubscribe), distinctUntilChanged())
			.subscribe((control: PaginateOption) => {
				// handle paginate control
				switch (control) {
					case PaginateOption.Prev:
						this.prev();
						break;
					case PaginateOption.Reset:
						this.reset();
						break;
					case PaginateOption.Next:
						this.next();
						break;
				}
			});

		// Table Size
		this.tableSizeService.selectedSize$
			.pipe(takeUntil(this.ngUnsubscribe), distinctUntilChanged())
			.subscribe(size => {
				this.selectedSize = size;
				// console.log('data-table component subscription: ', this.selectedSize);
			});
	}

	public clear(table: Table) {
		table.clear();
		this.searchInput.nativeElement.value = '';
	}

	public filterTable(event: Event) {
		this.dataTable.filterGlobal(
			(event.target as HTMLInputElement).value,
			'contains'
		);
	}

	public getStyleClass() {
		return `${this.selectedSize.class} ${this.extraClasses.join(' ')}`;
	}

	public getTooltip(rowData): TemplateRef<any> {
		return this.tooltip;
	}

	public getRowData(event: TableRowSelectEvent): void {
		this.selectedRow = event.data;

		this.openDialog();
	}

	public handleClick(event: MouseEvent, rowData: T, colData: Column) {
		if (
			this.tablesService.areCellsClickable(
				this.tableConfig.dataTypeString,
				colData.header
			)
		) {
			console.log('rowData: ', rowData);

			const dialogConfig: any = {
				header: this.dialogConfigService.getheader(colData.header),
				rowData,
				colData,
				singleEntry: this.dialogConfigService.isSingleEntry(
					this.tableConfig.dataTypeString
				)
			};
			// console.log(rowData[colData.field], colData.header);
			this.openDialog(dialogConfig);
		}
	}

	// Disable Buttons

	public isFirstPage(): boolean {
		return this.tableData ? this.first === 0 : true;
	}
	public isLastPage(): boolean {
		return this.tableData
			? this.first >= this.totalRecords - this.visibleRows
			: true;
	}

	//

	public next() {
		this.first = this.first + this.visibleRows;
		this.updateDisabledState();
	}

	public onRowHover(rowData: any, colData: any, isHovered: boolean): void {
		if (isHovered) {
			this.rowData = rowData;
			this.colData = colData;
		} else {
			this.rowData = undefined;
			this.colData = undefined;
		}
	}

	public pageChange(event: TablePageEvent) {
		this.first = event.first;
		this.visibleRows = event.rows;
	}

	public prev() {
		this.first = this.first - this.visibleRows;
		this.updateDisabledState;
	}
	public reset() {
		this.first = 0;
		this.updateDisabledState;
	}

	public setScrollBehaviour(): { scrollable: boolean; virtualScroll: boolean } {
		let rows: number;
		if (this.tableData) {
			rows = this.totalRecords;
		}
		if (this.dataTable && this.dataTable._rows && this.dataTable._rows === rows) {
			return { scrollable: true, virtualScroll: true };
		} else {
			return { scrollable: false, virtualScroll: false };
		}
	}

	public showPageLinks(): boolean {
		return this.currentWidth >= 660;
	}

	// Dev Methods

	// Private Methods

	private openDialog(dialogConfig?) {
		// const component = this.tableConfig.dataTypeString === '';

		this.dialogRef = this.dialog.open(TableDialogComponent, {
			header: dialogConfig.header,
			width: '360px',
			closeOnEscape: true,
			modal: true,
			dismissableMask: true,
			data: {
				// selectedRow: this.selectedRow ? this.selectedRow : '',
				singleEntry: dialogConfig.singleEntry,
				rowData: dialogConfig.rowData,
				colData: dialogConfig.colData,
				tableConfig: this.tableConfig
			}
		});
		// if (this.dialogRef) {
		// 	const instance = this.dialog.getInstance(this.dialogRef);
		// 	console.log('Dialog instance data: ', instance.data);
		// }
		this.dialogRef.onClose.subscribe(resultObject => {
			console.log('Receieved from dialog: ', resultObject);
			if (
				resultObject.confirmed &&
				resultObject.rank &&
				resultObject.rank === true
			) {
				this.openSelected('rank');
			}
		});
	}

	private openSelected(type) {
		const options = {
			rowSelected: this.rowSelected,
			rank: type === 'rank' ? true : undefined,
			scores: type === 'scores' ? true : undefined
		};
		// type === 'rank' ?
		// this.rowSelected.emit(this.selectedRow): type === 'scores' ? this.rowSelected.emit(this.selectedRow,'rank')
		// console.log('Open Selected Initiated');
	}

	private setConfig() {
		if (this.tableConfig) {
			const { visibleRows, rowsPerPage, extraClasses, tableName, minWidth } =
				this.tableConfig;
			if (visibleRows) {
				this.visibleRows = visibleRows;
			}
			if (rowsPerPage) {
				this.rowsPerPageOptions = [...rowsPerPage, this.totalRecords];
			}
			if (extraClasses) {
				this.extraClasses = extraClasses;
			}
			if (tableName) {
				this.tableName = tableName;
			}
			if (minWidth) {
				this.minWidth = minWidth;
			}
		}
	}

	private updateDisabledState() {
		this.tablePaginate.updateDisabledState(
			this.first,
			this.visibleRows,
			this.totalRecords
		);

		if (this.isFirstPage()) {
			this.prevButtonDisabled = true;
		}
		if (this.isLastPage()) {
			this.nextButtonDisabled = true;
		}
	}

	ngOnDestroy(): void {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}
}
