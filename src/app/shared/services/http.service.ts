import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class HttpService {
	apiUrl = environment.API_URL;
	testTorneo = '2024-02-20 #32690 Pairs MEDITERRANEO';

	constructor(private http: HttpClient) {}

	initialTest(): Observable<any> {
		let params = new HttpParams();
		params = params
			.append('dbName', 'BEX')
			.append('action', 'q_game_list')
			.append('datefrom', '2024-02-20')
			.append('dateTo', '2024-02-23');
		let headers = new HttpHeaders();
		const options = { headers, params };
		headers = headers.append(
			'Cookie',
			'DbName2=BEX; ASPSESSIONIDCGBQTSBS=KGFPCIDBKNEIEJGMDBCFDPNN'
		);
		return this.http.get(`${this.apiUrl}`, options);
	}

	reqInitialTournamentList(): Observable<any> {
		let params = new HttpParams();
		params = params.append('view', 'qGameList').append('all', 'true');
		return this.http.get(`${this.apiUrl}/database`, { params });
	}

	reqData(view: string, options?: any, queryParams?: any): Observable<any> {
		console.log('View: ', view, '\nQueryParams: ', queryParams);

		let urlParams = new HttpParams();
		urlParams = urlParams.set('view', view);
		if (queryParams) {
			Object.keys(queryParams).forEach(key => {
				urlParams = urlParams.append(key, queryParams[key]);
			});
		}
		console.log('url params: ', urlParams);

		return this.http.get(`${this.apiUrl}/database/`, { params: urlParams });
	}

	reqTournamentRankData(tournament: string): Observable<any> {
		let params = new HttpParams();
		// dev
		console.log('tournament in http: ', tournament);
		params = params.append('tournament', tournament);
		console.log('Params: ', params);
		// live
		// params.append('tournament', tournament);
		return this.http.get(`${this.apiUrl}/tournament-rank`, { params });
	}

	reqTournamentScoreData(tournament: string): Observable<any> {
		let params = new HttpParams();
		// params = params.append('tournament', this.testTorneo);
		params = params.append('tournament', tournament);

		return this.http.get(`${this.apiUrl}/database/tournament-scores`, { params });
	}

	reqPlayerData(playerName: string): Observable<any> {
		let params = new HttpParams();
		params.set('player', playerName);
		return this.http.get(`${this.apiUrl}/database/players`, { params });
	}
}
