export interface ITranslateLanguages {
  from: ILang[];
  to: ILang[];
}

export interface ILang {
  id: string;
  value: string;
}

export interface ITranslateText {
  from: string;
  to: string;
  text: string;
  libras?: any;
  translated?: string;
  error?: string
}
