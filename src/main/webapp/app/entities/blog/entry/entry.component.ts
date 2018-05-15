import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IEntry } from 'app/shared/model/blog/entry.model';
import { Principal } from 'app/core';
import { EntryService } from './entry.service';

@Component({
    selector: 'jhi-entry',
    templateUrl: './entry.component.html'
})
export class EntryComponent implements OnInit, OnDestroy {
    entries: IEntry[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private entryService: EntryService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.entryService.query().subscribe(
            (res: HttpResponse<IEntry[]>) => {
                this.entries = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEntries();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEntry) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInEntries() {
        this.eventSubscriber = this.eventManager.subscribe('entryListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
