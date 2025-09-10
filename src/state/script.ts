export const SCRIPT_CONTENT = {
  push: "Let's get you checked in! Tap to start your journey.",
  deepLinkNew: "Let's check you in. Welcome to AI Breeze! Greetings! We have all your information.",
  deepLinkReturning: "Welcome back to AI Breeze! We have all your information.",
  
  newTraveler: {
    flightDetails: "✈️ Flight BZ123 • Departure: Dec 15, 2024 • Gate A12 • YYZ → JFK",
    assistant1: "Type or speak your preferences. For example: 'Window seat. Veg meal. Two bags.'",
    traveler1: "Front window seat. Veg meal. Two bags.",
    assistant2: "Want to see where you are seated? You can choose Front, Back, Middle, Aisle, or Window seat. Or see the seat map.",
    assistant3: "Any changes? Just tap and speak and we will handle all changes.",
    summary: "Seat 12A. Veg meal. Two bags. Name and document look good.",
    compliance: "Please confirm you don't have any of these restricted items:",
    passReady: "Boarding pass ready. Sent to your phone and email.",
    saveDefaults: "Save to wallet. Want these as your defaults for next time?",
    saved: "Saved.",
    footer: "No forms. No hunting for PNRs. No bouncing between pages. Just a short conversation that finishes in seconds."
  },
  
  returningTraveler: {
    assistant1: "We preselected your usual 12A window seat and veg meal. Add bags as well. You wanna go with that?",
    summary: "Seat 12A. Veg meal. Two bags. Name and document look good.",
    compliance: "Please confirm: no dangerous goods or restricted items.",
    passReady: "Boarding pass ready. Sent to your phone and email.",
    footer: "Breeze makes more people check in online. Fewer lines. Happier customers. Lower costs. More on-time departures. The journey starts with a smile."
  }
} as const;

export const QUICK_REPLIES = {
  seatOptions: ["Yes", "No", "See seat map"],
  seatPreferences: ["Front", "Back", "Middle", "Aisle", "Window"],
  mealOptions: ["Speak"],
  complianceOptions: ["I agree"],
  defaultsOptions: ["Yes", "No"],
  returningOptions: ["Yes", "Change it"],
  handicappedOptions: ["Voice mode", "Text mode", "Accessibility help"]
};
