import { useState, useEffect, useRef } from 'react';
import { Bell, AlertCircle, Info, AlertTriangle, CheckCircle, X, Filter } from 'lucide-react';
import gsap from 'gsap';

const AlertsNotifications = () => {
  const mainRef = useRef(null);
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.alert-item', {
        x: -30,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power3.out'
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const alerts = [
    {
      id: 1,
      type: 'visitor-arrival',
      severity: 'info',
      title: 'Visitor Arrived',
      message: 'Sarah Johnson has been recognized',
      timestamp: '2025-12-03T10:30:00',
      read: false,
      data: { personName: 'Sarah Johnson', location: 'Front Door' }
    },
    {
      id: 2,
      type: 'conversation-summary',
      severity: 'info',
      title: 'New Conversation Summary Ready',
      message: 'AI has processed conversation with Sarah Johnson',
      timestamp: '2025-12-03T10:45:00',
      read: false,
      data: { personName: 'Sarah Johnson' }
    },
    {
      id: 3,
      type: 'missed-medication',
      severity: 'warning',
      title: 'Medication Reminder Missed',
      message: 'Morning medication was not acknowledged',
      timestamp: '2025-12-03T09:15:00',
      read: true,
      data: { medicationName: 'Morning Dose', scheduledTime: '9:00 AM' }
    },
    {
      id: 4,
      type: 'unknown-visitor',
      severity: 'warning',
      title: 'Unknown Person Detected',
      message: 'Unrecognized person approached at front door',
      timestamp: '2025-12-02T15:20:00',
      read: true,
      data: { location: 'Front Door', photoAvailable: true }
    },
    {
      id: 5,
      type: 'low-battery',
      severity: 'warning',
      title: 'Glasses Battery Low',
      message: 'Smart glasses battery below 20%',
      timestamp: '2025-12-02T18:00:00',
      read: true,
      data: { batteryPercentage: 18, estimatedTime: '2 hours' }
    },
    {
      id: 6,
      type: 'confusion-detected',
      severity: 'critical',
      title: 'Confusion Pattern Detected',
      message: 'Repeated confusion detected - possible symptom flare-up',
      timestamp: '2025-12-01T14:30:00',
      read: true,
      data: { pattern: 'Repeated questions', duration: '15 minutes' }
    }
  ];

  const getSeverityConfig = (severity) => {
    const configs = {
      info: {
        icon: Info,
        color: 'blue',
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        border: 'border-blue-200'
      },
      warning: {
        icon: AlertTriangle,
        color: 'yellow',
        bg: 'bg-yellow-100',
        text: 'text-yellow-700',
        border: 'border-yellow-200'
      },
      critical: {
        icon: AlertCircle,
        color: 'red',
        bg: 'bg-red-100',
        text: 'text-red-700',
        border: 'border-red-200'
      }
    };
    return configs[severity] || configs.info;
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
    }
  };

  const filteredAlerts = alerts.filter(alert =>
    selectedSeverity === 'all' || alert.severity === selectedSeverity
  );

  return (
    <div ref={mainRef} className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Alerts & Notifications
        </h1>
        <p className="text-lg text-gray-600">
          Monitor important events and system notifications
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <div className="flex gap-2">
            {['all', 'info', 'warning', 'critical'].map((severity) => (
              <button
                key={severity}
                onClick={() => setSelectedSeverity(severity)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  selectedSeverity === severity
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {severity.charAt(0).toUpperCase() + severity.slice(1)}
              </button>
            ))}
          </div>
          <button className="ml-auto text-sm font-medium text-indigo-600 hover:text-indigo-700">
            Mark All as Read
          </button>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => {
          const config = getSeverityConfig(alert.severity);
          const Icon = config.icon;

          return (
            <div
              key={alert.id}
              className={`alert-item bg-white rounded-2xl border-2 p-6 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                alert.read ? 'border-gray-200 opacity-60 hover:opacity-100' : `${config.border}`
              }`}
              onClick={() => setSelectedAlert(alert)}
            >
              <div className="flex items-start gap-4">
                <div className={`${config.bg} ${config.text} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                    </div>
                    {!alert.read && (
                      <div className="w-2 h-2 bg-indigo-600 rounded-full ml-4" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{formatTimestamp(alert.timestamp)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Alert Detail Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{selectedAlert.title}</h2>
              <button
                onClick={() => setSelectedAlert(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            <div className="p-6">
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-gray-700">{selectedAlert.message}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Time</span>
                  <span className="font-medium text-gray-900">
                    {new Date(selectedAlert.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Severity</span>
                  <span className={`font-medium ${getSeverityConfig(selectedAlert.severity).text}`}>
                    {selectedAlert.severity.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => setSelectedAlert(null)}
                className="w-full px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertsNotifications;
