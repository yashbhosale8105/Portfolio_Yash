"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, FileText, CheckCircle, ShieldAlert } from "lucide-react";

export default function ResumeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [decryptionStep, setDecryptionStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setDecryptionStep(0);
      setProgress(0);
    }
  }, [isOpen]);

  const startDecryption = () => {
    setDecryptionStep(1);
    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDecryptionStep(2);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md overflow-hidden relative shadow-2xl"
        >
          {/* Header */}
          <div className="bg-zinc-800/50 p-6 flex justify-between items-center border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-lg">
                <ShieldAlert className="w-5 h-5 text-zinc-400" />
              </div>
              <div>
                <h3 className="text-white font-bold leading-none">CLASSIFIED DOCUMENT</h3>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Status: Encrypted Access Only</p>
              </div>
            </div>
            <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-8">
            {decryptionStep === 0 && (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto ring-4 ring-zinc-800/50">
                  <Lock className="w-10 h-10 text-zinc-400" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">Security Bypass Required</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Access to Yash_Resume.pdf requires a security protocol bypass.
                  </p>
                </div>
                <button
                  onClick={startDecryption}
                  className="w-full bg-white text-black font-black uppercase text-sm tracking-widest py-4 rounded-xl hover:bg-zinc-200 transition-all active:scale-[0.98]"
                >
                  Start Decryption
                </button>
              </div>
            )}

            {decryptionStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-zinc-500 uppercase tracking-widest">
                    <span>Decrypting Data Layers...</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
                    <motion.div 
                      className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                      style={{ width: `${progress}%` }}
                      transition={{ type: "spring", stiffness: 50 }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-zinc-600"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 0.5 + Math.random(), repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                  ))}
                </div>

                <div className="text-[10px] font-mono text-zinc-600 leading-tight">
                  {`> ACCESS_GRANTED_LEVEL_A\n> BYPASSING_BIT_PARITY_CHECK\n> EXTRACTING_METADATA_...`}
                </div>
              </div>
            )}

            {decryptionStep === 2 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto ring-4 ring-green-500/10 scale-reveal">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">Decryption Successful</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    The document Yash_Resume.pdf is now available for download.
                  </p>
                </div>
                <a
                  href="/Yash_Resume.pdf"
                  download
                  className="block w-full bg-green-500 text-black font-black uppercase text-sm tracking-widest py-4 rounded-xl hover:bg-green-400 transition-all text-center"
                >
                  Download CV
                </a>
              </motion.div>
            )}
          </div>

          <div className="bg-zinc-800/30 p-4 border-t border-zinc-800 flex justify-between items-center text-[10px] font-mono text-zinc-500">
            <span>YASH_SECURE_STORAGE_V2</span>
            <span>2024.0.1</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
