import { NgModule, LOCALE_ID } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import locale from '@angular/common/locales/zh-Hans';

import {
    JhiLanguageHelper,
    LoginService,
    AccountService,
    StateStorageService,
    Principal,
    CSRFService,
    AuthServerProvider,
    UserService,
    UserRouteAccessService
} from './';

@NgModule({
    imports: [HttpClientModule],
    exports: [],
    declarations: [],
    providers: [
        LoginService,
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'zh-Hans'
        },
        JhiLanguageHelper,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        UserService,
        DatePipe,
        UserRouteAccessService
    ]
})
export class GatewayCoreModule {
    constructor() {
        registerLocaleData(locale);
    }
}
