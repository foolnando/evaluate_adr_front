import { createContext, useContext, useState, useEffect } from 'react';

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

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    const savedData = localStorage.getItem('current-participant');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        console.log('AppContext - Loading from localStorage:', parsedData);
        setParticipantData(parsedData);
      } catch (error) {
        console.error('Error loading participant data from localStorage:', error);
      }
    }
  }, []);

  const setParticipantDataWithLog = (newData) => {
    console.log('AppContext - Setting participant data:', newData);
    setParticipantData(newData);
    // Salvar no localStorage para persistir entre navegações
    localStorage.setItem('current-participant', JSON.stringify(newData));
  };

  return (
    <AppContext.Provider value={{ participantData, setParticipantData: setParticipantDataWithLog }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}