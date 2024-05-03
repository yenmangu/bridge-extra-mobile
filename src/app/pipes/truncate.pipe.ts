import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'truncate',
	standalone: true
})
export class TruncatePipe implements PipeTransform {
	transform(value: string, maxLength: number): string {
		if (!value) {
			return '';
		}
		if (value.length <= maxLength) {
			return value;
		} else {
			return value.substring(0, maxLength) + '...';
		}
	}
}

/*
This custom pipe provides a truncation service for the data displayed in the
table.

It ensures a consistent and concise display of information, whilst not affecting
the integrity of the underlying source data.

Usage:
  To use, register the pipe in the component and apply it with
  `header | truncate : <maxLength: number>`

Note:
	If the `maxLength` variable is greater than the length of the `value`,
	the pipe will return the original `value`
*/
