import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'nullConversion',
	standalone: true
})
export class NullConversionPipe implements PipeTransform {
	transform(value: any): string {
		if (Number.isNaN(value)) {
			return '-';
		}
		return value;
	}
}
