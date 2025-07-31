
import React, { useState } from 'react';
import { ClipboardIcon, CheckIcon } from './icons';

interface CodeBlockProps {
  language: string;
  code: string;
  description?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language, code, description }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900/70 rounded-lg border border-gray-700 my-4 shadow-md">
       {description && <p className="text-sm text-gray-400 px-4 pt-3">{description}</p>}
      <div className="relative group">
        <div className="flex justify-between items-center px-4 py-2 bg-gray-800/50 rounded-t-md">
          <span className="text-xs font-semibold text-gray-400 uppercase">{language}</span>
          <button
            onClick={handleCopy}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-md"
          >
            {copied ? (
              <CheckIcon className="w-5 h-5 text-green-400" />
            ) : (
              <ClipboardIcon className="w-5 h-5" />
            )}
          </button>
        </div>
        <pre className="p-4 text-sm text-gray-200 overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};
