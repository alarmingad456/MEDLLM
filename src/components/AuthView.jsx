import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope } from 'lucide-react';

function AuthView({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(''); // State to track validation errors

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Validation logic
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!isLogin) {
      // Additional validation for sign-up
      if (!formData.fullName) {
        setError('Full name is required.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    }

    // If validation passes, proceed with login
    onLogin();
  };

  const toggleView = () => {
    setIsLogin(!isLogin);
    setError(''); // Clear errors when toggling views
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-50 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 bg-[#4f8684] p-12 text-white flex flex-col justify-center">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-8">
              <Stethoscope className="text-white" size={32} />
            </div>
            <h2 className="text-4xl font-bold mb-6">MedLLM</h2>
            <p className="text-lg mb-6">
              Advanced medical diagnostics powered by AI. Get personalized health insights and recommendations.
            </p>
          </div>

          <AnimatePresence initial={false} mode="wait" custom={isLogin ? 1 : -1}>
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              custom={isLogin ? 1 : -1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="w-full md:w-1/2 p-12"
            >
              <h3 className="text-2xl font-bold mb-6">{isLogin ? 'Welcome Back' : 'Create Account'}</h3>
              {error && (
                <p className="text-red-500 text-center mb-4">{error}</p> // Display error message
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4f8684]"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                )}
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4f8684]"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4f8684]"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                {!isLogin && (
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4f8684]"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                )}
                <button
                  type="submit"
                  className="w-full bg-[#4f8684] text-white py-3 rounded-lg font-semibold hover:bg-[#3f6b69] transition-colors"
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </button>
              </form>
              <p className="mt-6 text-center text-gray-600">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
                <button
                  onClick={toggleView}
                  className="ml-2 text-[#4f8684] font-semibold hover:underline"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default AuthView;