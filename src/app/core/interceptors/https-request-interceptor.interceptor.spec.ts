import { TestBed } from '@angular/core/testing';

import { HttpsRequestInterceptorInterceptor } from './https-request-interceptor.interceptor';

describe('HttpsRequestInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpsRequestInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpsRequestInterceptorInterceptor = TestBed.inject(HttpsRequestInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
