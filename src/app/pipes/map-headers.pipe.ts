import { Pipe, PipeTransform } from '@angular/core';
import { headerMappings } from '../shared/data/header.mappings';

@Pipe({
	name: 'mapHeaders',
	standalone: true
})
export class MapHeadersPipe implements PipeTransform {
	transform(headerString: string): string {
		return headerMappings[headerString] || headerString;
	}
}
/*
This custom pipe provides a translation / English equivalent service for the
headers and keys in the original source data from Damiano's database.

It ensures a seamless presentation of data in English without affecting the
integrity of the underlying source data.

Usage:
  To use, register the pipe in the component and apply it with
  `header | mapHeaders`

Note:
  Ensure that the headers and keys in the original data are covered in the
  `headerMappings` mapping for accurate translation.

 */
