import { useState } from "react";

import AppProvider from "./providers/app/AppProvider";
import { PreferencesView, VotingView } from "./views";

function App() {
  const [view, setView] = useState<"voting" | "preferences">("voting");

  return (
    <AppProvider>
      <div className="min-h-screen w-full bg-gray-100">
        {/* Navigation */}
        <div className="sticky top-0 z-50 bg-gray-100 p-4 sm:p-6">
          <div className="max-w-md mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">DogFinder</h1>
            <button
              onClick={() =>
                setView(view === "voting" ? "preferences" : "voting")
              }
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-500 transition-colors"
            >
              {view === "voting" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                  />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M6 6L18 18M18 6L6 18" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {view === "voting" ? <VotingView /> : <PreferencesView />}
      </div>
    </AppProvider>
  );
}

export default App;
