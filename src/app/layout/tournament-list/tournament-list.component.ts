import {
	Component,
	Input,
	OnInit,
	AfterViewInit,
	ViewChild,
	ElementRef,
	TemplateRef,
	EventEmitter,
	Output
} from '@angular/core';
import {
	TableModule,
	Table,
	TablePageEvent,
	TableRowSelectEvent
} from 'primeng/table';
import { NgFor, NgIf, NgClass, NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
	SelectButtonChangeEvent,
	SelectButtonModule,
	SelectButtonOptionClickEvent
} from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { BreakpointsService } from '../../shared/services/breakpoints.service';
import { TableDialogComponent } from '../../shared/dialogs/table-dialog/table-dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Tournament } from '../../shared/interfaces/tournament-data';
import { removeDatePipe } from '../../pipes/remove-date.pipe';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { DirectivesModule } from '../../directives/directives.module';
import { JsonPipe } from '@angular/common';
import {
	TableSize,
	Column,
	TableConfig
} from 'src/app/shared/interfaces/table-details';
import { MapHeadersPipe } from 'src/app/pipes/map-headers.pipe';
import { TableSizeService } from 'src/app/shared/services/table-size.service';

@Component({
	selector: 'app-tournament-list',
	templateUrl: './tournament-list.component.html',
	styleUrl: './tournament-list.component.scss',
	imports: [
		TableModule,
		NgFor,
		NgIf,
		NgClass,
		NgTemplateOutlet,
		FormsModule,
		SelectButtonModule,
		ButtonModule,
		InputTextModule,
		TableDialogComponent,
		removeDatePipe,
		TruncatePipe,
		TooltipModule,
		DirectivesModule,
		JsonPipe,
		MapHeadersPipe
	],
	providers: [DialogService, DynamicDialogRef],
	standalone: true
})
export class TournamentListComponent implements OnInit, AfterViewInit {
	@ViewChild('searchInput') searchInput: ElementRef;
	@ViewChild('t1') dataTable: Table;
	@ViewChild('tooltip') tooltip: TemplateRef<any>;
	@Input() tableData: Tournament[] = [];
	@Input() tableConfig: TableConfig;
	@Output() rowSelected: EventEmitter<any> = new EventEmitter();
	dialogRef: DynamicDialogRef | undefined;

	tableHeaders: string[] = [];
	tableCols: Column[] = [];
	extraClassString: string = 'p-datatable-striped';

	sizes: TableSize[];

	selectedSize: TableSize | undefined;
	visibleRows: number = 10;
	first: number = 0;
	totalRecords: number;

	pageLinksVisible: boolean = true;

	paginateHideBreakpoints: string[] = ['handset_portrait', 'handset_landscape'];

	currentBP: { key: string; maxWidth: number };
	currentWidth: number;

	// selectRows:

	selectedRow: Tournament;
	colData: Column | undefined;
	rowData: Tournament;

	titleCase(value: string): string {
		return value
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join(' ');
	}

	constructor(
		private breakpointsService: BreakpointsService,
		private dialog: DialogService, // private dialogRef: DynamicDialogRef,
		private tableSizeService: TableSizeService
	) {
		this.sizes = [];
		this.sizes.push({ name: 'Small', class: 'p-datatable-sm', font: 'text-sm' });
		this.sizes.push({ name: 'Normal', class: '', font: '' });
		this.sizes.push({ name: 'Large', class: 'p-datatable-lg', font: 'text-lg' });
		this.selectedSize = { name: 'Normal', class: '', font: '' };
	}

	ngOnInit(): void {
		this.breakpointsService.activeBreakpoint$.subscribe(bp => {
			this.currentBP = bp;
		});
		this.breakpointsService.currentWidth$.subscribe(width => {
			this.currentWidth = width;
			console.log(this.currentWidth);
		});
		if (this.currentWidth < 660) {
			this.pageLinksVisible = false;
			console.log('Hiding page links');
		} else if (this.currentWidth > 660) {
			this.pageLinksVisible = true;
		}
		this.tableSizeService.setDisabled(false);

		if (this.tableData && this.tableData.length > 0) {
			this.assignHeadersAndCols();
			this.totalRecords = this.tableData.length;
		}
	}

	ngAfterViewInit(): void {}

