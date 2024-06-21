import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDisciplines, deleteDiscipline } from '../../services/DisciplineService';
import { getCurrentUser } from '../../services/UserService';
import { Discipline } from '../../types/Discipline';

const ListDisciplines: React.FC = () => {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [currentUser, setCurrentUser] = useState<{ username: string; role: string } | null>(null);

  useEffect(() => {
    const fetchDisciplines = async () => {
      try {
        const data = await getDisciplines();
        console.log('Fetched disciplines:', data);
        if (Array.isArray(data)) {
          setDisciplines(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching disciplines:', error);
      }
    };

    const fetchCurrentUser = async () => {
      const user = await getCurrentUser();
      console.log('Fetched current user:', user);
      setCurrentUser(user);
    };

    fetchDisciplines();
    fetchCurrentUser();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteDiscipline(id);
    setDisciplines(disciplines.filter(discipline => discipline.id !== id));
  };

  const canEditOrDelete = (discipline: Discipline) => {
    if (!currentUser) return false;
    console.log('Checking if can edit/delete:', discipline, currentUser);
    return currentUser.role === 'ADMIN' || currentUser.username === discipline.username;
  };

  return (
    <div>
      <h2>Disciplines</h2>
      {currentUser && <Link to="/disciplines/create" className="btn btn-primary mb-3">Add Discipline</Link>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Result Type</th>
            {currentUser && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {disciplines.map(discipline => (
            <tr key={discipline.id}>
              <td>{discipline.name}</td>
              <td>{discipline.resultType}</td>
              {currentUser && canEditOrDelete(discipline) && (
                <td>
                  <Link to={`/disciplines/edit/${discipline.id}`} className="btn btn-warning btn-sm">Edit</Link>
                  <button
                    className="btn btn-danger btn-sm ml-2"
                    onClick={() => discipline.id !== undefined && handleDelete(discipline.id)}
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

export default ListDisciplines;
