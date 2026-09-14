import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private readonly pool: Pool;

  constructor(private readonly configService: ConfigService) {
    this.pool = new Pool({
      connectionString: this.configService.get<string>('DATABASE_URL'),
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  async query(text: string, params?: unknown[]) {
    return this.pool.query(text, params);
  }


//   আগে Database Connection Test করি
 async testConnection() {
    const result = await this.pool.query('SELECT NOW()');

    return result.rows;
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}