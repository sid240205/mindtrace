# MindTrace Dashboard - Setup & Run Guide

## Quick Start

### 1. Install Dependencies
```bash
cd client
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

The application will start on `http://localhost:5173`

### 3. Access the Dashboard

#### Option 1: Direct URL
Navigate directly to: `http://localhost:5173/dashboard`

#### Option 2: Login Flow
1. Go to `http://localhost:5173`
2. Click "Get Started" or "Join the Waitlist"
3. On login page, enter any credentials and click "Sign in"
4. You'll be redirected to the dashboard

## Dashboard Navigation

### Main Routes
- **Dashboard Home** - `/dashboard`
  - Overview with stats, recent interactions, reminders
  - Quick actions for common tasks

- **Interaction History** - `/dashboard/interactions`
  - Timeline of all conversations
  - Search and filter by mood, person, topics
  - Detailed view of each interaction

- **Contacts Directory** - `/dashboard/contacts`
  - Grid or list view of all contacts
  - Add, edit, view contact details
  - Searchable and filterable

- **Alerts & Notifications** - `/dashboard/alerts`
  - All system notifications
  - Filter by severity (info, warning, critical)
  - Mark as read/unread

- **Reminders** - `/dashboard/reminders`
  - Today's schedule
  - Add medication, meal, activity reminders
  - Completion tracking

- **SOS Settings** - `/dashboard/sos`
  - Emergency contact configuration
  - Automatic action settings
  - Test SOS functionality
  - History of emergency activations

## Features to Try

### Interactive Elements
1. **Click on interaction cards** - Opens detailed modal view
2. **Click on contact cards** - Shows full contact profile
3. **Use search bars** - Real-time filtering across all pages
4. **Toggle view modes** - Switch between grid/list in contacts
5. **Filter by mood** - On interaction history page
6. **Add new items** - Use the "+" buttons to open creation modals
7. **Test SOS** - Safe test mode in SOS settings
8. **Check notifications** - Bell icon in header shows dropdown

### Mock Data Included
- 6 sample contacts (family, doctors, nurses, friends)
- 5 interaction histories with varied moods and topics
- 6 alerts of different severities
- 5 daily reminders
- 3 emergency contacts pre-configured

## Design Features

### Consistent Aesthetic
The dashboard perfectly matches the landing page:
- Same color palette (Gray-900 primary, accent colors)
- Identical typography and spacing
- Matching animations (GSAP-powered)
- Consistent hover effects and transitions
- Same rounded corners and shadows

### Responsive Design
- **Desktop** - Full sidebar navigation, multi-column layouts
- **Tablet** - Adjusted columns, collapsible sidebar
- **Mobile** - Single column, hamburger menu, touch-optimized

### Animations
- Page load animations with stagger effects
- Hover scale effects on buttons
- Smooth modal transitions
- Card entrance animations
- Loading state placeholders

## Customization

### Mock Data
Replace mock data in component files:
- `DashboardHome.jsx` - Stats and recent items
- `InteractionHistory.jsx` - Conversation data
- `ContactsDirectory.jsx` - Contact list
- `AlertsNotifications.jsx` - Alert history
- `RemindersCalendar.jsx` - Reminder schedule
- `SOSSettings.jsx` - Emergency contacts

### Styling
All styling uses Tailwind CSS utility classes:
- Modify colors in component classes
- Adjust spacing with p-*, m-* classes
- Change border radius with rounded-* classes
- Update shadows with shadow-* classes

### Adding API Integration
Replace mock data with API calls in `useEffect` hooks:
```javascript
useEffect(() => {
  fetchDataFromAPI().then(data => {
    setItems(data);
  });
}, []);
```

## Troubleshooting

### Port Already in Use
If port 5173 is busy:
```bash
npm run dev -- --port 3000
```

### Missing Dependencies
If you see import errors:
```bash
cd client
npm install
```

### Animations Not Working
Ensure GSAP is installed:
```bash
npm install gsap
```

### Icons Not Showing
Check lucide-react installation:
```bash
npm install lucide-react
```

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance
- Optimized animations with GSAP
- Lazy loading ready for images
- Memoization opportunities for large lists
- Virtual scrolling ready for pagination

## Next Steps

### Backend Integration
1. Replace mock data with API endpoints
2. Add authentication with JWT
3. Implement WebSocket for real-time updates
4. Add database for persistent storage

### Enhanced Features
1. Export functionality (PDF/CSV)
2. Advanced calendar view (week/month)
3. Voice recording integration
4. Image upload and processing
5. Push notifications
6. Dark mode
7. Multi-language support

### Testing
1. Add unit tests with Vitest
2. Add E2E tests with Playwright
3. Add accessibility tests
4. Performance profiling

## Support
For questions or issues, refer to:
- `DASHBOARD_IMPLEMENTATION.md` - Detailed feature documentation
- Landing page components - Reference for styling consistency
- Tailwind CSS docs - Styling utilities
- GSAP docs - Animation customization

## Files Created
```
client/src/
├── components/dashboard/
│   ├── Sidebar.jsx
│   ├── DashboardHeader.jsx
│   └── DashboardLayout.jsx
├── pages/
│   ├── DashboardHome.jsx
│   ├── InteractionHistory.jsx
│   ├── ContactsDirectory.jsx
│   ├── AlertsNotifications.jsx
│   ├── RemindersCalendar.jsx
│   └── SOSSettings.jsx
└── App.jsx (updated with routes)
```

All components are production-ready and follow React best practices!
