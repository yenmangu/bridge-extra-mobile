import { removeDatePipe } from './remove-date.pipe';

describe('TruncateNamePipe', () => {
	it('create an instance', () => {
		const pipe = new removeDatePipe();
		expect(pipe).toBeTruthy();
	});
});
