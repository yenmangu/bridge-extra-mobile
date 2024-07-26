import {
	Component,
	Input,
	OnDestroy,
	OnInit,
	OnChanges,
	SimpleChanges,
	ChangeDetectionStrategy
} from '@angular/core';
import { NgIf } from '@angular/common';
import { DataTableComponent } from '../../table-layout/data-table/data-table.component';
import { TableConfig } from 'src/app/shared/interfaces/table-details';
import { baseTableConfig } from 'src/app/shared/data/base-table-config';
@Component({
	selector: 'app-recap',
	standalone: true,
	imports: [DataTableComponent, NgIf],
	templateUrl: './recap.component.html',
	styleUrl: './recap.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecapComponent implements OnInit, OnChanges, OnDestroy {
	@Input() recapData;
	@Input() customConfig;
	@Input() playerDetails;
	tableConfig: TableConfig = baseTableConfig;

	constructor() {}

	ngOnInit(): void {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.customConfig) {
			console.log('CustomConfig changed: ', changes.customConfig.currentValue);
			this.tableConfig = baseTableConfig;
			if (this.recapData) {
				this.setConfig();
			}
		}
	}

	private setConfig() {
		this.tableConfig.dataTypeString = this.customConfig.dataTypeString;
		this.tableConfig.tableName = this.customConfig.tableName;
	}

	ngOnDestroy(): void {
		this.recapData = null;
		this.customConfig = null;
	}
}
