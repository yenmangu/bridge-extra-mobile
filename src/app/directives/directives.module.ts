import { NgModule, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassDataToTemplateDirective } from './pass-data-to-template.directive';
import { ClickHandlerDirective } from './click-handler.directive';

@NgModule({
	declarations: [PassDataToTemplateDirective, ClickHandlerDirective],
	imports: [CommonModule],
	exports: [PassDataToTemplateDirective, ClickHandlerDirective]
})
export class DirectivesModule {}
