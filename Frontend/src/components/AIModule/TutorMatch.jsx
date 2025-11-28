import React, { useState } from 'react';
import { BookOpen, Compass, Target, Lightbulb, Heart, User, Mail, Star, RefreshCw, ChevronRight, ArrowRight } from 'lucide-react';

// --- DATA: The Questionnaire ---
const QUESTIONS = [
  {
    id: 0,
    topic: "Curiosity",
    icon: <BookOpen className="w-5 h-5 text-blue-500" />,
    question: "We have 1 hour to cover a complex topic. How do we spend it?",
    options: [
      { value: 1, text: "Give me the cheat codes/shortcuts. I just need to pass." },
      { value: 2, text: "Focus on the main exam questions." },
      { value: 3, text: "Balance between exam prep and understanding the theory." },
      { value: 4, text: "Explain the 'why' behind the formulas." },
      { value: 5, text: "I want to derive everything from scratch, even if we don't finish." }
    ]
  },
  {
    id: 1,
    topic: "Freedom",
    icon: <Compass className="w-5 h-5 text-green-500" />,
    question: "You run into a difficult problem during the session. What should the tutor do?",
    options: [
      { value: 1, text: "Take the pen immediately and show me the steps." },
      { value: 2, text: "Give me a hint, then solve it for me if I stumble." },
      { value: 3, text: "Guide me verbally while I write." },
      { value: 4, text: "Let me struggle for a bit, only step in if I'm totally lost." },
      { value: 5, text: "Don't say anything. Let me figure it out, even if it takes 20 mins." }
    ]
  },
  {
    id: 2,
    topic: "Responsibility",
    icon: <Target className="w-5 h-5 text-red-500" />,
    question: "How should we handle homework and deadlines?",
    options: [
      { value: 1, text: "I need you to text me reminders and check every single question." },
      { value: 2, text: "Give me strict deadlines and check if I did it." },
      { value: 3, text: "Just ask me if I had any trouble with it." },
      { value: 4, text: "I'll do it if I have time; don't pressure me." },
      { value: 5, text: "I manage my own study schedule. I'll tell you what I worked on." }
    ]
  },
  {
    id: 3,
    topic: "Creativity",
    icon: <Lightbulb className="w-5 h-5 text-yellow-500" />,
    question: "There are 3 ways to solve a math problem. Which do you want?",
    options: [
      { value: 1, text: "Just teach me the one method that always works for the test." },
      { value: 2, text: "Show me the standard method, maybe one shortcut." },
      { value: 3, text: "I'm open to seeing a second method if it's faster." },
      { value: 4, text: "Show me different perspectives so I really understand it." },
      { value: 5, text: "I want to explore every possible way to solve it, even the weird ones." }
    ]
  },
  {
    id: 4,
    topic: "Mismatch Tolerance",
    icon: <Heart className="w-5 h-5 text-purple-500" />,
    question: "The tutor explains a concept, but you don't get it. How do you feel?",
    options: [
      { value: 1, text: "Frustrated. I want them to change their teaching style immediately." },
      { value: 2, text: "I prefer if they just simplified it for me." },
      { value: 3, text: "I'm okay with trying one more time." },
      { value: 4, text: "I'll keep asking questions until I get their logic." },
      { value: 5, text: "Motivated. I enjoy the challenge of bridging the gap." }
    ]
  }
];

