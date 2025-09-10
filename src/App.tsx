import { useReducer, useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { PhoneFrame } from './components/PhoneFrame';
import { TopBar } from './components/TopBar';
import { ChatBubble } from './components/ChatBubble';
import { QuickReplies } from './components/QuickReplies';
import { PushBanner } from './components/PushBanner';
import { SeatMapModal } from './components/SeatMapModal';
import { BoardingPassCard } from './components/BoardingPassCard';
import { SummaryCard } from './components/SummaryCard';
import { MessageInput } from './components/MessageInput';
import { VoiceInput } from './components/VoiceInput';
import { FlightDetails } from './components/FlightDetails';
import { MealOptionsModal } from './components/MealOptionsModal';
import { ComplianceIcons } from './components/ComplianceIcons';
import { scenarioReducer, initialState } from './state/scenarioEngine';
import { SCRIPT_CONTENT } from './state/script';

function App() {
  const [state, dispatch] = useReducer(scenarioReducer, initialState);
  const [showTyping, setShowTyping] = useState(false);
  const [showVoiceInput, setShowVoiceInput] = useState(false);
  const [showMessageInput, setShowMessageInput] = useState(false);
  const [showMealOptions, setShowMealOptions] = useState(false);
  const [selectedMealOption, setSelectedMealOption] = useState<string>('');
  const [showComplianceIcons, setShowComplianceIcons] = useState(false);
  const [voiceContext, setVoiceContext] = useState<'initial' | 'meal-change'>('initial');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-start the scenario
  useEffect(() => {
    if (state.state === 'idle') {
      dispatch({ type: 'START_PUSH' });
    }
  }, [state.state]);

  // Show message input for new travelers and returning travelers
  useEffect(() => {
    if ((state.state === 'chat:newTraveler' || state.state === 'chat:returningTraveler') && state.messages.length >= 2) {
      const timer = setTimeout(() => {
        setShowMessageInput(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowMessageInput(false);
    }
  }, [state.state, state.messages.length]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      const timer = setTimeout(() => {
        chatContainerRef.current?.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [state.messages]);

  const handleQuickReply = async (option: string) => {
    setShowTyping(true);
    
    // Simulate typing delay (0.5 seconds as requested)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setShowTyping(false);
    
    // Handle different quick reply options
    switch (option) {
      case '12A':
      case '11C':
        dispatch({ type: 'SELECT_SEAT', seat: option });
        break;
      case 'See seat map':
        dispatch({ type: 'TOGGLE_SEAT_MAP' });
        break;
      case 'No, that\'s good':
        dispatch({ type: 'AGREE_COMPLIANCE' });
        break;
      case 'Front':
      case 'Back':
      case 'Middle':
      case 'Aisle':
      case 'Window':
        dispatch({ type: 'SELECT_SEAT', seat: '12A' }); // Auto-assign based on preference
        break;
      case 'Speak':
        // Show voice input modal for meal change
        setVoiceContext('meal-change');
        setShowVoiceInput(true);
        break;
      case 'I agree':
        dispatch({ type: 'AGREE_COMPLIANCE' });
        break;
      case 'Yes':
        if (state.isReturningTraveler) {
          // For returning travelers - go directly to boarding pass
          dispatch({ type: 'AGREE_COMPLIANCE' });
        } else {
          dispatch({ type: 'SAVE_DEFAULTS', save: true });
        }
        break;
      case 'Change it':
        // Show voice input for changes
        setShowVoiceInput(true);
        break;
      case 'No':
        dispatch({ type: 'SAVE_DEFAULTS', save: false });
        break;
      case 'Confirm':
        dispatch({ type: 'SEND_MESSAGE', content: 'Confirm' });
        break;
      case 'Change seat':
        dispatch({ type: 'TOGGLE_SEAT_MAP' });
        break;
      case 'Change meal':
        dispatch({ type: 'SEND_MESSAGE', content: 'Change meal' });
        break;
      case 'Change bags':
        dispatch({ type: 'SEND_MESSAGE', content: 'Change bags' });
        break;
      default:
        dispatch({ type: 'SEND_MESSAGE', content: option });
    }
  };

  const handleSeatMapClose = (selectedSeat?: string) => {
    dispatch({ type: 'TOGGLE_SEAT_MAP' });
    if (selectedSeat) {
      dispatch({ type: 'SELECT_SEAT', seat: selectedSeat });
    }
  };

  const handleSaveToWallet = () => {
    // Mock save to wallet action
    console.log('Saved to wallet');
  };

  const handleSendMessage = async (message: string) => {
    setShowMessageInput(false);
    setShowTyping(true);
    
    // 0.5 second delay before processing
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (state.isReturningTraveler) {
      // For returning travelers - process their changes
      if (message.includes('aisle')) {
        dispatch({ type: 'SELECT_SEAT', seat: '12C' }); // Aisle seat
      }
      if (message.includes('bag')) {
        dispatch({ type: 'SELECT_BAGS', bags: 3 }); // Add one more bag
      }
      // Then go to boarding pass
      dispatch({ type: 'AGREE_COMPLIANCE' });
    } else {
      // For new travelers - handle the message properly
      if (message === 'Yes confirmed') {
        // This is from the meal change voice input
        dispatch({ type: 'SELECT_MEAL', meal: 'non-veg' });
      } else {
        // Initial preferences - send the message normally
        dispatch({ type: 'SEND_MESSAGE', content: message });
      }
    }
    
    setShowTyping(false);
  };

  const handleVoiceInput = () => {
    setVoiceContext('initial');
    setShowVoiceInput(true);
  };

  const handleVoiceResult = async (text: string) => {
    setShowVoiceInput(false);
    setShowMessageInput(false);
    setShowTyping(true);
    
    // 0.5 second delay before processing
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (voiceContext === 'meal-change') {
      // Change meal to non-veg and continue flow
      dispatch({ type: 'SELECT_MEAL', meal: 'non-veg' });
    } else if (state.isReturningTraveler) {
      // For returning travelers - process their changes
      if (text.includes('aisle')) {
        dispatch({ type: 'SELECT_SEAT', seat: '12C' }); // Aisle seat
      }
      if (text.includes('bag')) {
        dispatch({ type: 'SELECT_BAGS', bags: 3 }); // Add one more bag
      }
      // Then go to boarding pass
      dispatch({ type: 'AGREE_COMPLIANCE' });
    } else {
      // For new travelers - handle the voice input properly
      if (text === 'Yes confirmed') {
        // This is from the meal change voice input
        dispatch({ type: 'SELECT_MEAL', meal: 'non-veg' });
      } else {
        // Initial preferences - send the message normally
        dispatch({ type: 'SEND_MESSAGE', content: text });
      }
    }
    
    setShowTyping(false);
    setVoiceContext('initial'); // Reset context
  };

  const handleMealSelection = (meal: string) => {
    setShowMealOptions(false);
    setSelectedMealOption(meal);
    dispatch({ type: 'SELECT_MEAL', meal });
  };


  const shouldShowSummary = state.state === 'summary' && state.selectedSeat;
  const shouldShowBoardingPass = state.state === 'passIssued' || state.state === 'defaultsPrompt' || state.state === 'done';

  return (
    <PhoneFrame>
      <TopBar
        isReturningTraveler={state.isReturningTraveler}
        onToggleTravelerType={(isReturning) => dispatch({ type: 'SET_TRAVELER_TYPE', isReturning })}
        onReset={() => dispatch({ type: 'RESET' })}
      />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {/* Push Banner */}
        {state.state === 'push' && (
          <PushBanner
            message={SCRIPT_CONTENT.push}
            onTap={() => dispatch({ type: 'TAP_PUSH' })}
          />
        )}
        
        {/* Flight Details */}
        {(state.state === 'chat:newTraveler' || state.state === 'chat:returningTraveler') && (
          <FlightDetails
            flightNumber="BZ123"
            departureDate="Dec 15, 2024"
            gate="A12"
          />
        )}
        
        {/* Chat Messages */}
        <div ref={chatContainerRef} className="space-y-4" aria-live="polite">
          {state.messages.map((message, index) => (
            <div key={message.id}>
              <ChatBubble 
                message={message} 
                useTypingAnimation={message.type === 'assistant' && index === state.messages.length - 1}
                onTypingComplete={() => {
                  if (message.quickReplies) {
                    // Show quick replies after typing completes
                  }
                }}
              />
              {message.quickReplies && (
                <QuickReplies
                  options={message.quickReplies}
                  onSelect={handleQuickReply}
                />
              )}
              {message.content.includes('restricted items') && (
                <ComplianceIcons />
              )}
            </div>
          ))}
          
          {/* Typing indicator */}
          {showTyping && (
            <ChatBubble
              message={{
                id: 'typing',
                type: 'assistant',
                content: '',
                timestamp: Date.now()
              }}
              showTyping={true}
            />
          )}
        </div>
        
        {/* Summary Card */}
        {shouldShowSummary && (
          <SummaryCard
            seat={state.selectedSeat!}
            meal={state.selectedMeal || 'none'}
            bags={state.selectedBags || 0}
          />
        )}
        
        {/* Boarding Pass */}
        {shouldShowBoardingPass && (
          <BoardingPassCard
            boardingPass={{
              pnr: 'ABC123',
              name: 'John Doe',
              seat: state.selectedSeat || '12A',
              meal: state.selectedMeal || 'veg',
              bags: state.selectedBags || 2,
              flight: 'BZ123',
              gate: 'A12',
              group: '1'
            }}
            onSaveToWallet={handleSaveToWallet}
          />
        )}
        
        {/* Footer message */}
        {state.state === 'done' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs text-gray-500 text-center px-4 py-2"
          >
            {state.isReturningTraveler 
              ? SCRIPT_CONTENT.returningTraveler.footer
              : SCRIPT_CONTENT.newTraveler.footer
            }
          </motion.div>
        )}
      </div>
      
      {/* Message Input */}
      {showMessageInput && (
        <MessageInput
          onSendMessage={handleSendMessage}
          onVoiceInput={handleVoiceInput}
          disabled={showTyping}
          hint={state.isReturningTraveler ? "You can either confirm everything or tell me what you'd like to change" : undefined}
        />
      )}
      
      {/* Seat Map Modal */}
      <SeatMapModal
        isOpen={state.showSeatMap}
        onClose={() => handleSeatMapClose()}
        onSelectSeat={(seat) => handleSeatMapClose(seat)}
        selectedSeat={state.selectedSeat}
      />
      
      {/* Voice Input Modal */}
      <VoiceInput
        isOpen={showVoiceInput}
        onClose={() => setShowVoiceInput(false)}
        onResult={handleVoiceResult}
        context={voiceContext === 'meal-change' ? 'meal-change' : 
                state.isReturningTraveler ? 'returning' : 'initial'}
      />
      
      {/* Meal Options Modal */}
      <MealOptionsModal
        isOpen={showMealOptions}
        onClose={() => setShowMealOptions(false)}
        onSelectMeal={handleMealSelection}
        selectedMeal={selectedMealOption}
      />
      
    </PhoneFrame>
  );
}

export default App;
