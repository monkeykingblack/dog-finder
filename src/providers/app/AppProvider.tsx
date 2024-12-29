import { useMemo } from "react";

import { AppContext, AppContextType } from "./AppContext";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useMemo<AppContextType>(() => ({}), []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
