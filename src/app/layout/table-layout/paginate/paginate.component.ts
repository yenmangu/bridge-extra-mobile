import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button, ButtonModule } from 'primeng/button';
import { SelectButtonModule, SelectButton } from 'primeng/selectbutton';
import { TableControlService } from '../../../shared/services/table-control.service';
import { DataTableService } from '../../../shared/services/data-table.service';
import { TableSize } from 'src/app/shared/interfaces/table-details';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { ConstantsService } from 'src/app/shared/services/constants.service';
import { TableSizeService } from 'src/app/shared/services/table-size.service';
// import { TablePaginateService } from 'src/app/shared/services/table-paginate.service';
// import { PaginateOption } from 'src/app/shared/interfaces/paginate-options';

@Component({
	selector: 'app-paginate',
	standalone: true,
	imports: [ButtonModule, SelectButtonModule, FormsModule],
	providers: [SelectButton],
	templateUrl: './paginate.component.html',
	styleUrl: './paginate.component.scss'
})
export class PaginateComponent implements OnInit, OnDestroy {
	@ViewChild('prev') prevButton: ElementRef<Button>;
	@ViewChild('next') nextButton: ElementRef<Button>;
	selectedSize: TableSize;
	ngUnsubscribe = new Subject<void>();

	prevButtonDisabled: boolean = true;
	nextButtonDisabled: boolean = false;

	sizeControlsDisabled: boolean;
	constructor(
		public tableControl: TableControlService,
		public tableService: DataTableService,
		// private selectButton: SelectButton,
		public constants: ConstantsService,
		private tableSizeService: TableSizeService // private tablePaginate: TablePaginateService
	) {}

	ngOnInit(): void {
		this.tableSizeService.selectedSize$
			.pipe(takeUntil(this.ngUnsubscribe), distinctUntilChanged())
			.subscribe(size => {
				this.selectedSize = size;
			});

		this.tableSizeService.disabled$.subscribe(value => {
			this.sizeControlsDisabled = value;
		});

		// Not currently Implemented

		// if (this.prevButton && this.nextButton) {
		// 	this.tablePaginate.prevDisabled$
		// 		.pipe(takeUntil(this.ngUnsubscribe))
		// 		.subscribe(disabled => {
		// 			// handle prev disabled
		// 			if (this.prevButton) {
		// 				// this.prevButton.nativeElement.disabled = disabled;
		// 				this.prevButtonDisabled = disabled;
		// 				console.log('next disabled: ', this.nextButton.nativeElement.disabled);
		// 			}
		// 		});
		// 	this.tablePaginate.nextDisabled$
		// 		.pipe(takeUntil(this.ngUnsubscribe))
		// 		.subscribe(disabled => {
		// 			// handle next disabled
		// 			if (this.nextButton) {
		// 				// this.nextButton.nativeElement.disabled = disabled;
		// 				this.nextButtonDisabled = disabled;
		// 				console.log('prev disabled: ', this.prevButton.nativeElement.disabled);
		// 			}
		// 		});
		// }
	}

	setSize(event) {}

	//  Not currently implemented

	// onPrev() {
	// 	this.tablePaginate.setControl(PaginateOption.Prev);
	// }

	// onNext() {
	// 	this.tablePaginate.setControl(PaginateOption.Next);
	// }
	// onReset() {
	// 	this.tablePaginate.setControl(PaginateOption.Reset);
	// }

	ngOnDestroy(): void {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}
}
