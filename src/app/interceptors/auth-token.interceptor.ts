import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = environment.apiKey;

  if (req.url.includes('api.football-data.org')) {
    const modifiedRequest = req.clone({
      setHeaders: {
        'X-Auth-Token': token,
      },
    });
    return next(modifiedRequest);
  }

  return next(req);
};
