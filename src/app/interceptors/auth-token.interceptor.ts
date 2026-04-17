import { HttpInterceptorFn } from '@angular/common/http';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = 'e113416506b94befada60c5b3db3b42f';

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
