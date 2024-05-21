import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'removePlayerCode',
	standalone: true
})
export class RemovePlayerCodePipe implements PipeTransform {
	transform(value: string, isPlayer: boolean): string {
		if (isPlayer) {
			return value.split('-')[1];
		}
		return value;
	}
}
