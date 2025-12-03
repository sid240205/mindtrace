import { useState } from 'react';
import { Plus, Clock, Pill, Utensils, Activity, Droplets, CheckCircle2, Circle, Filter } from 'lucide-react';
import AddReminderModal from '../components/AddReminderModal';
import ViewReminderModal from '../components/ViewReminderModal';

const Reminders = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: 'Take Blood Pressure Medication',
      type: 'medication',
      time: '08:00',
      recurrence: 'daily',
      completed: false,
      notes: 'Take with food'
    },
    {
      id: 2,
      title: 'Breakfast',
      type: 'meal',
      time: '08:30',
      recurrence: 'daily',
      completed: true,
      notes: ''
    },
    {
      id: 3,
      title: 'Morning Walk',
      type: 'activity',
      time: '09:00',
      recurrence: 'daily',
      completed: false,
      notes: '15 minutes around the block'
    },
    {
      id: 4,
      title: 'Drink Water',
      type: 'hydration',
      time: '10:00',
      recurrence: 'daily',
      completed: true,
      notes: ''
    },
    {
      id: 5,
      title: 'Lunch',
      type: 'meal',
      time: '12:30',
      recurrence: 'daily',
      completed: false,
      notes: ''
    },
    {
      id: 6,
      title: 'Afternoon Medication',
      type: 'medication',
      time: '14:00',
      recurrence: 'daily',
      completed: false,
      notes: 'Vitamin D supplement'
    },
    {
      id: 7,
      title: 'Physical Therapy Exercises',
      type: 'activity',
      time: '15:00',
      recurrence: 'weekdays',
      completed: false,
      notes: 'Follow the routine from Dr. Chen'
    },
    {
      id: 8,
      title: 'Dinner',
      type: 'meal',
      time: '18:00',
      recurrence: 'daily',
      completed: false,
      notes: ''
    },
    {
      id: 9,
      title: 'Evening Medication',
      type: 'medication',
      time: '20:00',
      recurrence: 'daily',
      completed: false,
      notes: 'Take before bed'
    }
  ]);

  const reminderIcons = {
    medication: Pill,
    meal: Utensils,
    activity: Activity,
    hydration: Droplets
  };

  const reminderColors = {
    medication: 'blue',
    meal: 'orange',
    activity: 'purple',
    hydration: 'cyan'
  };

  const reminderTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'medication', label: 'Medication', icon: Pill },
    { value: 'meal', label: 'Meals', icon: Utensils },
    { value: 'activity', label: 'Activities', icon: Activity },
    { value: 'hydration', label: 'Hydration', icon: Droplets }
  ];

  const statusFilters = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' }
  ];

  const handleSaveReminder = (newReminder) => {
    const reminder = {
      ...newReminder,
      id: Date.now(),
      completed: false,
      notes: ''
    };
    setReminders([...reminders, reminder]);
  };

  const handleToggleComplete = (id) => {
    setReminders(reminders.map(reminder =>
      reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
    ));
  };

  const handleDeleteReminder = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  const handleEditReminder = (reminder) => {
    console.log('Edit reminder:', reminder);
    alert('Edit functionality coming soon!');
  };

  const handleViewReminder = (reminder) => {
    setSelectedReminder(reminder);
    setShowViewModal(true);
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const filteredReminders = reminders
    .filter(reminder => {
      const matchesType = filterType === 'all' || reminder.type === filterType;
      const matchesStatus = filterStatus === 'all' ||
        (filterStatus === 'pending' && !reminder.completed) ||
        (filterStatus === 'completed' && reminder.completed);
      return matchesType && matchesStatus;
    })
    .sort((a, b) => a.time.localeCompare(b.time));

  const groupedReminders = {
    morning: filteredReminders.filter(r => {
      const hour = parseInt(r.time.split(':')[0]);
      return hour >= 5 && hour < 12;
    }),
    afternoon: filteredReminders.filter(r => {
      const hour = parseInt(r.time.split(':')[0]);
      return hour >= 12 && hour < 17;
    }),
    evening: filteredReminders.filter(r => {
      const hour = parseInt(r.time.split(':')[0]);
      return hour >= 17 || hour < 5;
    })
  };

  const stats = {
    total: reminders.length,
    completed: reminders.filter(r => r.completed).length,
    pending: reminders.filter(r => !r.completed).length
  };

  const ReminderCard = ({ reminder }) => {
    const Icon = reminderIcons[reminder.type];
    const color = reminderColors[reminder.type];
    
    return (
      <div
        onClick={() => handleViewReminder(reminder)}
        className={`bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg
          transition-all duration-300 cursor-pointer group ${
            reminder.completed ? 'opacity-60' : ''
          }`}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleComplete(reminder.id);
            }}
            className="shrink-0"
          >
            {reminder.completed ? (
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            ) : (
              <Circle className="h-6 w-6 text-gray-300 hover:text-gray-400" />
            )}
          </button>

          <div className={`w-12 h-12 rounded-xl bg-${color}-100 flex items-center justify-center shrink-0`}>
            <Icon className={`h-6 w-6 text-${color}-600`} />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className={`text-lg font-semibold group-hover:text-indigo-600 transition-colors ${
              reminder.completed ? 'line-through text-gray-500' : 'text-gray-900'
            }`}>
              {reminder.title}
            </h3>
            <p className="text-sm text-gray-500 capitalize">{reminder.type} • {reminder.recurrence}</p>
          </div>

          <div className="text-right shrink-0">
            <div className="flex items-center gap-2 text-gray-900 font-semibold">
              <Clock className="h-4 w-4 text-gray-400" />
              {formatTime(reminder.time)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Reminders
          </h1>
          <p className="text-lg text-gray-600">
            Manage daily reminders and schedules
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800
            transition-all duration-200 flex items-center gap-2 shadow-lg"
        >
          <Plus className="h-5 w-5" />
          Add Reminder
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Reminders</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              <Clock className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Completed Today</p>
              <p className="text-3xl font-bold text-emerald-600">{stats.completed}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Pending</p>
              <p className="text-3xl font-bold text-orange-600">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Circle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent
                transition-all duration-200 cursor-pointer"
            >
              {reminderTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent
                transition-all duration-200 cursor-pointer"
            >
              {statusFilters.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {groupedReminders.morning.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              Morning
            </h2>
            <div className="space-y-3">
              {groupedReminders.morning.map((reminder) => (
                <ReminderCard key={reminder.id} reminder={reminder} />
              ))}
            </div>
          </div>
        )}

        {groupedReminders.afternoon.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              Afternoon
            </h2>
            <div className="space-y-3">
              {groupedReminders.afternoon.map((reminder) => (
                <ReminderCard key={reminder.id} reminder={reminder} />
              ))}
            </div>
          </div>
        )}

        {groupedReminders.evening.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
              Evening
            </h2>
            <div className="space-y-3">
              {groupedReminders.evening.map((reminder) => (
                <ReminderCard key={reminder.id} reminder={reminder} />
              ))}
            </div>
          </div>
        )}

        {filteredReminders.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No reminders found matching your filters</p>
            <button
              onClick={() => {
                setFilterType('all');
                setFilterStatus('all');
              }}
              className="mt-4 px-6 py-2 text-gray-600 hover:text-gray-900 font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <AddReminderModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleSaveReminder}
      />

      {showViewModal && selectedReminder && (
        <ViewReminderModal
          reminder={selectedReminder}
          onClose={() => {
            setShowViewModal(false);
            setSelectedReminder(null);
          }}
          onEdit={handleEditReminder}
          onDelete={handleDeleteReminder}
          onToggleComplete={handleToggleComplete}
        />
      )}
    </div>
  );
};

export default Reminders;
