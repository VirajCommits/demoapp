import { SCRIPT_CONTENT, QUICK_REPLIES } from './script';

export type ScenarioState = 
  | 'idle'
  | 'push'
  | 'deepLinkVerified'
  | 'chat:newTraveler'
  | 'chat:returningTraveler'
  | 'seatChoice'
  | 'mealCheck'
  | 'summary'
  | 'DGAgree'
  | 'passIssued'
  | 'defaultsPrompt'
  | 'done';

export interface ChatMessage {
  id: string;
  type: 'assistant' | 'traveler';
  content: string;
  timestamp: number;
  quickReplies?: string[];
}

export interface ScenarioData {
  state: ScenarioState;
  messages: ChatMessage[];
  selectedSeat: string | null;
  selectedMeal: string | null;
  selectedBags: number | null;
  isReturningTraveler: boolean;
  hasMealPreference: boolean;
  showSeatMap: boolean;
  showComplianceList: boolean;
  boardingPass: any | null;
}

export type ScenarioAction = 
  | { type: 'START_PUSH' }
  | { type: 'TAP_PUSH' }
  | { type: 'SET_TRAVELER_TYPE'; isReturning: boolean }
  | { type: 'SEND_MESSAGE'; content: string }
  | { type: 'SELECT_SEAT'; seat: string }
  | { type: 'SELECT_MEAL'; meal: string }
  | { type: 'TOGGLE_SEAT_MAP' }
  | { type: 'TOGGLE_COMPLIANCE_LIST' }
  | { type: 'AGREE_COMPLIANCE' }
  | { type: 'SAVE_DEFAULTS'; save: boolean }
  | { type: 'RESET' };

export const initialState: ScenarioData = {
  state: 'idle',
  messages: [],
  selectedSeat: null,
  selectedMeal: null,
  selectedBags: null,
  isReturningTraveler: false,
  hasMealPreference: false,
  showSeatMap: false,
  showComplianceList: false,
  boardingPass: null
};

