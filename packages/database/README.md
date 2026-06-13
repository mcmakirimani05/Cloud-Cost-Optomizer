# Database Package

Database migrations and schema management for Cloud Cost Optimizer.

## Migrations

- `001_initial_schema.sql` - Create base tables and indexes
- `002_add_audit_and_sessions.sql` - Add audit logging and session tracking

## Running Migrations

```bash
npm run migrate
```

## Environment Variables

- `DB_USER` - PostgreSQL user (default: costadmin)
- `DB_PASSWORD` - PostgreSQL password (default: costpassword)
- `DB_HOST` - Database host (default: localhost)
- `DB_PORT` - Database port (default: 5432)
- `DB_NAME` - Database name (default: cloud_cost_optimizer)