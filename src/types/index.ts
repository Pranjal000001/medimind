export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  period: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  status: 'taken' | 'pending';
  notes: string;
  prescribedBy?: string;
}

export interface HealthRecord {
  id: string;
  title: string;
  category: 'Lab Result' | 'Prescription' | 'Clinical Note' | 'Vaccination';
  date: string;
  provider: string;
  status: string;
}

export interface WeeklyAdherencePoint {
  day: string;
  adherence: number;
  taken: number;
  scheduled: number;
}

export interface ActivityTrendPoint {
  day: string;
  activityScore: number;
  sleepHours: number;
  restingHr: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
