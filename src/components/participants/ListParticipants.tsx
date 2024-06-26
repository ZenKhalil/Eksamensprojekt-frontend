import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getParticipants, deleteParticipant, getParticipantById } from '../../services/ParticipantService';
import { getCurrentUser } from '../../services/UserService';
import { getDisciplineById } from '../../services/DisciplineService';
import { Participant } from '../../types/Participant';
import { Result } from '../../types/Result';

import './ListParticipants.css';

type SortableKeys = keyof Participant;

const ListParticipants: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [genderFilter, setGenderFilter] = useState<string>('');
  const [ageGroupFilter, setAgeGroupFilter] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const data = await getParticipants();
        if (Array.isArray(data)) {
          const enrichedParticipants = await Promise.all(data.map(async (participant) => {
            const enrichedParticipant = await getParticipantById(participant.id!);
            if (enrichedParticipant.results) {
              enrichedParticipant.results = await Promise.all(enrichedParticipant.results.map(async (result) => {
                if (result.disciplineId) {
                  result.discipline = await getDisciplineById(result.disciplineId);
                }
                return result;
              }));
            }
            return enrichedParticipant;
          }));
          setParticipants(enrichedParticipants);
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

  const filterParticipants = () => {
    return participants.filter(participant => {
      const matchesSearch = participant.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGender = !genderFilter || participant.gender === genderFilter;
      const matchesAgeGroup =
        !ageGroupFilter ||
        (ageGroupFilter === 'children' && participant.age >= 6 && participant.age <= 9) ||
        (ageGroupFilter === 'youth' && participant.age >= 10 && participant.age <= 13) ||
        (ageGroupFilter === 'junior' && participant.age >= 14 && participant.age <= 22) ||
        (ageGroupFilter === 'adult' && participant.age >= 23 && participant.age <= 40) ||
        (ageGroupFilter === 'senior' && participant.age >= 41);
      return matchesSearch && matchesGender && matchesAgeGroup;
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setGenderFilter('');
    setAgeGroupFilter('');
    setErrorMessage(null);
  };

  const filteredParticipants = filterParticipants();

  const handleParticipantClick = async (participant: Participant) => {
    const enrichedParticipant = await getParticipantById(participant.id!);
    if (enrichedParticipant.results) {
      enrichedParticipant.results = await Promise.all(enrichedParticipant.results.map(async (result) => {
        if (result.disciplineId) {
          result.discipline = await getDisciplineById(result.disciplineId);
        }
        return result;
      }));
    }
    setSelectedParticipant(enrichedParticipant);
  };

  return (
    <div>
      <h2>Participants</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select className="filter-select" onChange={(e) => setGenderFilter(e.target.value)} value={genderFilter}>
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select className="filter-select" onChange={(e) => setAgeGroupFilter(e.target.value)} value={ageGroupFilter}>
          <option value="">All Age Groups</option>
          <option value="children">Children (6-9)</option>
          <option value="youth">Youth (10-13)</option>
          <option value="junior">Junior (14-22)</option>
          <option value="adult">Adult (23-40)</option>
          <option value="senior">Senior (41+)</option>
        </select>
        <button className="btn btn-secondary" onClick={clearFilters}>Clear Filters</button>
      </div>
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
            {currentUser && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filteredParticipants.map(participant => (
            <tr key={participant.id}>
              <td>
                <button
                  className="btn btn-link"
                  onClick={() => handleParticipantClick(participant)}
                >
                  {participant.name}
                </button>
              </td>
              <td>{participant.gender}</td>
              <td>{participant.age}</td>
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
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {selectedParticipant && (
        <div className="participant-details">
          <h3>Participant Details</h3>
          <p>Name: {selectedParticipant.name}</p>
          <p>Age: {selectedParticipant.age}</p>
          <p>Club: {selectedParticipant.club}</p>
          <p>Disciplines: {selectedParticipant.results?.map(result => result.discipline?.name).join(', ')}</p>
          <button className="btn btn-secondary" onClick={() => setSelectedParticipant(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ListParticipants;
