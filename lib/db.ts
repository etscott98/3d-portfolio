import { Pool } from 'pg';

let pool: Pool | null = null;

export function getPool(): Pool | null {
  if (!process.env.DATABASE_URL) {
    console.warn('DATABASE_URL not configured');
    return null;
  }

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes('supabase') 
        ? { rejectUnauthorized: false } 
        : false
    });
  }

  return pool;
}

