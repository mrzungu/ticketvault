import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialSharing = ({ eventData, onShare }) => {
  const [copied, setCopied] = useState(false);

  const shareText = `Just booked tickets for ${eventData?.title}! 🎉 Can't wait for ${eventData?.date} at ${eventData?.venue}!`;
  const shareUrl = window.location?.href;

  const socialPlatforms = [
    {
      name: 'Twitter',
      icon: 'Twitter',
      color: 'text-blue-400',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'text-blue-600',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'text-blue-700',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'WhatsApp',
      icon: 'MessageCircle',
      color: 'text-green-600',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
    }
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard?.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleSocialShare = (platform) => {
    window.open(platform?.url, '_blank', 'width=600,height=400');
    onShare?.(platform?.name);
  };

  return (
    <div className="bg-card border-2 border-border rounded-lg shadow-elevation-2 p-6 mb-6">
      <h2 className="text-xl font-semibold text-foreground font-mono mb-4 flex items-center">
        <Icon name="Share2" size={24} className="text-accent mr-2" />
        Share Your Experience
      </h2>
      <div className="space-y-6">
        {/* Share Message Preview */}
        <div className="bg-muted/30 border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-2">Share message preview:</p>
          <p className="text-foreground font-medium italic">"{shareText}"</p>
        </div>

        {/* Social Media Buttons */}
        <div>
          <h3 className="font-medium text-foreground mb-3">Share on social media</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {socialPlatforms?.map((platform) => (
              <button
                key={platform?.name}
                onClick={() => handleSocialShare(platform)}
                className="flex flex-col items-center space-y-2 p-4 bg-muted hover:bg-muted/80 rounded-lg transition-all duration-150 hover:scale-105"
              >
                <Icon name={platform?.icon} size={24} className={platform?.color} />
                <span className="text-sm font-medium text-foreground">{platform?.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Copy Link */}
        <div>
          <h3 className="font-medium text-foreground mb-3">Or copy link</h3>
          <div className="flex items-center space-x-3">
            <div className="flex-1 bg-muted border border-border rounded-lg px-3 py-2">
              <p className="text-sm text-muted-foreground font-mono truncate">
                {shareUrl}
              </p>
            </div>
            <Button
              variant={copied ? "success" : "outline"}
              onClick={handleCopyLink}
              iconName={copied ? "Check" : "Copy"}
              iconPosition="left"
              className="shrink-0"
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={20} className="text-warning mt-0.5" />
            <div>
              <h4 className="font-medium text-warning mb-1">Privacy Notice</h4>
              <p className="text-sm text-muted-foreground">
                Sharing will not expose your ticket details or QR codes. Only event information and your attendance will be shared publicly.
              </p>
            </div>
          </div>
        </div>

        {/* Engagement Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="Users" size={20} className="text-accent" />
            </div>
            <p className="text-sm font-medium text-foreground">1,247</p>
            <p className="text-xs text-muted-foreground">Others attending</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="Heart" size={20} className="text-success" />
            </div>
            <p className="text-sm font-medium text-foreground">892</p>
            <p className="text-xs text-muted-foreground">Likes on event</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="Share" size={20} className="text-warning" />
            </div>
            <p className="text-sm font-medium text-foreground">156</p>
            <p className="text-xs text-muted-foreground">Recent shares</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialSharing;