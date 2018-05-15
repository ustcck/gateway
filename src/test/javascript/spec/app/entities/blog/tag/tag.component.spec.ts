/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { TagComponent } from 'app/entities/blog/tag/tag.component';
import { TagService } from 'app/entities/blog/tag/tag.service';
import { Tag } from 'app/shared/model/blog/tag.model';

describe('Component Tests', () => {
    describe('Tag Management Component', () => {
        let comp: TagComponent;
        let fixture: ComponentFixture<TagComponent>;
        let service: TagService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TagComponent],
                providers: [TagService]
            })
                .overrideTemplate(TagComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TagComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TagService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                Observable.of(
                    new HttpResponse({
                        body: [new Tag(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.tags[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
