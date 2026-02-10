import React, { useEffect } from 'react';
import useSheetStore from './store/store';
import QuestionSheet from './components/QuestionSheet';
import rawData from './data/sheetData.json';

function App() {
  const { initialize, sheetInfo } = useSheetStore();

  useEffect(() => {
    initialize(rawData);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <header className="max-w-6xl mx-auto mb-10 pb-6 border-orange-500 border-4 p-4 rounded-xl">
        <h1 className="text-4xl font-extrabold text-slate-900">{sheetInfo.name}</h1>
        <p className="text-slate-600 mt-2 max-w-3xl leading-relaxed">
          {sheetInfo.description}
        </p>
      </header>

      <main className="max-w-6xl mx-auto">
        <QuestionSheet />
      </main>
    </div>
  );
}

export default App;