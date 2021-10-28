// import { TranslatorComponent } from './../../components/translator/translator/translator.component';
import { TranslatorModule } from './../../components/translator/translator.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/components/shared/shared.module';

import { TranslateService } from 'src/app/services/translate.service';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslatorModule,
  ],
})
export class HomeModule { }
