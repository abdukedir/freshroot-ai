const moods = [
  { emoji: '😄', label: 'Great', score: 5 },
  { emoji: '🙂', label: 'Good', score: 4 },
  { emoji: '😐', label: 'Okay', score: 3 },
  { emoji: '😟', label: 'Low', score: 2 },
  { emoji: '😣', label: 'Stressed', score: 1 },
];

export const moodOptions = moods;

export const sessionTypes = ['4-4-6 Breathing', 'Box Breathing', 'Deep Relaxation', 'Sleep Meditation'];

export const wellnessSchema = [
  ['mood_checkins', 'id, user_id, mood, mood_score, energy_level, sleep_hours, stress_score, notes, created_at'],
  ['pregnancy_profiles', 'id, user_id, due_date, current_week, pre_pregnancy_weight, current_weight, water_cups, iron_intake_mg, risk_flags, next_appointment_at'],
  ['pregnancy_symptoms', 'id, user_id, symptom, severity, ai_triage, created_at'],
  ['mindfulness_sessions', 'id, user_id, session_type, started_at, ended_at, duration_minutes, stress_before, stress_after, completed'],
  ['wellness_scores', 'id, user_id, nutrition_score, mood_score, pregnancy_score, breathing_score, activity_score, freshness_score, unified_score, created_at'],
  ['community_wellness_rollups', 'id, region, avg_unified_score, stress_trend, nutrition_gap, freshness_access, generated_at'],
];

export const wellnessEndpoints = [
  ['GET', '/api/wellness/summary', 'Return unified wellness score, latest risks, and AI recommendations.'],
  ['POST', '/api/mood/checkins', 'Create daily mood, energy, sleep, stress, and notes check-in.'],
  ['GET', '/api/mood/reports?range=week|month', 'Return calendar, trends, burnout flags, and mental wellness analytics.'],
  ['POST', '/api/pregnancy/register', 'Create pregnancy profile and calculate due date or current week.'],
  ['GET', '/api/pregnancy/week/:week', 'Return week-by-week guidance, nutrition, safe foods, and warnings.'],
  ['POST', '/api/pregnancy/symptoms/check', 'Triage symptoms and return risk alerts with escalation guidance.'],
  ['POST', '/api/mindfulness/sessions', 'Start or complete breathing, meditation, or relaxation session.'],
  ['GET', '/api/mindfulness/history', 'Return streaks, badges, completion rate, and stress reduction history.'],
  ['GET', '/api/marketplace/wellness-bundles', 'Recommend farmer products using nutrition, mood, pregnancy, and freshness data.'],
  ['GET', '/api/community/wellness', 'Return opt-in aggregated wellness trends by region.'],
];

export const revenueOpportunities = [
  'Family wellness premium plan with mood analytics, pregnancy tracking, and meal planning.',
  'Clinic and maternal health partnerships for appointment reminders, symptom triage, and nutrition adherence.',
  'Employer wellness packages using privacy-preserving stress trends and breathing completion analytics.',
  'Sponsored farmer bundles for iron-rich, pregnancy-safe, immunity, and stress-support meals.',
  'NGO and public health dashboards for community wellness, food affordability, and rural access programs.',
];

export const hackathonImpact = [
  'Connects food, mental wellness, pregnancy, mindfulness, and farmer commerce in one measurable score.',
  'Shows Ethiopia-specific nutrition and maternal health use cases instead of generic wellness advice.',
  'Creates a strong demo loop: check mood, receive breathing plan, buy fresh foods, improve score.',
  'Produces social impact metrics investors and judges can understand: stress reduction, farmer income, maternal nutrition, and affordable fresh food access.',
];

export const investorPitchEnhancements = [
  'FreshRoots becomes a wellness operating system for African households, not only a marketplace.',
  'The unified score creates a proprietary personalization layer across nutrition, mood, pregnancy, activity, and food freshness.',
  'The platform monetizes across B2C subscriptions, B2B clinics, employers, NGOs, and marketplace transactions.',
  'Community rollups create defensible public health intelligence while keeping individual data private.',
];

