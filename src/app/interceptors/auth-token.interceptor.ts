import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@environments/environment';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('api.football-data.org')) {
    const token = environment.apiKey;
    const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/' + req.url;

    const modifiedRequest = req.clone({
      url: corsProxyUrl,
      setHeaders: {
        'X-Auth-Token': token,
      },
    });
    return next(modifiedRequest);
  }

  return next(req);
};
