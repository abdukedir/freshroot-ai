const clamp = (value, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));

export function average(items, selector = (item) => item) {
  if (!items.length) return 0;
  return items.reduce((sum, item) => sum + selector(item), 0) / items.length;
}

export function detectMoodRisks(entries) {
  const recent = entries.slice(-7);
  const stress = average(recent, (item) => item.stressScore);
  const energy = average(recent, (item) => item.energyLevel);
  const sleep = average(recent, (item) => item.sleepHours);
  const moodDecline = recent.length >= 4 && recent.slice(-3).every((item) => item.moodScore <= 2);

  return {
    burnout: stress >= 7 && energy <= 4,
    stressTrend: stress >= 6 ? 'elevated' : stress >= 4 ? 'watch' : 'stable',
    emotionalDecline: moodDecline,
    sleepDebt: sleep > 0 && sleep < 6.5,
  };
}

export function pregnancyWeek(dueDate, today = new Date()) {
  const due = new Date(dueDate);
  const daysUntilDue = Math.ceil((due - today) / 86400000);
  return clamp(40 - Math.ceil(daysUntilDue / 7), 1, 42);
}

export function recommendBreathingSession(latestMood) {
  if (!latestMood) return '4-4-6 Breathing';
  if (latestMood.stressScore >= 8) return 'Deep Relaxation';
  if (latestMood.sleepHours < 6) return 'Sleep Meditation';
  if (latestMood.stressScore >= 5) return 'Box Breathing';
  return '4-4-6 Breathing';
}

export function unifiedWellnessScore({ moodEntries, pregnancyProfile, breathingSessions, activityMinutes = 35, nutritionScore = 82, marketplaceFreshness = 88 }) {
  const recentMood = moodEntries.slice(-7);
  const latestMood = recentMood.at(-1);
  const moodScore = latestMood ? clamp(average(recentMood, (item) => item.moodScore) * 20) : 70;
  const stressScore = latestMood ? clamp(100 - average(recentMood, (item) => item.stressScore) * 10) : 72;
  const sleepScore = latestMood ? clamp((average(recentMood, (item) => item.sleepHours) / 8) * 100) : 70;
  const breathingScore = clamp(breathingSessions.filter((item) => item.completed).length * 8 + average(breathingSessions.slice(-5), (item) => Math.max(0, item.stressBefore - item.stressAfter)) * 8);
  const activityScore = clamp((activityMinutes / 45) * 100);
  const pregnancyScore = pregnancyProfile?.active ? clamp(72 + pregnancyProfile.waterCups * 2 + pregnancyProfile.ironIntakeMg - pregnancyProfile.riskFlags.length * 12) : 82;

  return clamp(
    moodScore * 0.16 +
      stressScore * 0.15 +
      sleepScore * 0.12 +
      breathingScore * 0.12 +
      nutritionScore * 0.18 +
      marketplaceFreshness * 0.1 +
      activityScore * 0.08 +
      pregnancyScore * 0.09,
  );
}

export function generateWellnessRecommendations({ moodEntries, pregnancyProfile, breathingSessions, products }) {
  const risks = detectMoodRisks(moodEntries);
  const latestMood = moodEntries.at(-1);
  const breathing = recommendBreathingSession(latestMood);
  const ironFoods = products.filter((product) => product.tags.includes('iron')).slice(0, 3).map((product) => product.name);
  const immunityFoods = products.filter((product) => product.tags.includes('immunity')).slice(0, 3).map((product) => product.name);
  const recommendations = [];

  if (risks.burnout) recommendations.push(`Burnout risk is elevated. Start with ${breathing}, reduce evening caffeine, and choose an iron-rich meal bundle.`);
  if (risks.sleepDebt) recommendations.push(`Sleep debt detected. Try Sleep Meditation tonight and add lentils or teff for steady energy tomorrow.`);
  if (risks.emotionalDecline) recommendations.push('Mood has been low for several check-ins. Schedule a support conversation and keep notes short but consistent.');
  if (pregnancyProfile?.active) recommendations.push(`Pregnancy week ${pregnancyWeek(pregnancyProfile.dueDate)}: prioritize iron, hydration, safe movement, and the next appointment reminder.`);

  recommendations.push(`Recommended session: ${breathing}.`);
  recommendations.push(`Nutrition link: add ${ironFoods.join(', ') || 'teff and lentils'} for iron and ${immunityFoods.join(', ') || 'spinach'} for immunity.`);

  return recommendations.slice(0, 5);
}
