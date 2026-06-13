-- Initial schema for Cloud Cost Optimizer

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  tier VARCHAR(50) DEFAULT 'free' CHECK (tier IN ('free', 'pro', 'enterprise')),
  analyses_this_month INT DEFAULT 0,
  subscription_start DATE,
  subscription_end DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS billing_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  filename VARCHAR(255) NOT NULL,
  file_size INT,
  records_count INT DEFAULT 0,
  data JSONB,
  status VARCHAR(50) DEFAULT 'processed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS billing_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  upload_id UUID NOT NULL REFERENCES billing_uploads(id) ON DELETE CASCADE,
  service VARCHAR(255),
  cost DECIMAL(10, 2),
  usage DECIMAL(10, 2),
  instance_type VARCHAR(255),
  region VARCHAR(255),
  billing_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  upload_id UUID NOT NULL REFERENCES billing_uploads(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL CHECK (type IN ('idle', 'underutilized', 'rightsizing', 'reserved_instance')),
  resource VARCHAR(255),
  current_cost DECIMAL(10, 2),
  estimated_savings DECIMAL(10, 2),
  savings_percentage DECIMAL(5, 2),
  description TEXT,
  action TEXT,
  priority VARCHAR(50) DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  status VARCHAR(50) DEFAULT 'open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS savings_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  upload_id UUID NOT NULL REFERENCES billing_uploads(id) ON DELETE CASCADE,
  total_current_spend DECIMAL(12, 2),
  total_potential_savings DECIMAL(12, 2),
  savings_percentage DECIMAL(5, 2),
  recommendation_count INT DEFAULT 0,
  top_offenders JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS exports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  upload_id UUID NOT NULL REFERENCES billing_uploads(id) ON DELETE CASCADE,
  format VARCHAR(50) CHECK (format IN ('pdf', 'csv')),
  file_path VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_billing_uploads_user_id ON billing_uploads(user_id);
CREATE INDEX IF NOT EXISTS idx_billing_uploads_created_at ON billing_uploads(created_at);
CREATE INDEX IF NOT EXISTS idx_billing_data_upload_id ON billing_data(upload_id);
CREATE INDEX IF NOT EXISTS idx_billing_data_service ON billing_data(service);
CREATE INDEX IF NOT EXISTS idx_recommendations_upload_id ON recommendations(upload_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_type ON recommendations(type);
CREATE INDEX IF NOT EXISTS idx_recommendations_status ON recommendations(status);
CREATE INDEX IF NOT EXISTS idx_savings_metrics_upload_id ON savings_metrics(upload_id);