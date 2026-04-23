import React from 'react';

const DummyAd = ({ width = '100%', height = '90px', type = 'horizontal' }) => {
  let finalWidth = width;
  let finalHeight = height;

  if (type === 'square') {
    finalWidth = '300px';
    finalHeight = '250px';
  } else if (type === 'vertical') {
    finalWidth = '160px';
    finalHeight = '600px';
  } else if (type === 'horizontal') {
    finalWidth = '100%';
    finalHeight = '90px';
  }

  return (
    <div 
      className="flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-gray-400 text-gray-500 rounded-md my-6 mx-auto overflow-hidden shadow-sm"
      style={{ width: finalWidth, minHeight: finalHeight, maxWidth: '100%' }}
    >
      <div className="text-center p-4">
        <p className="text-sm font-bold uppercase tracking-widest text-gray-600 mb-1">Advertisement</p>
        <p className="text-xs opacity-80">Test Ad Slot</p>
        <p className="text-[10px] opacity-60 mt-2 bg-gray-200 px-2 py-1 rounded inline-block">
          {finalWidth === '100%' ? `Responsive x ${finalHeight}` : `${finalWidth} x ${finalHeight}`}
        </p>
      </div>
    </div>
  );
};

export default DummyAd;
