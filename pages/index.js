import React from 'react';
import { Github, Linkedin, Mail, ChevronDown, Database, Code, BookOpen } from 'lucide-react';
import CareerForceGraph from './functions/graph';
import { createCareerForceGraph } from './functions/graph';

const PortfolioPage = () => {
  return (
    <div className="bg-indigo-950 min-h-screen relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-indigo-950 text-white">
        {/* Subtle pulsing animated gradient background */}
        <div 
          className="absolute inset-0 opacity-25"
          style={{
            background: `
              radial-gradient(circle at 30% 40%, rgba(236, 72, 153, 0.3), transparent 35%),
              radial-gradient(circle at 70% 60%, rgba(249, 168, 212, 0.3), transparent 45%),
              radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.4), transparent 55%)
            `,
            backgroundSize: '200% 200%',
            filter: 'blur(120px)',
            animation: 'subtlePulseGradient 20s ease-in-out infinite alternate'
          }}
        />
        
        {/* Playful grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            animation: 'gridFloat 20s linear infinite'
          }}
        />
        
        {/* Content container */}
        <div className="relative z-10 max-w-6xl w-full px-6 py-12 md:py-24">
          <div className="flex flex-col items-start">
            {/* Name intro with animated typing effect */}
            <div
              className="mb-6 opacity-0 translate-y-5"
              style={{
                animation: 'fadeInUp 0.5s forwards'
              }}
            >
              <div className="flex items-center space-x-2 text-blue-400 mb-3">
                <span className="h-px w-8 bg-blue-400/70"></span>
                <span className="font-mono text-sm tracking-wider">HELLO, I'M</span>
              </div>
              <h1 
                className="text-5xl md:text-7xl font-bold tracking-tight"
                style={{ 
                  backgroundImage: 'linear-gradient(90deg, #fff, #f472b6, #93c5fd, #c084fc)',
                  backgroundSize: '300% 100%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  animation: 'gradientShift 8s ease infinite alternate'
                }}
              >
                Alexander Little
              </h1>
            </div>
            
            {/* Professional title */}
            <div
              className="mb-8 opacity-0 translate-y-5"
              style={{
                animation: 'fadeInUp 0.5s 0.2s forwards'
              }}
            >
              <h2 className="text-2xl md:text-4xl font-light text-gray-300">
                Data Scientist & AI Engineer
              </h2>
            </div>
            
            {/* Specialty tags */}
            <div
              className="flex flex-wrap gap-3 mb-12 opacity-0 translate-y-5"
              style={{
                animation: 'fadeInUp 0.5s 0.4s forwards'
              }}
            >
              {[
                'Machine Learning', 
                'Data Visualization', 
                'Neural Networks', 
                'Statistical Analysis',
                'NLP',
                'Computer Vision'
              ].map((skill, index) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full bg-pink-600/30 text-pink-100 text-sm font-medium backdrop-blur-sm border border-pink-500/40 hover:bg-pink-500/40 transition-all duration-200 transform hover:scale-105"
                  style={{
                    opacity: 0,
                    animation: `popIn 0.4s ${0.4 + (index * 0.1)}s forwards cubic-bezier(0.17, 0.67, 0.83, 0.67)`
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
            
            {/* Bio description */}
            <p
              className="text-lg text-gray-300 max-w-2xl mb-10 leading-relaxed opacity-0 translate-y-5"
              style={{
                animation: 'fadeInUp 0.5s 0.6s forwards'
              }}
            >
              Transforming complex data into actionable insights and building
              intelligent systems that solve real-world problems. Specializing in
              machine learning models, predictive analytics, and AI applications.
            </p>
            
            {/* CTA Buttons */}
            <div
              className="flex flex-wrap gap-4 mb-16 opacity-0 translate-y-5"
              style={{
                animation: 'fadeInUp 0.5s 0.8s forwards'
              }}
            >
              <button
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium flex items-center gap-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/30"
              >
                View Projects
                <Code className="w-4 h-4" />
              </button>
              
              <button
                className="px-6 py-3 rounded-lg bg-indigo-800/50 hover:bg-indigo-700/60 text-white font-medium flex items-center gap-2 border border-indigo-600/40 transition-all duration-300 transform hover:scale-105 active:scale-95 backdrop-blur-sm"
              >
                Download CV
                <BookOpen className="w-4 h-4" />
              </button>
            </div>
            
            {/* Social links */}
            <div
              className="flex gap-6 opacity-0"
              style={{
                animation: 'fadeIn 0.5s 1s forwards'
              }}
            >
              {[
                { icon: <Github className="w-5 h-5" />, label: 'GitHub' },
                { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn' },
                { icon: <Mail className="w-5 h-5" />, label: 'Email' },
                { icon: <Database className="w-5 h-5" />, label: 'Projects' },
              ].map((social, index) => (
                <a
                  key={social.label}
                  href="#"
                  className="text-gray-400 hover:text-blue-400 flex items-center gap-2 transition-colors transform hover:translate-y-px"
                  style={{
                    opacity: 0,
                    transform: 'translateY(10px)',
                    animation: `fadeInUp 0.3s ${1 + (index * 0.1)}s forwards`
                  }}
                >
                  {social.icon}
                  <span className="text-sm font-medium">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
          style={{
            animation: 'bounce 2s infinite'
          }}
        >
          <span className="text-sm text-gray-400 mb-2">Scroll for more</span>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Graph Section - Positioned directly under the hero */}
      <div className="absolute top-full left-0 right-0 -mt-20 z-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-indigo-900/40 backdrop-blur-sm rounded-xl p-3 border border-indigo-700/30 shadow-xl transform -translate-y-4">
            <div className="w-full h-64">
              <CareerForceGraph />
            </div>
          </div>
        </div>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
          40% { transform: translateY(-8px) translateX(-50%); }
          60% { transform: translateY(-4px) translateX(-50%); }
        }
        
        @keyframes popIn {
          0% { 
            opacity: 0;
            transform: scale(0.8);
          }
          70% { 
            opacity: 1;
            transform: scale(1.1);
          }
          100% { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes gridFloat {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(10px) rotate(0.5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        
        @keyframes subtlePulseGradient {
          0% {
            background-position: 0% 0%;
            opacity: 0.22;
          }
          25% {
            opacity: 0.25;  
          }
          50% {
            background-position: 100% 100%;
            opacity: 0.28;
          }
          75% {
            opacity: 0.25;
          }
          100% {
            background-position: 0% 0%;
            opacity: 0.22;
          }
        }
      `}</style>
    </div>
  );
};

export default PortfolioPage;