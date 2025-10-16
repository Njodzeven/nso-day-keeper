import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';

// Nso Week Days Data
const NSO_WEEK_DAYS = [
  { index: 0, name: "Kaáví" },
  { index: 1, name: "Raávay" },
  { index: 2, name: "Kìloòvày" },
  { index: 3, name: "Nsààrí" },
  { index: 4, name: "Geegee" },
  { index: 5, name: "Ngòylùm" },
  { index: 6, name: "Wáyùlùn" },
  { index: 7, name: "Ntànrìn" }
];

// Cultural Content Data
const CULTURAL_CONTENT: Record<number, { theme: string; significance: string }> = {
  0: { // Kaáví
    theme: "The Economic Hub",
    significance: "Kaáví is the biggest and main market day, historically hosting the Nso central market at Mveh. It is a critical nexus for commerce, trade, and communication, as messages from the Fon and village heads are often disseminated to the population on this day. The day's rhythm is defined by economic and political information flow."
  },
  1: { // Raávay
    theme: "General Activity Day",
    significance: "A day for general community work, farming, and family activities, forming the productive backbone of the Nso week."
  },
  2: { // Kìloòvày
    theme: "The Mandated Pause (Gender-Specific)",
    significance: "Kìloòvày is a mandatory 'rest day for women farmers.' This is a profound cultural rule acknowledging the vital role of Nso women, the 'backbone of the country,' in agriculture and food subsistence. Historically, it was also a day for palace sacrificial rituals. The day emphasizes rest, ritual, and the honored status of women in the traditional labor structure."
  },
  3: { // Nsààrí
    theme: "General Activity Day",
    significance: "A day for general community work, farming, and family activities."
  },
  4: { // Geegee
    theme: "The Palace Day",
    significance: "Geegee is strongly associated with the central political and spiritual authority: the Fon. It is the designated day for major palace gatherings, state events, and important celebrations, bringing the community together at the Nto' Nso (Palace)."
  },
  5: { // Ngòylùm
    theme: "Spiritual/Ancestral Off-Day (Vishiy Ve Bam)",
    significance: "Ngòylùm is a traditional 'off day' known as Vishiy Ve Bam. This is distinct from an agricultural rest day; it is a spiritual pause during which ancestral spirits are believed to carry out their own activities, and the living are to be reverent. The day is focused on reflection and adherence to ancestral taboos."
  },
  6: { // Wáyùlùn
    theme: "Orature Weekend & Community Day",
    significance: "Continuing the 'Traditional Weekend,' Wáyùlùn is a day for family, rest, and orature (oral traditions)."
  },
  7: { // Ntànrìn
    theme: "The Assembly and Communication Day",
    significance: "Ntànrìn is critical for grassroots governance. The Mfu warrior society—a key traditional organization in each village responsible for community work and news dissemination—gathers on this eighth day. These assemblies reinforce social cohesion and local political engagement, often accompanied by the communal drinking of Melu (raffia palm wine)."
  }
};

const GOVERNANCE_FACTS = [
  "The supreme Nso authority is the Fon, who is both the head of government and the chief religious leader, entrusted with keeping the ancestors content.",
  "The Fon is supported by a council of seven hereditary notables known as the Vibais or Shufais, whose positions are historically determined.",
  "The Nto' Nso (Nso Palace) is the center of governance and a cultural archive, with architecture that conveys motifs of fertility, protection, and ancestral authority.",
  "Nso governance includes a system of checks and balances through two regulatory societies: Ngwerong (for commoners) and Ngiri (for princes).",
  "The Ngwerong society enforces the Fon's decisions and is solely responsible for the enthronement of a new Fon, ensuring a non-royal check on royal power."
];

const LAM_NSO_PHRASES = [
  { nso: "Ye ran ni wo", english: "Good Morning" },
  { nso: "A sahka?", english: "What news? (Greeting)" },
  { nso: "M bo sa", english: "I am fine (Reply)" },
  { nso: "Beri wo", english: "Thank you" },
  { nso: "Wiykijuŋ", english: "You are welcome" },
  { nso: "Aresi nia", english: "Good afternoon" },
  { nso: "yi ginia", english: "Good evening" },
  { nso: "Buni kijuŋ", english: "Sleep well" },
  { nso: "Nyuy se vi wo", english: "God bless you" }
];

const PROVERB_TEXT = "In Nso culture, proverbs (Lamin-ki Nso) are a measure of wisdom and speaker competence. They embody the collective worldview and ethical principles, serving as critical instruments of education.";

const STORY_PROMPT = "Nso Folk Tales, or Ma' Nganndo, are an integral part of Nso orature. Traditionally told by elders after evening meals on these 'weekend' days, they serve as a primary means of socialization, entertainment, and passing down cultural values to children.";

// Utility function to calculate Nso day
function getNsoDay(date: Date) {
  const epoch = new Date('1970-01-01T00:00:00Z');
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);
  
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysSinceEpoch = Math.floor((targetDate.getTime() - epoch.getTime()) / msPerDay);
  const nsoDayIndex = (daysSinceEpoch + 3) % 8;
  
  return NSO_WEEK_DAYS[nsoDayIndex];
}

