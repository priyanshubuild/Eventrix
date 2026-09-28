import { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const seedEvents = [
  { id: 'hack-horizon', name: 'Hack the Horizon', date: '2026-10-12', time: '09:00', venue: 'Main Auditorium', category: 'Technology', description: 'A 24-hour build sprint for ideas that deserve to exist.' },
  { id: 'design-lab', name: 'Design Thinking Lab', date: '2026-10-18', time: '14:00', venue: 'Innovation Lab', category: 'Workshop', description: 'Observe, sketch and prototype your way to better ideas.' },
  { id: 'frames', name: 'Frames of Campus', date: '2026-10-23', time: '10:30', venue: 'Block C Courtyard', category: 'Culture', description: 'A photo walk for the moments in between.' },
  { id: 'debate', name: 'The Great Debate', date: '2026-11-02', time: '11:00', venue: 'Seminar Hall 2', category: 'Literary', description: 'Big questions. Strong opinions. Better arguments.' },
  { id: 'coffee', name: 'Code & Coffee', date: '2026-11-08', time: '16:00', venue: 'Central Cafe', category: 'Technology', description: 'Bring a problem, leave with a pull request.' },
  { id: 'league', name: 'Campus League Finals', date: '2026-11-15', time: '08:00', venue: 'Sports Ground', category: 'Sports', description: 'A high-energy finish to the campus football league.' }
];

const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
const store = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const dateText = (date, options = { month: 'short', day: 'numeric', year: 'numeric' }) => new Intl.DateTimeFormat('en-IN', options).format(new Date(`${date}T12:00`));
const dateBadge = date => ({ day: dateText(date, { day: '2-digit' }), month: dateText(date, { month: 'short' }).toUpperCase() });

function Modal({ children, onClose }) {
  return <div className="overlay" onMouseDown={event => event.target === event.currentTarget && onClose()}><section className="modal" role="dialog" aria-modal="true"><button className="modal-close" onClick={onClose} aria-label="Close dialog">×</button>{children}</section></div>;
}

function Brand({ admin = false }) { return <a className="brand" href={admin ? '/admin' : '/'}><span>EX</span><b>Eventrix</b>{admin && <small>ADMIN</small>}</a>; }

function PublicHeader({ page }) {
  return <header className="public-header"><div className="shell nav"><Brand /><nav aria-label="Primary navigation"><a className={page === 'home' ? 'active' : ''} href="/">Home</a><a className={page === 'events' ? 'active' : ''} href="/events">Events</a><a href="/#clubs">Clubs</a><a className="admin-link" href="/admin">Admin workspace <span>↗</span></a></nav></div></header>;
}

function EventCard({ event, onRegister }) {
  const badge = dateBadge(event.date);
  return <article className="event-card"><div className="card-meta"><span className="tag">{event.category}</span><span className="date-badge"><b>{badge.day}</b>{badge.month}</span></div><h3>{event.name}</h3><p>{event.description}</p><div className="event-details"><span>◷ {event.time}</span><span>⌖ {event.venue}</span></div><button className="card-action" onClick={() => onRegister(event)}>Register <span>→</span></button></article>;
}

function RegistrationModal({ event, onClose, onSubmit }) {
  const [form, setForm] = useState({ name: '', email: '', college: '', phone: '' });
  const update = key => e => setForm({ ...form, [key]: e.target.value });
  return <Modal onClose={onClose}><p className="eyebrow">EVENT REGISTRATION</p><h2>Save your spot.</h2><p className="modal-copy">You are registering for <b>{event.name}</b>. We’ll keep it simple.</p><form onSubmit={e => { e.preventDefault(); onSubmit({ ...form, eventId: event.id, eventName: event.name, id: Date.now() }); onClose(); }}><label>Full name<input required value={form.name} onChange={update('name')} placeholder="Your name" /></label><label>Email address<input required type="email" value={form.email} onChange={update('email')} placeholder="you@college.edu" /></label><div className="form-row"><label>College / Year<input required value={form.college} onChange={update('college')} placeholder="ABESEC · 2nd year" /></label><label>Phone number<input required type="tel" value={form.phone} onChange={update('phone')} placeholder="98765 43210" /></label></div><button className="button ink full" type="submit">Confirm registration <span>→</span></button></form></Modal>;
}

function Home({ events, onRegister }) {
  const featured = events[0];
  return <><PublicHeader page="home" /><main><section className="hero"><div className="shell hero-grid"><div><p className="eyebrow dot">ABESEC STUDENT CLUBS · 2026</p><h1>Make campus<br />feel <em>alive.</em></h1><p className="hero-copy">A single place to discover the ideas, people and club events worth showing up for.</p><div className="hero-actions"><a className="button ink" href="/events">Explore events <span>↓</span></a><a className="quiet-link" href="#clubs">Meet the clubs <span>→</span></a></div></div><div className="hero-shape" aria-hidden="true"><i className="sun" /><i className="arch outer" /><i className="arch inner" /><i className="orange-dot" /></div></div></section><section className="intro"><div className="shell intro-grid"><p className="eyebrow">ONE CAMPUS, CONNECTED</p><div><h2>More than events.<br /><em>A place to belong.</em></h2><p>Eventrix brings every club, curiosity and student-led project into one shared calendar. Find your people, then make your next thing happen.</p><div className="stats"><div><b>18<span>+</span></b><small>Active clubs</small></div><div><b>60<span>+</span></b><small>Events this year</small></div><div><b>2.4k</b><small>Student members</small></div></div></div></div></section><section className="shell feature-section"><div className="section-head"><div><p className="eyebrow">HAPPENING NEXT</p><h2>The event you’ll<br /><em>talk about later.</em></h2></div><a className="quiet-link" href="/events">View all events <span>→</span></a></div>{featured && <div className="featured"><div><p className="eyebrow">FEATURED · {dateText(featured.date)} · {featured.time}</p><h3>{featured.name}</h3><p>{featured.description}</p><button className="button ink" onClick={() => onRegister(featured)}>Save my spot <span>→</span></button></div><div className="feature-symbol" aria-hidden="true">✦</div></div>}</section><section id="clubs" className="clubs"><div className="shell"><p className="eyebrow">MEET THE MAKERS</p><div className="clubs-title"><h2>There’s a club for<br /><em>your curiosity.</em></h2><p>Every interest needs a room. Find the people who will make you want to keep coming back.</p></div><div className="club-list">{[['01','CodeChef ABESEC','Technology'],['02','Lens & Light','Photography'],['03','Debate Society','Literary'],['04','Enactus','Social impact']].map(([number,name,type]) => <div key={number}><span>{number}</span><h3>{name}</h3><small>{type}</small><b>↗</b></div>)}</div></div></section></main><Footer /></>;
}

function EventsPage({ events, onRegister }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const categories = ['All', ...new Set(events.map(event => event.category))];
  const visible = events.filter(event => (category === 'All' || event.category === category) && event.name.toLowerCase().includes(query.toLowerCase()));
  return <><PublicHeader page="events" /><main className="events-page"><section className="shell events-hero"><p className="eyebrow">EVENT DIRECTORY</p><h1>Find your next<br /><em>good idea.</em></h1><p>Browse every upcoming club event, then claim a seat before it fills up.</p></section><section className="shell directory"><div className="directory-bar"><label className="search-box"><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search events by name" aria-label="Search events" /></label><div className="filters" aria-label="Event categories">{categories.map(item => <button className={category === item ? 'selected' : ''} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div></div><p className="result-count">{visible.length} {visible.length === 1 ? 'event' : 'events'} found</p><div className="event-grid">{visible.map(event => <EventCard key={event.id} event={event} onRegister={onRegister} />)}</div>{!visible.length && <div className="empty-state"><b>No events found.</b><p>Try a different search or category.</p><button onClick={() => { setQuery(''); setCategory('All'); }}>Clear filters</button></div>}</section></main><Footer /></>;
}

function EventForm({ event, onSave, onClose }) {
  const [form, setForm] = useState(event || { name: '', date: '', time: '', venue: '', category: 'Technology', description: '' });
  const set = key => e => setForm({ ...form, [key]: e.target.value });
  return <Modal onClose={onClose}><p className="eyebrow">{event ? 'EDIT EVENT' : 'NEW EVENT'}</p><h2>{event ? 'Refine the details.' : 'Create an event.'}</h2><form onSubmit={e => { e.preventDefault(); onSave({ ...form, id: event?.id || `event-${Date.now()}` }); onClose(); }}><label>Event name<input required value={form.name} onChange={set('name')} /></label><div className="form-row"><label>Date<input required type="date" value={form.date} onChange={set('date')} /></label><label>Time<input required type="time" value={form.time} onChange={set('time')} /></label></div><div className="form-row"><label>Category<select value={form.category} onChange={set('category')}>{['Technology','Workshop','Culture','Sports','Literary'].map(item => <option key={item}>{item}</option>)}</select></label><label>Venue<input required value={form.venue} onChange={set('venue')} /></label></div><label>Description<textarea required value={form.description} onChange={set('description')} /></label><button className="button ink full" type="submit">Save event <span>→</span></button></form></Modal>;
}

function AdminPage({ events, registrations, setEvents, notice }) {
  const [tab, setTab] = useState('events');
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');
  const [eventFilter, setEventFilter] = useState('All');
  const save = value => { setEvents(current => [...current.filter(event => event.id !== value.id), value].sort((a, b) => a.date.localeCompare(b.date))); notice(editing ? 'Event updated' : 'Event added'); };
  const remove = event => { if (window.confirm(`Delete “${event.name}”?`)) { setEvents(current => current.filter(item => item.id !== event.id)); notice('Event deleted'); } };
  const shownRegistrations = registrations.filter(registration => (eventFilter === 'All' || registration.eventId === eventFilter) && Object.values(registration).join(' ').toLowerCase().includes(search.toLowerCase()));
  return <div className="admin-app"><header className="admin-header"><div className="admin-shell"><Brand admin /><div className="admin-status"><span /> Demo workspace <a href="/">View public site ↗</a></div></div></header><div className="admin-layout"><aside className="admin-sidebar"><p>WORKSPACE</p><button className={tab === 'events' ? 'active' : ''} onClick={() => setTab('events')}>◈ <span>Events</span><b>{events.length}</b></button><button className={tab === 'registrations' ? 'active' : ''} onClick={() => setTab('registrations')}>◎ <span>Registrations</span><b>{registrations.length}</b></button><div className="sidebar-note">This is a client-side demo. Changes are saved in this browser.</div></aside><main className="admin-main">{tab === 'events' ? <><div className="admin-title"><div><p className="eyebrow">EVENT MANAGEMENT</p><h1>Your event<br /><em>calendar.</em></h1><p>Create, update and remove campus events with confidence.</p></div><button className="button lime" onClick={() => setEditing({})}>+ Add event</button></div><section className="admin-card"><div className="card-heading"><div><h2>All events</h2><p>Keep the public directory accurate and up to date.</p></div><span>{events.length} total</span></div>{events.map(event => { const badge = dateBadge(event.date); return <div className="manage-row" key={event.id}><div className="mini-date"><b>{badge.day}</b>{badge.month}</div><div><strong>{event.name}</strong><p>{event.category} · {event.venue} · {event.time}</p></div><button onClick={() => setEditing(event)}>Edit</button><button className="danger" onClick={() => remove(event)}>Delete</button></div>; })}</section></> : <><div className="admin-title"><div><p className="eyebrow">REGISTRATION DIRECTORY</p><h1>People who<br /><em>show up.</em></h1><p>Find registrations by student details or by event.</p></div></div><section className="admin-card"><div className="registration-tools"><label className="search-box"><span>⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students" /></label><select value={eventFilter} onChange={e => setEventFilter(e.target.value)}><option value="All">All events</option>{events.map(event => <option value={event.id} key={event.id}>{event.name}</option>)}</select></div><div className="table-scroll"><table><thead><tr><th>Student</th><th>Event</th><th>College / Year</th><th>Phone</th></tr></thead><tbody>{shownRegistrations.length ? shownRegistrations.map(registration => <tr key={registration.id}><td><b>{registration.name}</b><small>{registration.email}</small></td><td>{registration.eventName}</td><td>{registration.college}</td><td>{registration.phone}</td></tr>) : <tr><td colSpan="4" className="table-empty">No registrations match this view.</td></tr>}</tbody></table></div></section></>}</main></div>{editing && <EventForm event={editing.id ? editing : null} onClose={() => setEditing(null)} onSave={save} />}</div>;
}

function Footer() { return <footer><div className="shell footer"><Brand /><p>Built for the students who make campus matter.</p><small>© 2026 ABESEC</small></div></footer>; }

function App() {
  const [events, setEvents] = useState(() => read('eventrix-events', seedEvents));
  const [registrations, setRegistrations] = useState(() => read('eventrix-registrations', []));
  const [registering, setRegistering] = useState(null);
  const [toast, setToast] = useState('');
  const notify = message => { setToast(message); window.setTimeout(() => setToast(''), 2800); };
  const saveEvents = update => { setEvents(current => { const next = typeof update === 'function' ? update(current) : update; store('eventrix-events', next); return next; }); };
  const addRegistration = registration => { const next = [registration, ...registrations]; setRegistrations(next); store('eventrix-registrations', next); notify('You’re registered — see you there!'); };
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const page = path === '/admin' ? <AdminPage events={events} registrations={registrations} setEvents={saveEvents} notice={notify} /> : path === '/events' ? <EventsPage events={events} onRegister={setRegistering} /> : <Home events={events} onRegister={setRegistering} />;
  return <>{page}{registering && <RegistrationModal event={registering} onClose={() => setRegistering(null)} onSubmit={addRegistration} />}<div className={toast ? 'toast show' : 'toast'}>{toast}</div></>;
}

createRoot(document.getElementById('root')).render(<App />);
