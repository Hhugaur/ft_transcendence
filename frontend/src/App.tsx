import React from 'react';
import './tailwind.css';

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <button type="button" id="log" className="px-4 py-2 bg-blue-500 text-white rounded">
        Se connecter
      </button>
      <button type="button" id="gameLaunch" className="px-4 py-2 bg-blue-500 text-white rounded">
        Classique
      </button>
      <button type="button" id="gameLaunch" className="px-4 py-2 bg-blue-500 text-white rounded">
        Tournoi
      </button>
    </div>
  );
};

export default App;

