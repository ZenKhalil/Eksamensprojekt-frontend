import React, { createContext, useContext, useState, useEffect } from 'react';
import { Participant } from '../../types/Participant';
import { getParticipants } from '../../services/ParticipantService';

interface ParticipantsContextType {
  participants: Participant[];
  setParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
  updateParticipantInContext: (updatedParticipant: Participant) => void;
}

const ParticipantsContext = createContext<ParticipantsContextType | undefined>(undefined);

export const ParticipantsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const data = await getParticipants();
      setParticipants(data);
    };

    fetchParticipants();
  }, []);

  const updateParticipantInContext = (updatedParticipant: Participant) => {
    setParticipants((prevParticipants) =>
      prevParticipants.map((participant) =>
        participant.id === updatedParticipant.id ? updatedParticipant : participant
      )
    );
  };

  return (
    <ParticipantsContext.Provider value={{ participants, setParticipants, updateParticipantInContext }}>
      {children}
    </ParticipantsContext.Provider>
  );
};

export const useParticipants = () => {
  const context = useContext(ParticipantsContext);
  if (!context) {
    throw new Error('useParticipants must be used within a ParticipantsProvider');
  }
  return context;
};
