
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface IslamicQuoteProps {
  className?: string;
}

// Mock data for Islamic quotes
const islamicQuotes = [
  {
    id: 1,
    quoteArabic: "الدِّينُ النَّصِيحَةُ",
    quoteEnglish: "The religion is sincerity.",
    source: "Sahih Muslim"
  },
  {
    id: 2,
    quoteArabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
    quoteEnglish: "Actions are judged by intentions.",
    source: "Sahih Bukhari"
  },
  {
    id: 3,
    quoteArabic: "لَا ضَرَرَ وَلَا ضِرَارَ",
    quoteEnglish: "There should be neither harm nor reciprocating harm.",
    source: "Ibn Majah"
  },
  {
    id: 4,
    quoteArabic: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
    quoteEnglish: "The Muslim is the one from whose tongue and hand the Muslims are safe.",
    source: "Sahih Bukhari"
  },
  {
    id: 5,
    quoteArabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    quoteEnglish: "The best of you are those who learn the Quran and teach it.",
    source: "Sahih Bukhari"
  }
];

const IslamicQuote = ({ className }: IslamicQuoteProps) => {
  const [currentQuote, setCurrentQuote] = useState(islamicQuotes[0]);

  // Rotate through quotes every 10 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (islamicQuotes.findIndex(q => q.id === currentQuote.id) + 1) % islamicQuotes.length;
      setCurrentQuote(islamicQuotes[nextIndex]);
    }, 10000);
    
    return () => clearInterval(intervalId);
  }, [currentQuote]);

  return (
    <Card className={className}>
      <CardContent className="pt-6">
        <div className="flex items-start">
          <Quote className="h-6 w-6 text-muslim-teal mr-2 mt-1 shrink-0" />
          <div>
            <p className="text-right text-muslim-teal text-lg mb-2 font-arabic">{currentQuote.quoteArabic}</p>
            <p className="text-muslim-dark text-md mb-1">{currentQuote.quoteEnglish}</p>
            <p className="text-sm text-gray-500 italic">— {currentQuote.source}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IslamicQuote;
