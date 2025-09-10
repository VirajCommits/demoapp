# Airline Check-in Demo

A conversational airline check-in experience built with React, TypeScript, and Tailwind CSS. This demo showcases an interactive chat interface that simulates the check-in process for both new and returning travelers.

## Features

- **Two Demo Paths**: New traveler and Returning traveler flows
- **Interactive Chat**: Click-through conversation with quick reply buttons
- **Seat Selection**: Interactive seat map modal with visual seat selection
- **Boarding Pass**: Generated boarding pass with QR code
- **Accessibility**: Full keyboard navigation and screen reader support
- **Animations**: Smooth micro-animations with Framer Motion
- **Mobile-First**: Designed to look like a native mobile app

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **State Management** with useReducer for scenario flow

## Installation & Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

## Usage

### Switching Between Flows

- Use the toggle at the top to switch between "New traveler" and "Returning traveler"
- The "New traveler" flow includes meal selection and defaults saving
- The "Returning traveler" flow skips meal selection and uses saved preferences

### Navigation

- **Quick Replies**: Click any quick reply button to advance the conversation
- **Seat Map**: Click "See seat map" to open the interactive seat selection modal
- **Reset**: Use the "Reset" button to restart the scenario from the beginning
- **Keyboard**: All interactive elements support keyboard navigation

### Demo Flows

#### New Traveler Flow

1. Tap the push notification banner
2. Enter preferences: "Window seat. Veg meal. Two bags."
3. Select a seat (12A, 11C, or see seat map)
4. Choose meal preference (if not already selected)
5. Review summary and agree to compliance
6. Receive boarding pass and save defaults

#### Returning Traveler Flow

1. Tap the push notification banner
2. Confirm preselected preferences or make changes
3. Review summary and agree to compliance
4. Receive boarding pass (no defaults prompt)

## Project Structure

```
src/
├── components/          # React components
│   ├── PhoneFrame.tsx   # Mobile device frame
│   ├── ChatBubble.tsx   # Chat message bubbles
│   ├── QuickReplies.tsx # Quick reply buttons
│   ├── SeatMapModal.tsx # Seat selection modal
│   ├── BoardingPassCard.tsx # Boarding pass display
│   ├── SummaryCard.tsx  # Check-in summary
│   ├── PushBanner.tsx   # Push notification banner
│   ├── TopBar.tsx       # Header with controls
│   └── Toggle.tsx       # Toggle switch component
├── state/               # State management
│   ├── scenarioEngine.ts # State machine logic
│   ├── script.ts        # Conversation scripts
│   └── mockApis.ts      # Mock API functions
├── styles/
│   └── tailwind.css     # Tailwind CSS imports
├── App.tsx              # Main application component
└── main.tsx             # Application entry point
```

## Accessibility Features

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Reader Support**: Proper ARIA labels and live regions
- **Focus Management**: Visible focus indicators and logical tab order
- **Semantic HTML**: Proper heading structure and landmarks

## Customization

The app uses a simple state machine pattern that makes it easy to:

- Add new conversation steps
- Modify existing scripts
- Add new quick reply options
- Customize the visual design

## Development

- **Build**: `npm run build`
- **Preview**: `npm run preview`
- **Lint**: `npm run lint`

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

The app is optimized for mobile viewports but works on desktop as well.
