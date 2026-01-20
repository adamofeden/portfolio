// src/components/CodeTabs.tsx
'use client';

import { useState } from 'react';

interface CodeTabsProps {
  tabs: {
    label: string;
    language: string;
    code: string;
  }[];
}

export function CodeTabs({ tabs }: CodeTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mt-4">
      {/* Tab buttons */}
      <div className="flex gap-2 border-b border-black/10 dark:border-white/10">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              activeTab === index
                ? 'text-black dark:text-white'
                : 'text-black/50 dark:text-white/50 hover:text-black/70 dark:hover:text-white/70'
            }`}
          >
            {tab.label}
            {activeTab === index && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white" />
            )}
          </button>
        ))}
      </div>

      {/* Code content */}
      <div className="p-4 rounded-b-lg bg-black/5 dark:bg-white/5 font-mono text-sm overflow-x-auto">
        <pre>{tabs[activeTab].code}</pre>
      </div>
    </div>
  );
}