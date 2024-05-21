import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { TableSize } from '../interfaces/table-details';
import { ConstantsService } from './constants.service';
@Injectable({
	providedIn: 'root'
})
export class TableSizeService {
	private selectedSizeSubject = new BehaviorSubject<TableSize>({
		name: 'Normal',
		class: '',
		font: 'text-sm'
	});
	savedSize: TableSize;

	private sizeKey = 'sizeClass';

	private disabledSubject = new BehaviorSubject<boolean>(true);

	selectedSize$ = this.selectedSizeSubject.asObservable();

	disabled$ = this.disabledSubject.asObservable();

	constructor(private constants: ConstantsService) {
		this.getSelectedSize();
	}

	getSelectedSize() {
		console.log('Getting selected size');

		let sizeClass = localStorage.getItem(this.sizeKey);
		if (!sizeClass) {
			sizeClass = '';
		}
		this.savedSize = this.constants.sizes.find(e => e.class === sizeClass);
		console.log('Found size: ', this.savedSize);

		this.selectedSizeSubject.next(this.savedSize);
	}

	setSelectedSize(size: TableSize) {
		console.log('Setting selected size with: ', size);

		let foundSize = this.constants.sizes.find(e => e === size);
		if (!foundSize) {
			foundSize = this.constants.sizes[1];
		}
		this.savedSize = foundSize;

		console.log('foundSize: ', foundSize);
		const classString = this.savedSize.class;
		console.log('Class string: ', classString);

		this.updateStorage(classString);
		this.selectedSizeSubject.next(size);
	}

	setDisabled(disabled: boolean) {
		this.disabledSubject.next(disabled);
	}

	private updateStorage(sizeClass: string) {
		console.log('Updating storage with: ', sizeClass);

		localStorage.setItem(this.sizeKey, sizeClass);
	}
}
