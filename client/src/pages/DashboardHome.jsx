import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Clock, Users, Bell, Calendar, TrendingUp, Activity, Plus, ArrowRight } from 'lucide-react';
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

  const recentInteractions = [
    {
      name: 'Sarah Johnson',
      relationship: 'Daughter',
      time: '2 hours ago',
      mood: 'happy',
      summary: 'Discussed upcoming doctor appointment and medication changes.',
      avatar: 'SJ',
      bgColor: 'bg-indigo-500'
    },
    {
      name: 'Dr. Michael Chen',
      relationship: 'Doctor',
      time: 'Yesterday',
      mood: 'neutral',
      summary: 'Routine check-up. Adjusted evening medication dosage.',
      avatar: 'MC',
      bgColor: 'bg-blue-500'
    },
    {
      name: 'Tommy Johnson',
      relationship: 'Grandson',
      time: '3 days ago',
      mood: 'happy',
      summary: 'Tommy showed his school project about dinosaurs.',
      avatar: 'TJ',
      bgColor: 'bg-purple-500'
    },
  ];

  const todayReminders = [
    { time: '9:00 AM', title: 'Morning Medication', type: 'medication', completed: true },
    { time: '12:00 PM', title: 'Lunch with Maria', type: 'meal', completed: true },
    { time: '2:00 PM', title: 'Physical Therapy', type: 'activity', completed: false },
    { time: '6:00 PM', title: 'Evening Medication', type: 'medication', completed: false },
  ];

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
        <div className="stat-card bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-default group">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-indigo-100 text-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="h-6 w-6" />
            </div>
            <span className="flex items-center gap-1 text-sm font-semibold text-emerald-600">
              <TrendingUp className="h-4 w-4" />
              +2
            </span>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 mb-1">4</p>
            <p className="text-sm text-gray-600">Visitors Today</p>
          </div>
        </div>

        <div className="stat-card bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-default group">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Activity className="h-6 w-6" />
            </div>
            <span className="flex items-center gap-1 text-sm font-semibold text-emerald-600">
              <TrendingUp className="h-4 w-4" />
              +5
            </span>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 mb-1">12</p>
            <p className="text-sm text-gray-600">Conversations</p>
          </div>
        </div>

        <div className="stat-card bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-default group">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-yellow-100 text-yellow-600 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Bell className="h-6 w-6" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 mb-1">3</p>
            <p className="text-sm text-gray-600">Unread Alerts</p>
          </div>
        </div>

        <div className="stat-card bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-default group">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-emerald-100 text-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="h-6 w-6" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 mb-1">6</p>
            <p className="text-sm text-gray-600">Upcoming Reminders</p>
          </div>
        </div>
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
                  <div className={`w-12 h-12 rounded-full ${interaction.bgColor} flex items-center justify-center text-white font-semibold flex-shrink-0`}>
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
                        <span className="text-xl">
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
            <button
              onClick={() => navigate('/dashboard/contacts')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 transition-all duration-300 hover:scale-105 active:scale-95 border border-white/10 group"
            >
              <Users className="h-6 w-6 mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium">Add Contact</p>
            </button>
            <button
              onClick={() => navigate('/dashboard/reminders')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 transition-all duration-300 hover:scale-105 active:scale-95 border border-white/10 group"
            >
              <Calendar className="h-6 w-6 mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium">Create Reminder</p>
            </button>
            <button
              onClick={() => navigate('/dashboard/alerts')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 transition-all duration-300 hover:scale-105 active:scale-95 border border-white/10 group"
            >
              <Bell className="h-6 w-6 mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium">View Alerts</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
