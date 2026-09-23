import React, { useState } from 'react';
import {
  Share2,
  X,
  Copy,
  Check,
  Send,
  MessageCircle,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  ExternalLink
} from 'lucide-react';
import { ShareData } from '../types';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareData: ShareData;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  isOpen,
  onClose,
  shareData,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const encodedUrl = encodeURIComponent(shareData.url);
  const encodedTitle = encodeURIComponent(shareData.title);
  const encodedText = encodeURIComponent(`${shareData.text}\n\nTry it free here: ${shareData.url}`);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareData.title,
          text: shareData.text,
          url: shareData.url,
        });
        onClose();
      } catch {
        // User cancelled or share failed
      }
    }
  };

  const shareNetworks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      bg: 'bg-emerald-500 hover:bg-emerald-600 text-white',
      url: `https://api.whatsapp.com/send?text=${encodedText}`,
    },
    {
      name: 'X / Twitter',
      icon: Twitter,
      bg: 'bg-slate-900 hover:bg-slate-800 text-white',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodedUrl}`,
    },
    {
      name: 'Telegram',
      icon: Send,
      bg: 'bg-sky-500 hover:bg-sky-600 text-white',
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      bg: 'bg-blue-600 hover:bg-blue-700 text-white',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: 'Reddit',
      icon: ExternalLink,
      bg: 'bg-orange-500 hover:bg-orange-600 text-white',
      url: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      bg: 'bg-blue-700 hover:bg-blue-800 text-white',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: 'Email',
      icon: Mail,
      bg: 'bg-pink-600 hover:bg-pink-700 text-white',
      url: `mailto:?subject=${encodedTitle}&body=${encodedText}`,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div
        className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-pink-100 dark:border-slate-800 relative transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close share dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-md shadow-pink-500/20">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 id="share-modal-title" className="text-xl font-bold text-slate-900 dark:text-white">
              Share Your Result
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Show your partner, friends, or share to your story
            </p>
          </div>
        </div>

        {/* Result Preview Box */}
        <div className="my-4 p-3.5 rounded-2xl bg-pink-50/70 dark:bg-pink-950/30 border border-pink-100 dark:border-pink-900/50 text-xs text-slate-700 dark:text-slate-300">
          <p className="font-semibold text-pink-600 dark:text-pink-400 mb-1">{shareData.title}</p>
          <p className="line-clamp-2 text-slate-600 dark:text-slate-400">{shareData.text}</p>
        </div>

        {/* Native Web Share Button if available */}
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button
            onClick={handleNativeShare}
            className="w-full mb-4 py-2.5 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-pink-500/25 hover:opacity-95 active:scale-[0.99] transition-all"
          >
            <Share2 className="w-4 h-4" />
            Quick Share on Device
          </button>
        )}

        {/* Share buttons grid */}
        <div className="grid grid-cols-4 gap-2.5 mb-4">
          {shareNetworks.map((net) => {
            const Icon = net.icon;
            return (
              <a
                key={net.name}
                href={net.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-2xl transition-all transform active:scale-95 shadow-sm text-center ${net.bg}`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-[11px] font-medium leading-tight">{net.name}</span>
              </a>
            );
          })}
        </div>

        {/* Copy Link Section */}
        <div className="relative flex items-center">
          <input
            type="text"
            readOnly
            value={shareData.url}
            className="w-full pl-3 pr-24 py-2.5 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="absolute right-1 px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>

        {copied && (
          <p className="mt-2 text-center text-xs font-medium text-emerald-600 dark:text-emerald-400 animate-in fade-in">
            Link and result copied to clipboard!
          </p>
        )}
      </div>
    </div>
  );
};
