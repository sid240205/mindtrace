import { useState } from 'react';
import { Calendar, Plus, Clock, Pill, Utensils, Activity, Droplets, MessageSquare, X } from 'lucide-react';

const RemindersCalendar = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedType, setSelectedType] = useState('medication');

  const reminderTypes = [
    { id: 'medication', label: 'Medication', icon: Pill, color: 'blue' },
    { id: 'meal', label: 'Meal', icon: Utensils, color: 'emerald' },
    { id: 'activity', label: 'Activity', icon: Activity, color: 'purple' },
    { id: 'hydration', label: 'Hydration', icon: Droplets, color: 'cyan' },
    { id: 'message', label: 'Message', icon: MessageSquare, color: 'indigo' },
  ];

  const reminders = [
    { id: 1, type: 'medication', title: 'Morning Medication', time: '9:00 AM', recurrence: 'Daily', completed: true },
    { id: 2, type: 'meal', title: 'Lunch Reminder', time: '12:00 PM', recurrence: 'Daily', completed: true },
    { id: 3, type: 'activity', title: 'Physical Therapy', time: '2:00 PM', recurrence: 'Mon/Wed/Fri', completed: false },
    { id: 4, type: 'medication', title: 'Evening Medication', time: '6:00 PM', recurrence: 'Daily', completed: false },
    { id: 5, type: 'hydration', title: 'Drink Water', time: '10:00 AM', recurrence: 'Every 2 hours', completed: true },
  ];

  const getTypeConfig = (type) => {
    const config = reminderTypes.find(t => t.id === type);
    return config || reminderTypes[0];
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Reminders
          </h1>
          <p className="text-lg text-gray-600">
            Manage medication, meals, and activity reminders
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800
            transition-all duration-200 flex items-center gap-2 hover:scale-105 active:scale-95 shadow-lg"
        >
          <Plus className="h-5 w-5" />
          Add Reminder
        </button>
      </div>

      {/* Calendar View (Simplified) */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Today's Schedule
          </h2>
          <span className="text-sm text-gray-600">December 3, 2025</span>
        </div>

        <div className="space-y-3">
          {reminders.map((reminder) => {
            const config = getTypeConfig(reminder.type);
            const Icon = config.icon;

            return (
              <div
                key={reminder.id}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                  reminder.completed
                    ? 'bg-gray-50 border-gray-200 opacity-60'
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg bg-${config.color}-100 text-${config.color}-600 flex items-center justify-center flex-shrink-0`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${reminder.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                    {reminder.title}
                  </h3>
                  <p className="text-sm text-gray-500">{reminder.recurrence}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    {reminder.time}
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    reminder.completed
                      ? 'bg-emerald-500 border-emerald-500'
                      : 'border-gray-300'
                  }`}>
                    {reminder.completed && <span className="text-white text-xs">✓</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reminder Types Grid */}
      <div className="grid md:grid-cols-5 gap-4">
        {reminderTypes.map((type) => {
          const Icon = type.icon;
          return (
            <div
              key={type.id}
              className="bg-white rounded-2xl border border-gray-200 p-6 text-center hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className={`w-14 h-14 mx-auto mb-3 rounded-xl bg-${type.color}-100 text-${type.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-gray-900">{type.label}</h3>
            </div>
          );
        })}
      </div>

      {/* Add Reminder Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Add New Reminder</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Reminder Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                  >
                    {reminderTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Title</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="Enter reminder title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Time</label>
                  <input
                    type="time"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Recurrence</label>
                  <select
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                  >
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Weekdays</option>
                    <option>Custom</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  alert('Reminder created!');
                }}
                className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800"
              >
                Create Reminder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RemindersCalendar;
