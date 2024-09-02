import { Controller, Sse } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import {
  catchError,
  interval,
  Observable,
  startWith,
  switchMap,
  from,
  of,
} from 'rxjs';
import { CryptoInterface } from './interfaces/crypto.interfase';

@Controller('crypto')
export class CryptoController {
  constructor(private cryptoService: CryptoService) {}

  @Sse('stream')
  sendCryptoData(): Observable<{
    data: CryptoInterface[] | { error: any };
  }> {
    return interval(30000).pipe(
      startWith(0),
      switchMap(() =>
        from(this.cryptoService.formatedResponse()).pipe(
          switchMap((data) => of({ data })),
          catchError((error) => of({ data: { error: error.message } })),
        ),
      ),
    );
  }
}
