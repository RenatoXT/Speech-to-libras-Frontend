import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatorComponent } from './translator/translator.component';

import { TranslateService } from './../../services/translate.service';

@NgModule({
  declarations: [
    TranslatorComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    TranslateService
  ],
  exports: [
    TranslatorComponent
  ]
})
export class TranslatorModule { }
