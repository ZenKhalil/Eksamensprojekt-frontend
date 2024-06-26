import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getResultById, updateResult } from '../../services/ResultService';
import { Result } from '../../types/Result';
import { getParticipants } from '../../services/ParticipantService';
import { getDisciplines } from '../../services/DisciplineService';
import { Participant } from '../../types/Participant';
import { Discipline } from '../../types/Discipline';

const EditResult: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<Result>({ resultType: '', date: '', resultValue: '', participantId: undefined, disciplineId: undefined });
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const resultData = await getResultById(Number(id));
      const participantsData = await getParticipants();
      const disciplinesData = await getDisciplines();
      setResult(resultData);
      setParticipants(participantsData);
      setDisciplines(disciplinesData);
    };

    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setResult(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateResult(Number(id), result);
    navigate('/results');
  };

  return (
    <div>
      <h2>Edit Result</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="resultType">Result Type</label>
          <input
            type="text"
            className="form-control"
            id="resultType"
            name="resultType"
            value={result.resultType}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={result.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="resultValue">Result Value</label>
          <input
            type="text"
            className="form-control"
            id="resultValue"
            name="resultValue"
            value={result.resultValue}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="participantId">Participant</label>
          <select
            className="form-control"
            id="participantId"
            name="participantId"
            value={result.participantId}
            onChange={handleChange}
            required
          >
            <option value="">Select Participant</option>
            {participants.map(participant => (
              <option key={participant.id} value={participant.id}>
                {participant.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="disciplineId">Discipline</label>
          <select
            className="form-control"
            id="disciplineId"
            name="disciplineId"
            value={result.disciplineId}
            onChange={handleChange}
            required
          >
            <option value="">Select Discipline</option>
            {disciplines.map(discipline => (
              <option key={discipline.id} value={discipline.id}>
                {discipline.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default EditResult;
