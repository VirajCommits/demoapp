#!/bin/bash

echo "🌐 Starting Airline Check-in Demo on Local Network..."
echo ""

# Get local IP address
LOCAL_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1)

echo "📱 Your local IP address: $LOCAL_IP"
echo ""
echo "🚀 Starting development server with network access..."
echo ""
echo "📋 Access URLs:"
echo "   Local:    http://localhost:5173"
echo "   Network:  http://$LOCAL_IP:5173"
echo ""
echo "💡 To access from another device on the same network:"
echo "   1. Make sure both devices are on the same WiFi network"
echo "   2. Open browser on the other device"
echo "   3. Go to: http://$LOCAL_IP:5173"
echo ""
echo "🔒 If you can't access from another device:"
echo "   • Check your firewall settings"
echo "   • Make sure both devices are on the same network"
echo "   • Try disabling VPN if you have one"
echo ""

# Start the server with network access
npm run dev -- --host