export const judgeWinningFeatures = [
  'Unified Wellness Score from nutrition, mood, pregnancy, breathing, activity, and freshness data.',
  'Pregnancy-safe farmer bundles with iron tracking and unsafe food warnings.',
  'Mood-to-breathing AI recommendations that measure stress before and after each session.',
  'Community wellness rollups that turn individual check-ins into opt-in public health insight.',
  'Freshness-aware nutrition recommendations that convert wellness advice into farmer revenue.',
];

export const pregnancyProfile = {
  active: true,
  dueDate: '2026-10-18',
  currentWeightKg: 68,
  prePregnancyWeightKg: 61,
  waterCups: 7,
  ironIntakeMg: 22,
  riskFlags: [],
  nextAppointment: '2026-06-12 09:30',
  symptoms: [
    { symptom: 'Morning nausea', severity: 'mild', aiTriage: 'Track hydration and smaller meals.' },
    { symptom: 'Fatigue', severity: 'moderate', aiTriage: 'Increase rest, iron-rich meals, and discuss if persistent.' },
  ],
  safeFoods: ['Teff injera', 'Lentil stew', 'Spinach', 'Avocado', 'Cooked vegetables'],
  unsafeWarnings: ['Avoid unpasteurized dairy', 'Limit high-mercury fish', 'Avoid undercooked meat', 'Check herbal remedies with a clinician'],
};

export const moodCheckins = Array.from({ length: 35 }, (_, index) => {
  const mood = moods[(index + (index % 5)) % moods.length];
  const date = new Date('2026-05-02');
  date.setDate(date.getDate() + index);
  return {
    id: `mood-${index + 1}`,
    userId: 'u1',
    date: date.toISOString().slice(0, 10),
    mood: mood.label,
    emoji: mood.emoji,
    moodScore: Math.max(1, Math.min(5, mood.score - (index > 27 ? 1 : 0))),
    energyLevel: Math.max(2, 8 - (index % 6) - (index > 25 ? 2 : 0)),
    sleepHours: Number((6.2 + (index % 5) * 0.35 - (index > 26 ? 0.8 : 0)).toFixed(1)),
    stressScore: Math.min(10, 3 + (index % 6) + (index > 26 ? 2 : 0)),
    notes: index % 4 === 0 ? 'Busy day, needed a calmer evening routine.' : 'Normal check-in.',
  };
});

export const mindfulnessSessions = Array.from({ length: 18 }, (_, index) => {
  const date = new Date('2026-05-18');
  date.setDate(date.getDate() + index);
  const stressBefore = 5 + (index % 5);
  const completed = index % 6 !== 0;
  return {
    id: `session-${index + 1}`,
    userId: 'u1',
    type: sessionTypes[index % sessionTypes.length],
    startedAt: `${date.toISOString().slice(0, 10)} 20:${String(10 + index).padStart(2, '0')}`,
    endedAt: `${date.toISOString().slice(0, 10)} 20:${String(18 + index).padStart(2, '0')}`,
    durationMinutes: [6, 8, 12, 15][index % 4],
    stressBefore,
    stressAfter: completed ? Math.max(1, stressBefore - 2 - (index % 2)) : stressBefore,
    completed,
  };
});

export const mockUsers = Array.from({ length: 100 }, (_, index) => {
  const region = ['Addis Ababa', 'Oromia', 'Amhara', 'Tigray', 'Sidama', 'Somali'][index % 6];
  const pregnant = index % 9 === 0;
  return {
    id: `user-${String(index + 1).padStart(3, '0')}`,
    region,
    age: 19 + (index % 43),
    pregnant,
    averageMood: 2.8 + (index % 18) / 10,
    averageStress: 3 + (index % 7),
    weeklyBreathingSessions: index % 8,
    nutritionScore: 58 + (index % 35),
    freshnessAccessScore: 60 + (index % 34),
  };
});