export function scenarioReducer(state: ScenarioData, action: ScenarioAction): ScenarioData {
  switch (action.type) {
    case 'START_PUSH':
      return {
        ...state,
        state: 'push',
        messages: []
      };

    case 'TAP_PUSH':
      const pushNextState = state.isReturningTraveler ? 'chat:returningTraveler' : 'chat:newTraveler';
      const pushNextMessage = state.isReturningTraveler 
        ? SCRIPT_CONTENT.returningTraveler.assistant1
        : SCRIPT_CONTENT.newTraveler.assistant1;
      const pushNextQuickReplies = state.isReturningTraveler 
        ? QUICK_REPLIES.returningOptions
        : undefined;
      
      return {
        ...state,
        state: pushNextState,
        messages: [
          ...state.messages,
          {
            id: '2',
            type: 'assistant',
            content: state.isReturningTraveler 
              ? SCRIPT_CONTENT.deepLinkReturning 
              : SCRIPT_CONTENT.deepLinkNew,
            timestamp: Date.now()
          },
          {
            id: '3',
            type: 'assistant',
            content: pushNextMessage,
            timestamp: Date.now() + 1,
            quickReplies: pushNextQuickReplies
          }
        ]
      };

    case 'SET_TRAVELER_TYPE':
      return {
        ...state,
        isReturningTraveler: action.isReturning,
        hasMealPreference: action.isReturning
      };

    case 'SEND_MESSAGE':
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'traveler',
        content: action.content,
        timestamp: Date.now()
      };

      // Handle different message types and advance state
      if (action.content === "Front window seat. Veg meal. Two bags.") {
        return {
          ...state,
          state: 'seatChoice',
          selectedMeal: 'veg',
          selectedBags: 2,
          messages: [
            ...state.messages,
            newMessage,
            {
              id: (Date.now() + 1).toString(),
              type: 'assistant',
              content: SCRIPT_CONTENT.newTraveler.assistant2,
              timestamp: Date.now() + 2,
              quickReplies: QUICK_REPLIES.seatOptions
            }
          ]
        };
      }

      if (action.content === "Confirm") {
        return {
          ...state,
          state: 'summary',
          selectedSeat: '12A',
          selectedMeal: 'veg',
          selectedBags: 2,
          messages: [
            ...state.messages,
            newMessage,
            {
              id: (Date.now() + 1).toString(),
              type: 'assistant',
              content: SCRIPT_CONTENT.returningTraveler.summary,
              timestamp: Date.now() + 2
            },
            {
              id: (Date.now() + 2).toString(),
              type: 'assistant',
              content: SCRIPT_CONTENT.returningTraveler.compliance,
              timestamp: Date.now() + 3,
              quickReplies: QUICK_REPLIES.complianceOptions
            }
          ]
        };
      }

      return {
        ...state,
        messages: [...state.messages, newMessage]
      };

    case 'SELECT_SEAT':
      const seatNextState = state.selectedMeal && !state.hasMealPreference ? 'mealCheck' : 'summary';
      return {
        ...state,
        state: seatNextState,
        selectedSeat: action.seat,
        showSeatMap: false,
        messages: [
          ...state.messages,
          {
            id: Date.now().toString(),
            type: 'assistant',
            content: `Ok confirmed seat ${action.seat}. Is there anything else you'd like to change?`,
            timestamp: Date.now(),
            quickReplies: ['No, that\'s good', 'Speak']
          },
          ...(seatNextState === 'summary' ? [{
            id: (Date.now() + 1).toString(),
            type: 'assistant' as const,
            content: SCRIPT_CONTENT.newTraveler.compliance,
            timestamp: Date.now() + 2,
            quickReplies: QUICK_REPLIES.complianceOptions
          }] : [])
        ]
      };

    case 'SELECT_MEAL':
      return {
        ...state,
        state: 'summary',
        selectedMeal: action.meal,
        messages: [
          ...state.messages,
          {
            id: Date.now().toString(),
            type: 'assistant',
            content: SCRIPT_CONTENT.newTraveler.summary,
            timestamp: Date.now()
          },
          {
            id: (Date.now() + 1).toString(),
            type: 'assistant',
            content: SCRIPT_CONTENT.newTraveler.compliance,
            timestamp: Date.now() + 2,
            quickReplies: QUICK_REPLIES.complianceOptions
          }
        ]
      };

    case 'TOGGLE_SEAT_MAP':
      return {
        ...state,
        showSeatMap: !state.showSeatMap
      };

    case 'TOGGLE_COMPLIANCE_LIST':
      return {
        ...state,
        showComplianceList: !state.showComplianceList
      };

    case 'AGREE_COMPLIANCE':
      const nextStateAfterCompliance = state.isReturningTraveler ? 'passIssued' : 'defaultsPrompt';
      const complianceMessage = state.isReturningTraveler 
        ? SCRIPT_CONTENT.returningTraveler.passReady
        : SCRIPT_CONTENT.newTraveler.passReady;
      
      return {
        ...state,
        state: nextStateAfterCompliance,
        messages: [
          ...state.messages,
          {
            id: Date.now().toString(),
            type: 'assistant',
            content: complianceMessage,
            timestamp: Date.now()
          },
          ...(nextStateAfterCompliance === 'defaultsPrompt' ? [{
            id: (Date.now() + 1).toString(),
            type: 'assistant' as const,
            content: SCRIPT_CONTENT.newTraveler.saveDefaults,
            timestamp: Date.now() + 2,
            quickReplies: QUICK_REPLIES.defaultsOptions
          }] : [])
        ]
      };

    case 'SAVE_DEFAULTS':
      if (action.save) {
        return {
          ...state,
          state: 'done',
          messages: [
            ...state.messages,
            {
              id: Date.now().toString(),
              type: 'assistant',
              content: SCRIPT_CONTENT.newTraveler.saved,
              timestamp: Date.now()
            }
          ]
        };
      } else {
        return {
          ...state,
          state: 'done'
        };
      }

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}
