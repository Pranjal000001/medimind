import { Medicine, HealthRecord, WeeklyAdherencePoint, ActivityTrendPoint, ChatMessage } from '../types';

export const INITIAL_MEDICINES: Medicine[] = [
  {
    id: 'med-1',
    name: 'Atorvastatin',
    dosage: '20 mg',
    frequency: 'Once daily',
    time: '08:00 AM',
    period: 'Morning',
    status: 'taken',
    notes: 'Take with morning water or breakfast',
    prescribedBy: 'Dr. Hannah Lin',
  },
  {
    id: 'med-2',
    name: 'Metformin',
    dosage: '500 mg',
    frequency: 'Twice daily',
    time: '08:30 AM',
    period: 'Morning',
    status: 'taken',
    notes: 'Best taken alongside a meal',
    prescribedBy: 'Dr. Hannah Lin',
  },
  {
    id: 'med-3',
    name: 'Vitamin D3',
    dosage: '2000 IU',
    frequency: 'Once daily',
    time: '01:00 PM',
    period: 'Afternoon',
    status: 'taken',
    notes: 'Take with lunch for better absorption',
    prescribedBy: 'Self-tracked supplement',
  },
  {
    id: 'med-4',
    name: 'Lisinopril',
    dosage: '10 mg',
    frequency: 'Once daily',
    time: '07:30 PM',
    period: 'Evening',
    status: 'pending',
    notes: 'Take around the same time each evening',
    prescribedBy: 'Dr. Hannah Lin',
  },
  {
    id: 'med-5',
    name: 'Magnesium Glycinate',
    dosage: '200 mg',
    frequency: 'Once daily',
    time: '09:45 PM',
    period: 'Night',
    status: 'pending',
    notes: 'Evening wind-down supplement',
    prescribedBy: 'Self-tracked supplement',
  },
];

export const UPCOMING_SCHEDULE = [
  {
    id: 'up-1',
    day: 'Tomorrow · Thu',
    time: '08:00 AM',
    medicine: 'Atorvastatin 20 mg',
    note: 'Morning dose · 12 days remaining before refill',
  },
  {
    id: 'up-2',
    day: 'Tomorrow · Thu',
    time: '08:30 AM',
    medicine: 'Metformin 500 mg',
    note: 'Morning mealtime pairing',
  },
  {
    id: 'up-3',
    day: 'Friday · Nov 20',
    time: '02:00 PM',
    medicine: 'Prescription Refill Reminder',
    note: 'Lisinopril 10 mg · 30-day supply due soon',
  },
  {
    id: 'up-4',
    day: 'Monday · Nov 23',
    time: '10:30 AM',
    medicine: 'Routine Lipid Panel Follow-Up',
    note: 'Bring organized 30-day adherence summary',
  },
];

export const MEDICATION_HISTORY = [
  { date: 'Tue, Nov 17', completed: 5, total: 5, rate: '100%', note: 'All doses logged on schedule' },
  { date: 'Mon, Nov 16', completed: 5, total: 5, rate: '100%', note: 'All doses logged on schedule' },
  { date: 'Sun, Nov 15', completed: 4, total: 5, rate: '80%', note: 'Evening supplement skipped' },
  { date: 'Sat, Nov 14', completed: 5, total: 5, rate: '100%', note: 'All doses logged on schedule' },
  { date: 'Fri, Nov 13', completed: 5, total: 5, rate: '100%', note: 'All doses logged on schedule' },
];

