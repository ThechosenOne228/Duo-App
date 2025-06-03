import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  X, 
  MessageCircle, 
  Settings, 
  User, 
  Users, 
  Camera, 
  Plus, 
  Check, 
  ArrowLeft,
  Send,
  Link as LinkIcon,
  Calendar,
  Mail,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';

// Mock Data
const mockUsers = [
  {
    id: 1,
    name: "Alex",
    age: 28,
    email: "alex@example.com",
    photos: ["https://images.unsplash.com/photo-1628078720690-2e35921026f6"],
    bio: "Love hiking and coffee",
    interests: ["Travel", "Photography", "Cooking"]
  },
  {
    id: 2,
    name: "Sarah",
    age: 26,
    email: "sarah@example.com", 
    photos: ["https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae"],
    bio: "Artist and dog lover",
    interests: ["Art", "Music", "Dogs"]
  }
];

const mockCouples = [
  {
    id: 1,
    partner1: {
      name: "Emma",
      age: 25,
      photo: "https://images.unsplash.com/photo-1628078720690-2e35921026f6",
      bio: "Love adventures and trying new restaurants"
    },
    partner2: {
      name: "Jake", 
      age: 27,
      photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61",
      bio: "Photographer who loves weekend getaways"
    },
    jointBio: "We're a fun-loving couple who enjoys double dates, game nights, and exploring new cities together. Looking for another couple to share adventures with!",
    photos: ["https://images.unsplash.com/photo-1501901609772-df0848060b33"],
    interests: ["Travel", "Food", "Photography", "Games"],
    prompts: [
      {
        question: "Our perfect double date would be...",
        answer: "A cooking class followed by drinks and board games"
      },
      {
        question: "We're most proud of...",
        answer: "Building our dream home together and traveling to 15 countries"
      }
    ]
  },
  {
    id: 2,
    partner1: {
      name: "Maya",
      age: 29,
      photo: "https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae",
      bio: "Yoga instructor who loves nature"
    },
    partner2: {
      name: "David",
      age: 31,
      photo: "https://images.pexels.com/photos/4909465/pexels-photo-4909465.jpeg",
      bio: "Chef with a passion for sustainable living"
    },
    jointBio: "We're an active couple who loves outdoor adventures, sustainable living, and good food. We enjoy hiking, farmers markets, and hosting dinner parties.",
    photos: ["https://images.unsplash.com/photo-1495345679747-53991aedf9c2"],
    interests: ["Hiking", "Cooking", "Sustainability", "Wellness"],
    prompts: [
      {
        question: "Our ideal weekend involves...",
        answer: "Hiking in the morning, farmers market in the afternoon, cooking together in the evening"
      },
      {
        question: "We can't live without...",
        answer: "Our morning yoga routine and Sunday farmer's market visits"
      }
    ]
  },
  {
    id: 3,
    partner1: {
      name: "Zoe",
      age: 24,
      photo: "https://images.pexels.com/photos/4909465/pexels-photo-4909465.jpeg",
      bio: "Graphic designer and music lover"
    },
    partner2: {
      name: "Marcus",
      age: 26,
      photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61",
      bio: "Software developer and guitar player"
    },
    jointBio: "Creative couple who loves live music, art galleries, and indie films. We're always looking for new bands to discover and creative projects to explore.",
    photos: ["https://images.pexels.com/photos/8191557/pexels-photo-8191557.jpeg"],
    interests: ["Music", "Art", "Technology", "Films"],
    prompts: [
      {
        question: "You'll find us at...",
        answer: "Local concerts, art openings, or cozy coffee shops with our laptops"
      },
      {
        question: "We're really good at...",
        answer: "Finding the best hole-in-the-wall restaurants and creating Spotify playlists"
      }
    ]
  }
];

