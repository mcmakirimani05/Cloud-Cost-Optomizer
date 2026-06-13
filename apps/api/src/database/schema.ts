import db from './client';

const initSchema = `
  CREATE TABLE IF NOT EXISTS billing_uploads (
    id UUID PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS recommendations (
    id UUID PRIMARY KEY,
    analysis_id UUID NOT NULL REFERENCES billing_uploads(id) ON DELETE CASCADE,
    data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    tier VARCHAR(50) DEFAULT 'free',
    analyses_this_month INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_recommendations_analysis_id ON recommendations(analysis_id);
  CREATE INDEX IF NOT EXISTS idx_billing_uploads_created_at ON billing_uploads(created_at);
`;

export async function initDatabase() {
  try {
    await db.query(initSchema);
    console.log('Database schema initialized');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
}