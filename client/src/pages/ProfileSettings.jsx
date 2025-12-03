import { useState } from 'react';
import { User, Mail, Phone, Lock, Bell, Shield, Trash2, Camera, Save } from 'lucide-react';

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '(555) 123-4567',
    role: 'Caregiver',
    patientName: 'Margaret Doe',
    relationship: 'Son'
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: true,
    pushNotifications: true,
    weeklyReports: true,
    interactionSummaries: true,
    reminderAlerts: true
  });

  const [privacy, setPrivacy] = useState({
    shareLocation: true,
    recordConversations: false,
    dataAnalytics: true,
    thirdPartySharing: false
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Profile Settings
        </h1>
        <p className="text-lg text-gray-600">
          Manage your account and preferences
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    value={profile.patientName}
                    onChange={(e) => setProfile({ ...profile, patientName: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Relationship
                  </label>
                  <input
                    type="text"
                    value={profile.relationship}
                    onChange={(e) => setProfile({ ...profile, relationship: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Preferences
            </h2>

            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => {
                const labels = {
                  emailAlerts: 'Email Alerts',
                  smsAlerts: 'SMS Alerts',
                  pushNotifications: 'Push Notifications',
                  weeklyReports: 'Weekly Summary Reports',
                  interactionSummaries: 'Daily Interaction Summaries',
                  reminderAlerts: 'Reminder Notifications'
                };

                return (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-900 font-medium">{labels[key]}</span>
                    <button
                      onClick={() => setNotifications({ ...notifications, [key]: !value })}
                      className={`relative w-14 h-8 rounded-full transition-colors ${
                        value ? 'bg-emerald-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                        value ? 'translate-x-6' : ''
                      }`} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Security
            </h2>

            <div className="space-y-4 mb-6">
              {Object.entries(privacy).map(([key, value]) => {
                const labels = {
                  shareLocation: 'Share Location Data',
                  recordConversations: 'Record Conversations',
                  dataAnalytics: 'Usage Analytics',
                  thirdPartySharing: 'Third-Party Data Sharing'
                };

                return (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-900 font-medium">{labels[key]}</span>
                    <button
                      onClick={() => setPrivacy({ ...privacy, [key]: !value })}
                      className={`relative w-14 h-8 rounded-full transition-colors ${
                        value ? 'bg-emerald-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                        value ? 'translate-x-6' : ''
                      }`} />
                    </button>
                  </div>
                );
              })}
            </div>

            <button className="w-full px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
              <Lock className="h-5 w-5" />
              Change Password
            </button>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-2xl border-2 border-red-200 p-6">
            <h2 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              Danger Zone
            </h2>
            <p className="text-gray-600 mb-4">
              Once you delete your account, there is no going back. All your data will be permanently removed.
            </p>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>

        {/* Profile Picture & Quick Actions */}
        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h2>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold mb-4">
                JD
              </div>
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Change Photo
              </button>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Info</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Role</span>
                <span className="font-medium text-gray-900">{profile.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Member Since</span>
                <span className="font-medium text-gray-900">Jan 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account Status</span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span className="font-medium text-gray-900">Active</span>
                </span>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full px-6 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Save className="h-5 w-5" />
            Save All Changes
          </button>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Delete Account</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Are you absolutely sure? This action cannot be undone. All your data, including interaction history, contacts, and settings will be permanently deleted.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                <p className="text-sm text-red-800 font-medium">
                  Type "DELETE" to confirm
                </p>
                <input
                  type="text"
                  placeholder="Type DELETE"
                  className="w-full mt-2 px-4 py-2 bg-white border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  alert('Account deletion cancelled');
                }}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;
