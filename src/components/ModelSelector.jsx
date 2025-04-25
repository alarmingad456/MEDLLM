import React from 'react';

function ModelSelector({ onClose }) {
  return (
    <div className="absolute right-0 mt-2 w-56 bg-[#27293a] rounded-md shadow-lg border border-gray-700 z-10">
      <div className="py-2">
        <div className="px-4 py-2 hover:bg-[#2E3047] cursor-pointer transition-colors">
          <div className="text-sm">Select a model</div>
        </div>
        <div className="border-t border-gray-700 my-1"></div>
        <div className="px-4 py-2 hover:bg-[#2E3047] cursor-pointer transition-colors">
          <div className="text-sm">Set as default</div>
        </div>
      </div>
    </div>
  );
}

export default ModelSelector;