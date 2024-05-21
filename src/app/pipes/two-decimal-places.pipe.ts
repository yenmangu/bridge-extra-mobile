import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'twoDecimalPlaces',
	standalone: true
})
export class TwoDecimalPlacesPipe implements PipeTransform {
	transform(value: string | number): string {
		let numValue;
		typeof value === 'number' ? (numValue = value) : (numValue = parseFloat(value));

		return (isNaN(numValue) ? value : Math.round(numValue * 100) / 100).toString();
	}
}
