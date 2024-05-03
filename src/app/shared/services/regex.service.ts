import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class RegexService {
	constructor() {}

	public extractId(inputString): string {
		const regex = /#(\d+)/;
		const match = inputString.match(regex);

		if (match && match[1]) {
			return `ID${match[1]}`;
		} else {
			return null;
		}
	}
}
