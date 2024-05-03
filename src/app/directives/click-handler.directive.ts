import {
	Directive,
	ElementRef,
	EventEmitter,
	HostListener,
	Output
} from '@angular/core';

@Directive({
	selector: '[appClickHandler]'
})
export class ClickHandlerDirective {
	@Output() clickEvent: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

	@HostListener('click', ['$event'])
	handleEvent(event: MouseEvent) {
		this.clickEvent.emit(event);
	}
}
