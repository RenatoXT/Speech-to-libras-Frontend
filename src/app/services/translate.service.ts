import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ITranslateLanguages, ITranslateText } from '../models/translate.model';

@Injectable()
export class TranslateService {

  path = environment.apiUrl + "/Translate";

  constructor(private http: HttpClient) { }

  getLanguages() {
    const path = this.path + "/Languages";

    return this.http.get<ITranslateLanguages>(path).toPromise();
  }

  postTranslate(from: string, to: string, text: string) {
    const path = this.path ;

    const params = { from, to, text };

    console.log(params)
    return this.http.post<ITranslateText>(path, params).toPromise();
  }

}
