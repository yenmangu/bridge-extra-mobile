import { Component, OnInit } from '@angular/core';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { HttpService } from '../shared/services/http.service';
import { JsonPipe } from '@angular/common';

@Component({
	selector: 'app-db-test',
	standalone: true,
	imports: [TableModule, ButtonModule, JsonPipe],
	templateUrl: './db-test.component.html',
	styleUrl: './db-test.component.scss',
	providers: [HttpService]
})
export class DbTestComponent implements OnInit {
	testDataResults: any = '';
	constructor(private httpService: HttpService) {}
	ngOnInit(): void {}

	makeReq() {
		this.httpService.initialTest().subscribe(results => {
			if (results) {
				this.testDataResults = results;
			}
		});
	}
}
