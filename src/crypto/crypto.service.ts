import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CryptoInterface } from './interfaces/crypto.interfase';

@Injectable()
export class CryptoService {
  async getCryptoData(): Promise<object> {
    try {
      const cryptoData = await axios.get('https://api.coincap.io/v2/assets', {
        params: {
          limit: 5,
        },
      });
      return cryptoData.data.data;
    } catch (error) {
      return new HttpException('Internal server erorr', 500);
    }
  }

  async formatedResponse(): Promise<CryptoInterface[]> {
    const cryptoData: any = await this.getCryptoData();
    return cryptoData.map((cryptoCurrency) => ({
      id: cryptoCurrency.id,
      name: cryptoCurrency.name,
      symbol: cryptoCurrency.symbol,
      rank: cryptoCurrency.rank,
      price: cryptoCurrency.priceUsd,
    }));
  }
}
