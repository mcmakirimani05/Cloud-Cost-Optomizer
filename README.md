# Cloud Cost Optimization Advisor

A comprehensive web application to analyze cloud billing data, identify cost optimization opportunities, and provide actionable recommendations for rightsizing resources and reducing cloud infrastructure costs.

## Features

- 📊 **Upload & Analyze**: Upload cloud billing CSV data from AWS, Azure, GCP
- 💡 **Smart Recommendations**: Idle resources, underutilized VMs, rightsizing suggestions
- 💰 **Savings Dashboard**: Visualize current spend, potential savings, and top offenders
- 📈 **Export Reports**: Download recommendations as PDF or CSV
- 🔐 **Secure**: Built with authentication and multi-tenant support
- ⚡ **Fast**: Real-time analysis with optimized background processing

## Tech Stack

### Frontend
- Next.js 14 (React 18)
- TypeScript
- Tailwind CSS
- Recharts for data visualization

### Backend
- Node.js + Fastify
- TypeScript
- GraphQL (Apollo)
- PostgreSQL with TimescaleDB
- BullMQ for job queue

## Quick Start

```bash
npm install
docker-compose up -d
npm run db:migrate
npm run dev
```

## License

MIT