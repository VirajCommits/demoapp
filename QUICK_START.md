# 🚀 Airline Check-in Demo - Quick Start

## 📁 What's in this folder?

This `DemoApp` folder contains the complete **Airline Check-in Demo** application with all files organized in one place.

## 🎯 Quick Start

### Option 1: Using the setup script

```bash
./setup.sh
npm run dev
```

### Option 2: Manual setup

```bash
npm install
npm run dev
```

### Option 3: Run on Local Network (for other devices)

```bash
./run-network.sh
```

Then open: **http://localhost:5173**

## 🌐 Access from Other Devices

To access the demo from another laptop/phone on the same network:

1. **Run with network access:**

   ```bash
   ./run-network.sh
   ```

2. **Find your IP address** (shown in the script output)

3. **Access from other device:**
   - Open browser on the other device
   - Go to: `http://YOUR_IP:5173`
   - Example: `http://192.168.2.105:5173`

**Your current IP:** `192.168.2.105`

## 📱 Demo Features

### ✨ Interactive Features

- **Voice Input**: Tap microphone to simulate speech recognition
- **Text Input**: Type your own messages
- **Quick Replies**: Click buttons to advance conversation
- **0.5 Second Delays**: Realistic response timing

### 🎮 Two Demo Paths

- **New Traveler**: Full flow with meal selection and defaults
- **Returning Traveler**: Quick confirm flow (≤2 clicks)

### 🎨 UI Components

- **Phone Frame**: Realistic mobile device mockup
- **Seat Map Modal**: Interactive seat selection
- **Compliance Popup**: Right-side slide-in with firearms emoji 🔫
- **Boarding Pass**: Generated pass with QR code
- **Voice Modal**: Animated speech recognition simulation

## 📂 File Structure

```
DemoApp/
├── src/
│   ├── components/          # All UI components
│   │   ├── PhoneFrame.tsx   # Mobile device frame
│   │   ├── ChatBubble.tsx   # Chat messages
│   │   ├── MessageInput.tsx # Text input field
│   │   ├── VoiceInput.tsx   # Voice input modal
│   │   ├── SeatMapModal.tsx # Seat selection
│   │   ├── QuickReplies.tsx # Quick reply buttons
│   │   ├── PushBanner.tsx   # Push notification
│   │   ├── BoardingPassCard.tsx # Boarding pass
│   │   ├── SummaryCard.tsx  # Check-in summary
│   │   ├── TopBar.tsx       # Header controls
│   │   └── Toggle.tsx       # Toggle switch
│   ├── state/               # State management
│   │   ├── scenarioEngine.ts # State machine
│   │   ├── script.ts        # Conversation scripts
│   │   └── mockApis.ts      # Mock API functions
│   ├── styles/
│   │   └── tailwind.css     # Tailwind CSS
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── public/assets/           # SVG assets
├── package.json             # Dependencies
├── vite.config.ts           # Vite config
├── tailwind.config.js       # Tailwind config
├── README.md                # Full documentation
└── setup.sh                 # Setup script
```

## 🎯 How to Use

1. **Start the app**: `npm run dev`
2. **Toggle traveler type**: Use the toggle at the top
3. **Try voice input**: Tap the microphone button
4. **Type messages**: Use the text input field
5. **Select seats**: Click "See seat map" for interactive selection
6. **Review compliance**: Click "Review list" to see the firearms popup
7. **Reset**: Use the Reset button to restart

## 🔧 Tech Stack

- **React 18** + **TypeScript**
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **State Machine** with useReducer

## 🎨 Key Features

- **Mobile-first design** in phone frame
- **Accessibility** with keyboard navigation
- **Smooth animations** with Framer Motion
- **Realistic timing** with 0.5s delays
- **Interactive voice simulation**
- **Compliance popup** with firearms emoji 🔫

Enjoy the demo! 🚀
