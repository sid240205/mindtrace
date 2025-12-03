import { useState, useEffect, useRef } from 'react';
import { Search, Grid, List, Plus, X, Upload, Phone, Mail, Trash2, Edit2, Eye } from 'lucide-react';
import gsap from 'gsap';

const ContactsDirectory = () => {
  const mainRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedRelationship, setSelectedRelationship] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-card', {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out'
      });
    }, mainRef);

    return () => ctx.revert();
  }, [viewMode]);

  const contacts = [
    {
      id: 1,
      name: 'Sarah Johnson',
      relationship: 'family',
      relationshipDetail: 'Daughter',
      avatar: 'SJ',
      color: 'indigo',
      photos: [],
      notes: 'Visits every Sunday. Primary caregiver. Works as a nurse at City Hospital.',
      phoneNumber: '(555) 123-4567',
      email: 'sarah.j@email.com',
      visitFrequency: 'Weekly',
      lastSeen: '2025-12-03T10:30:00',
      totalInteractions: 47,
      isActive: true
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      relationship: 'doctor',
      relationshipDetail: 'Neurologist',
      avatar: 'MC',
      color: 'blue',
      photos: [],
      notes: 'Neurologist at City Hospital. Appointments every 2 weeks. Very patient and thorough.',
      phoneNumber: '(555) 234-5678',
      email: 'dr.chen@cityhospital.com',
      visitFrequency: 'Bi-weekly',
      lastSeen: '2025-12-02T14:00:00',
      totalInteractions: 24,
      isActive: true
    },
    {
      id: 3,
      name: 'Maria Garcia',
      relationship: 'caretaker',
      relationshipDetail: 'Home Care Nurse',
      avatar: 'MG',
      color: 'emerald',
      photos: [],
      notes: 'Home care nurse. Mon/Wed/Fri mornings. Very reliable and caring.',
      phoneNumber: '(555) 345-6789',
      email: 'maria.garcia@homecare.com',
      visitFrequency: '3x per week',
      lastSeen: '2025-12-03T08:00:00',
      totalInteractions: 89,
      isActive: true
    },
    {
      id: 4,
      name: 'Tommy Johnson',
      relationship: 'family',
      relationshipDetail: 'Grandson',
      avatar: 'TJ',
      color: 'purple',
      photos: [],
      notes: "Sarah's son. 12 years old. Loves talking about video games and dinosaurs.",
      phoneNumber: '',
      email: '',
      visitFrequency: 'Weekly',
      lastSeen: '2025-11-30T16:45:00',
      totalInteractions: 31,
      isActive: true
    },
    {
      id: 5,
      name: 'Robert Miller',
      relationship: 'friend',
      relationshipDetail: 'Neighbor',
      avatar: 'RM',
      color: 'yellow',
      photos: [],
      notes: 'Neighbor from 42B. Plays chess on Thursdays. Known each other for 15 years.',
      phoneNumber: '(555) 456-7890',
      email: 'robert.m@email.com',
      visitFrequency: 'Weekly',
      lastSeen: '2025-11-28T14:00:00',
      totalInteractions: 156,
      isActive: true
    },
    {
      id: 6,
      name: 'Emily Watson',
      relationship: 'caretaker',
      relationshipDetail: 'Evening Caretaker',
      avatar: 'EW',
      color: 'pink',
      photos: [],
      notes: 'Evening shift caretaker. 6 PM - 10 PM. Helps with dinner and evening routine.',
      phoneNumber: '(555) 567-8901',
      email: 'emily.w@homecare.com',
      visitFrequency: 'Daily',
      lastSeen: '2025-12-02T18:00:00',
      totalInteractions: 62,
      isActive: true
    }
  ];

  const relationshipTypes = [
    { value: 'all', label: 'All Contacts' },
    { value: 'family', label: 'Family' },
    { value: 'friend', label: 'Friends' },
    { value: 'caretaker', label: 'Caretakers' },
    { value: 'doctor', label: 'Medical' },
    { value: 'nurse', label: 'Nurses' },
    { value: 'neighbor', label: 'Neighbors' },
  ];

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.relationshipDetail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRelationship = selectedRelationship === 'all' || contact.relationship === selectedRelationship;

    return matchesSearch && matchesRelationship;
  });

  const formatLastSeen = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      return `${diffDays}d ago`;
    }
  };

  const AddContactModal = () => {
    const [formStep, setFormStep] = useState(1);
    const [formData, setFormData] = useState({
      name: '',
      relationship: 'family',
      relationshipDetail: '',
      notes: '',
      phoneNumber: '',
      email: '',
      visitFrequency: '',
      photos: []
    });

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Add New Contact</h2>
            <button
              onClick={() => setShowAddModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="px-6 pt-6 pb-4">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold
                    ${formStep >= step ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`flex-1 h-1 mx-2 ${formStep > step ? 'bg-gray-900' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-600">
              <span>Basic Info</span>
              <span>Photos</span>
              <span>Details</span>
              <span>Review</span>
            </div>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-250px)]">
            {formStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                      focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Relationship Type *</label>
                  <select
                    value={formData.relationship}
                    onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                      focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  >
                    <option value="family">Family</option>
                    <option value="friend">Friend</option>
                    <option value="caretaker">Caretaker</option>
                    <option value="doctor">Doctor</option>
                    <option value="nurse">Nurse</option>
                    <option value="neighbor">Neighbor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Specific Relation *</label>
                  <input
                    type="text"
                    value={formData.relationshipDetail}
                    onChange={(e) => setFormData({ ...formData, relationshipDetail: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                      focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="e.g., Daughter, Grandson, Primary Physician"
                  />
                </div>
              </div>
            )}

            {formStep === 2 && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">
                  Upload at least 3 photos for better facial recognition accuracy
                </p>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-gray-400 transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-700 font-medium mb-2">Click to upload photos</p>
                  <p className="text-sm text-gray-500">or drag and drop</p>
                  <p className="text-xs text-gray-400 mt-2">PNG, JPG up to 10MB each</p>
                </div>
              </div>
            )}

            {formStep === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                      focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                      focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Visit Frequency</label>
                  <input
                    type="text"
                    value={formData.visitFrequency}
                    onChange={(e) => setFormData({ ...formData, visitFrequency: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                      focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="e.g., Daily, Weekly, Monthly"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                      focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                    placeholder="Any additional information..."
                  />
                </div>
              </div>
            )}

            {formStep === 4 && (
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Review Information</h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm text-gray-500">Name</dt>
                    <dd className="text-gray-900 font-medium">{formData.name || 'Not provided'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Relationship</dt>
                    <dd className="text-gray-900 font-medium">{formData.relationshipDetail || 'Not provided'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Phone</dt>
                    <dd className="text-gray-900 font-medium">{formData.phoneNumber || 'Not provided'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Email</dt>
                    <dd className="text-gray-900 font-medium">{formData.email || 'Not provided'}</dd>
                  </div>
                </dl>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-gray-200 flex gap-3">
            {formStep > 1 && (
              <button
                onClick={() => setFormStep(formStep - 1)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={() => {
                if (formStep < 4) {
                  setFormStep(formStep + 1);
                } else {
                  setShowAddModal(false);
                  alert('Contact added successfully!');
                }
              }}
              className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              {formStep < 4 ? 'Next' : 'Add Contact'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ContactDetailModal = ({ contact }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-${contact.color}-400 to-${contact.color}-600 flex items-center justify-center text-white font-semibold text-xl`}>
              {contact.avatar}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{contact.name}</h2>
              <p className="text-gray-500">{contact.relationshipDetail}</p>
            </div>
          </div>
          <button
            onClick={() => setShowDetailModal(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Last Seen</p>
              <p className="font-semibold text-gray-900">{formatLastSeen(contact.lastSeen)}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Total Interactions</p>
              <p className="font-semibold text-gray-900">{contact.totalInteractions}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Visit Frequency</p>
              <p className="font-semibold text-gray-900">{contact.visitFrequency}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Status</p>
              <span className="inline-flex px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-lg">
                Active
              </span>
            </div>
          </div>

          {(contact.phoneNumber || contact.email) && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Contact Information</h3>
              <div className="space-y-3">
                {contact.phoneNumber && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-700">{contact.phoneNumber}</span>
                  </div>
                )}
                {contact.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-700">{contact.email}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {contact.notes && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Notes</h3>
              <p className="text-gray-700 leading-relaxed bg-gray-50 rounded-xl p-4">{contact.notes}</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 flex gap-3">
          <button className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
            <Edit2 className="h-5 w-5" />
            Edit Contact
          </button>
          <button className="px-6 py-3 border border-red-300 text-red-700 rounded-xl font-medium hover:bg-red-50 transition-colors flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div ref={mainRef} className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Contacts Directory
          </h1>
          <p className="text-lg text-gray-600">
            Manage people in the recognition database
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800
            transition-all duration-200 flex items-center gap-2 hover:scale-105 active:scale-95 shadow-lg"
        >
          <Plus className="h-5 w-5" />
          Add Contact
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or relationship..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent
                transition-all duration-200"
            />
          </div>

          {/* Relationship Filter */}
          <select
            value={selectedRelationship}
            onChange={(e) => setSelectedRelationship(e.target.value)}
            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent
              transition-all duration-200 cursor-pointer"
          >
            {relationshipTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>

          {/* View Mode Toggle */}
          <div className="flex gap-2 bg-gray-50 rounded-xl p-1 border border-gray-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Contacts Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="contact-card bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg
                transition-all duration-300 cursor-pointer group"
              onClick={() => {
                setSelectedContact(contact);
                setShowDetailModal(true);
              }}
            >
              <div className="flex flex-col items-center text-center mb-4">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-${contact.color}-400 to-${contact.color}-600 flex items-center justify-center text-white font-semibold text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {contact.avatar}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {contact.name}
                </h3>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg mt-2">
                  {contact.relationshipDetail}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Last seen:</span>
                  <span className="font-medium text-gray-900">{formatLastSeen(contact.lastSeen)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Interactions:</span>
                  <span className="font-medium text-gray-900">{contact.totalInteractions}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frequency:</span>
                  <span className="font-medium text-gray-900">{contact.visitFrequency}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="contact-card bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg
                transition-all duration-300 cursor-pointer group"
              onClick={() => {
                setSelectedContact(contact);
                setShowDetailModal(true);
              }}
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br from-${contact.color}-400 to-${contact.color}-600 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0`}>
                  {contact.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {contact.name}
                  </h3>
                  <p className="text-sm text-gray-500">{contact.relationshipDetail}</p>
                </div>
                <div className="hidden md:flex items-center gap-8 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs">Last Seen</p>
                    <p className="font-medium text-gray-900">{formatLastSeen(contact.lastSeen)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Interactions</p>
                    <p className="font-medium text-gray-900">{contact.totalInteractions}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Frequency</p>
                    <p className="font-medium text-gray-900">{contact.visitFrequency}</p>
                  </div>
                </div>
                <Eye className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredContacts.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-lg">No contacts found matching your filters</p>
        </div>
      )}

      {/* Modals */}
      {showAddModal && <AddContactModal />}
      {showDetailModal && selectedContact && <ContactDetailModal contact={selectedContact} />}
    </div>
  );
};

export default ContactsDirectory;
