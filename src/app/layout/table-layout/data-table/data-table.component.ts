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
import { RemovePlayerCodePipe } from 'src/app/pipes/remove-player-code.pipe';
import { TwoDecimalPlacesPipe } from 'src/app/pipes/two-decimal-places.pipe';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { NullConversionPipe } from 'src/app/pipes/null-conversion.pipe';
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
		TwoDecimalPlacesPipe,
		NullConversionPipe,
		RemovePlayerCodePipe,
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
	sizes: TableSize[];
	selectedSize: TableSize;

	selectedRow: T | undefined;
	selectedCell: any;

	rowData: T | undefined;
	colData: Column | undefined;

	prevButtonDisabled: boolean = true;
	nextButtonDisabled: boolean = false;

	allPlayers: boolean = false;

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
		this.sizes = this.constants.sizes;
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
		if (this.tableConfig) {
			this.setAllPlayers();
		}

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
				console.log('Selected Size: ', this.selectedSize);

				// console.log('data-table component subscription: ', this.selectedSize);
			});
	}

	public changeSize(event: SelectButtonChangeEvent) {
		console.log('Invoking change size with: ', event);

		this.selectedSize = undefined;
		this.selectedSize = this.sizes.find(e => e.class === event);
		this.tableSizeService.setSelectedSize(this.selectedSize);
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
		const styleClass = `${this.selectedSize.class} ${this.extraClasses.join(' ')}`;
		// console.log('StyleClass: ', styleClass);
		return styleClass;
	}

	public getTooltip(rowData): TemplateRef<any> {
		return this.tooltip;
	}

	public getRowData(event: TableRowSelectEvent): void {
		this.selectedRow = event.data;

		this.openDialog();
	}

	public handleClick(event: MouseEvent, rowData: T, colData: Column) {
		console.log('ColData: ', colData);

		if (
			this.tablesService.areCellsClickable(
				this.tableConfig.dataTypeString,
				colData.header
			)
		) {
			console.log('rowData: ', rowData);
			this.selectedRow = rowData;
			this.selectedCell = { header: colData.header, data: rowData[colData.field] };
			console.log('Testing header: ', colData.header);

			const dialogConfig: any = {
				header: this.dialogConfigService.getheader(colData.header),
				rowData,

				singleEntry: this.dialogConfigService.isSingleEntry(
					this.tableConfig.dataTypeString
				)
			};
			if (this.constants.showExtendedDialogCols.includes(colData.header)) {
				console.log('Setting showExtended: true');

				dialogConfig.showExtended = true;
				console.log('Dialog config: ', dialogConfig);
			}
			if (
				this.allPlayers &&
				colData.field === 'giocatore' &&
				colData.header === 'Giocatore'
			) {
				const column: Column = { field: 'player', header: 'Player' };
				dialogConfig.colData = column;
			} else {
				dialogConfig.colData = colData;
			}

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
				config: dialogConfig,
				// selectedRow: this.selectedRow ? this.selectedRow : '',

				tableConfig: this.tableConfig
			}
		});

		this.dialogRef.onClose.subscribe(resultObject => {
			if (resultObject && resultObject.confirmed) {
				console.log('Result Object: ', resultObject);

				resultObject.rank
					? this.openSelected('rank')
					: resultObject.scores
					? this.openSelected('scores')
					: resultObject.playerDetails
					? this.openSelected('playerDetails')
					: console.log('No type in result object');
			}
		});
	}

	private openSelected(type) {
		const options = {
			type: type,
			selectedRow: this.selectedRow,
			selectedCell: this.selectedCell
		};
		console.log('Options to emit: ', options);
		this.rowSelected.emit(options);
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

	setAllPlayers() {
		if (this.tableConfig.dataTypeString === 'allPlayers') {
			this.allPlayers = true;
		}
	}

	ngOnDestroy(): void {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}

	isPlayer(colField: string): boolean {
		if (colField === 'Giocatore' || colField === 'Giocatore1') {
			return true;
		}
		return false;
	}
}