	public getAllRows() {
		return this.tableData.length;
	}

	public getStyleClass() {
		return `${this.selectedSize.class} ${this.extraClassString}`;
	}

	public setScrollBehaviour(): { scrollable: boolean; virtualScroll: boolean } {
		let rows: number;
		if (this.tableData) {
			rows = this.getAllRows();
			// console.log('this.dataTable: ', this.dataTable);
			// console.log('result of this.getAllRows(): ', rows);
		}
		if (this.dataTable && this.dataTable._rows && this.dataTable._rows === rows) {
			// console.log('rows: ', rows);
			return { scrollable: true, virtualScroll: true };
		} else {
			return { scrollable: false, virtualScroll: false };
		}
	}

	public next() {
		this.first = this.first + this.visibleRows;
		console.log('first: ', this.first);
	}

	public prev() {
		this.first = this.first - this.visibleRows;
		console.log('first: ', this.first);
	}
	public reset() {
		this.first = 0;
		console.log('first: ', this.first);
	}

	public shouldTruncate(columnField: string): boolean {
		const truncateCols = ['torneo'];
		return truncateCols.includes(columnField);
	}

	assignHeadersAndCols(): void {
		this.tableCols = [];
		Object.keys(this.tableData[0]).forEach((key, index) => {
			const column: Column = {
				field: key,
				header: this.titleCase(key)
			};
			this.tableCols.push(column);
		});
	}

	changeSize(event: SelectButtonChangeEvent) {
		// Clear current selection to avoid conflictions
		this.selectedSize = undefined;
		console.log('Event: ', event);
		// Because using (ngModelChange)
		this.selectedSize = this.sizes.find(size => size.class === event);
		console.log('New Selected Size: ', this.selectedSize);
	}

	clear(table: Table) {
		table.clear();
		this.searchInput.nativeElement.value = '';
	}

	filterTable(event: Event) {
		this.dataTable.filterGlobal(
			(event.target as HTMLInputElement).value,
			'contains'
		);
	}

	getCurrentPageInfo(table: Table) {
		this.first = table.first;
		this.totalRecords = table.totalRecords;
		this.visibleRows = table.rows;
	}

	getTooltip(rowData): TemplateRef<any> {
		// this.rowData = rowData;
		return this.tooltip;
	}

	getRowData(event: TableRowSelectEvent): void {
		this.selectedRow = event.data;
		console.log(this.selectedRow);
		this.openDialog();
	}

	isFirstPage(): boolean {
		return this.tableData ? this.first === 0 : true;
	}
	isLastPage(): boolean {
		return this.tableData
			? this.first === this.tableData.length - this.visibleRows
			: true;
	}

	onRowHover(rowData: any, colData: any, isHovered: boolean) {
		if (isHovered) {
			this.rowData = rowData;
			this.colData = colData;
		} else {
			this.rowData = undefined;
			this.colData = undefined;
		}
	}

	openDialog() {
		this.dialogRef = this.dialog.open(TableDialogComponent, {
			header: 'Tournament Information',
			width: '320px',
			closeOnEscape: true,
			modal: true,
			dismissableMask: true,
			data: {
				selectedRow: this.selectedRow
			}
		});
		// if (this.dialogRef) {
		// 	const instance = this.dialog.getInstance(this.dialogRef);
		// 	console.log('Dialog instance data: ', instance.data);
		// }
		this.dialogRef.onClose.subscribe(resultObject => {
			console.log('Receieved from dialog: ', resultObject);
			if (resultObject) {
				if (resultObject.rank && resultObject.rank === true) {
					this.openSelected('rank');
				}
				if (resultObject.scores && resultObject.scores === true) {
					this.openSelected('scores');
				}
			}
		});
	}

	openSelected(type: string) {
		const options = {
			rowSelected: this.selectedRow,
			rank: type === 'rank' ? true : undefined,
			scores: type === 'scores' ? true : undefined
		};
		console.log('Open Selected Initiated');
		this.rowSelected.emit(options);
	}
	pageChange(event: TablePageEvent) {
		console.log('Page Change Event: ', event);
		this.first = event.first;
		this.visibleRows = event.rows;
	}
	showPageLinks(): boolean {
		return this.currentWidth >= 660;
	}
}
