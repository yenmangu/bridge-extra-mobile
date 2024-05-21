import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BreakpointsService } from 'src/app/shared/services/breakpoints.service';
import { PaginateComponent } from '../table-layout/paginate/paginate.component';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
	standalone: true,
	imports: [MenubarModule, PaginateComponent]
})
export class HeaderComponent implements OnInit {
	items: MenuItem[] | undefined;
	breakpoint: any;
	constructor(private breakpointService: BreakpointsService) {}

	ngOnInit(): void {
		this.breakpointService.activeBreakpoint$.subscribe(breakpoint => {
			this.breakpoint = breakpoint;
			console.log(breakpoint);
		});

		this.items = [
			{
				label: 'Home',
				icon: 'pi pi-home',
				routerLink: '../'
			},
			{ label: 'DB Test', routerLink: 'test' },
			{ label: 'Tournaments', routerLink: 'tournaments' },
			{ label: 'Winners', routerLink: 'winners' },
			{ label: 'Players', routerLink: 'players' },
			{
				label: 'Division',
				items: [{ label: 'BEX_1' }, { label: 'BEX_2' }, { label: 'BEX_3' }]
			}
		];
	}
}
