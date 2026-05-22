# Vaani - Vernacular Content Tool for Indian Creators

A comprehensive AI-powered content creation platform designed for Indian creators who want to generate, translate, and schedule content in Kannada, Tamil, and Malayalam.

## Features

- **AI Caption Generation**: Generate engaging captions powered by Claude AI
- **Smart Translation**: Contextual, culturally-appropriate translations (not machine-translated)
- **Content Scheduling**: Schedule posts to Instagram and Facebook
- **Usage Analytics**: Track monthly usage against plan limits
- **Multiple Languages**: Support for Kannada, Tamil, and Malayalam
- **Flexible Plans**: Free, Starter, Pro, and Enterprise plans

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL with Supabase
- **Authentication**: Supabase Auth (Google OAuth)
- **AI**: Claude API (claude-haiku-4-5)
- **Payments**: Razorpay
- **Job Queue**: Upstash QStash
- **Rate Limiting**: Upstash Redis
- **Monitoring**: Sentry

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Supabase project
- Claude API key
- Razorpay account
- Upstash account (QStash + Redis)

### Installation

1. Clone the repository

```bash
git clone https://github.com/alvionixedge/Vaani-GH.git
cd Vaani-GH
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in your credentials in `.env.local`

4. Set up the database

```bash
npx prisma db push
```

5. Run the development server

```bash
npm run dev
```

Visit `http://localhost:3000`

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── generate/       # Caption generation endpoint
│   │   ├── translate/      # Translation endpoint
│   │   ├── schedule/       # Schedule management endpoints
│   │   ├── usage/          # Usage stats endpoint
│   │   └── webhooks/       # Payment webhooks
│   ├── dashboard/          # Protected dashboard pages
│   ├── auth/               # Authentication pages
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/
│   └── dashboard/          # Dashboard components
├── lib/
│   ├── anthropic.ts        # Claude API wrapper
│   ├── supabase.ts         # Supabase client
│   ├── usage.ts            # Usage tracking logic
│   └── validations.ts      # Zod schemas
└── middleware.ts           # Auth middleware
```

## API Endpoints

### POST /api/generate
Generate a caption in the target language.

**Request**:
```json
{
  "topic": "string",
  "language": "kannada" | "tamil" | "malayalam",
  "tone": "PROFESSIONAL" | "CASUAL" | "FORMAL" | "INFORMATIVE"
}
```

**Response**:
```json
{
  "id": "uuid",
  "caption": "string",
  "created_at": "timestamp"
}
```

### POST /api/translate
Translate text to a target language.

**Request**:
```json
{
  "text": "string",
  "language": "kannada" | "tamil" | "malayalam"
}
```

### POST /api/schedule
Schedule a post for publishing.

**Request**:
```json
{
  "content": "string",
  "platform": "instagram" | "facebook",
  "scheduled_time": "ISO 8601 datetime"
}
```

### GET /api/usage
Get current month usage statistics.

**Response**:
```json
{
  "current": 5,
  "limit": 50,
  "remaining": 45,
  "plan": "starter"
}
```

## Development Roadmap

### Week 1-2: Core Engine ✨
- [x] Supabase setup
- [x] Prisma schema
- [x] Database triggers for user creation
- [x] Row-Level Security policies
- [x] Google OAuth
- [x] Dashboard middleware
- [x] Caption generation endpoint
- [x] Translation endpoint
- [x] Usage enforcement

### Week 3-4: Dashboard UI
- [ ] Landing page polish
- [ ] Login page
- [ ] Dashboard shell
- [ ] Generate page
- [ ] Translate page
- [ ] Usage meter
- [ ] Generation history
- [ ] Error handling UI

### Week 5-6: Scheduler + Instagram
- [ ] Instagram OAuth
- [ ] Token refresh cron
- [ ] Schedule endpoints
- [ ] QStash integration
- [ ] Calendar UI
- [ ] Scheduled posts list

### Week 7-8: Payments & Production
- [ ] Razorpay setup
- [ ] Subscription endpoints
- [ ] Billing page
- [ ] Rate limiting
- [ ] Input validation
- [ ] Error logging
- [ ] Domain setup
- [ ] E2E testing

## License

Proprietary - Confidential

## Contact

Created by alvionixedge for the Indian creator community.
