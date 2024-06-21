import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getParticipants, deleteParticipant } from '../../services/ParticipantService';
import { getCurrentUser } from '../../services/UserService';
import { Participant } from '../../types/Participant';

type SortableKeys = keyof Participant;

const ListParticipants: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: string } | null>(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const data = await getParticipants();
        console.log('Fetched participants:', data);
        if (Array.isArray(data)) {
          setParticipants(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching participants:', error);
      }
    };

    const fetchCurrentUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };

    fetchParticipants();
    fetchCurrentUser();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteParticipant(id);
    setParticipants(participants.filter(participant => participant.id !== id));
  };

  const canEditOrDelete = (participant: Participant) => {
    if (!currentUser) return false;
    return currentUser.role === 'ADMIN' || currentUser.username === participant.username;
  };

  const sortParticipants = (key: SortableKeys) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    const sortedParticipants = [...participants].sort((a, b) => {
      const aValue = a[key] ?? ''; // Fallback to empty string if undefined
      const bValue = b[key] ?? ''; // Fallback to empty string if undefined
      if (aValue < bValue) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setParticipants(sortedParticipants);
    setSortConfig({ key, direction });
  };

  return (
    <div>
      <h2>Participants</h2>
      {currentUser && <Link to="/participants/create" className="btn btn-primary mb-3">Add Participant</Link>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>
              Name
              <button onClick={() => sortParticipants('name')} className="sort-button">
                <i className={`fas fa-sort-${sortConfig?.key === 'name' && sortConfig.direction === 'ascending' ? 'up' : 'down'}`}></i>
              </button>
            </th>
            <th>
              Gender
              <button onClick={() => sortParticipants('gender')} className="sort-button">
                <i className={`fas fa-sort-${sortConfig?.key === 'gender' && sortConfig.direction === 'ascending' ? 'up' : 'down'}`}></i>
              </button>
            </th>
            <th>
              Age
              <button onClick={() => sortParticipants('age')} className="sort-button">
                <i className={`fas fa-sort-${sortConfig?.key === 'age' && sortConfig.direction === 'ascending' ? 'up' : 'down'}`}></i>
              </button>
            </th>
            <th>
              Club
              <button onClick={() => sortParticipants('club')} className="sort-button">
                <i className={`fas fa-sort-${sortConfig?.key === 'club' && sortConfig.direction === 'ascending' ? 'up' : 'down'}`}></i>
              </button>
            </th>
            {currentUser && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {participants.map(participant => (
            <tr key={participant.id}>
              <td>{participant.name}</td>
              <td>{participant.gender}</td>
              <td>{participant.age}</td>
              <td>{participant.club}</td>
              {currentUser && canEditOrDelete(participant) && (
                <td>
                  <Link to={`/participants/edit/${participant.id}`} className="btn btn-warning btn-sm">Edit</Link>
                  <button
                    className="btn btn-danger btn-sm ml-2"
                    onClick={() => participant.id !== undefined && handleDelete(participant.id)}
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

export default ListParticipants;
