import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createParticipant } from '../../services/ParticipantService';
import { getCurrentUser } from '../../services/UserService';
import { Participant } from '../../types/Participant';

const CreateParticipant: React.FC = () => {
  const [participant, setParticipant] = useState<Participant>({ name: '', gender: '', age: 0, club: '', username: '' });
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
      setParticipant(prevState => ({ ...prevState, username: user.username }));
    };

    fetchCurrentUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParticipant(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createParticipant(participant);
    navigate('/participants');
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Create Participant</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={participant.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <input
            type="text"
            className="form-control"
            id="gender"
            name="gender"
            value={participant.gender}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            value={participant.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="club">Club</label>
          <input
            type="text"
            className="form-control"
            id="club"
            name="club"
            value={participant.club}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
  );
};

export default CreateParticipant;
