import React from 'react';

const DummyAd = ({ width = '100%', height = '90px', type = 'horizontal' }) => {
  let finalWidth = width;
  let finalHeight = height;

  let imageUrl = '/ads/horizontal_banner.png';

  if (type === 'square') {
    finalWidth = '300px';
    finalHeight = '250px';
    imageUrl = '/ads/square_banner.png';
  } else if (type === 'vertical') {
    finalWidth = '160px';
    finalHeight = '600px';
    imageUrl = '/ads/vertical_banner.png';
  } else if (type === 'horizontal') {
    finalWidth = '100%';
    finalHeight = '90px';
    imageUrl = '/ads/horizontal_banner.png';
  }

  return (
    <div 
      className="flex flex-col items-center justify-center bg-gray-100 rounded-md my-6 mx-auto overflow-hidden shadow-sm relative group cursor-pointer border border-[#dce3dc]"
      style={{ width: finalWidth, minHeight: finalHeight, maxWidth: '100%' }}
    >
      <img 
        src={imageUrl} 
        alt="Mock Advertisement" 
        className="w-full h-full object-cover absolute inset-0" 
      />
      <div className="absolute top-0 right-0 bg-black/40 text-white/80 text-[10px] px-2 py-0.5 rounded-bl opacity-0 group-hover:opacity-100 transition-opacity z-10 backdrop-blur-sm">
        Test Ad
      </div>
    </div>
  );
};

export default DummyAd;
