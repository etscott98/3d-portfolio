'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Send, Bot, User, Loader2 } from 'lucide-react';
import gsap from 'gsap';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Lazy load the 3D background for better performance
const ScrollAnimated3DBackground = dynamic<{ scrollProgress: number }>(
  () => import('./ScrollAnimated3DBackground'),
  { 
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 w-full h-screen z-0 bg-gradient-to-b from-black via-zinc-900/50 to-black flex items-center justify-center">
        <div className="text-lime-400 text-center">
          <div className="w-16 h-16 border-4 border-lime-400/30 border-t-lime-400 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm uppercase tracking-widest">Loading Experience...</p>
        </div>
      </div>
    )
  }
);

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      content: "Hi! I'm Erin's AI assistant. Ask me anything about her work."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const suggestions = [
    "What's Erin's design philosophy?",
    "Tell me about her technical skills",
  ];

  useEffect(() => {
    // Scroll only the messages container, not the page
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Track scroll progress for animations
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroHeight = heroRef.current.offsetHeight;
        const scrolled = window.scrollY;
        const progress = Math.min(scrolled / heroHeight, 1); // 0 to 1 over full hero height
        setScrollProgress(progress);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    // Capture ref values for cleanup
    const nameEl = nameRef.current;
    const titleEl = titleRef.current;
    const descChildren = descRef.current?.children;

    // Reset elements to initial state first
    if (nameEl && titleEl) {
      gsap.set([nameEl, titleEl], { clearProps: 'all' });
    }
    if (descChildren) {
      gsap.set(Array.from(descChildren), { clearProps: 'all' });
    }
    
    // Animate on load
    if (nameEl) {
      gsap.fromTo(nameEl, 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.8, ease: 'power3.out' }
      );
    }

    if (titleEl) {
      gsap.fromTo(titleEl,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 1, ease: 'power3.out' }
      );
    }

    if (descChildren) {
      gsap.fromTo(Array.from(descChildren),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 1.2, stagger: 0.1, ease: 'power3.out' }
      );
    }

    // Cleanup on unmount - use captured values
    return () => {
      if (nameEl || titleEl) {
        const elementsToClean = [nameEl, titleEl].filter(Boolean);
        if (elementsToClean.length > 0) {
          gsap.set(elementsToClean, { clearProps: 'all' });
        }
      }
      if (descChildren) {
        gsap.set(Array.from(descChildren), { clearProps: 'all' });
      }
    };
  }, []);

  const scrollToWork = () => {
    const workSection = document.getElementById('work');
    workSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await response.json();
      const aiMessage: Message = {
        role: 'ai',
        content: data.response || "I couldn't process that. Please try again."
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'ai',
        content: "Sorry, I'm having trouble connecting. You can reach Erin at lunarspired@gmail.com"
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section ref={heroRef} className="relative w-full bg-black scroll-snap-container" style={{ height: '600vh' }}>
      {/* Scroll snap points for each scene (6 scenes x 100vh each) */}
      <div className="absolute top-0 left-0 w-full h-[100vh] scroll-snap-point" />
      <div className="absolute left-0 w-full h-[100vh] scroll-snap-point" style={{ top: '100vh' }} />
      <div className="absolute left-0 w-full h-[100vh] scroll-snap-point" style={{ top: '200vh' }} />
      <div className="absolute left-0 w-full h-[100vh] scroll-snap-point" style={{ top: '300vh' }} />
      <div className="absolute left-0 w-full h-[100vh] scroll-snap-point" style={{ top: '400vh' }} />
      <div className="absolute left-0 w-full h-[100vh] scroll-snap-point" style={{ top: '500vh' }} />
      
      {/* 3D Animated Background */}
      <ScrollAnimated3DBackground scrollProgress={scrollProgress} />
      
      {/* Subtle Grid Pattern Overlay */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-[1]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(lime 1px, transparent 1px), linear-gradient(90deg, lime 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Content - Positioned strategically to not block 3D model */}
      <div className="sticky top-0 z-20 w-full h-screen flex items-center pointer-events-none">
        
        {/* Intro Content - Visible during face close-up (Scene 2: 16.67-33.33%) */}
        <div 
          ref={contentRef}
          className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 max-w-md transition-all duration-700 pointer-events-auto"
          style={{
            opacity: scrollProgress >= 0.165 && scrollProgress < 0.33 ? 1 : 0,
            transform: `translateY(-50%) translateX(${scrollProgress >= 0.165 && scrollProgress < 0.33 ? '0' : '100%'})`
          }}
        >
          <div className="flex flex-col space-y-4 md:space-y-6 bg-black/60 backdrop-blur-xl p-6 md:p-8 border border-lime-400/20 shadow-[0_0_40px_rgba(0,0,0,0.9)]">
            {/* Star icon */}
            <div className="text-4xl md:text-5xl opacity-60 text-lime-400 drop-shadow-[0_0_15px_rgba(163,230,53,0.5)]">★</div>

            {/* Name */}
            <h1 ref={nameRef} className="text-5xl md:text-6xl font-bold text-white leading-none tracking-tight lowercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
              i'm erin
            </h1>

            {/* Title */}
            <p ref={titleRef} className="text-xl md:text-2xl font-medium text-lime-400 drop-shadow-[0_2px_15px_rgba(163,230,53,0.6)]">
              lead product designer
            </p>

            {/* Description */}
            <div ref={descRef} className="space-y-2">
              <p className="text-base md:text-lg text-gray-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                i design to feel something,
                <br />
                code to feel nothing,
                <br />
                <span className="text-lime-400 font-medium drop-shadow-[0_2px_12px_rgba(163,230,53,0.6)]">
                  and live somewhere in between.
                </span>
              </p>
              <p className="text-sm text-gray-400 pt-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                working to make you feel 1% more human
              </p>
            </div>
          </div>
        </div>

        {/* Featured Work - Scene 4 (50-66.67%) - Grid around character */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            opacity: scrollProgress >= 0.495 && scrollProgress < 0.665 ? 1 : 0,
          }}
        >
          {/* Top Left */}
          <div className="absolute left-[5%] md:left-[8%] top-[8%] md:top-[12%] pointer-events-auto max-w-[360px] md:max-w-[440px]">
            <Link href="/case-study/flologic" className="block">
              <div className="group bg-black/70 backdrop-blur-xl border border-lime-400/20 hover:border-lime-400/40 transition-all duration-300 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.9)] cursor-pointer">
                <div className="aspect-video w-full bg-zinc-900 overflow-hidden">
                  <img 
                    src="/assets/images/projects/flologic/image of all new pages.png" 
                    alt="FloLogic Mobile App"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-2">
                  <p className="text-white font-semibold text-xs">FloLogic Mobile</p>
                  <p className="text-gray-400 text-[10px] mt-0.5">Redesign & Design System</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Top Right */}
          <div className="absolute right-[5%] md:right-[8%] top-[8%] md:top-[12%] pointer-events-auto max-w-[360px] md:max-w-[440px]">
            <Link href="/case-study/circadia" className="block">
              <div className="group bg-black/70 backdrop-blur-xl border border-lime-400/20 hover:border-lime-400/40 transition-all duration-300 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.9)] cursor-pointer">
                <div className="aspect-video w-full bg-zinc-900 overflow-hidden">
                  <img 
                    src="/assets/images/projects/circadia/circadia.png" 
                    alt="Circadia AI Sleep App"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-2">
                  <p className="text-white font-semibold text-xs">Circadia AI</p>
                  <p className="text-gray-400 text-[10px] mt-0.5">Product & Development</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Bottom Left */}
          <div className="absolute left-[5%] md:left-[8%] bottom-[8%] md:bottom-[12%] pointer-events-auto max-w-[360px] md:max-w-[440px]">
            <Link href="/case-study/loneliness" className="block">
              <div className="group bg-black/70 backdrop-blur-xl border border-lime-400/20 hover:border-lime-400/40 transition-all duration-300 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.9)] cursor-pointer">
                <div className="aspect-video w-full bg-zinc-900 overflow-hidden">
                  <img 
                    src="/assets/images/projects/teamu/Teamu 1.png" 
                    alt="TeamU Social Platform"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-2">
                  <p className="text-white font-semibold text-xs">TeamU Platform</p>
                  <p className="text-gray-400 text-[10px] mt-0.5">AI Social Interaction</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Bottom Right */}
          <div className="absolute right-[5%] md:right-[8%] bottom-[8%] md:bottom-[12%] pointer-events-auto max-w-[360px] md:max-w-[440px]">
            <Link href="/case-study/dashboard" className="block">
              <div className="group bg-black/70 backdrop-blur-xl border border-lime-400/20 hover:border-lime-400/40 transition-all duration-300 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.9)] cursor-pointer">
                <div className="aspect-video w-full bg-zinc-900 overflow-hidden">
                  <img 
                    src="/assets/images/projects/user dashboard/thumbnail.png" 
                    alt="FloLogic Dashboard MVP"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-2">
                  <p className="text-white font-semibold text-xs">FloLogic Dashboard</p>
                  <p className="text-gray-400 text-[10px] mt-0.5">Property Management</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Right Side - Skills - Scene 5 (66.67-83.33%) */}
        <div 
          className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 max-w-lg transition-all duration-700 pointer-events-auto"
          style={{
            opacity: scrollProgress >= 0.665 && scrollProgress < 0.84 ? 1 : 0,
            transform: `translateY(-50%) translateX(${scrollProgress >= 0.665 && scrollProgress < 0.84 ? '0' : '120%'})`
          }}
        >
          <div className="bg-black/70 backdrop-blur-xl p-6 border border-lime-400/20 shadow-[0_0_40px_rgba(0,0,0,0.9)]">
            <h3 className="text-2xl font-bold text-lime-400 mb-5 uppercase tracking-wider">Skills & Tools</h3>
            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 tour-panel-scroll">
              {/* Product Design */}
              <div>
                <h4 className="text-lime-400/80 font-semibold text-sm mb-3 uppercase tracking-wide">Product Design</h4>
                <ul className="space-y-2">
                  {[
                    'End-to-end: research → wireframes → UI → dev handoff',
                    'Scalable design systems & documentation',
                    'Accessibility-first workflows (WCAG)',
                    'Figma, Miro, Maze, Adobe CC'
                  ].map((skill, i) => (
                    <li key={i} className="flex gap-2 text-gray-300 text-xs leading-relaxed">
                      <span className="text-lime-400 mt-0.5">•</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Technical */}
              <div>
                <h4 className="text-lime-400/80 font-semibold text-sm mb-3 uppercase tracking-wide">Technical Fluency</h4>
                <ul className="space-y-2">
                  {[
                    'HTML, CSS, JavaScript, TypeScript',
                    'React, Next.js, Three.js',
                    'GSAP, Framer Motion',
                    'Node.js, PostgreSQL, REST/GraphQL APIs',
                    'Git/GitHub, CI/CD (Vercel, GitHub Actions)'
                  ].map((skill, i) => (
                    <li key={i} className="flex gap-2 text-gray-300 text-xs leading-relaxed">
                      <span className="text-lime-400 mt-0.5">•</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - AI Chat - Scene 3 Profile (33.33-50%) */}
        <div 
          className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 w-full max-w-md transition-all duration-700 pointer-events-auto"
          style={{
            opacity: scrollProgress >= 0.33 && scrollProgress < 0.495 ? 1 : 0,
            transform: `translateY(-50%) translateX(${scrollProgress >= 0.33 && scrollProgress < 0.495 ? '0' : '100%'})`,
            maxHeight: '85vh'
          }}
        >
          <div className="w-full max-h-full overflow-hidden">
            <div className="relative bg-black/80 backdrop-blur-xl border border-lime-400/30 overflow-hidden max-w-lg mx-auto lg:mx-0 lg:max-w-full shadow-[0_0_50px_rgba(163,230,53,0.2)] flex flex-col max-h-[85vh]">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-lime-400/10 via-transparent to-lime-400/10 pointer-events-none" />
              
              {/* Chat Header */}
              <div className="relative p-4 md:p-5 bg-gradient-to-r from-lime-400/10 via-lime-400/5 to-transparent border-b border-lime-400/20 flex items-center gap-3 md:gap-4 flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-lime-400 blur-xl opacity-40 animate-pulse" />
                  <div className="relative w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center">
                    <Bot className="w-5 h-5 md:w-6 md:h-6 text-black" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold uppercase tracking-wider text-sm md:text-base">AI Assistant</h3>
                  <p className="text-xs text-lime-400/80 flex items-center gap-1">
                    <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
                    Online & Ready
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div ref={messagesContainerRef} className="relative overflow-y-auto p-4 md:p-5 space-y-4 bg-gradient-to-b from-black via-zinc-900/20 to-black flex-1 min-h-0">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'ai' && (
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-lime-400 blur-md opacity-30" />
                        <div className="relative w-8 h-8 bg-lime-400/20 border border-lime-400/30 flex items-center justify-center">
                          <Bot className="w-4 h-4 text-lime-400" />
                        </div>
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[75%] px-4 py-3 text-sm ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-br from-lime-400 to-lime-500 text-black font-medium shadow-[0_0_20px_rgba(163,230,53,0.3)]'
                          : 'bg-zinc-900/80 text-gray-200 border border-zinc-800/50 backdrop-blur-sm'
                      }`}
                    >
                      <p className="leading-relaxed">{msg.content}</p>
                    </div>

                    {msg.role === 'user' && (
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-lime-400 blur-md opacity-30" />
                        <div className="relative w-8 h-8 bg-lime-400/20 border border-lime-400/30 flex items-center justify-center">
                          <User className="w-4 h-4 text-lime-400" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-lime-400 blur-md opacity-30" />
                      <div className="relative w-8 h-8 bg-lime-400/20 border border-lime-400/30 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-lime-400" />
                      </div>
                    </div>
                    <div className="bg-zinc-900/80 text-white border border-zinc-800/50 px-4 py-3 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-lime-400" />
                      <span className="text-sm text-gray-300">Thinking...</span>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions */}
              {messages.length === 1 && (
                <div className="relative px-4 md:px-5 py-3 md:py-4 bg-zinc-900/40 backdrop-blur-sm border-t border-lime-400/10 flex-shrink-0">
                  <p className="text-xs text-lime-400/70 mb-2 uppercase tracking-widest font-medium">Quick Questions:</p>
                  <div className="flex flex-col gap-2">
                    {suggestions.map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(suggestion)}
                        className="group px-3 py-2 bg-zinc-800/50 text-gray-300 text-xs md:text-sm text-left hover:bg-lime-400 hover:text-black transition-all duration-300 border border-zinc-700/50 hover:border-lime-400 relative overflow-hidden"
                      >
                        <span className="relative z-10">{suggestion}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-lime-400/0 via-lime-400/10 to-lime-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="relative p-3 md:p-4 bg-black/80 backdrop-blur-sm border-t border-lime-400/20 flex-shrink-0">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex gap-3"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Ask about Erin..."
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 bg-zinc-900/80 border border-zinc-700/50 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-lime-400 focus:shadow-[0_0_15px_rgba(163,230,53,0.2)] transition-all disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="relative px-5 py-3 bg-gradient-to-br from-lime-400 to-lime-500 text-black hover:from-lime-300 hover:to-lime-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(163,230,53,0.3)] hover:shadow-[0_0_30px_rgba(163,230,53,0.5)] group overflow-hidden"
                  >
                    <Send className="w-5 h-5 relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Scene Progress Indicator */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-3">
        {['wide', 'intro', 'chat', 'work', 'skills', 'end'].map((scene, index) => {
          const sceneSize = 1/6;
          const sceneProgress = index * sceneSize;
          const isActive = scrollProgress >= sceneProgress && scrollProgress < sceneProgress + sceneSize;
          const isPassed = scrollProgress > sceneProgress + sceneSize;
          
          return (
            <div key={scene} className="flex items-center gap-3 group">
              <div 
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  isActive 
                    ? 'bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.8)] scale-150' 
                    : isPassed
                    ? 'bg-lime-400/50'
                    : 'bg-gray-600'
                }`}
              />
              <span 
                className={`text-xs uppercase tracking-wider transition-all duration-300 ${
                  isActive 
                    ? 'text-lime-400 opacity-100' 
                    : 'text-gray-500 opacity-0 group-hover:opacity-100'
                }`}
              >
                {scene}
              </span>
            </div>
          );
        })}
      </div>

      {/* Scroll Indicator & Quick Skip - Fixed position */}
      <div
        className={`fixed bottom-8 inset-x-0 px-6 flex items-center justify-between pointer-events-none z-30 transition-opacity duration-500 ${
          scrollProgress > 0.98 ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Scroll Indicator (centered-ish via flex-1) */}
        <div className="flex-1 flex justify-center">
          <div
            onClick={scrollToWork}
            className="flex flex-col items-center gap-2 animate-bounce cursor-pointer pointer-events-auto group"
          >
            <span className="text-gray-400 text-xs uppercase tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] group-hover:text-lime-400 transition-colors">
              {scrollProgress < 0.95 ? 'scroll to explore' : 'continue to work'}
            </span>
            <ChevronDown className="w-5 h-5 text-lime-400/70 drop-shadow-[0_0_10px_rgba(163,230,53,0.5)] group-hover:text-lime-400 transition-colors" />
          </div>
        </div>

        {/* Skip to Work Button - Only show in first 3 scenes, bottom-right */}
        {scrollProgress < 0.5 && (
          <button
            onClick={scrollToWork}
            className="pointer-events-auto group bg-lime-400/10 hover:bg-lime-400 border border-lime-400/30 hover:border-lime-400 px-6 py-3 transition-all duration-300 backdrop-blur-sm ml-4"
          >
            <span className="text-lime-400 group-hover:text-black text-sm font-medium uppercase tracking-wider transition-colors">
              Skip to Work →
            </span>
          </button>
        )}
      </div>
      
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-black/50 backdrop-blur-sm z-50">
        <div 
          className="h-full bg-gradient-to-r from-lime-400 to-green-500 transition-all duration-300 shadow-[0_0_10px_rgba(163,230,53,0.6)]"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
    </section>
  );
}
