#!/bin/bash

echo "🚀 Setting up Airline Check-in Demo App..."
echo ""

# Clean install to avoid any issues
echo "🧹 Cleaning up any existing dependencies..."
rm -rf node_modules package-lock.json

echo "📦 Installing dependencies..."
npm install
echo ""

echo "✅ Setup complete!"
echo ""
echo "🎯 To run the demo:"
echo "   npm run dev"
echo ""
echo "🌐 Then open: http://localhost:5173"
echo ""
echo "📱 Features:"
echo "   • Interactive chat interface"
echo "   • Voice input simulation"
echo "   • Text input field"
echo "   • Seat selection modal"
echo "   • Compliance popup with firearms emoji"
echo "   • Boarding pass generation"
echo "   • New vs Returning traveler flows"
echo ""
