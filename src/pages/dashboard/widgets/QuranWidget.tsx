
import { useState, useEffect } from "react";
import { BookOpen, RefreshCw, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const DAILY_VERSES = [
  {
    arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    translation: "Indeed, Allah is with the patient.",
    reference: "Surah Al-Baqarah 2:153",
    transliteration: "Inna Allaha maAAa alssabireena"
  },
  {
    arabic: "وَاذْكُرُوا اللَّهَ كَثِيرًا لَّعَلَّكُمْ تُفْلِحُونَ",
    translation: "And remember Allah often that you may succeed.",
    reference: "Surah Al-Jumu'ah 62:10",
    transliteration: "Waothkuroo Allaha katheeran laAAallakum tuflihoona"
  },
  {
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translation: "For indeed, with hardship [will be] ease.",
    reference: "Surah Ash-Sharh 94:5",
    transliteration: "Fainna maAAa alAAusri yusran"
  }
];

const QuranWidget = () => {
  const [verse, setVerse] = useState(DAILY_VERSES[0]);
  const [isOffline, setIsOffline] = useState(false);
  
  // Check if app is offline
  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);
    
    setIsOffline(!navigator.onLine);
    
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);
  
  const changeVerse = () => {
    const currentIndex = DAILY_VERSES.findIndex(v => v.reference === verse.reference);
    const nextIndex = (currentIndex + 1) % DAILY_VERSES.length;
    setVerse(DAILY_VERSES[nextIndex]);
  };
  
  return (
    <div className="space-y-4">
      <div className="text-right">
        <p className="text-2xl font-arabic mb-2 leading-loose">{verse.arabic}</p>
        <p className="text-sm text-gray-600 italic mb-4">{verse.transliteration}</p>
        <p className="mb-1">{verse.translation}</p>
        <p className="text-sm text-muslim-teal">{verse.reference}</p>
      </div>
      
      <div className="flex justify-between pt-2 border-t">
        <Button variant="outline" size="sm">
          <BookOpen className="h-4 w-4 mr-2" />
          <span>Read More</span>
        </Button>
        
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Volume2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={changeVerse}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {isOffline && (
        <div className="text-xs bg-yellow-50 text-yellow-800 p-2 rounded-md flex items-center justify-between">
          <span>You're offline. Verses are available offline.</span>
        </div>
      )}
    </div>
  );
};

export default QuranWidget;
