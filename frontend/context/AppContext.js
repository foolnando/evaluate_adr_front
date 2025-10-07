import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [participantData, setParticipantData] = useState({
    nome: '',
    email: '',
    modelo: '',
    tempo: 0,
    consultas: 0,
    decisao: '',
  });

  return (
    <AppContext.Provider value={{ participantData, setParticipantData }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}