import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'removeDate',
	standalone: true
})
export class removeDatePipe implements PipeTransform {
	transform(value: string): string {
		const parts = value.split('#');
		return parts.length > 1 ? `#${parts[1].trim()}` : value;
	}
}

/*
This custom pipe removes the date segment from the `torneo` string.

It ensures a concise display of the `torneo` element within the tables, without
affecting the integrity of the underlying source data.

Usage:
  To use, register the pipe in the component and apply it with
  `torneoString | removeDate`

*/
