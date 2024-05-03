import { Injectable } from '@angular/core';
import {
	Observable,
	fromEvent,
	merge,
	map,
	startWith,
	filter,
	distinctUntilChanged
} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class BreakpointsService {
	private readonly breakpoints: { [key: string]: number } = {
		handset_portrait: 390,
		handset_landscape: 576,
		tablet_portrait: 768,
		tablet_landscape: 992,
		desktop_medium: 1192,
		desktop_large: 1440,
		desktop_wide: 2560
	};

	public currentWidth$: Observable<number>;
	public activeBreakpoint$: Observable<{ key: string; maxWidth: number }>;

	constructor() {
		this.setupObservables();
	}

	private setupObservables(): void {
		this.currentWidth$ = fromEvent(window, 'resize').pipe(
			map(() => window.innerWidth),
			startWith(window.innerWidth),
			distinctUntilChanged()
		);

		this.activeBreakpoint$ = this.currentWidth$.pipe(
			map(width => this.getActiveBreakpoint(width)),
			distinctUntilChanged((prev, curr) => prev.maxWidth === curr.maxWidth)
		);
	}

	currentWidth(): Observable<number> {
		return this.currentWidth$;
	}

	private getActiveBreakpoint(width: number): { key: string; maxWidth: number } {
		const matchingBreakpoint = Object.entries(this.breakpoints).find(
			([key, maxWidth]) => width <= maxWidth
		);
		return matchingBreakpoint
			? { key: matchingBreakpoint[0], maxWidth: matchingBreakpoint[1] }
			: { key: '', maxWidth: 0 };
	}

	activeBreakpoint(): Observable<{ key: string; maxWidth: number }> {
		return this.activeBreakpoint$;
	}
}
