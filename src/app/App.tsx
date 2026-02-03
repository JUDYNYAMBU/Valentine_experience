import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import { FloatingHearts } from '@/app/components/FloatingHearts';
import { EvasiveNoButton } from '@/app/components/EvasiveNoButton';
import { Confetti } from '@/app/components/Confetti';
import { HeartBurst } from '@/app/components/HeartBurst';
import { playChimeSound } from '@/app/utils/sounds';
import happy from '../../assets/happy.gif'

type Screen = 'landing' | 'celebration';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [escapeCount, setEscapeCount] = useState(0);

  const handleYesClick = () => {
    setShowHeartBurst(true);
    playChimeSound();
    
    setTimeout(() => {
      setCurrentScreen('celebration');
    }, 800);
  };

  const handleNoEscape = () => {
    setEscapeCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {currentScreen === 'landing' ? (
          <motion.div
            key="landing"
            className="min-h-screen flex items-center justify-center relative"
            style={{
              background: 'linear-gradient(135deg, #ffc0cb 0%, #ffb6c1 50%, #ffcccb 100%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              scale: 0,
              opacity: 0,
              transition: { duration: 0.6, ease: 'easeInOut' }
            }}
          >
            <FloatingHearts />
            
            <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl mb-12 text-gray-800"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
              >
                Nyambura, will you be my Valentine? 💖
              </motion.h1>

              {escapeCount > 3 && (
                <motion.p
                  className="text-lg text-gray-700 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  You can't escape! 😏💕
                </motion.p>
              )}

              <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
                <motion.button
                  className="relative px-10 py-5 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-xl shadow-lg transition-all flex items-center gap-3 overflow-hidden"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleYesClick}
                >
                  <Heart className="fill-white" size={28} />
                  <span>Yes!</span>
                  {showHeartBurst && <HeartBurst />}
                </motion.button>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                >
                  <EvasiveNoButton onEscape={handleNoEscape} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="celebration"
            className="min-h-screen flex items-center justify-center relative"
            style={{
              background: 'linear-gradient(135deg, #ff6b9d 0%, #ffa07a 50%, #ff1744 100%)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              transition: { duration: 0.6, ease: 'easeOut' }
            }}
          >
            <Confetti />
            
            <div className="relative z-10 text-center px-4 max-w-3xl mx-auto ">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl mb-8 text-white"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
              >
                Best decision ever! 🎉💃
              </motion.h1>

              <motion.div
                className="mb-8 rounded-2xl overflow-hidden shadow-2xl max-w-md mx-auto flex justify-center"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: 0.5, 
                  type: 'spring', 
                  stiffness: 150,
                  damping: 12
                }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                  <img
                      src={happy}
                      alt="Happy celebration"
                      className="w-72 h-auto"
                  />
              </motion.div>

              <motion.p
                className="text-3xl sm:text-4xl text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                I love you ❤️
              </motion.p>

              <motion.div
                className="mt-12 flex gap-6 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="text-4xl"
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatDelay: 0.5,
                    }}
                  >
                    💕
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Optional: Background music toggle button */}
            <motion.button
              className="absolute bottom-8 right-8 p-4 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm text-white transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                // Placeholder for background music toggle
                console.log('Music toggle - add your audio file here!');
              }}
            >
              🎵
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
