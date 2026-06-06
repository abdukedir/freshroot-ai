import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Baby, Brain, HeartPulse, Moon, Sparkles, Wind } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mindfulnessSessions, moodCheckins, moodOptions, pregnancyProfile, sessionTypes } from '../data/wellnessData';
import { average, generateWellnessRecommendations, pregnancyWeek, recommendBreathingSession, unifiedWellnessScore } from '../utils/wellnessAI';
import { useLanguage } from '../context/LanguageContext';

const tabs = [
  { id: 'mood', labelKey: 'moodCheckIn', icon: Brain },
  { id: 'pregnancy', labelKey: 'pregnancyCoach', icon: Baby },
  { id: 'breathing', labelKey: 'breathing', icon: Wind },
  { id: 'summary', labelKey: 'myWellness', icon: HeartPulse },
];

function SimpleButton({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex min-h-24 flex-col items-center justify-center gap-2 rounded-lg border p-4 text-center font-black transition ${
        active ? 'border-primary bg-green-50 text-primary' : 'border-slate-100 bg-white text-dark hover:border-primary/30 hover:bg-green-50'
      }`}
    >
      <Icon size={26} />
      <span>{label}</span>
    </button>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 p-4">
      <span className="font-bold text-slate-600">{label}</span>
      <span className="text-right font-black text-dark">{value}</span>
    </div>
  );
}

export default function Wellness() {
  const { products } = useApp();
  const { t } = useLanguage();
  const [active, setActive] = useState('mood');
  const [selectedMood, setSelectedMood] = useState(moodOptions[1]);
  const latestMood = moodCheckins.at(-1);
  const wellnessProduct = products.find((product) => product.tags.includes('iron') || product.tags.includes('immunity')) || products[0];
  const currentWeek = pregnancyWeek(pregnancyProfile.dueDate);
  const recommendedSession = recommendBreathingSession(latestMood);
  const score = useMemo(
    () =>
      unifiedWellnessScore({
        moodEntries: moodCheckins,
        pregnancyProfile,
        breathingSessions: mindfulnessSessions,
        nutritionScore: 84,
        marketplaceFreshness: Math.round(average(products.slice(0, 8), (product) => product.freshness)),
      }),
    [products],
  );
  const [topRecommendation] = generateWellnessRecommendations({
    moodEntries: moodCheckins,
    pregnancyProfile,
    breathingSessions: mindfulnessSessions,
    products,
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <section className="panel p-6">
        <p className="font-bold text-accent">{t('wellnessHub')}</p>
        <h1 className="mt-2 text-4xl font-black text-dark">{t('wellnessTitle')}</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          {t('wellnessCopy')}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tabs.map((tab) => (
            <SimpleButton key={tab.id} icon={tab.icon} label={t(tab.labelKey)} active={active === tab.id} onClick={() => setActive(tab.id)} />
          ))}
        </div>
      </section>

      <section className="panel mt-6 p-6">
        {active === 'mood' && (
          <div>
            <div className="flex items-center gap-3">
              <Brain className="text-primary" />
              <h2 className="text-2xl font-black text-dark">{t('moodCheckIn')}</h2>
            </div>
            <div className="mt-5 grid grid-cols-5 gap-2">
              {moodOptions.map((mood) => (
                <button
                  key={mood.label}
                  onClick={() => setSelectedMood(mood)}
                  className={`rounded-lg border p-4 text-center ${selectedMood.label === mood.label ? 'border-primary bg-green-50' : 'border-slate-100 bg-white'}`}
                >
                  <span className="text-3xl">{mood.emoji}</span>
                  <span className="mt-2 block text-xs font-black text-dark">{mood.label}</span>
                </button>
              ))}
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <InfoRow label={t('energy')} value={`${latestMood.energyLevel}/10`} />
              <InfoRow label={t('sleep')} value={`${latestMood.sleepHours} hrs`} />
              <InfoRow label={t('stress')} value={`${latestMood.stressScore}/10`} />
            </div>
            <textarea className="input mt-4 min-h-24" defaultValue={t('moodNote')} />
            <button className="btn-primary mt-4 w-full sm:w-auto">{t('saveMood')}</button>
          </div>
        )}

        {active === 'pregnancy' && (
          <div>
            <div className="flex items-center gap-3">
              <Baby className="text-primary" />
              <h2 className="text-2xl font-black text-dark">{t('pregnancyCoach')}</h2>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <InfoRow label={t('currentWeek')} value={t('week', { week: currentWeek })} />
              <InfoRow label={t('dueDate')} value={pregnancyProfile.dueDate} />
              <InfoRow label={t('waterToday')} value={`${pregnancyProfile.waterCups}/8 cups`} />
              <InfoRow label={t('ironToday')} value={`${pregnancyProfile.ironIntakeMg}mg`} />
            </div>
            <div className="mt-5 rounded-lg bg-green-50 p-4">
              <p className="font-black text-dark">{t('todaysGuidance')}</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{t('pregnancyGuidance')}</p>
            </div>
            <button className="btn-primary mt-4 w-full sm:w-auto">{t('logPregnancy')}</button>
          </div>
        )}

        {active === 'breathing' && (
          <div>
            <div className="flex items-center gap-3">
              <Wind className="text-primary" />
              <h2 className="text-2xl font-black text-dark">{t('breathing')}</h2>
            </div>
            <p className="mt-3 text-slate-600">{t('recommendedNow')} <strong>{recommendedSession}</strong></p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {sessionTypes.map((type) => (
                <button key={type} className={`btn-secondary justify-start ${type === recommendedSession ? 'border-primary bg-green-50' : ''}`}>
                  <Wind size={18} />
                  {type}
                </button>
              ))}
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <InfoRow label={t('streak')} value="12 days" />
              <InfoRow label={t('lastSession')} value="8 min" />
              <InfoRow label={t('stressReduced')} value="3 points" />
            </div>
          </div>
        )}

        {active === 'summary' && (
          <div>
            <div className="flex items-center gap-3">
              <HeartPulse className="text-primary" />
              <h2 className="text-2xl font-black text-dark">{t('myWellness')}</h2>
            </div>
            <div className="mt-5 rounded-lg bg-dark p-6 text-white">
              <p className="text-sm font-bold text-white/70">{t('unifiedWellnessScore')}</p>
              <p className="mt-2 text-6xl font-black">{score}</p>
              <p className="mt-2 text-sm text-white/80">{t('wellnessScoreParts')}</p>
            </div>
            <div className="mt-5 rounded-lg bg-green-50 p-4">
              <p className="flex items-center gap-2 font-black text-dark"><Sparkles className="text-primary" size={18} />{t('aiSuggestion')}</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{topRecommendation}</p>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <InfoRow label={t('mood')} value={`${latestMood.emoji} ${latestMood.mood}`} />
              <InfoRow label={t('breathing')} value="12 day streak" />
              <InfoRow label={t('sleep')} value={<span className="inline-flex items-center gap-1"><Moon size={14} />{latestMood.sleepHours} hrs</span>} />
            </div>
          </div>
        )}
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-3">
        <button className="btn-secondary"><Activity size={18} />{t('viewHistory')}</button>
        <Link to="/coach" className="btn-secondary"><Sparkles size={18} />{t('getAiAdvice')}</Link>
        <Link to={wellnessProduct ? `/product/${wellnessProduct.id}` : '/marketplace'} className="btn-primary">{t('shopWellnessFoods')}</Link>
      </section>
    </div>
  );
}
