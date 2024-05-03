import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[appPassDataToTemplate]'
})
export class PassDataToTemplateDirective {
	constructor(
		private templateRef: TemplateRef<any>,
		private viewContainer: ViewContainerRef
	) {}

	@Input() set appPassDataToTemplate(data: any) {
		this.viewContainer.clear();
		this.viewContainer.createEmbeddedView(this.templateRef, {
			$implicit: data
		});
	}
}
