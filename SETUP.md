# Vaani Development Setup Guide

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

### Supabase
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
```

### Claude API
```
ANTHROPIC_API_KEY=sk-ant-...
```

### Razorpay
```
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_...
RAZORPAY_KEY_SECRET=your-razorpay-secret
```

### Instagram Graph API
```
INSTAGRAM_APP_ID=your-app-id
INSTAGRAM_APP_SECRET=your-app-secret
NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI=https://your-domain.com/api/auth/instagram/callback
```

### Upstash
```
QSTASH_TOKEN=your-qstash-token
QSTASH_SIGNING_SECRET=your-signing-secret
UPSTASH_REDIS_URL=redis://...
UPSTASH_REDIS_TOKEN=your-redis-token
```

### Sentry
```
SENTRY_AUTH_TOKEN=your-sentry-token
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

### App Configuration
```
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@localhost:5432/vaani
NODE_ENV=development
```

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Set up Prisma:
```bash
npx prisma db push
npx prisma generate
```

3. Run development server:
```bash
npm run dev
```

4. Open http://localhost:3000

## Database Setup

### Supabase

1. Create a new Supabase project
2. Set region to `ap-south-1` (Asia Pacific - Singapore)
3. Get credentials from Project Settings > API
4. Update `.env.local` with credentials

### Enable Row-Level Security

For each table in `prisma/schema.prisma`, enable RLS:

```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
```

### Create Policies

```sql
-- Users table
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Generations table
CREATE POLICY "Users can read own generations" ON generations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own generations" ON generations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Scheduled Posts table
CREATE POLICY "Users can manage own scheduled posts" ON scheduled_posts
  FOR ALL USING (auth.uid() = user_id);

-- Subscriptions table
CREATE POLICY "Users can read own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);
```

## API Configuration

### Claude API
- Get API key from https://console.anthropic.com/
- Set model to `claude-haiku-4-5`
- Temperature: 0.8 for creative, 0.4 for formal

### Razorpay
- Create account at https://razorpay.com/
- Create subscription plans in dashboard
- Get API keys from Settings > API Keys

### Upstash
- Create QStash project at https://upstash.com/
- Create Redis database for rate limiting
- Get tokens from project dashboard

## Testing

Run tests:
```bash
npm run test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Deployment

### Vercel

1. Connect GitHub repository to Vercel
2. Add environment variables in Project Settings
3. Deploy main branch

### Database Migrations

Before deploying:
```bash
npx prisma db push
```

## Troubleshooting

### Authentication Issues
- Clear browser cookies
- Check Supabase Auth settings
- Verify OAuth callback URL

### API Rate Limiting
- Check Upstash Redis connection
- Review request patterns
- Adjust limits in `src/lib/ratelimit.ts`

### Claude API Errors
- Verify API key is valid
- Check token usage at https://console.anthropic.com/
- Review error messages in logs

## Next Steps

1. Complete Week 1-2 tasks (core engine)
2. Implement dashboard UI (Week 3-4)
3. Add Instagram integration (Week 5-6)
4. Setup payments and go live (Week 7-8)