// Authentication Components
export const LoginForm = ({ onLogin, onToggleMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white rounded-3xl shadow-2xl p-8 border border-pink-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
          <p className="text-gray-600">Sign in to continue your journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onToggleMode}
              className="text-pink-600 font-semibold hover:text-pink-700"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const SignupForm = ({ onSignup, onToggleMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    birthMonth: '',
    birthDay: '',
    birthYear: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const validateAge = () => {
    const { birthMonth, birthDay, birthYear } = formData;
    if (!birthMonth || !birthDay || !birthYear) return false;
    
    const today = new Date();
    const birthDate = new Date(birthYear, months.indexOf(birthMonth), birthDay);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= 18;
    }
    return age >= 18;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    if (!validateAge()) {
      newErrors.age = "You must be 18 or older to use this app";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSignup(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white rounded-3xl shadow-2xl p-8 border border-pink-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Join Together</h2>
          <p className="text-gray-600">Create your account to start connecting</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Date of Birth
            </label>
            <div className="grid grid-cols-3 gap-2">
              <select
                value={formData.birthMonth}
                onChange={(e) => setFormData({...formData, birthMonth: e.target.value})}
                className="px-3 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-sm"
                required
              >
                <option value="">Month</option>
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              <select
                value={formData.birthDay}
                onChange={(e) => setFormData({...formData, birthDay: e.target.value})}
                className="px-3 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-sm"
                required
              >
                <option value="">Day</option>
                {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
              <select
                value={formData.birthYear}
                onChange={(e) => setFormData({...formData, birthYear: e.target.value})}
                className="px-3 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-sm"
                required
              >
                <option value="">Year</option>
                {Array.from({length: 50}, (_, i) => 2006 - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
              placeholder="Confirm your password"
              required
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 mt-6"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onToggleMode}
              className="text-pink-600 font-semibold hover:text-pink-700"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Profile Creation Components
export const ProfileSetup = ({ user, onComplete }) => {
  const [profile, setProfile] = useState({
    photos: [],
    bio: '',
    interests: [],
    prompts: [
      { question: "My ideal date would be...", answer: "" },
      { question: "I'm really good at...", answer: "" },
      { question: "My biggest fear is...", answer: "" }
    ]
  });

  const availableInterests = [
    "Travel", "Photography", "Cooking", "Music", "Art", "Sports", "Reading", 
    "Movies", "Dancing", "Hiking", "Gaming", "Yoga", "Wine", "Coffee"
  ];

  const handleInterestToggle = (interest) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handlePromptChange = (index, answer) => {
    setProfile(prev => ({
      ...prev,
      prompts: prev.prompts.map((prompt, i) => 
        i === index ? { ...prompt, answer } : prompt
      )
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Complete Your Profile</h2>
        
        <div className="space-y-8">
          {/* Bio Section */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              About You
            </label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors resize-none"
              rows="4"
              placeholder="Tell us about yourself..."
            />
          </div>

          {/* Interests */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Your Interests
            </label>
            <div className="flex flex-wrap gap-2">
              {availableInterests.map(interest => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`px-4 py-2 rounded-full border-2 transition-all ${
                    profile.interests.includes(interest)
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border-transparent'
                      : 'border-gray-300 text-gray-700 hover:border-pink-500'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Prompts */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Tell us more
            </label>
            <div className="space-y-4">
              {profile.prompts.map((prompt, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-xl p-4">
                  <p className="font-semibold text-gray-700 mb-2">{prompt.question}</p>
                  <input
                    type="text"
                    value={prompt.answer}
                    onChange={(e) => handlePromptChange(index, e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none transition-colors"
                    placeholder="Your answer..."
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onComplete({ ...user, profile })}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

// Partner Linking Component
export const PartnerLinking = ({ user, onLinkPartner, onSkip }) => {
  const [linkCode, setLinkCode] = useState('');
  const [showCode, setShowCode] = useState(false);

  const generateCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setShowCode(true);
    return code;
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Link with Your Partner</h2>
          <p className="text-gray-600">Connect with your partner to create a joint profile</p>
        </div>

        <div className="space-y-8">
          {/* Generate Code Section */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Share Your Code</h3>
            <p className="text-gray-600 mb-4">Generate a code to share with your partner</p>
            
            {!showCode ? (
              <button
                onClick={generateCode}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all"
              >
                <LinkIcon className="inline w-5 h-5 mr-2" />
                Generate Link Code
              </button>
            ) : (
              <div className="text-center">
                <div className="bg-white rounded-xl p-4 border-2 border-pink-200 mb-4">
                  <p className="text-2xl font-bold text-pink-600 tracking-widest">ABC123</p>
                </div>
                <p className="text-sm text-gray-600">Share this code with your partner</p>
              </div>
            )}
          </div>

          {/* OR Divider */}
          <div className="flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 font-semibold">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Enter Code Section */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Enter Partner's Code</h3>
            <p className="text-gray-600 mb-4">Enter the code your partner shared with you</p>
            
            <div className="flex gap-3">
              <input
                type="text"
                value={linkCode}
                onChange={(e) => setLinkCode(e.target.value.toUpperCase())}
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-center font-semibold tracking-widest"
                placeholder="ENTER CODE"
                maxLength="6"
              />
              <button
                onClick={() => onLinkPartner(linkCode)}
                disabled={linkCode.length < 6}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Link
              </button>
            </div>
          </div>

          {/* Skip Option */}
          <div className="text-center pt-4">
            <button
              onClick={onSkip}
              className="text-gray-500 hover:text-gray-700 underline"
            >
              Skip for now - I'll link later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Joint Profile Creation
export const JointProfileSetup = ({ user, partner, onComplete }) => {
  const [jointProfile, setJointProfile] = useState({
    jointBio: '',
    photos: [],
    sharedInterests: [],
    prompts: [
      { question: "Our perfect double date would be...", answer: "" },
      { question: "We're most proud of...", answer: "" },
      { question: "You'll find us at...", answer: "" }
    ]
  });

  const availableInterests = [
    "Double Dates", "Game Nights", "Travel", "Food Adventures", "Outdoor Activities",
    "Live Music", "Art & Culture", "Sports", "Dancing", "Wine Tasting", "Movies"
  ];

  const handleInterestToggle = (interest) => {
    setJointProfile(prev => ({
      ...prev,
      sharedInterests: prev.sharedInterests.includes(interest)
        ? prev.sharedInterests.filter(i => i !== interest)
        : [...prev.sharedInterests, interest]
    }));
  };

  const handlePromptChange = (index, answer) => {
    setJointProfile(prev => ({
      ...prev,
      prompts: prev.prompts.map((prompt, i) => 
        i === index ? { ...prompt, answer } : prompt
      )
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Create Your Joint Profile</h2>
          <p className="text-gray-600">Build a profile that represents both of you</p>
        </div>

        {/* Partner Preview */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-pink-200 rounded-full flex items-center justify-center mb-2">
                <User className="w-10 h-10 text-pink-600" />
              </div>
              <p className="font-semibold">{user.name}</p>
            </div>
            <Heart className="text-pink-500 w-8 h-8" />
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-200 rounded-full flex items-center justify-center mb-2">
                <User className="w-10 h-10 text-purple-600" />
              </div>
              <p className="font-semibold">{partner || "Partner"}</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Joint Bio */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              About Us as a Couple
            </label>
            <textarea
              value={jointProfile.jointBio}
              onChange={(e) => setJointProfile({...jointProfile, jointBio: e.target.value})}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors resize-none"
              rows="4"
              placeholder="Tell other couples about your relationship and what you're looking for..."
            />
          </div>

          {/* Shared Interests */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              What You Enjoy Together
            </label>
            <div className="flex flex-wrap gap-2">
              {availableInterests.map(interest => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`px-4 py-2 rounded-full border-2 transition-all ${
                    jointProfile.sharedInterests.includes(interest)
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border-transparent'
                      : 'border-gray-300 text-gray-700 hover:border-pink-500'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Joint Prompts */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Tell Other Couples About You
            </label>
            <div className="space-y-4">
              {jointProfile.prompts.map((prompt, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-xl p-4">
                  <p className="font-semibold text-gray-700 mb-2">{prompt.question}</p>
                  <input
                    type="text"
                    value={prompt.answer}
                    onChange={(e) => handlePromptChange(index, e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none transition-colors"
                    placeholder="Your answer as a couple..."
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onComplete(jointProfile)}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            Complete Joint Profile
          </button>
        </div>
      </div>
    </div>
  );
};

// Couple Profile Card Component
export const CoupleCard = ({ couple, onLike, onPass, currentUser }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showConsensusModal, setShowConsensusModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const handleAction = (action) => {
    setPendingAction(action);
    setShowConsensusModal(true);
  };

  const handleConsensus = (approved) => {
    setShowConsensusModal(false);
    if (approved && pendingAction === 'like') {
      onLike(couple);
    } else if (approved && pendingAction === 'pass') {
      onPass(couple);
    }
    setPendingAction(null);
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-sm mx-auto"
      >
        {/* Photo Section */}
        <div className="relative h-96">
          <img
            src={couple.photos[currentPhotoIndex]}
            alt={`${couple.partner1.name} and ${couple.partner2.name}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          
          {/* Photo Navigation Dots */}
          {couple.photos.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {couple.photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPhotoIndex(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Names Overlay */}
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-2xl font-bold">
              {couple.partner1.name} & {couple.partner2.name}
            </h3>
            <p className="text-lg opacity-90">
              {couple.partner1.age}, {couple.partner2.age}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Joint Bio */}
          <div>
            <p className="text-gray-700 leading-relaxed">{couple.jointBio}</p>
          </div>

          {/* Interests */}
          <div>
            <div className="flex flex-wrap gap-2">
              {couple.interests.slice(0, 4).map(interest => (
                <span
                  key={interest}
                  className="px-3 py-1 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 rounded-full text-sm font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Prompts */}
          <div className="space-y-3">
            {couple.prompts.slice(0, 2).map((prompt, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4">
                <p className="font-semibold text-gray-800 text-sm mb-1">{prompt.question}</p>
                <p className="text-gray-700">{prompt.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 p-6 pt-0">
          <button
            onClick={() => handleAction('pass')}
            className="w-16 h-16 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
          >
            <X className="w-8 h-8 text-gray-600" />
          </button>
          <button
            onClick={() => handleAction('like')}
            className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
          >
            <Heart className="w-8 h-8 text-white" />
          </button>
        </div>
      </motion.div>

      {/* Consensus Modal */}
      <AnimatePresence>
        {showConsensusModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Partner Consensus</h3>
                <p className="text-gray-600 mb-6">
                  You want to {pendingAction} this couple. Your partner needs to agree before proceeding.
                </p>
                
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4 mb-6">
                  <p className="text-sm text-gray-700">
                    <strong>Waiting for partner approval...</strong>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Both partners must agree to {pendingAction}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleConsensus(false)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleConsensus(true)}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all"
                  >
                    Simulate Approval
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Discovery Page
export const DiscoveryPage = ({ user, onMatch, onNavigate }) => {
  const [currentCoupleIndex, setCurrentCoupleIndex] = useState(0);
  const [matches, setMatches] = useState([]);

  const handleLike = (couple) => {
    // Simulate match (in real app, this would check if the other couple also liked)
    const isMatch = Math.random() > 0.5; // 50% chance of match for demo
    
    if (isMatch) {
      setMatches(prev => [...prev, couple]);
      onMatch(couple);
    }
    
    nextCouple();
  };

  const handlePass = () => {
    nextCouple();
  };

  const nextCouple = () => {
    if (currentCoupleIndex < mockCouples.length - 1) {
      setCurrentCoupleIndex(currentCoupleIndex + 1);
    } else {
      setCurrentCoupleIndex(0); // Loop back for demo
    }
  };

  const currentCouple = mockCouples[currentCoupleIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Together</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('matches')}
                className="relative p-2 text-gray-600 hover:text-pink-600 transition-colors"
              >
                <MessageCircle className="w-6 h-6" />
                {matches.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">
                    {matches.length}
                  </span>
                )}
              </button>
              <button className="p-2 text-gray-600 hover:text-pink-600 transition-colors">
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Discover Couples</h2>
          <p className="text-gray-600">Find amazing couples to double date with</p>
        </div>

        <div className="flex justify-center">
          <AnimatePresence mode="wait">
            <CoupleCard
              key={currentCouple.id}
              couple={currentCouple}
              onLike={handleLike}
              onPass={handlePass}
              currentUser={user}
            />
          </AnimatePresence>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {mockCouples.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentCoupleIndex ? 'bg-pink-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Matches and Chat Components
export const MatchesPage = ({ matches, onNavigate, onStartChat }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('discovery')}
              className="p-2 text-gray-600 hover:text-pink-600 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Your Matches</h1>
          </div>
        </div>
      </div>

      {/* Matches List */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {matches.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No matches yet</h3>
            <p className="text-gray-600">Keep swiping to find amazing couples!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {matches.map(couple => (
              <motion.div
                key={couple.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => onStartChat(couple)}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={couple.photos[0]}
                    alt={`${couple.partner1.name} and ${couple.partner2.name}`}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {couple.partner1.name} & {couple.partner2.name}
                    </h3>
                    <p className="text-gray-600">
                      {couple.partner1.age}, {couple.partner2.age}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Tap to start chatting</p>
                  </div>
                  <MessageCircle className="w-6 h-6 text-pink-500" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const ChatPage = ({ couple, onBack, currentUser }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: couple.partner1.name,
      text: "Hey! So excited to meet you both! 😊",
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: 2,
      sender: currentUser.name,
      text: "Hi there! We're excited too! How long have you two been together?",
      timestamp: new Date(Date.now() - 3000000)
    },
    {
      id: 3,
      sender: couple.partner2.name,
      text: "We've been together for 3 years now. What about you two?",
      timestamp: new Date(Date.now() - 2400000)
    }
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: currentUser.name,
        text: message,
        timestamp: new Date()
      }]);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 text-gray-600 hover:text-pink-600 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <img
              src={couple.photos[0]}
              alt={`${couple.partner1.name} and ${couple.partner2.name}`}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                {couple.partner1.name} & {couple.partner2.name}
              </h1>
              <p className="text-sm text-green-500">Active now</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 space-y-4 overflow-y-auto">
        {messages.map(msg => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.sender === currentUser.name ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
              msg.sender === currentUser.name
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                : 'bg-white text-gray-900 shadow-sm'
            }`}>
              {msg.sender !== currentUser.name && (
                <p className="text-xs font-semibold mb-1 text-pink-600">{msg.sender}</p>
              )}
              <p>{msg.text}</p>
              <p className={`text-xs mt-1 ${
                msg.sender === currentUser.name ? 'text-pink-100' : 'text-gray-500'
              }`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-full focus:border-pink-500 focus:outline-none transition-colors"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            disabled={!message.trim()}
            className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center hover:from-pink-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Landing Page Component
export const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
                <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Together
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                The dating app designed for couples who want to meet other couples. 
                Create joint profiles, swipe together, and find your perfect double date.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Get Started
              </button>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative max-w-4xl mx-auto"
            >
              <img
                src="https://images.unsplash.com/photo-1501901609772-df0848060b33"
                alt="Happy couples together"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-pink-100"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Link with Your Partner</h3>
              <p className="text-gray-600">
                Create individual profiles first, then link with your partner to build a beautiful joint profile together.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-pink-100"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Swipe Together</h3>
              <p className="text-gray-600">
                Both partners must agree before liking or passing on other couples. Make decisions together with our consensus system.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-pink-100"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <MessageCircle className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Group Chat</h3>
              <p className="text-gray-600">
                When you match, all four people join a group chat to plan your perfect double date adventure.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Sample Couples Section */}
      <div className="py-20 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Meet Amazing Couples
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {mockCouples.slice(0, 3).map((couple, index) => (
              <motion.div
                key={couple.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg"
              >
                <img
                  src={couple.photos[0]}
                  alt={`${couple.partner1.name} and ${couple.partner2.name}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {couple.partner1.name} & {couple.partner2.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {couple.partner1.age}, {couple.partner2.age}
                  </p>
                  <p className="text-gray-700 line-clamp-3">
                    {couple.jointBio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to find your couple friends?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of couples who have found their perfect double date matches
            </p>
            <button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Your Journey
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};