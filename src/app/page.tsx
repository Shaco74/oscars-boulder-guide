'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hallo! Ich bin Oscar und dein persönlicher KI Boulder Guide. Lade ein Foto deiner Kletterroute hoch und ich helfe dir dabei, die beste Lösung zu finden! 🧗‍♂️',
      isUser: false,
      timestamp: new Date('2024-01-01T12:00:00'),
    },
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const addMessage = (text: string, isUser: boolean) => {
    const newMessage: Message = {
      id: `msg-${Math.random().toString(36).substr(2, 9)}`,
      text,
      isUser,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setUploadedImage(imageUrl);
        addMessage('Hier ist meine Kletterroute!', true);
        startAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    
    const analysisSteps = [
      'Analysiere Routengeometrie...',
      'Ich denke nach... 🤔',
      'Wende Algorithmen an um Route zu triangulieren...',
      'Scanne Handgriffe und Tritte...',
      'Berechne optimale Körperposition...',
      'Heize Fluxkompensator auf... ⚡',
      'Kalibriere Gravitationsdetektor...',
      'Synchronisiere mit Klettersatelliten... 🛰️',
      'Aktiviere Quantenrouten-Analyse...',
      'Finale Berechnung wird durchgeführt...',
    ];

    let stepIndex = 0;
    
    const showNextStep = () => {
      if (stepIndex < analysisSteps.length) {
        setTimeout(() => {
          addMessage(analysisSteps[stepIndex], false);
          stepIndex++;
          showNextStep();
        }, 1500 + Math.random() * 1000);
      } else {
        setTimeout(() => {
          addMessage('✨ Analyse abgeschlossen! ✨', false);
          setTimeout(() => {
            addMessage('Die Lösung die du für dieses Problem brauchst lautet...', false);
            setTimeout(() => {
              addMessage('🎯 JUST GO UP! 🎯', false);
              setIsAnalyzing(false);
            }, 3000);
          }, 1000);
        }, 2000);
      }
    };

    showNextStep();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex flex-col">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-white text-center">
            🧗‍♂️ Oscar&apos;s Boulder Guide
          </h1>
          <p className="text-gray-300 text-center text-sm mt-1">
            Dein intelligenter Kletterbegleiter
          </p>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl px-4 py-3 ${
                  message.isUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 backdrop-blur-sm text-gray-100 border border-white/20'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString('de-DE', { 
                    hour: '2-digit', 
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          ))}
          
          {/* Show uploaded image */}
          {uploadedImage && (
            <div className="flex justify-end">
              <div className="max-w-xs sm:max-w-sm rounded-2xl overflow-hidden">
                <Image
                  src={uploadedImage}
                  alt="Hochgeladene Kletterroute"
                  width={300}
                  height={200}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          )}

          {/* Loading indicator */}
          {isAnalyzing && (
            <div className="flex justify-start">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-gray-300 text-sm">Analysiere...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Photo Upload Section */}
        <div className="p-4 bg-black/20 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageUpload}
                className="hidden"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              {/* Kamera Button - nur auf Mobile sichtbar */}
              <button
                onClick={handleCameraCapture}
                disabled={isAnalyzing}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 sm:hidden"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {isAnalyzing ? 'Analysiere...' : 'Foto aufnehmen'}
              </button>
              
              {/* Upload Button - auf Desktop volle Breite, auf Mobile neben Kamera */}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isAnalyzing}
                className="flex-1 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="sm:hidden">Foto hochladen</span>
                <span className="hidden sm:inline">Foto hochladen</span>
              </button>
            </div>
            
            <p className="text-gray-400 text-xs text-center mt-2">
              Lade ein Foto deiner Kletterroute hoch für eine Expertenanalyse
            </p>
            
            {/* Oscar's Features */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9 4.03-9 9-9z"/>
                  </svg>
                  <h3 className="text-white font-medium text-sm">KI-Analyse</h3>
                </div>
                <p className="text-gray-400 text-xs">Fortschrittliche Algorithmen analysieren deine Route in Sekunden</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                  <h3 className="text-white font-medium text-sm">Sofort-Feedback</h3>
                </div>
                <p className="text-gray-400 text-xs">Erhalte binnen Sekunden präzise Lösungsvorschläge</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                  <h3 className="text-white font-medium text-sm">Experten-Tipps</h3>
                </div>
                <p className="text-gray-400 text-xs">Von Oscar entwickelt, basierend auf jahrelanger Klettererfahrung</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}