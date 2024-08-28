import { Controller, Sse } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { interval, Observable, startWith, switchMap } from 'rxjs';
import { CryptoInterface } from './interfaces/crypto.interfase';

@Controller('crypto')
export class CryptoController {
  constructor(private cryptoService: CryptoService) {}

  @Sse('stream')
  sendCryptoData(): Observable<{ data: CryptoInterface[] }> {
    return interval(30000).pipe(
      startWith(0),
      switchMap(async () => {
        const data = await this.cryptoService.formatedResponse();
        return { data };
      }),
    );
  }
}
