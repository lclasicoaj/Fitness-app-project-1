# 💪 Workout Tracker

A clean, simple, and fast personal workout tracking tool built with React. Track your workouts, create custom routines, and monitor your fitness progress—all stored locally on your device.

![React](https://img.shields.io/badge/React-19.2.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)
![React Router](https://img.shields.io/badge/React_Router-v6-CA4245)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🏋️ Workout Tracking
- Start blank workouts or use pre-defined routines
- Add exercises on the fly
- Track sets with weight and reps
- Save completed workouts to history

### 📋 Custom Routines
- Create and save workout routines
- Reorder exercises with simple up/down controls
- Edit or delete routines anytime
- Quick-start workouts from your favorite routines

### 📊 Workout History
- View all completed workouts
- See detailed statistics (total volume, sets, reps)
- Review past performance
- Delete old workouts

### 💾 Local Data Storage
- All data stored in browser localStorage
- No backend required
- Privacy-first: your data never leaves your device
- Works offline

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

## 📱 Mobile-First Design

The app is optimized for mobile use with:
- Large, easy-to-tap buttons
- Clean spacing and layout
- Responsive design that works on all devices
- Fast and lightweight

## 🛠️ Technology Stack

- **React 19.2.0** - Latest React with modern hooks
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Heroicons** - Beautiful SVG icons
- **localStorage API** - Client-side persistence

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── workout/         # Workout-specific components
│   └── routine/         # Routine-specific components
├── hooks/
│   └── useLocalStorage.js
├── pages/               # Page components (routes)
├── utils/               # Utility functions
└── App.js              # Main app with routing
```

## 🎯 Usage

### Creating a Routine

1. Go to **Routines** from the home page
2. Click **New Routine**
3. Name your routine (e.g., "Push Day", "Leg Day")
4. Add exercises
5. Reorder as needed
6. Save

### Starting a Workout

1. Click **Start Workout** from home page
2. Choose:
   - **Start Blank Workout** - Add exercises as you go
   - **Start from Routine** - Use a pre-defined routine
3. Add sets (weight + reps) for each exercise
4. Click **Finish Workout** when done

### Viewing History

1. Go to **Workout History** from home page
2. See all completed workouts
3. Tap any workout to view details
4. Review sets, reps, and total volume

## 📦 localStorage Data Structure

The app uses three main storage keys:

### `routines`
```javascript
[
  {
    id: "unique-id",
    name: "Push Day",
    exercises: [
      { id: "ex-id", name: "Bench Press" },
      { id: "ex-id-2", name: "Shoulder Press" }
    ]
  }
]
```

### `history`
```javascript
[
  {
    id: "workout-id",
    date: "2024-01-15T10:30:00.000Z",
    routineName: "Push Day",
    exercises: [
      {
        id: "ex-id",
        name: "Bench Press",
        sets: [
          { id: "set-id", weight: "135", reps: "10" }
        ]
      }
    ]
  }
]
```

### `activeWorkout`
Currently active workout session (null when no active workout)

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 📚 Documentation

- **[SETUP.md](SETUP.md)** - Detailed setup and installation guide
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Architecture, data flow, and technical details
- **[AGENTS.md](AGENTS.md)** - Project context for AI assistants

## 🎨 Design Principles

- **Minimalist** - Clean interface without clutter
- **Fast** - Instant load times and smooth interactions
- **Simple** - Easy to use without a learning curve
- **Mobile-First** - Optimized for daily use at the gym

## 🔒 Privacy

All your workout data is stored locally in your browser. Nothing is sent to external servers. Your fitness journey is completely private.

## 🤝 Contributing

This is a personal project, but suggestions and improvements are welcome!

## 📄 License

MIT License - Feel free to use this for your own fitness tracking needs!

## 🙏 Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- Icons by [Heroicons](https://heroicons.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

**Built with ❤️ for fitness enthusiasts**

Stay consistent. Track progress. Get stronger. 💪
