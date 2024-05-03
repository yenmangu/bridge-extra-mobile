import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { TableSize } from '../interfaces/table-details';
import { SelectButtonChangeEvent } from 'primeng/selectbutton';
import { TableSizeService } from './table-size.service';
@Injectable({
	providedIn: 'root'
})
export class TableControlService {
	private paginateSubject = new Subject<string>();
	private tableSizeSubject = new Subject<SelectButtonChangeEvent>();
	private disablePrevSubject = new Subject<boolean>();
	private disableNextSubject = new Subject<boolean>();
	private disableControlSubject = new Subject<string>();

	public selectedSize: TableSize = { name: 'Normal', class: '', font: '' };

	constructor(private tableSizeService: TableSizeService) {}
}