// Main App Component
export default function NsoDayKeeper() {
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date());
  
  const currentNsoDay = getNsoDay(currentDate);
  const selectedNsoDay = getNsoDay(selectedDate);
  const selectedContent = CULTURAL_CONTENT[selectedNsoDay.index];
  
  // Get random daily phrase
  const dailyPhrase = LAM_NSO_PHRASES[Math.floor(Math.random() * LAM_NSO_PHRASES.length)];
  
  // Get governance fact for Geegee
  const governanceFact = GOVERNANCE_FACTS[Math.floor(Math.random() * GOVERNANCE_FACTS.length)];
  
  // Check if selected day should show proverb (Raávay or Nsààrí)
  const showProverb = selectedNsoDay.index === 1 || selectedNsoDay.index === 3;
  
  // Check if selected day is weekend (Ngòylùm or Wáyùlùn)
  const isWeekend = selectedNsoDay.index === 5 || selectedNsoDay.index === 6;
  
  // Format date
  const formatDate = (date: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };
  
  // Calendar generation
  const generateCalendar = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const calendar = [];
    let day = 1;
    
    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startingDayOfWeek) {
          week.push(null);
        } else if (day > daysInMonth) {
          week.push(null);
        } else {
          week.push(day);
          day++;
        }
      }
      calendar.push(week);
      if (day > daysInMonth) break;
    }
    
    return calendar;
  };
  
  const calendar = generateCalendar();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };
  
  const handleDayClick = (day: number) => {
    if (day) {
      const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
      setSelectedDate(newDate);
    }
  };
  
  const isToday = (day: number) => {
    if (!day) return false;
    const checkDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    return checkDate.toDateString() === currentDate.toDateString();
  };
  
  const isSelected = (day: number) => {
    if (!day) return false;
    const checkDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    return checkDate.toDateString() === selectedDate.toDateString();
  };
  
  const handleAudioPlay = () => {
    console.log('Audio playback triggered for:', dailyPhrase.nso);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-800 to-orange-700 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold">Bòŋ Lám Nso'</h1>
            <button className="px-4 py-2 rounded-lg transition-colors text-sm md:text-base bg-gradient-to-r from-amber-600 to-orange-500 text-white hover:from-amber-500 hover:to-orange-400 ring-1 ring-white/20">
              Contribute
            </button>
          </div>
          <p className="text-amber-100 text-sm mt-2">Nso Day Keeper • Cultural Heritage Calendar</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 pb-20">
        {/* Current Day Display */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border-2 border-amber-200">
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-2">{formatDate(currentDate)}</p>
            <h2 className="text-4xl md:text-6xl font-bold text-amber-900 mb-4">{currentNsoDay.name}</h2>
            <p className="text-amber-700 text-sm md:text-base">Today's Nso Day</p>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-8">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={handlePrevMonth}
              className="p-2 hover:bg-amber-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-amber-800" />
            </button>
            <h3 className="text-xl md:text-2xl font-bold text-amber-900">
              {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
            </h3>
            <button 
              onClick={handleNextMonth}
              className="p-2 hover:bg-amber-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-amber-800" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs md:text-sm font-semibold text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1 md:gap-2">
            {calendar.map((week, weekIdx) => (
              <React.Fragment key={weekIdx}>
                {week.map((day, dayIdx) => {
                  if (!day) {
                    return <div key={`empty-${weekIdx}-${dayIdx}`} className="aspect-square" />;
                  }
                  
                  const dayDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
                  const nsoDay = getNsoDay(dayDate);
                  const today = isToday(day);
                  const selected = isSelected(day);
                  
                  return (
                    <button
                      key={day}
                      onClick={() => handleDayClick(day)}
                      className={`aspect-square p-1 md:p-2 rounded-lg transition-all hover:shadow-md ${
                        today ? 'bg-amber-500 text-white ring-2 ring-amber-600' :
                        selected ? 'bg-amber-200 text-amber-900' :
                        'bg-gray-50 hover:bg-amber-50'
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        <span className={`text-sm md:text-lg font-semibold ${today ? 'text-white' : 'text-gray-800'}`}>
                          {day}
                        </span>
                        <span className={`text-xs mt-1 ${today ? 'text-white' : 'text-amber-700'}`}>
                          {nsoDay.name}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Daily Detail Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h3 className="text-3xl font-bold text-amber-900 mb-2">{selectedNsoDay.name}</h3>
          <p className="text-amber-700 text-lg mb-6">{selectedContent.theme}</p>
          
          <div className="prose max-w-none mb-8">
            <p className="text-gray-700 leading-relaxed">{selectedContent.significance}</p>
          </div>

          {/* Lam Nso Phrase of the Day */}
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-6 mb-6">
            <h4 className="text-lg font-bold text-amber-900 mb-3">Lam Nso Phrase of the Day</h4>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-amber-800 mb-1">{dailyPhrase.nso}</p>
                <p className="text-gray-700">{dailyPhrase.english}</p>
              </div>
              <button 
                onClick={handleAudioPlay}
                className="p-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full transition-colors"
                aria-label="Play pronunciation"
              >
                <Volume2 className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Geegee: Governance Fact */}
          {selectedNsoDay.index === 4 && (
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 mb-6">
              <h4 className="text-lg font-bold text-purple-900 mb-3">Fact about Nso Governance</h4>
              <p className="text-gray-700 leading-relaxed">{governanceFact}</p>
            </div>
          )}

          {/* Weekend: Story Time Prompt */}
          {isWeekend && (
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl p-6 mb-6">
              <h4 className="text-lg font-bold text-blue-900 mb-3">Ma' Nganndo (Story Time)</h4>
              <p className="text-gray-700 leading-relaxed">{STORY_PROMPT}</p>
            </div>
          )}

          {/* Proverb Insight */}
          {showProverb && (
            <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-xl p-6">
              <h4 className="text-lg font-bold text-green-900 mb-3">Proverbial Insight</h4>
              <p className="text-gray-700 leading-relaxed">{PROVERB_TEXT}</p>
            </div>
          )}
        </div>
      </main>

      {/* Advertisement Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-200 text-center p-2 text-sm text-gray-600 shadow-lg">
        Advertisement
      </div>
    </div>
  );
}