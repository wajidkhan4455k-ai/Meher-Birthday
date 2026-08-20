import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Share2, Copy, Check, Sparkles, Heart } from 'lucide-react';
import { BirthdayStoryConfig } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  config: BirthdayStoryConfig;
  onSave: (updated: BirthdayStoryConfig) => void;
}

export const PersonalizeModal: React.FC<Props> = ({ isOpen, onClose, config, onSave }) => {
  const [formData, setFormData] = useState<BirthdayStoryConfig>({ ...config });
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field: keyof BirthdayStoryConfig, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleCopyShareLink = () => {
    try {
      const jsonStr = JSON.stringify(formData);
      const encoded = btoa(encodeURIComponent(jsonStr));
      const url = `${window.location.origin}${window.location.pathname}#gift=${encoded}`;

      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error("Link encode error", e);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-[#181229] border border-amber-300/30 rounded-3xl p-6 sm:p-8 max-w-2xl w-full my-8 shadow-2xl text-left space-y-6 relative text-amber-100"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-400 fill-pink-400/20" />
              <h3 className="text-xl font-serif-title text-amber-100">Personalize Digital Birthday Gift</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-purple-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {/* Recipient & Sender Names */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-amber-300/80">Recipient's Name</label>
                <input
                  type="text"
                  value={formData.recipientName}
                  onChange={(e) => handleChange('recipientName', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-amber-400"
                  placeholder="e.g. Sophia"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-amber-300/80">Your Name (Sender)</label>
                <input
                  type="text"
                  value={formData.senderName}
                  onChange={(e) => handleChange('senderName', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-amber-400"
                  placeholder="e.g. Alex"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-amber-300/80">Your Nickname/Relation</label>
                <input
                  type="text"
                  value={formData.senderNickname}
                  onChange={(e) => handleChange('senderNickname', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-amber-400"
                  placeholder="e.g. Your Bestie"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-amber-300/80">Birthday Date</label>
                <input
                  type="text"
                  value={formData.birthdayDate}
                  onChange={(e) => handleChange('birthdayDate', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-amber-400"
                  placeholder="e.g. August 21"
                />
              </div>
            </div>

            {/* Personal Letter */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-amber-300/80">Personal Letter</label>
              <textarea
                rows={5}
                value={formData.personalLetter}
                onChange={(e) => handleChange('personalLetter', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-amber-400 leading-relaxed"
                placeholder="Write your heartfelt message here..."
              />
            </div>

            {/* Voucher message */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-amber-300/80">Scratch Voucher Gift</label>
              <input
                type="text"
                value={formData.scratchSurpriseMessage}
                onChange={(e) => handleChange('scratchSurpriseMessage', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-amber-400"
                placeholder="e.g. One Coffee & Hangout Day On Me!"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={handleCopyShareLink}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-500/20 hover:bg-pink-500/30 text-pink-200 border border-pink-400/30 text-xs font-semibold transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-pink-300" />}
              <span>{copied ? 'Gift Link Copied!' : 'Copy Shareable Link'}</span>
            </button>

            <div className="flex gap-2 ml-auto">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full bg-white/10 text-purple-200 text-xs font-semibold hover:bg-white/20 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-pink-400 text-slate-950 text-xs font-semibold hover:scale-105 transition-transform cursor-pointer shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>Save Gift Settings</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
