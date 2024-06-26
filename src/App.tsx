import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ListParticipants from './components/participants/ListParticipants';
import CreateParticipant from './components/participants/CreateParticipant';
import EditParticipant from './components/participants/EditParticipant';
import ListDisciplines from './components/disciplines/ListDisciplines';
import CreateDiscipline from './components/disciplines/CreateDiscipline';
import EditDiscipline from './components/disciplines/EditDiscipline';
import ListResults from './components/results/ListResults';
import CreateResult from './components/results/CreateResult';
import EditResult from './components/results/EditResult';
import Login from './components/modal/Login';  // Update import path
import Signup from './components/modal/Signup';  // Update import path
import { AuthProvider } from './components/AuthProvider';  // Correct import for named export
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<ListParticipants />} />
            <Route path="/participants" element={<ListParticipants />} />
            <Route path="/participants/create" element={
              <PrivateRoute>
                <CreateParticipant />
              </PrivateRoute>
            } />
            <Route path="/participants/edit/:id" element={
              <PrivateRoute>
                <EditParticipant />
              </PrivateRoute>
            } />
            <Route path="/disciplines" element={<ListDisciplines />} />
            <Route path="/disciplines/create" element={
              <PrivateRoute>
                <CreateDiscipline />
              </PrivateRoute>
            } />
            <Route path="/disciplines/edit/:id" element={
              <PrivateRoute>
                <EditDiscipline />
              </PrivateRoute>
            } />
            <Route path="/results" element={<ListResults />} />
            <Route path="/results/create" element={
              <PrivateRoute>
                <CreateResult />
              </PrivateRoute>
            } />
            <Route path="/results/edit/:id" element={
              <PrivateRoute>
                <EditResult />
              </PrivateRoute>
            } />
            <Route path="/login" element={<Login />} />  
            <Route path="/signup" element={<Signup />} />  
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
};

export default App;
