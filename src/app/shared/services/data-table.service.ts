import { Injectable } from '@angular/core';
import { Column, TableSize } from '../interfaces/table-details';
import { ConstantsService } from './constants.service';

@Injectable({
	providedIn: 'root'
})
export class DataTableService {
	public tableColumns: Column[] = [];

	// The following arrays should be updated during dev as and when further columns
	// are found to satisfy these conditions.
	// For now these are known:
	public truncateCols: string[] = ['Torneo', 'torneo'];
	public intCols: string[] = ['Posiz', 'score', 'Coppia'];
	public floatCols: string[] = ['Media', 'MP2', 'NS', 'EW'];
	public capsCol: string[] = ['MP2'];

	public clickableTables: string[] = ['TournamentDetails'];

	public sizes: TableSize[] = [
		{ name: 'Small', class: 'p-datatable-sm', font: 'text-sm' },
		{ name: 'Normal', class: '', font: '' },
		{ name: 'Large', class: 'p-datatable-lg', font: 'text-lg' }
	];

	constructor(private constants: ConstantsService) {}

	public assignHeaderColumns(tableData: any[], dataType?: string) {
		const tableColumns = [];
		Object.keys(tableData[0]).forEach((key, index) => {
			if (this.checkDataType(key, dataType)) {
				const column: Column = {
					field: key,
					header: this.titleCase(key)
				};
				tableColumns.push(column);
			}
		});
		return tableColumns;
	}

	private checkDataType(key: string, dataType: string): boolean {
		if (dataType === 'TournamentDetails' && key === 'Torneo') {
			return false;
		}
		return true;
	}

	public getAllRows(tableData: any[]) {
		return tableData.length;
	}

	public areCellsClickable(dataType, colHeader): boolean {
		const satisfy =
			this.constants.clickableTables.includes(dataType) &&
			this.constants.clickableCells.includes(colHeader);
		return satisfy;
	}

	public mapFieldVals<T>(tableData: T[]) {
		tableData.forEach(row => {
			Object.keys(row).forEach(key => {
				// console.log('key: ', key, ' row[key]: ', row[key]);

				if (row[key] !== '') {
					if (this.constants.intCols.includes(key)) {
						row[key] = parseInt(row[key], 10);
					}
					if (this.constants.floatCols.includes(key)) {
						row[key] = parseFloat(row[key]);
					}
				}
			});
		});
	}

	public truncColumn(columnField: string): boolean {
		return this.constants.truncateCols.includes(columnField);
	}

	// shouldConvertToNumber(key: string): boolean {
	// 	return this.intCols.includes(key);
	// }

	private titleCase(value: string): string {
		if (this.constants.capsCol.includes(value)) {
			return value;
		} else {
			return value
				.split(' ')
				.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
				.join(' ');
		}
	}
}
