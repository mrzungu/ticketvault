import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const EventImageGallery = ({ images = [], eventTitle = '' }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const defaultImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop",
      alt: "Main event stage with lighting setup"
    },
    {
      id: 2,
      url: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?w=800&h=600&fit=crop",
      alt: "Event venue interior view"
    },
    {
      id: 3,
      url: "https://images.pixabay.com/photo/2016/11/23/15/48/audience-1853662_960_720.jpg?w=800&h=600&fit=crop",
      alt: "Audience enjoying the event"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
      alt: "Event backstage preparation"
    }
  ];

  const galleryImages = images?.length > 0 ? images : defaultImages;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages?.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages?.length) % galleryImages?.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="bg-card border-2 border-border rounded-lg shadow-elevation-2 overflow-hidden">
      {/* Main Image Display */}
      <div className="relative h-96 lg:h-[500px] overflow-hidden bg-muted">
        <Image
          src={galleryImages?.[currentImageIndex]?.url}
          alt={galleryImages?.[currentImageIndex]?.alt || `${eventTitle} image ${currentImageIndex + 1}`}
          className={`w-full h-full object-cover transition-transform duration-300 cursor-zoom-in ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          onClick={toggleZoom}
        />

        {/* Navigation Arrows */}
        {galleryImages?.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 hover:bg-background border-2 border-border rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-neo-sm"
              aria-label="Previous image"
            >
              <Icon name="ChevronLeft" size={24} className="text-foreground" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 hover:bg-background border-2 border-border rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-neo-sm"
              aria-label="Next image"
            >
              <Icon name="ChevronRight" size={24} className="text-foreground" />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-background/90 border border-border rounded-full px-3 py-1">
          <span className="text-sm font-mono text-foreground">
            {currentImageIndex + 1} / {galleryImages?.length}
          </span>
        </div>

        {/* Zoom Indicator */}
        <div className="absolute top-4 left-4 bg-background/90 border border-border rounded-full px-3 py-1 flex items-center space-x-2">
          <Icon name={isZoomed ? "ZoomOut" : "ZoomIn"} size={16} className="text-foreground" />
          <span className="text-sm font-mono text-foreground">
            {isZoomed ? 'Click to zoom out' : 'Click to zoom in'}
          </span>
        </div>
      </div>
      {/* Thumbnail Navigation */}
      {galleryImages?.length > 1 && (
        <div className="p-4 border-t border-border">
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {galleryImages?.map((image, index) => (
              <button
                key={image?.id || index}
                onClick={() => goToImage(index)}
                className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  index === currentImageIndex
                    ? 'border-accent shadow-cyber'
                    : 'border-border hover:border-accent/50'
                }`}
              >
                <Image
                  src={image?.url}
                  alt={image?.alt || `Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Gallery Actions */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-accent transition-colors duration-150">
              <Icon name="Share2" size={16} />
              <span>Share</span>
            </button>
            <button className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-accent transition-colors duration-150">
              <Icon name="Download" size={16} />
              <span>Download</span>
            </button>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Camera" size={16} />
            <span>High Quality Images</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventImageGallery;