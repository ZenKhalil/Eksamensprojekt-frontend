import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getResults, deleteResult } from '../../services/ResultService';
import { getParticipantById } from '../../services/ParticipantService';
import { getDisciplineById } from '../../services/DisciplineService';
import { getCurrentUser } from '../../services/UserService';
import { Result } from '../../types/Result';
import { formatDate } from '../dateUtils'; // Import the date formatting function

type SortableKeys = keyof Result | 'participant.name' | 'discipline.name';

const ListResults: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: string } | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getResults();
        if (Array.isArray(data)) {
          const enrichedResults = await Promise.all(data.map(async (result) => {
            if (result.participantId) {
              result.participant = await getParticipantById(result.participantId);
            }
            if (result.disciplineId) {
              result.discipline = await getDisciplineById(result.disciplineId);
            }
            return result;
          }));
          setResults(enrichedResults);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    const fetchCurrentUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };

    fetchResults();
    fetchCurrentUser();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteResult(id);
    setResults(results.filter(result => result.id !== id));
  };

  const canEditOrDelete = (result: Result) => {
    if (!currentUser) return false;
    return currentUser.role === 'ADMIN' || currentUser.username === result.participant?.username;
  };

  const sortResults = (key: SortableKeys) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    const sortedResults = [...results].sort((a, b) => {
      const aValue = getValueByKey(a, key);
      const bValue = getValueByKey(b, key);
      if (aValue < bValue) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setResults(sortedResults);
    setSortConfig({ key, direction });
  };

  const getValueByKey = (result: Result, key: SortableKeys) => {
    switch (key) {
      case 'participant.name':
        return result.participant?.name || '';
      case 'discipline.name':
        return result.discipline?.name || '';
      default:
        return result[key] || '';
    }
  };

  return (
    <div>
      <h2>Results</h2>
      {currentUser && <Link to="/results/create" className="btn btn-primary mb-3">Add Result</Link>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>
              Result Type
              <button onClick={() => sortResults('resultType')} className="sort-button">
                <i className={`fas fa-sort-${sortConfig?.key === 'resultType' && sortConfig.direction === 'ascending' ? 'up' : 'down'}`}></i>
              </button>
            </th>
            <th>
              Date
              <button onClick={() => sortResults('date')} className="sort-button">
                <i className={`fas fa-sort-${sortConfig?.key === 'date' && sortConfig.direction === 'ascending' ? 'up' : 'down'}`}></i>
              </button>
            </th>
            <th>
              Result Value
              <button onClick={() => sortResults('resultValue')} className="sort-button">
                <i className={`fas fa-sort-${sortConfig?.key === 'resultValue' && sortConfig.direction === 'ascending' ? 'up' : 'down'}`}></i>
              </button>
            </th>
            <th>
              Participant
              <button onClick={() => sortResults('participant.name')} className="sort-button">
                <i className={`fas fa-sort-${sortConfig?.key === 'participant.name' && sortConfig.direction === 'ascending' ? 'up' : 'down'}`}></i>
              </button>
            </th>
            <th>
              Discipline
              <button onClick={() => sortResults('discipline.name')} className="sort-button">
                <i className={`fas fa-sort-${sortConfig?.key === 'discipline.name' && sortConfig.direction === 'ascending' ? 'up' : 'down'}`}></i>
              </button>
            </th>
            {currentUser && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {results.map(result => (
            <tr key={result.id}>
              <td>{result.resultType}</td>
              <td>{formatDate(result.date)}</td> {/* Format the date */}
              <td>{result.resultValue}</td>
              <td>{result.participant?.name}</td>
              <td>{result.discipline?.name}</td>
              {currentUser && canEditOrDelete(result) && (
                <td>
                  <Link to={`/results/edit/${result.id}`} className="btn btn-warning btn-sm">Edit</Link>
                  <button
                    className="btn btn-danger btn-sm ml-2"
                    onClick={() => result.id !== undefined && handleDelete(result.id)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListResults;