// --- COMPONENT: The Main App ---
export default function App() {
  const [view, setView] = useState('home'); // 'home' | 'quiz'
  const [answers, setAnswers] = useState({});
  const [recommendations, setRecommendations] = useState([]); // Stores the list of matches

  const handleSelect = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const isComplete = QUESTIONS.every(q => answers[q.id] !== undefined);

  const handleSubmit = async () => {    
    const answerVector = [
      answers[0], 
      answers[1], 
      answers[2], 
      answers[3], 
      answers[4]
    ];

    try {
      const response = await fetch('http://localhost:8000/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scores: answerVector })
      });
      
      if (!response.ok) throw new Error("Failed to fetch from Python");
    
      const data = await response.json();

      setRecommendations(data);
      setView('home'); 

    } catch (error) {
      console.error("Error connecting to backend", error);
      alert("Error: Could not connect to Python backend. Is uvicorn running?");
    }
  };

  // -- SUB-COMPONENTS --

  // 1. The Recommendation Strip (Visible only if we have results)
  const RecommendationStrip = () => (
    <div className="w-full bg-white border-b border-gray-200 shadow-sm py-6 animate-fade-in-down">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <Star className="w-5 h-5 text-yellow-400 mr-2 fill-current" />
            Top Recommendations For You
          </h2>
          <button onClick={() => setView('quiz')} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
            Retake Quiz <RefreshCw className="w-3 h-3 ml-1" />
          </button>
        </div>
        
        {/* The Horizontal Scroll Container */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
          {recommendations.map((tutor) => (
            <div key={tutor.id} className="min-w-[280px] md:min-w-[320px] bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow snap-center cursor-pointer">
              <div className="flex justify-between items-start">
                <div className={`text-xs font-bold px-2 py-1 rounded-full ${tutor.color}`}>
                  {tutor.score}% Match
                </div>
                <Heart className="w-5 h-5 text-gray-300 hover:text-red-500" />
              </div>
              
              <div className="mt-4 flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-500">
                  {tutor.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{tutor.name}</h3>
                  <p className="text-sm text-gray-500">{tutor.subject}</p>
                </div>
              </div>
              
              <p className="mt-3 text-sm text-gray-600 line-clamp-2">"{tutor.bio}"</p>
    
              <button className="mt-4 w-full py-2 bg-gray-50 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 transition">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 2. The Hero / No-Results Section
  const HeroSection = () => (
    <div className="w-full bg-white border-b border-gray-200 shadow-sm py-6 animate-fade-in-down">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">    
        {recommendations.length === 0 && (
          <button 
            onClick={() => setView('quiz')}
            className="group bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-1 flex items-center"
          >
            Start Matching <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
          </button>
        )}
      </div>
    </div>
  );

  // 3. The Questionnaire Section
  const QuizSection = () => (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <button onClick={() => setView('home')} className="mb-6 text-gray-500 hover:text-gray-900 flex items-center">
        <ChevronRight className="w-4 h-4 rotate-180 mr-1" /> Back to Home
      </button>
      
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Learning Style Assessment</h2>
          <p className="text-gray-500">Be honest. There are no wrong answers.</p>
        </div>

        {QUESTIONS.map((q) => (
          <div key={q.id} className="bg-white shadow-sm border border-gray-200 rounded-xl p-6 transition hover:shadow-md">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-gray-50 rounded-lg mr-3">
                {q.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-900">{q.question}</h3>
            </div>
            <div className="space-y-2">
              {q.options.map((opt) => (
                <label 
                  key={opt.value}
                  className={`
                    flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200
                    ${answers[q.id] === opt.value 
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                      : 'border-gray-200 hover:bg-gray-50 text-gray-600'}
                  `}
                >
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    value={opt.value}
                    checked={answers[q.id] === opt.value}
                    onChange={() => handleSelect(q.id, opt.value)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <span className="ml-3 text-sm font-medium">{opt.text}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-end pt-4">
           <button
            onClick={handleSubmit}
            disabled={!isComplete}
            className={`
              w-full sm:w-auto inline-flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white 
              ${!isComplete ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700'}
            `}
          >
            {"Submit Answers"}
          </button>
        </div>
      </div>
    </div>
  );

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <main>
        {view === 'home' && (
          <>
            {/* 1. Show Recommendation Strip IF we have data */}
            {recommendations.length > 0 && <RecommendationStrip />}
            
            {/* 2. Show Hero Section */}
            <HeroSection />
          </>
        )}

        {view === 'quiz' && <QuizSection />}
      </main>

    </div>
  );
}