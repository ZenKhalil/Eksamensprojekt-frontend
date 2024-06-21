import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDisciplineById, updateDiscipline } from '../../services/DisciplineService';
import { Discipline } from '../../types/Discipline';

const EditDiscipline: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [discipline, setDiscipline] = useState<Discipline>({ name: '', resultType: '', username: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiscipline = async () => {
      try {
        const data = await getDisciplineById(Number(id));
        setDiscipline(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch discipline data');
        setLoading(false);
      }
    };

    fetchDiscipline();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDiscipline(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateDiscipline(Number(id), discipline);
      window.location.reload(); // Reload the page after update
    } catch (err) {
      setError('Failed to update discipline');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Edit Discipline</h2>
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
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default EditDiscipline;
