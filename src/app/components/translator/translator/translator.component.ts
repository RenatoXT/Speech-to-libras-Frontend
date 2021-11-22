import { TranslateService } from './../../../services/translate.service';
import {
  ILang,
  ITranslateLanguages,
  ITranslateText,
} from './../../../models/translate.model';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser"

interface ILibrasResponse {
  data: any,
  encoding: string,
  md5: string,
  mimetype: string,
  name: string,
  size: number,
  _id: string
}

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.scss'],
})
export class TranslatorComponent implements OnInit {
  translated: string = "";
  loading: boolean = false;
  languages: any;
  libras = false;
  librasTranslated: any;

  // TODO tratamento de erro
  // TODO Layout geral
  // TODO Criação da tela de usuário
  // TODO add JWT
  // TODO integração com o endpoint do usuário
  // TODO configurar o manifest
  // TODO criar logo da aplicação
  // TODO testes

  constructor(private _service: TranslateService, private _sanitization: DomSanitizer) {}

  async ngOnInit() {
    await this.getLanguages();
  }

  private getLanguages() {
    this.toggleLoading();
    const result = this._service.getLanguages().then((data: ITranslateLanguages) => {
      this.languages = { ...data };

      this.toggleLoading();

      return data;
    });

    return result;

  }

  public async translate(from: string, to: string, text: string) {
    let result;
    const fromId = this.languages.from.find( (element : ILang) => element.value == from).id;
    const toId = this.languages.to.find( (element : ILang) => element.value == to).id;

    try {
      this.toggleLoading();
      result = await this._service
        .postTranslate( fromId, toId, text )
        .then((result: ITranslateText) => {
          this.toggleLoading();
          return result;
        });


        if ( result.libras ) {
          // this.translated = result.libras.translation.flat(1);
          this.librasTranslated = result.translated;
          this.libras = true;
        } else {
          this.libras = false;
          this.translated = result.translated || "";
        }

        if (result.error) {
          throw result.error
        }


      // return result;

    } catch (error: any) {

      const err = {
        message: error.error.error,
        stack: error
      }

      this.translated = err.message;

      console.error(err);

    }

  }

  public sanitizeImg(img: ILibrasResponse) {
    const src = 'data:' + img.mimetype + ';charset=utf-8;' + img.encoding + ',' + img.data;

    const sanitezed = this._sanitization.bypassSecurityTrustUrl(src);
    return sanitezed;
  }

  private toggleLoading(value?: boolean): boolean {
    if (value !== undefined) {
      this.loading = value;

      console.log(this.loading ? "iniciando loading" : "encerrando loading")

      return this.loading;
    }

    this.loading = !this.loading;

    console.log(this.loading ? "iniciando loading" : "encerrando loading")

    return this.loading;
  }
}
