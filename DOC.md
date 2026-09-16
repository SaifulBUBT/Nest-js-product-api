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

npm intall pg
npm install @type/pg

## JWT

https://github.com/farzeen-ali/PostgreSQL-with-NEST-JS

npm i jsonwebtoken

JWT_SUPABASE_SECRET = 8Lc3Cm3FLileF6ManXCF/Noq+V2JsLS3D6bqJPO2RcV705ajDPEf7RLL5beOc20Mn5YTZxU0FZsRVtU4TaUlxw==

app.module.ts
supabase.auth.guard.ts
employees.controller.ts




    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoic2FpZnVsQGdtYWlsLmNvbSIsImlhdCI6MTc4OTUzODI0NywiZXhwIjoxNzg5NTQxODQ3fQ.AtcLs4J0CPMkryRSO-LpZSt3V1NGo5Fs_FkzNAdb4q4"
