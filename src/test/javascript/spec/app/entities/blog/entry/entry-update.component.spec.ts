/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../../test.module';
import { EntryUpdateComponent } from 'app/entities/blog/entry/entry-update.component';
import { EntryService } from 'app/entities/blog/entry/entry.service';
import { Entry } from 'app/shared/model/blog/entry.model';

import { BlogService } from 'app/entities/blog/blog';
import { TagService } from 'app/entities/blog/tag';

describe('Component Tests', () => {
    describe('Entry Management Update Component', () => {
        let comp: EntryUpdateComponent;
        let fixture: ComponentFixture<EntryUpdateComponent>;
        let service: EntryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [EntryUpdateComponent],
                providers: [BlogService, TagService, EntryService]
            })
                .overrideTemplate(EntryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EntryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntryService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Entry(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.entry = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Entry();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.entry = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
