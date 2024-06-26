import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDiscipline } from '../../services/DisciplineService';
import { Discipline } from '../../types/Discipline';

const CreateDiscipline: React.FC = () => {
  const [discipline, setDiscipline] = useState<Omit<Discipline, 'id' | 'username'>>({ name: '', resultType: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDiscipline(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createDiscipline(discipline);
      navigate('/disciplines');
    } catch (err) {
      console.error('Failed to create discipline', err);
    }
  };

  return (
    <div>
      <h2>Create Discipline</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={discipline.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="resultType">Result Type</label>
          <input
            type="text"
            className="form-control"
            id="resultType"
            name="resultType"
            value={discipline.resultType}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
  );
};

export default CreateDiscipline;
