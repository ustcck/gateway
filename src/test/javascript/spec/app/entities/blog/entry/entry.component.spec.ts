/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { EntryComponent } from 'app/entities/blog/entry/entry.component';
import { EntryService } from 'app/entities/blog/entry/entry.service';
import { Entry } from 'app/shared/model/blog/entry.model';

describe('Component Tests', () => {
    describe('Entry Management Component', () => {
        let comp: EntryComponent;
        let fixture: ComponentFixture<EntryComponent>;
        let service: EntryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [EntryComponent],
                providers: [EntryService]
            })
                .overrideTemplate(EntryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EntryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                Observable.of(
                    new HttpResponse({
                        body: [new Entry(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.entries[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
