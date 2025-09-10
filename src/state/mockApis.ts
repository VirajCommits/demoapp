export interface SeatOption {
  id: string;
  label: string;
  type: 'window' | 'aisle';
  area: 'front' | 'mid' | 'back';
}

export interface BoardingPass {
  pnr: string;
  name: string;
  seat: string;
  meal: string;
  bags: number;
  qrSvg: string;
  flight: string;
  gate: string;
  group: string;
}

export interface UserProfile {
  returning: boolean;
  prefs: {
    seat: string;
    meal: string;
    bags: number;
  };
}

// Mock API functions with simulated delays
export const getSeatOptions = async (params: { area?: string; pref?: string }): Promise<SeatOption[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const seats: SeatOption[] = [
    { id: '12A', label: '12A (window, front)', type: 'window', area: 'front' },
    { id: '11C', label: '11C (aisle, front)', type: 'aisle', area: 'front' },
    { id: '14F', label: '14F (window, mid)', type: 'window', area: 'mid' },
    { id: '15D', label: '15D (aisle, mid)', type: 'aisle', area: 'mid' },
    { id: '18A', label: '18A (window, back)', type: 'window', area: 'back' },
    { id: '17C', label: '17C (aisle, back)', type: 'aisle', area: 'back' }
  ];
  
  return seats.filter(seat => {
    if (params.area && seat.area !== params.area) return false;
    if (params.pref && seat.type !== params.pref) return false;
    return true;
  });
};

export const generateBoardingPass = async (payload: {
  seat: string;
  meal: string;
  bags: number;
  name: string;
}): Promise<BoardingPass> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    pnr: 'ABC123',
    name: payload.name || 'John Doe',
    seat: payload.seat,
    meal: payload.meal,
    bags: payload.bags,
    qrSvg: '/assets/bp-qr.svg',
    flight: 'BZ123',
    gate: 'A12',
    group: '1'
  };
};

export const getUserProfile = async (): Promise<UserProfile> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return {
    returning: false, // This will be controlled by the toggle
    prefs: {
      seat: 'window-front',
      meal: 'veg',
      bags: 2
    }
  };
};

export const getSeatMapLink = (): string => {
  return 'https://example.com/seatmap';
};
