import { Module } from '@nestjs/common';
import { CryptoModule } from './crypto/crypto.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    CryptoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
