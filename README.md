# 🧠 QuizMaster

Aplikasi kuis modern berbasis **React + TypeScript** untuk nguji pengetahuan kamu lewat soal dari **Open Trivia Database API**.  
Cukup login pakai nama, atur kuis sesuai keinginan, dan mulai main!

![Preview](https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=1200&h=600&fit=crop)

---

## ✨ Fitur Utama

- 🎯 Login tanpa backend (cukup masukkan nama)
- ⚙️ Kuis bisa dikustom (jumlah soal, kategori, tingkat kesulitan, tipe soal)
- ⏱️ Timer dengan countdown visual
- 💾 Auto-save progres (bisa lanjut walau browser ditutup)
- 📊 Hasil lengkap + review jawaban
- 📱 Desain responsif + animasi halus (Framer Motion)
- 🔐 Gratis, tanpa API key (pakai OpenTDB)

---

## 🚀 Cara Menjalankan

### 1️⃣ Instalasi

```bash
git clone https://github.com/kzncod-e/trivia-trek-react
cd quizmaster
npm install
npm run dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
quizmaster/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Login.tsx       # Login screen
│   │   ├── QuizSettings.tsx # Quiz configuration
│   │   ├── Quiz.tsx        # Main quiz container
│   │   ├── Question.tsx    # Single question display
│   │   ├── Timer.tsx       # Timer component
│   │   ├── ProgressBar.tsx # Progress indicator
│   │   ├── Results.tsx     # Results screen
│   │   ├── ErrorBoundary.tsx
│   │   └── LoadingScreen.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── use-timer.ts    # Timer logic
│   │   └── use-toast.ts    # Toast notifications
│   ├── types/              # TypeScript types
│   │   └── quiz.ts         # Quiz-related types
│   ├── utils/              # Utility functions
│   │   ├── api.ts          # OpenTDB API integration
│   │   ├── decode.ts       # HTML entity decoder
│   │   └── storage.ts      # localStorage helpers
│   ├── pages/              # Page components
│   │   ├── Index.tsx       # Main app logic
│   │   └── NotFound.tsx    # 404 page
│   ├── App.tsx             # App wrapper
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles & design system
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.ts          # Vite configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎨 Design System

The app uses a modern, vibrant design system with:

- **Primary Color**: Vibrant purple-blue gradient
- **Success Color**: Bright green for correct answers
- **Error Color**: Red for incorrect answers
- **Smooth Animations**: Spring-based transitions
- **Responsive Layout**: Mobile-first approach

All design tokens are defined in `src/index.css` and `tailwind.config.ts`.

## 🔧 Configuration

### Quiz Settings

Users can configure:

- Number of questions (5-50)
- Question type (Multiple Choice, True/False, Any)
- Difficulty (Easy, Medium, Hard, Any)
- Category (20+ categories available)
- Timer duration (30-3600 seconds)

### Environment Variables

No environment variables required! The app uses the public OpenTDB API.

## 🧪 Testing

```bash
# Run linter
npm run lint

# Type checking
npm run type-check

# Unit tests (optional - add your test framework)
npm test
```

## 📦 Deployment

### Deploy to GitHub Pages

1. Update `vite.config.ts` with your repository name:

```typescript
export default defineConfig({
  base: "/your-repo-name/",
  // ... rest of config
});
```

2. Build and deploy:

```bash
npm run build
npm run deploy
```

### Deploy to Vercel/Netlify

Simply connect your GitHub repository and these platforms will auto-deploy on push to main branch.

**Vercel**: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Netlify**: [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

## 🔐 API Information

This app uses the [Open Trivia Database (OpenTDB)](https://opentdb.com/) API:

- **Endpoint**: `https://opentdb.com/api.php`
- **Rate Limit**: 1 request per 5 seconds
- **No API Key Required**: Free and open to use

## 🎯 Future Enhancements

Potential features to add:

- [ ] Sound effects for correct/wrong answers
- [ ] Question skip functionality (limited skips)
- [ ] Multiplayer mode
- [ ] Leaderboard with backend integration
- [ ] Achievement system
- [ ] More detailed analytics
- [ ] Social sharing of results

## 🐛 Known Issues & Troubleshooting

**Issue**: Questions not loading

- **Solution**: Check internet connection and verify OpenTDB API status

**Issue**: Progress not saving

- **Solution**: Ensure localStorage is enabled in browser

**Issue**: Timer not accurate

- **Solution**: Avoid minimizing browser tab (tabs are throttled)

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [Open Trivia Database](https://opentdb.com/) for the quiz questions API
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 📞 Support

For issues and questions:

1. Check existing issues on GitHub
2. Open a new issue with detailed description
3. Include browser console logs if applicable

---

**Suggested Repository Name**: `quizmaster-react` or `react-quiz-app`

**Example Commit History**:

```
1. chore: initial project setup with Vite and dependencies
2. feat: add design system and color palette
3. feat: implement login and quiz settings screens
4. feat: add quiz functionality with timer and auto-advance
5. feat: implement results screen and answer review
6. feat: add localStorage persistence and resume capability
7. docs: add comprehensive README and deployment instructions
```

**Final Commit Message**:

```
feat: complete QuizMaster quiz application

- Implement full quiz flow (login → settings → quiz → results)
- Add OpenTDB API integration with error handling
- Implement auto-save with localStorage persistence
- Add timer with visual countdown and auto-finish
- Create smooth animations with Framer Motion
- Add comprehensive results and answer review
- Implement responsive design for mobile/desktop
- Add TypeScript for type safety
- Include production-ready error boundaries
- Add comprehensive documentation

Built with React 18, TypeScript, Framer Motion, and Tailwind CSS.
Ready for production deployment.
```

Made with ❤️ by the QuizMaster team
