import { Injectable } from '@angular/core';
import { TableConfig, TableSize } from '../interfaces/table-details';
import { TableSizeService } from './table-size.service';
import { PaginateOption } from '../interfaces/paginate-options';

@Injectable({
	providedIn: 'root'
})
export class ConstantsService {
	public baseTableConfig: TableConfig = {
		dataTypeString: '',
		tableName: '',
		visibleRows: 10,
		rowsPerPage: [5, 10, 15, 20],
		extraClasses: ['p-datatable-striped'],
		minWidth: ''
	};

	public truncateCols: string[] = ['Torneo', 'torneo'];
	public intCols: string[] = ['Posiz', 'score', 'Coppia'];
	public floatCols: string[] = ['Media', 'MP2', 'NS', 'EW'];
	public capsCol: string[] = ['MP2'];
	public showExtendedDialogCols: string[] = ['torneo', 'Torneo'];

	public clickableTables: string[] = [
		'TournamentDetails',
		'WinnersData',
		'allPlayers'
	];
	public clickableCells: string[] = [
		'Giocatore',
		'Giocatore1',
		'circuito',
		'Torneo'
	];
	public singleEntryDialogs: string[] = [
		'TournamentDetails',
		'WinnersData',
		'allPlayers'
	];

	public sizes: TableSize[] = [
		{ name: 'Small', class: 'p-datatable-sm', font: 'text-xs' },
		{ name: 'Normal', class: '', font: 'text-sm' },
		{ name: 'Large', class: 'p-datatable-lg', font: 'text-base' },
		{ name: 'Larger', class: 'p-datatable-xl', font: 'text-lg' }
	];

	public paginateOptions: PaginateOption[] = [
		PaginateOption.Prev,
		PaginateOption.Reset,
		PaginateOption.Next
	];

	constructor() {}
}
