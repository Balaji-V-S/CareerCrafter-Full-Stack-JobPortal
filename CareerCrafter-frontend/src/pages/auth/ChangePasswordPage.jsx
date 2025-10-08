import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ChangePasswordPage = () => {
  const { changePassword } = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      await changePassword(oldPassword, newPassword);
      setMessage('Password changed successfully');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Password change failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}

        <label>Old Password</label>
        <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />

        <label>New Password</label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />

        <label>Confirm New Password</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
