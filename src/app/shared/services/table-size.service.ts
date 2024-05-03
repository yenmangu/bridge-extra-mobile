import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { TableSize } from '../interfaces/table-details';
@Injectable({
	providedIn: 'root'
})
export class TableSizeService {
	private selectedSizeSubject = new BehaviorSubject<TableSize>({
		name: 'Normal',
		class: '',
		font: ''
	});

	private disabledSubject = new BehaviorSubject<boolean>(true);

	selectedSize$ = this.selectedSizeSubject.asObservable();

	disabled$ = this.disabledSubject.asObservable();

	constructor() {}

	setSelectedSize(size: TableSize) {
		this.selectedSizeSubject.next(size);
	}

	setDisabled(disabled: boolean) {
		this.disabledSubject.next(disabled);
	}
}
