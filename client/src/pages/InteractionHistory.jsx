import { useState } from 'react';
import { Search, Filter, Download, X, MapPin, Clock, Star } from 'lucide-react';

const InteractionHistory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMood, setSelectedMood] = useState('all');
  const [selectedInteraction, setSelectedInteraction] = useState(null);
  const [starredOnly, setStarredOnly] = useState(false);

  const interactions = [
    {
      id: 1,
      name: 'Sarah Johnson',
      relationship: 'Daughter',
      avatar: 'SJ',
      color: 'indigo',
      photo: null,
      summary: 'Discussed upcoming doctor appointment and medication changes. Sarah mentioned planning a family dinner next weekend and asked about dietary preferences.',
      keyTopics: ['doctor appointment', 'medication', 'family dinner'],
      mood: 'happy',
      timestamp: '2025-12-03T10:30:00',
      duration: '15 minutes',
      location: 'Living Room',
      starred: true,
      fullDetails: 'Sarah visited in the morning and had a detailed conversation about the upcoming doctor\'s appointment scheduled for next Tuesday. She discussed the recent changes to the evening medication dosage as recommended by Dr. Chen. The conversation was warm and positive, with Sarah sharing plans for a family dinner next weekend. She asked about food preferences and dietary restrictions to consider for the meal planning.'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      relationship: 'Doctor',
      avatar: 'MC',
      color: 'blue',
      photo: null,
      summary: 'Routine check-up. Discussed memory exercises and adjusted evening medication dosage. Scheduled follow-up for two weeks.',
      keyTopics: ['health check', 'medication', 'memory exercises', 'follow-up'],
      mood: 'neutral',
      timestamp: '2025-12-02T14:00:00',
      duration: '30 minutes',
      location: 'Medical Office',
      starred: false,
      fullDetails: 'Dr. Chen conducted a comprehensive routine check-up. He reviewed recent cognitive function and was pleased with the progress. Discussed implementing new memory exercises and adjusted the evening medication dosage to optimize effectiveness. Scheduled a follow-up appointment for two weeks to monitor the medication changes.'
    },
    {
      id: 3,
      name: 'Tommy Johnson',
      relationship: 'Grandson',
      avatar: 'TJ',
      color: 'purple',
      photo: null,
      summary: 'Tommy showed his school project about dinosaurs. Very enthusiastic conversation about T-Rex facts and fossil discoveries.',
      keyTopics: ['school project', 'dinosaurs', 'T-Rex', 'learning'],
      mood: 'happy',
      timestamp: '2025-11-30T16:45:00',
      duration: '25 minutes',
      location: 'Living Room',
      starred: true,
      fullDetails: 'Tommy visited after school and was incredibly excited to share his science project about dinosaurs. He brought visual aids and spent time explaining his research on T-Rex anatomy and behavior. The conversation was filled with energy and enthusiasm. Tommy demonstrated excellent knowledge retention and showed his presentation skills. He asked many questions about what dinosaurs might have looked like and shared interesting facts about fossil discoveries.'
    },
    {
      id: 4,
      name: 'Maria Garcia',
      relationship: 'Nurse',
      avatar: 'MG',
      color: 'emerald',
      photo: null,
      summary: 'Morning routine check. Took vitals, administered medication, and helped with breakfast preparation.',
      keyTopics: ['morning routine', 'vitals', 'medication', 'breakfast'],
      mood: 'neutral',
      timestamp: '2025-12-03T08:00:00',
      duration: '45 minutes',
      location: 'Home',
      starred: false,
      fullDetails: 'Maria arrived for the morning shift and conducted the standard morning routine. She checked blood pressure (120/80), temperature (98.6°F), and pulse (72 bpm) - all within normal ranges. Administered morning medications and assisted with breakfast preparation. Discussed the day\'s schedule and confirmed upcoming appointments.'
    },
    {
      id: 5,
      name: 'Robert Miller',
      relationship: 'Friend',
      avatar: 'RM',
      color: 'yellow',
      photo: null,
      summary: 'Weekly chess game. Discussed old memories from the neighborhood and upcoming community events.',
      keyTopics: ['chess', 'memories', 'community', 'friendship'],
      mood: 'happy',
      timestamp: '2025-11-28T14:00:00',
      duration: '1 hour 20 minutes',
      location: 'Living Room',
      starred: false,
      fullDetails: 'Robert came over for their weekly Thursday chess game. They played two games, with Robert winning the first and a draw in the second. The conversation flowed naturally between moves, reminiscing about old times in the neighborhood and friends from the past. Robert shared information about upcoming community events and invited to join for a community picnic next month.'
    }
  ];

  const filteredInteractions = interactions.filter(interaction => {
    const matchesSearch = interaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interaction.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interaction.keyTopics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesMood = selectedMood === 'all' || interaction.mood === selectedMood;
    const matchesStarred = !starredOnly || interaction.starred;

    return matchesSearch && matchesMood && matchesStarred;
  });

  const getMoodColor = (mood) => {
    const colors = {
      happy: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      neutral: 'bg-blue-100 text-blue-700 border-blue-200',
      sad: 'bg-gray-100 text-gray-700 border-gray-200',
      anxious: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      confused: 'bg-red-100 text-red-700 border-red-200',
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

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  const handleExport = () => {
    alert('Export functionality would download interaction history as PDF/CSV');
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Interaction History
        </h1>
        <p className="text-lg text-gray-600">
          Review and analyze past conversations
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, topic, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent
                transition-all duration-200"
            />
          </div>

          {/* Mood Filter */}
          <select
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent
              transition-all duration-200 cursor-pointer"
          >
            <option value="all">All Moods</option>
            <option value="happy">Happy</option>
            <option value="neutral">Neutral</option>
            <option value="sad">Sad</option>
            <option value="anxious">Anxious</option>
            <option value="confused">Confused</option>
          </select>

          {/* Starred Filter */}
          <button
            onClick={() => setStarredOnly(!starredOnly)}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2
              ${starredOnly
                ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300'
                : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
              }`}
          >
            <Star className={`h-5 w-5 ${starredOnly ? 'fill-yellow-700' : ''}`} />
            Starred
          </button>

          {/* Export */}
          <button
            onClick={handleExport}
            className="px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800
              transition-all duration-200 flex items-center gap-2"
          >
            <Download className="h-5 w-5" />
            Export
          </button>
        </div>
      </div>

      {/* Interactions Timeline */}
      <div className="space-y-4">
        {filteredInteractions.map((interaction) => (
          <div
            key={interaction.id}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden
              hover:shadow-lg transition-all duration-300 cursor-pointer group"
            onClick={() => setSelectedInteraction(interaction)}
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className={`w-14 h-14 rounded-full bg-linear-to-br from-${interaction.color}-400 to-${interaction.color}-600 flex items-center justify-center text-white font-semibold text-lg shrink-0`}>
                  {interaction.avatar}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {interaction.name}
                      </h3>
                      <p className="text-sm text-gray-500">{interaction.relationship}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Toggle starred
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Star className={`h-5 w-5 ${interaction.starred ? 'fill-yellow-500 text-yellow-500' : 'text-gray-400'}`} />
                      </button>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-gray-600 mb-4 line-clamp-2">{interaction.summary}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {interaction.keyTopics.map((topic, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className={`px-3 py-1 rounded-lg text-xs font-medium border ${getMoodColor(interaction.mood)}`}>
                      {getMoodEmoji(interaction.mood)} {interaction.mood}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {formatTimestamp(interaction.timestamp)}
                    </div>
                    <div>Duration: {interaction.duration}</div>
                    {interaction.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {interaction.location}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredInteractions.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500 text-lg">No interactions found matching your filters</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedInteraction && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full bg-linear-to-br from-${selectedInteraction.color}-400 to-${selectedInteraction.color}-600 flex items-center justify-center text-white font-semibold text-lg`}>
                  {selectedInteraction.avatar}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedInteraction.name}</h2>
                  <p className="text-gray-500">{selectedInteraction.relationship}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedInteraction(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Meta Info */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Date & Time</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(selectedInteraction.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Duration</p>
                  <p className="font-semibold text-gray-900">{selectedInteraction.duration}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Location</p>
                  <p className="font-semibold text-gray-900">{selectedInteraction.location}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Emotional Tone</p>
                  <span className={`inline-flex px-3 py-1 rounded-lg text-sm font-medium border ${getMoodColor(selectedInteraction.mood)}`}>
                    {getMoodEmoji(selectedInteraction.mood)} {selectedInteraction.mood}
                  </span>
                </div>
              </div>

              {/* Topics */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Key Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedInteraction.keyTopics.map((topic, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-lg"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Full Details */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Full Conversation Summary</h3>
                <p className="text-gray-700 leading-relaxed">{selectedInteraction.fullDetails}</p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors">
                View Contact Profile
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                Export
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractionHistory;
