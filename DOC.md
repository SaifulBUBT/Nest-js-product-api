## CLI

nest g controller product
nest g service product
nest g module product

nest g class products/dto/create-product.dto --no-spec --flat


## Node packages
npm install class-validator class-transformer

class-validator
কাজ: Incoming data valid কিনা check/validate করে।

class-transformer
কাজ: Incoming data-কে এক format/type থেকে অন্য format-এ transform/convert করতে সাহায্য করে।



//
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true, // DTO-তে যেসব property define করা নেই, সেগুলো remove করে দেওয়া।
    forbidNonWhitelisted: true, // DTO-তে নেই এমন property পেলে silently remove করবে না; বরং 400 Bad Request error দেবে।
  }),
);


### Supabse(postgreSQL) er sahte nest js connection

npm install @nestjs/config

app.module.ts:

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}


.env file e:
DATABASE_URL = postgresql://postgres.igtzyozpnbqkkhpjiwpy:VgOU3EaYxg9umOvw@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres