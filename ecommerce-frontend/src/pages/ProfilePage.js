import React, { useEffect, useState } from 'react';
import { getProfile, updateProfile, changePassword } from '../api/userService';

const ProfilePage = () => {
  const [profile, setProfile] = useState({ fullName: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pwdSaving, setPwdSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [pwdSuccess, setPwdSuccess] = useState('');
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });

  useEffect(() => {
    const load = async () => {
      setError('');
      try {
        const data = await getProfile();
        setProfile({ fullName: data.fullName || '', email: data.email || '' });
      } catch (e) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      await updateProfile({ fullName: profile.fullName });
      setSuccess('Profile updated successfully');
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handlePwdChange = (e) => {
    const { name, value } = e.target;
    setPasswords((p) => ({ ...p, [name]: value }));
    setPwdError('');
    setPwdSuccess('');
  };

  const handlePwdSubmit = async (e) => {
    e.preventDefault();
    if (passwords.next !== passwords.confirm) {
      setPwdError('New passwords do not match');
      return;
    }
    setPwdSaving(true);
    try {
      await changePassword(passwords.current, passwords.next);
      setPwdSuccess('Password changed successfully');
      setPasswords({ current: '', next: '', confirm: '' });
    } catch (e) {
      setPwdError(e.response?.data?.message || 'Failed to change password');
    } finally {
      setPwdSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto grid grid-cols-1 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Profile</h2>
          {error && <div className="mb-3 bg-red-100 text-red-800 px-3 py-2 rounded">{error}</div>}
          {success && <div className="mb-3 bg-green-100 text-green-800 px-3 py-2 rounded">{success}</div>}
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                name="email"
                value={profile.email}
                disabled
                className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed.</p>
            </div>
            <div>
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Change Password</h2>
          {pwdError && <div className="mb-3 bg-red-100 text-red-800 px-3 py-2 rounded">{pwdError}</div>}
          {pwdSuccess && <div className="mb-3 bg-green-100 text-green-800 px-3 py-2 rounded">{pwdSuccess}</div>}
          <form onSubmit={handlePwdSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                name="current"
                value={passwords.current}
                onChange={handlePwdChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  name="next"
                  value={passwords.next}
                  onChange={handlePwdChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  name="confirm"
                  value={passwords.confirm}
                  onChange={handlePwdChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={pwdSaving}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {pwdSaving ? 'Changing...' : 'Change Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
