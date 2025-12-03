import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Clock, Users, Bell, Calendar, Shield, TrendingUp, Activity, Heart, Plus, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

const DashboardHome = () => {
  const mainRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stat-card', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
      });

      gsap.from('.widget-card', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.3,
        ease: 'power3.out'
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { label: 'Visitors Today', value: '4', icon: Users, color: 'indigo', trend: '+2' },
    { label: 'Conversations', value: '12', icon: Activity, color: 'purple', trend: '+5' },
    { label: 'Unread Alerts', value: '3', icon: Bell, color: 'yellow', trend: '' },
    { label: 'Upcoming Reminders', value: '6', icon: Calendar, color: 'emerald', trend: '' },
  ];

  const recentInteractions = [
    {
      name: 'Sarah Johnson',
      relationship: 'Daughter',
      time: '2 hours ago',
      mood: 'happy',
      summary: 'Discussed upcoming doctor appointment and medication changes.',
      avatar: 'SJ',
      color: 'indigo'
    },
    {
      name: 'Dr. Michael Chen',
      relationship: 'Doctor',
      time: 'Yesterday',
      mood: 'neutral',
      summary: 'Routine check-up. Adjusted evening medication dosage.',
      avatar: 'MC',
      color: 'blue'
    },
    {
      name: 'Tommy Johnson',
      relationship: 'Grandson',
      time: '3 days ago',
      mood: 'happy',
      summary: 'Tommy showed his school project about dinosaurs.',
      avatar: 'TJ',
      color: 'purple'
    },
  ];

  const todayReminders = [
    { time: '9:00 AM', title: 'Morning Medication', type: 'medication', completed: true },
    { time: '12:00 PM', title: 'Lunch with Maria', type: 'meal', completed: true },
    { time: '2:00 PM', title: 'Physical Therapy', type: 'activity', completed: false },
    { time: '6:00 PM', title: 'Evening Medication', type: 'medication', completed: false },
  ];

  const quickActions = [
    { label: 'Add Contact', icon: Users, action: () => navigate('/dashboard/contacts') },
    { label: 'Create Reminder', icon: Calendar, action: () => navigate('/dashboard/reminders') },
    { label: 'View Alerts', icon: Bell, action: () => navigate('/dashboard/alerts') },
  ];

  const getMoodColor = (mood) => {
    const colors = {
      happy: 'bg-emerald-100 text-emerald-700',
      neutral: 'bg-blue-100 text-blue-700',
      sad: 'bg-gray-100 text-gray-700',
      anxious: 'bg-yellow-100 text-yellow-700',
      confused: 'bg-red-100 text-red-700',
    };
    return colors[mood] || colors.neutral;
  };

  const getMoodEmoji = (mood) => {
    const emojis = {
      happy: '😊',
      neutral: '😐',
      sad: '😢',
      anxious: '😰',
      confused: '😕',
    };
    return emojis[mood] || emojis.neutral;
  };

  return (
    <div ref={mainRef} className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Welcome back, John
        </h1>
        <p className="text-lg text-gray-600">
          Here's what's happening with your loved one today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="stat-card bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-default group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`bg-${stat.color}-100 text-${stat.color}-600 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6" />
                </div>
                {stat.trend && (
                  <span className="flex items-center gap-1 text-sm font-semibold text-emerald-600">
                    <TrendingUp className="h-4 w-4" />
                    {stat.trend}
                  </span>
                )}
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Interactions */}
        <div className="lg:col-span-2 widget-card bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Recent Interactions</h2>
            <button
              onClick={() => navigate('/dashboard/interactions')}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1 transition-colors"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {recentInteractions.map((interaction, index) => (
              <div
                key={index}
                className="p-6 hover:bg-gray-50 transition-colors cursor-pointer group"
                onClick={() => navigate('/dashboard/interactions')}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-${interaction.color}-400 to-${interaction.color}-600 flex items-center justify-center text-white font-semibold flex-shrink-0`}>
                    {interaction.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {interaction.name}
                        </h3>
                        <p className="text-sm text-gray-500">{interaction.relationship}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getMoodColor(interaction.mood)}`}>
                          {getMoodEmoji(interaction.mood)}
                        </span>
                        <span className="text-sm text-gray-500">{interaction.time}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{interaction.summary}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Reminders */}
        <div className="widget-card bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Today's Reminders</h2>
            <button
              onClick={() => navigate('/dashboard/reminders')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Plus className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {todayReminders.map((reminder, index) => (
              <div key={index} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                <div className={`w-2 h-2 rounded-full ${reminder.completed ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${reminder.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                    {reminder.title}
                  </p>
                  <p className="text-xs text-gray-500">{reminder.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Glasses Status */}
        <div className="widget-card bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Glasses Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Connection</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-gray-900">Connected</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Battery</span>
              <span className="text-sm font-semibold text-gray-900">87%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Last Sync</span>
              <span className="text-sm font-semibold text-gray-900">2 min ago</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-2 widget-card bg-gray-900 rounded-2xl p-6 text-white">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 transition-all duration-300 hover:scale-105 active:scale-95 border border-white/10 group"
                >
                  <Icon className="h-6 w-6 mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium">{action.label}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
