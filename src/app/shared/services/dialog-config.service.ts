import { Injectable } from '@angular/core';
import { ConstantsService } from './constants.service';

@Injectable({
	providedIn: 'root'
})
export class DialogConfigService {
	constructor(private constants: ConstantsService) {}

	public getheader(colHeader) {
		switch (colHeader) {
			case 'Giocatore':
				return 'View Player';
			case 'Giocatore1':
				return 'View Player';
			case 'circuito':
				return 'Division Information';
			case 'Torneo':
				return 'Tournament';
			default:
				return 'Default case reached - edit in dialog-config.service';
		}
	}

	public isSingleEntry(dataTypeString) {
		return this.constants.singleEntryDialogs.includes(dataTypeString);
	}
}
