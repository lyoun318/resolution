import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUser } from './store/appSlice';

const UserProfile = () => {
  const authUser = useSelector((state) => state.app.authUser);
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [updatedUsername, setUpdatedUsername] = useState('');

  useEffect(() => {
    if (authUser) {
      setUsername(authUser.username);
    }
  }, [authUser]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleUpdateUser = async () => {
    try {
      const updatedUser = { ...authUser, username: updatedUsername };
      const response = await axios.patch(`/users/${authUser.id}`, updatedUser);
      if (response && response.data) {
        dispatch(setAuthUser(response.data));
        setUpdatedUsername(''); // clear the input field after successful update
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(`/users/${authUser.id}`);
      if (response && response.data) {
        window.location.href = 'http://127.0.0.1:4000';
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!authUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container section'>
      <div className='row justify-content-center'>
        <div className='col-md-8'>
          <div className='card'>
            <div className='card-body text-center'>
              <img
                src={authUser.picture}
                alt='User Picture'
                className='rounded-circle mb-3'
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <h2 className='card-title'>{authUser.username}</h2>
              <div className='mb-3'>
                <label htmlFor='usernameInput' className='form-label'>
                  Edit Username:
                </label>
                <input
                  type='text'
                  id='usernameInput'
                  value={updatedUsername}
                  onChange={(event) => setUpdatedUsername(event.target.value)}
                  className='form-control'
                />
                <button
                  onClick={handleUpdateUser}
                  className='btn btn-primary mt-3'
                >
                  Save
                </button>
              </div>
              <p className='card-text'>Points: {authUser.points}</p>
              <p className='card-text'>Trophy: {authUser.trophy}</p>
              <button
                onClick={handleDeleteUser}
                className='btn btn-danger'
              >
                Delete Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