export const SAMPLE_HEALTH_RECORDS: HealthRecord[] = [
  {
    id: 'rec-1',
    title: 'Comprehensive Lipid Panel',
    category: 'Lab Result',
    date: 'Nov 04, 2026',
    provider: 'Pacific Medical Labs',
    status: 'Reviewed',
  },
  {
    id: 'rec-2',
    title: 'Atorvastatin 20 mg Prescription',
    category: 'Prescription',
    date: 'Oct 18, 2026',
    provider: 'Dr. Hannah Lin, MD',
    status: 'Active',
  },
  {
    id: 'rec-3',
    title: 'Annual Preventive Checkup Summary',
    category: 'Clinical Note',
    date: 'Sep 29, 2026',
    provider: 'Bayview Primary Care',
    status: 'Archived',
  },
  {
    id: 'rec-4',
    title: 'Seasonal Influenza Immunization',
    category: 'Vaccination',
    date: 'Sep 12, 2026',
    provider: 'Community Health Clinic',
    status: 'Recorded',
  },
];

export const WEEKLY_ADHERENCE_DATA: WeeklyAdherencePoint[] = [
  { day: 'Mon', adherence: 100, taken: 5, scheduled: 5 },
  { day: 'Tue', adherence: 100, taken: 5, scheduled: 5 },
  { day: 'Wed', adherence: 80, taken: 4, scheduled: 5 },
  { day: 'Thu', adherence: 100, taken: 5, scheduled: 5 },
  { day: 'Fri', adherence: 100, taken: 5, scheduled: 5 },
  { day: 'Sat', adherence: 100, taken: 5, scheduled: 5 },
  { day: 'Sun', adherence: 80, taken: 4, scheduled: 5 },
];

export const ACTIVITY_TREND_DATA: ActivityTrendPoint[] = [
  { day: 'Mon', activityScore: 84, sleepHours: 7.4, restingHr: 68 },
  { day: 'Tue', activityScore: 88, sleepHours: 7.8, restingHr: 67 },
  { day: 'Wed', activityScore: 79, sleepHours: 6.9, restingHr: 70 },
  { day: 'Thu', activityScore: 86, sleepHours: 7.5, restingHr: 68 },
  { day: 'Fri', activityScore: 91, sleepHours: 8.0, restingHr: 66 },
  { day: 'Sat', activityScore: 93, sleepHours: 8.3, restingHr: 65 },
  { day: 'Sun', activityScore: 89, sleepHours: 7.9, restingHr: 67 },
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'user',
    text: 'Help me organize my medicine schedule.',
    timestamp: '09:12 AM',
  },
  {
    id: 'msg-2',
    sender: 'assistant',
    text: "Absolutely! Let's organize your medicines by dosage, frequency and preferred time.",
    timestamp: '09:12 AM',
  },
];

export const AI_RESPONSES: Record<string, string> = {
  'What does my evening routine look like today?':
    'You have two scheduled items remaining for today:\n\n• 07:30 PM — Lisinopril (10 mg), once daily.\n• 09:45 PM — Magnesium Glycinate (200 mg), evening supplement.\n\nYou have already completed 3 of your 5 scheduled doses for the day.',
  'Help me prepare questions for my next doctor visit.':
    'Here is a concise checklist you can bring to your next appointment based on your organized records:\n\n1. Review your 30-day medication consistency and whether any timing adjustments could make evening doses easier.\n2. Discuss your recent November lipid panel results alongside your current Atorvastatin dosage.\n3. Confirm upcoming refill timelines for Lisinopril.\n\nYou can export your medication log from the Records tab before your visit.',
  'Explain what a lipid panel generally measures.':
    'In general health education, a standard lipid panel looks at four primary markers in the blood:\n\n• Total Cholesterol — the overall amount of cholesterol circulating.\n• LDL Cholesterol — often discussed in relation to arterial buildup.\n• HDL Cholesterol — helps transport cholesterol away from arteries.\n• Triglycerides — a type of fat stored from excess energy.\n\nBecause target ranges depend heavily on your personal medical history, your clinician is the best person to interpret your specific numbers.',
  'How can I build a more consistent medication habit?':
    'Small structural anchors tend to work better than willpower alone:\n\n1. Pair each dose with an existing daily habit, such as morning coffee or brushing your teeth.\n2. Keep morning and evening reminders grouped into clean time windows rather than scattered throughout the day.\n3. Review your weekly completion view on Sunday evenings to spot any recurring friction points.',
};
