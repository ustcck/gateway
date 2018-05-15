import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProduct } from 'app/shared/model/store/product.model';

type EntityResponseType = HttpResponse<IProduct>;
type EntityArrayResponseType = HttpResponse<IProduct[]>;

@Injectable()
export class ProductService {
    private resourceUrl = SERVER_API_URL + 'store/api/products';
    private resourceSearchUrl = SERVER_API_URL + 'store/api/_search/products';

    constructor(private http: HttpClient) {}

    create(product: IProduct): Observable<EntityResponseType> {
        return this.http.post<IProduct>(this.resourceUrl, product, { observe: 'response' });
    }

    update(product: IProduct): Observable<EntityResponseType> {
        return this.http.put<IProduct>(this.resourceUrl, product, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProduct>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProduct[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProduct[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
