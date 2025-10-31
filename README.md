# Secret Santa Exchange 🎅

Secret Santa Exchange is an AI-powered Secret Santa platform that makes gift exchanges delightful and effortless. Perfect for organizing gift exchanges between colleagues, friends, and family, Secret Santa Exchange takes the guesswork out of gift-giving with personalized AI suggestions.

## 🎄 Hackathon Project

This project was created for the Let's Get Technical (LGT) discord community hackathon in December 2024.

## Prompt

Greetings Elves! Christmas is around the corner and Santa needs your help. Billions of people participate in Secret Santa and many of them have no idea what they want for Christmas. Vise versa, many gifsters have no clue what kind of gift to give and want to ensure they're buying something valuable for their secret Santa. He needs a web application built that allows users to login and provide what they enjoy in life. This will help the secret Santa individuals narrow down a gift using Elecretanta (el-cre-tan-ta), our Elf Secret Santa AI technology.

Elecretanta has a special algorithm. It gathers users likes, hobbies, and uses the groups spending budget to find the best gift options. Who wants a lousy gift that will sit in storage?! No one. Allow Elecretanta to find gifts for individuals that wont be forgotten after the day of gift exchange.

Requirements from Santa:

- Allow user to save their profile

- Ability for user to fill out their likes and or hobbies via text or image

- Group creation with a budget for gifts

- Usage of AI to help find gift ideas

## 👥 Contributors

- [Thomas Nguyen](https://www.linkedin.com/in/thomasnguyensoftware/)
- [Cody Epstein](https://www.linkedin.com/in/cody-epstein/)
- [Alex Appleget](https://www.linkedin.com/in/alex-appleget/)
- [Jennifer Tieu](https://www.linkedin.com/in/jennifertieu/)
- [Dominic Monaco](https://www.linkedin.com/in/dominick-j-monaco/)

## ✨ Features

### Smart Gift Exchange Management

- Create and manage gift exchange groups

- Easily share and join exchanges with invite links

- Automatic Secret Santa matching

- Mobile-responsive design for gifting on the go

### AI-Powered Gift Suggestions

- Personalized gift recommendations based on recipient profiles

- Smart matching algorithm considers:

- Personal interests and hobbies

- Gift preferences (practical vs whimsical, cozy vs adventurous)

- Budget

- Items to avoid

- Gift suggestions include detailed reasoning for each match

### User Experience

- Simple Google sign-in

- Guided profile creation to help the AI understand your preferences

- Intuitive interface for managing multiple gift exchanges

### 📸 Screenshots

<a href="https://ibb.co/5v52h2j"><img src="https://i.ibb.co/q9RxYxg/Screenshot-2025-01-06-at-11-27-49-AM.png" alt="Screenshot-2025-01-06-at-11-27-49-AM" border="0"></a>
<a  href="https://ibb.co/3MyRRYn"><img  src="https://i.ibb.co/fnYDDGs/Screenshot-2025-01-06-at-11-19-28-AM.png"  alt="Screenshot-2025-01-06-at-11-19-28-AM"  border="0"></a>
<a  href="https://ibb.co/sK2wYVH"><img  src="https://i.ibb.co/x1DjT7H/Screenshot-2025-01-06-at-11-21-56-AM.png"  alt="Screenshot-2025-01-06-at-11-21-56-AM"  border="0"></a>
<a  href="https://ibb.co/hRQS1bW"><img  src="https://i.ibb.co/zh9zHpR/Screenshot-2025-01-06-at-11-22-54-AM.png"  alt="Screenshot-2025-01-06-at-11-22-54-AM"  border="0"></a>

## 🚀 Getting Started

### Prerequisites

- Node.js

- pnpm, npm or yarn

- Google account for authentication

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```

NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"

NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"

OPENAI_API_KEY="your_openai_api_key"

GOOGLE_API_KEY="your_google_api_key"

GOOGLE_CSE_ID="your_google_cse_id"

```

### Installation

```bash
# Clone the repository

git  clone  git@github.com:guardiansofthegit-collab/elecretanta.git

# Install dependencies

pnpm  install
# or
npm  install
# or
yarn  install



# Run the development server

pnpm  dev
# or
npm  run  dev
# or
yarn  dev
```

The application will be available at `http://localhost:4000`

## 🛠 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/)
- **Authentication & Database**: [Supabase](https://supabase.com/)
- **AI Integration**: [OpenAI API](https://platform.openai.com/docs/overview)
- **Form Management**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)

## 📱 User Flow

1. Sign in with Google

2. Complete gift profile questionnaire

3. Create or join a gift exchange

4. Wait for Secret Santa matching

5. Receive AI-powered gift suggestions based on your recipient's profile

## 🚀 Deployment

This project is optimized for deployment on Vercel. Simply connect your repository to Vercel and it will handle the build and deployment process automatically.

## 🗺 Roadmap

- [ ] Amazon affiliate link integration for gift suggestions
