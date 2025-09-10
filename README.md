# Airline Check-in Demo App

A conversational airline check-in experience built with React, TypeScript, and Vite. This demo showcases an interactive chat interface that simulates the airline check-in process with voice input capabilities and reference menus.

## Features

- 🎤 **Voice Input**: Simulated voice recognition with context-aware responses
- 📱 **Mobile-First Design**: Phone frame UI with responsive layout
- 🗣️ **Conversational Flow**: Natural chat interface for check-in process
- 📋 **Reference Menus**: Quick reference sheets for seat, meal, and bag options
- ✈️ **Seat Selection**: Interactive seat map with aircraft view
- 🎯 **Two User Flows**: New traveler and returning traveler experiences
- 🎨 **Modern UI**: Built with Tailwind CSS and Framer Motion animations

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **State Management** with useReducer for conversation flow

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/VirajCommits/demoapp.git
cd demoapp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Running on Local Network

To access the app from another device on your local network:

```bash
npm run dev -- --host
```

Then access the app using your computer's IP address (e.g., `http://192.168.1.100:5173`)

## Project Structure

```
src/
├── components/          # React components
│   ├── ChatBubble.tsx   # Individual chat messages
│   ├── VoiceInput.tsx   # Voice input modal
│   ├── ReferenceMenu.tsx # Quick reference sheet
│   ├── SeatMapModal.tsx # Seat selection interface
│   └── ...
├── state/              # State management
│   ├── scenarioEngine.ts # Conversation flow logic
│   ├── script.ts       # All conversation content
│   └── mockApis.ts     # Simulated API calls
└── styles/             # CSS and styling
```

## User Flows

### New Traveler Flow
1. Push notification banner
2. Deep link verification
3. Voice/text input for preferences
4. Seat selection with aircraft view
5. Meal and bag options
6. Compliance confirmation
7. Boarding pass generation

### Returning Traveler Flow
1. Push notification banner
2. Welcome back message
3. Pre-selected preferences confirmation
4. Quick changes via voice input
5. Boarding pass generation

## Key Features

- **Context-Aware Voice Input**: Different responses based on conversation state
- **Reference Menus**: Shows available options during voice input
- **Seat Confirmation**: "Ok confirmed seat 10A. Is there anything else you'd like to change?"
- **Typing Animation**: Letter-by-letter text display for realistic feel
- **Auto-scrolling**: Smooth chat scrolling to bottom
- **Accessibility**: Keyboard navigation and screen reader support

## Customization

- Modify conversation scripts in `src/state/script.ts`
- Update conversation flow logic in `src/state/scenarioEngine.ts`
- Customize styling with Tailwind CSS classes
- Add new components in `src/components/`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for demonstration purposes. Feel free to use and modify as needed.

## Demo

The app demonstrates a modern, conversational airline check-in experience with:
- Natural language processing simulation
- Voice input with reference menus
- Interactive seat selection
- Streamlined user flows
- Mobile-optimized interface

Perfect for showcasing conversational UI design and airline industry applications.