import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { PaginateOption } from '../interfaces/paginate-options';

@Injectable({
	providedIn: 'root'
})
export class TablePaginateService {
	private paginateControlSubject = new Subject<PaginateOption>();
	private prevDisabledSubject = new BehaviorSubject<boolean>(true);
	private nextDisabledSubject = new BehaviorSubject<boolean>(false);
	paginateControl$ = this.paginateControlSubject.asObservable();
	prevDisabled$ = this.prevDisabledSubject.asObservable();
	nextDisabled$ = this.nextDisabledSubject.asObservable();
	constructor() {}

	setControl(control: PaginateOption) {
		console.log('paginate service setting control: ', control);

		this.paginateControlSubject.next(control);
	}

	public updateDisabledState(
		first: number,
		visibleRows: number,
		totalRecords: number
	) {
		const isFirstPage = first === 0;
		const isLastPage = first + visibleRows >= totalRecords;
		console.log(isFirstPage ? ('firstPage' ? isLastPage : 'lastPage') : '');
		this.setPrevDisabled(isFirstPage);
		this.setNextDisabled(isLastPage);
	}
	setPrevDisabled(disabled: boolean) {
		// console.log('paginate service setPrevDiasabled: ', disabled);
		if (disabled) {
			console.log('setting prev disabled');
		}

		this.prevDisabledSubject.next(disabled);
	}
	setNextDisabled(disabled: boolean) {
		// console.log('paginate service setNextDisabled ', disabled);
		if (disabled) {
			console.log('setting next disabled');
		}
		this.nextDisabledSubject.next(disabled);
	}
}
