import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { 
  LandingPage,
  LoginForm,
  SignupForm,
  ProfileSetup,
  PartnerLinking,
  JointProfileSetup,
  DiscoveryPage,
  MatchesPage,
  ChatPage
} from './components';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [linkedPartner, setLinkedPartner] = useState(null);
  const [jointProfile, setJointProfile] = useState(null);
  const [matches, setMatches] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  // Handle user authentication
  const handleLogin = (credentials) => {
    // Simulate login - in real app this would call an API
    const user = {
      id: 1,
      name: "Alex",
      email: credentials.email,
      isAuthenticated: true
    };
    setCurrentUser(user);
    setCurrentPage('profile-setup');
  };

  const handleSignup = (userData) => {
    // Simulate signup - in real app this would call an API
    const user = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      birthDate: `${userData.birthMonth} ${userData.birthDay}, ${userData.birthYear}`,
      isAuthenticated: true
    };
    setCurrentUser(user);
    setCurrentPage('profile-setup');
  };

  // Handle profile completion
  const handleProfileComplete = (userWithProfile) => {
    setCurrentUser(userWithProfile);
    setCurrentPage('partner-linking');
  };

  // Handle partner linking
  const handlePartnerLink = (linkCode) => {
    // Simulate partner linking - in real app this would find the partner
    setLinkedPartner("Jordan"); // Mock partner name
    setCurrentPage('joint-profile-setup');
  };

  const handleSkipLinking = () => {
    setCurrentPage('discovery'); // Allow using without partner for demo
  };

  // Handle joint profile creation
  const handleJointProfileComplete = (profile) => {
    setJointProfile(profile);
    setCurrentPage('discovery');
  };

  // Handle navigation
  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  // Handle matches
  const handleMatch = (couple) => {
    setMatches(prev => [...prev, couple]);
    // Could show match animation here
  };

  // Handle chat
  const handleStartChat = (couple) => {
    setCurrentChat(couple);
    setCurrentPage('chat');
  };

  const handleBackFromChat = () => {
    setCurrentChat(null);
    setCurrentPage('matches');
  };

  // Render current page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onGetStarted={() => setCurrentPage('auth')} />;
      
      case 'auth':
        return (
          <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-4">
            {isLoginMode ? (
              <LoginForm
                onLogin={handleLogin}
                onToggleMode={() => setIsLoginMode(false)}
              />
            ) : (
              <SignupForm
                onSignup={handleSignup}
                onToggleMode={() => setIsLoginMode(true)}
              />
            )}
          </div>
        );
      
      case 'profile-setup':
        return (
          <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-4">
            <ProfileSetup
              user={currentUser}
              onComplete={handleProfileComplete}
            />
          </div>
        );
      
      case 'partner-linking':
        return (
          <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-4">
            <PartnerLinking
              user={currentUser}
              onLinkPartner={handlePartnerLink}
              onSkip={handleSkipLinking}
            />
          </div>
        );
      
      case 'joint-profile-setup':
        return (
          <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-4">
            <JointProfileSetup
              user={currentUser}
              partner={linkedPartner}
              onComplete={handleJointProfileComplete}
            />
          </div>
        );
      
      case 'discovery':
        return (
          <DiscoveryPage
            user={currentUser}
            onMatch={handleMatch}
            onNavigate={handleNavigate}
          />
        );
      
      case 'matches':
        return (
          <MatchesPage
            matches={matches}
            onNavigate={handleNavigate}
            onStartChat={handleStartChat}
          />
        );
      
      case 'chat':
        return (
          <ChatPage
            couple={currentChat}
            onBack={handleBackFromChat}
            currentUser={currentUser}
          />
        );
      
      default:
        return <LandingPage onGetStarted={() => setCurrentPage('auth')} />;
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={renderCurrentPage()} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;