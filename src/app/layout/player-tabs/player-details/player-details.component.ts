import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SinglePlayer } from 'src/app/shared/interfaces/single-player';

@Component({
	selector: 'app-player-details',
	standalone: true,
	imports: [],
	templateUrl: './player-details.component.html',
	styleUrl: './player-details.component.scss'
})
export class PlayerDetailsComponent {
	@Input() playerData: SinglePlayer;
	@Output() emitData: EventEmitter<any>;

	constructor() {}
}
