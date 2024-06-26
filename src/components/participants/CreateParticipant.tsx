import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createParticipant } from '../../services/ParticipantService';
import { Participant } from '../../types/Participant';

const CreateParticipant: React.FC = () => {
  const [participant, setParticipant] = useState<Participant>({ name: '', gender: '', age: 0, club: '', username: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParticipant(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createParticipant(participant);
      navigate('/participants'); // Navigate back to participants list after successful creation
    } catch (err) {
      setError('Failed to create participant');
      console.error(err);
    }
  };

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
          <select
            className="form-control"
            id="gender"
            name="gender"
            value={participant.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
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
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default CreateParticipant;
