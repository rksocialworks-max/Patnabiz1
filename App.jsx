import { useMemo, useState } from 'react'
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import {
  ArrowRight, Search, MapPin, Building2, Utensils, GraduationCap,
  HeartPulse, Home, ShoppingBag, Wrench, Smartphone, Hotel, Menu,
  X, CheckCircle2, ShieldCheck, Users, TrendingUp, ChevronRight,
  Phone, Mail, Clock3, Star
} from 'lucide-react'

const categories = [
  { name: 'Restaurants & Cafes', count: 'Explore dining', icon: Utensils, color: 'peach' },
  { name: 'Education', count: 'Schools & coaching', icon: GraduationCap, color: 'blue' },
  { name: 'Healthcare', count: 'Clinics & hospitals', icon: HeartPulse, color: 'pink' },
  { name: 'Real Estate', count: 'Property & rentals', icon: Home, color: 'green' },
  { name: 'Shopping', count: 'Shops & showrooms', icon: ShoppingBag, color: 'yellow' },
  { name: 'Home Services', count: 'Experts near you', icon: Wrench, color: 'purple' },
  { name: 'Electronics', count: 'Tech & gadgets', icon: Smartphone, color: 'blue' },
  { name: 'Hotels & Stays', count: 'Stay in Patna', icon: Hotel, color: 'peach' },
]

const businesses = [
  { name: 'The Urban Chai', category: 'Restaurants & Cafes', location: 'Boring Road, Patna', description: 'A relaxed cafe for coffee, conversations and quick bites.', initials: 'UC', tone: 'coffee', tag: 'Popular choice' },
  { name: 'BrightPath Academy', category: 'Education', location: 'Kankarbagh, Patna', description: 'Learning support and exam preparation for ambitious students.', initials: 'BA', tone: 'learn', tag: 'Education' },
  { name: 'CityCare Clinic', category: 'Healthcare', location: 'Bailey Road, Patna', description: 'A neighbourhood clinic focused on accessible family care.', initials: 'CC', tone: 'care', tag: 'Healthcare' },
]

function Header() {
  const [open, setOpen] = useState(false)
  return <header className="site-header">
    <div className="container nav-wrap">
      <Link to="/" className="brand" onClick={() => setOpen(false)} aria-label="PatnaBiz home">
        <span className="brand-mark"><Building2 size={22} strokeWidth={2.4}/></span>
        <span className="brand-name">Patna<span>Biz</span><small>.in</small></span>
      </Link>
      <button className="mobile-menu" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
      <nav className={open ? 'main-nav nav-open' : 'main-nav'}>
        <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
        <a href="/#categories" onClick={() => setOpen(false)}>Categories</a>
        <a href="/#businesses" onClick={() => setOpen(false)}>Explore Businesses</a>
        <Link className="nav-cta" to="/register" onClick={() => setOpen(false)}>Register your business <ArrowRight size={16}/></Link>
      </nav>
    </div>
  </header>
}

function Footer() {
  return <footer className="footer">
    <div className="container footer-grid">
      <div className="footer-brand">
        <Link to="/" className="brand brand-light"><span className="brand-mark"><Building2 size={22}/></span><span className="brand-name">Patna<span>Biz</span><small>.in</small></span></Link>
        <p>Discover local. Support local.<br/>One platform for Patna's businesses.</p>
      </div>
      <div><h4>Explore</h4><a href="/#categories">Business categories</a><a href="/#businesses">Featured listings</a><Link to="/register">Add your business</Link></div>
      <div><h4>PatnaBiz</h4><a href="mailto:hello@patnabiz.in">Contact us</a><a href="#about">About the platform</a><a href="#privacy">Privacy & terms</a></div>
      <div className="footer-note"><span className="footer-dot"/> Built for Patna<br/><small>Helping local businesses get discovered.</small></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} PatnaBiz.in. All rights reserved.</span><span>Made with local pride in Bihar ♥</span></div>
  </footer>
}

function CategoryCard({ category }) {
  const Icon = category.icon
  return <a className="category-card" href={`/#businesses`} onClick={() => {}}>
    <span className={`category-icon ${category.color}`}><Icon size={22}/></span>
    <span className="category-text"><strong>{category.name}</strong><small>{category.count}</small></span>
    <ChevronRight className="category-arrow" size={18}/>
  </a>
}

function BusinessCard({ business }) {
  return <article className="business-card">
    <div className={`business-art ${business.tone}`}>
      <span className="business-initials">{business.initials}</span>
      <span className="listing-badge"><Star size={12} fill="currentColor"/> {business.tag}</span>
    </div>
    <div className="business-content">
      <span className="business-category">{business.category}</span>
      <h3>{business.name}</h3>
      <p className="business-location"><MapPin size={14}/>{business.location}</p>
      <p className="business-description">{business.description}</p>
      <button className="text-link" onClick={() => alert('Business profile pages will be added in the next development phase.')}>View business <ArrowRight size={15}/></button>
    </div>
  </article>
}

function HomePage() {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('Patna')
  const [searched, setSearched] = useState(false)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return businesses
    return businesses.filter(b => `${b.name} ${b.category} ${b.location} ${b.description}`.toLowerCase().includes(q))
  }, [query])

  return <>
    <main>
      <section className="hero">
        <div className="hero-glow glow-one"/><div className="hero-glow glow-two"/>
        <div className="container hero-layout">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot"/> PATNA'S LOCAL BUSINESS DIRECTORY</div>
            <h1>Patna's business world,<br/><em>all in one place.</em></h1>
            <p className="hero-subtitle">Discover trusted local businesses, find the services you need, and help Patna's entrepreneurs grow.</p>
            <form className="search-panel" onSubmit={e => {e.preventDefault(); setSearched(true); document.getElementById('businesses')?.scrollIntoView({behavior:'smooth'})}}>
              <label className="search-field"><Search size={20}/><span className="sr-only">Search businesses</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="What are you looking for?"/></label>
              <span className="search-divider"/>
              <label className="location-field"><MapPin size={19}/><span className="sr-only">Location</span><input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location"/></label>
              <button className="search-button" type="submit">Search <ArrowRight size={17}/></button>
            </form>
            <div className="hero-proof"><div className="proof-avatars"><span>R</span><span>A</span><span>S</span><span>+</span></div><p><strong>Local discovery starts here.</strong><br/><small>Find it. Connect. Shop local.</small></p></div>
          </div>
          <div className="hero-visual" aria-label="Illustration of local businesses">
            <div className="visual-topline"><span className="live-dot"/> MADE FOR PATNA</div>
            <div className="city-card">
              <div className="city-sun"/>
              <div className="city-building building-a"><span/><span/><span/></div>
              <div className="city-building building-b"><span/><span/><span/><span/></div>
              <div className="city-building building-c"><span/><span/><span/></div>
              <div className="city-shop"><div className="shop-awning"><i/><i/><i/><i/><i/></div><div className="shop-window"/><div className="shop-door"/></div>
              <div className="city-ground"/>
              <div className="floating-tag tag-search"><span className="mini-icon"><Search size={16}/></span><span><strong>Find local</strong><small>Businesses near you</small></span></div>
              <div className="floating-tag tag-growth"><span className="mini-icon green-mini"><TrendingUp size={17}/></span><span><strong>Grow local</strong><small>Reach more customers</small></span></div>
            </div>
            <div className="visual-caption"><span className="caption-line"/><span>Small businesses. Big possibilities.</span></div>
          </div>
        </div>
        <div className="hero-bottom container"><span><ShieldCheck size={16}/> Built to connect Patna</span><span><MapPin size={16}/> From neighbourhood shops to growing brands</span></div>
      </section>

      <section className="section categories-section" id="categories">
        <div className="container">
          <div className="section-heading"><div><span className="section-kicker">EXPLORE THE CITY</span><h2>What are you looking for?</h2><p>Find the right business for every need, right here in Patna.</p></div><a className="subtle-link" href="#businesses">Explore listings <ArrowRight size={16}/></a></div>
          <div className="category-grid">{categories.map(c => <CategoryCard key={c.name} category={c}/>)}</div>
        </div>
      </section>

      <section className="section featured-section" id="businesses">
        <div className="container">
          <div className="section-heading"><div><span className="section-kicker">A LOCAL SPOTLIGHT</span><h2>{searched && query ? `Results for “${query}”` : 'Discover local favourites'}</h2><p>Get to know businesses that make our city special.</p></div><span className="demo-label">SAMPLE PREVIEW</span></div>
          {filtered.length ? <div className="business-grid">{filtered.map(b => <BusinessCard key={b.name} business={b}/>)}</div> : <div className="empty-results"><Search size={28}/><h3>No sample listings found</h3><p>Try a different search, or register a business to join PatnaBiz.</p><Link className="button button-primary" to="/register">Register a business <ArrowRight size={16}/></Link></div>}
          <p className="sample-disclaimer">Note: These are demonstration listings, not verified real businesses.</p>
        </div>
      </section>

      <section className="join-section" id="about">
        <div className="container join-panel">
          <div className="join-icon"><Building2 size={27}/></div>
          <div className="join-copy"><span className="section-kicker">ARE YOU A BUSINESS OWNER?</span><h2>Put your business on Patna's map.</h2><p>Create your listing and help more local customers discover what you do.</p></div>
          <Link className="button button-white" to="/register">Register your business <ArrowRight size={17}/></Link>
          <div className="join-decoration">PB</div>
        </div>
      </section>

      <section className="section benefits-section">
        <div className="container">
          <div className="section-heading centered"><div><span className="section-kicker">WHY PATNABIZ</span><h2>Local connections. Real opportunity.</h2><p>A simpler way to discover businesses and support the local economy.</p></div></div>
          <div className="benefit-grid">
            <div className="benefit"><span className="benefit-icon"><Search size={22}/></span><h3>Easy to discover</h3><p>Search by business name, category, or the service you need.</p></div>
            <div className="benefit"><span className="benefit-icon"><Users size={22}/></span><h3>Made for local</h3><p>Bring Patna's neighbourhood businesses into one directory.</p></div>
            <div className="benefit"><span className="benefit-icon"><TrendingUp size={22}/></span><h3>Room to grow</h3><p>Give local entrepreneurs another way to reach new customers.</p></div>
          </div>
        </div>
      </section>
    </main>
  </>
}

function RegisterPage() {
  const [form, setForm] = useState({businessName:'', ownerName:'', category:'', phone:'', whatsapp:'', address:'', description:'', email:''})
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const update = e => setForm({...form, [e.target.name]: e.target.value})
  const submit = e => {
    e.preventDefault()
    if (!form.businessName.trim() || !form.ownerName.trim() || !form.category || !form.phone.trim() || !form.address.trim()) {
      setError('Please complete all required fields marked with an asterisk.')
      return
    }
    const saved = JSON.parse(localStorage.getItem('patnabiz_demo_submissions') || '[]')
    saved.push({...form, submittedAt: new Date().toISOString(), status: 'Demo submission'})
    localStorage.setItem('patnabiz_demo_submissions', JSON.stringify(saved))
    setError('')
    setSubmitted(true)
    window.scrollTo({top:0, behavior:'smooth'})
  }
  return <main className="register-page">
    <div className="register-hero"><div className="container"><Link to="/" className="back-link">← Back to homepage</Link><span className="section-kicker">JOIN THE LOCAL DIRECTORY</span><h1>Let's put your business<br/><em>in the spotlight.</em></h1><p>Share a few details and take the first step toward being discovered on PatnaBiz.</p></div></div>
    <div className="container register-layout">
      <section className="form-card">
        {submitted ? <div className="success-state"><span className="success-icon"><CheckCircle2 size={36}/></span><h2>Details saved in this browser!</h2><p>Your demo registration has been saved locally on this device. It has <strong>not</strong> been sent to PatnaBiz or stored in a shared database yet.</p><button className="button button-primary" onClick={() => {setSubmitted(false); setForm({businessName:'', ownerName:'', category:'', phone:'', whatsapp:'', address:'', description:'', email:''})}}>Add another business</button><Link className="text-link" to="/">Return to homepage <ArrowRight size={15}/></Link></div> :
        <form onSubmit={submit}>
          <div className="form-heading"><div><h2>Business details</h2><p>Fields marked * are required.</p></div><span className="step-pill">STEP 01 / 01</span></div>
          {error && <div className="form-error">{error}</div>}
          <div className="form-grid">
            <label className="form-field"><span>Business name *</span><input name="businessName" value={form.businessName} onChange={update} placeholder="e.g. Sharma Electronics" required/></label>
            <label className="form-field"><span>Owner / contact person *</span><input name="ownerName" value={form.ownerName} onChange={update} placeholder="Your full name" required/></label>
            <label className="form-field"><span>Business category *</span><select name="category" value={form.category} onChange={update} required><option value="">Select a category</option>{categories.map(c=><option key={c.name}>{c.name}</option>)}<option>Other</option></select></label>
            <label className="form-field"><span>Mobile number *</span><input name="phone" type="tel" value={form.phone} onChange={update} placeholder="10-digit mobile number" required/></label>
            <label className="form-field"><span>WhatsApp number</span><input name="whatsapp" type="tel" value={form.whatsapp} onChange={update} placeholder="If different from mobile"/></label>
            <label className="form-field"><span>Email address</span><input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com"/></label>
            <label className="form-field full-field"><span>Business address in Patna *</span><input name="address" value={form.address} onChange={update} placeholder="Shop / building, road, area, Patna" required/></label>
            <label className="form-field full-field"><span>About your business</span><textarea name="description" value={form.description} onChange={update} rows="4" placeholder="Tell customers what you offer, your services, and what makes you special." maxLength="600"/><small className="field-help">{form.description.length}/600 characters</small></label>
          </div>
          <div className="form-consent"><ShieldCheck size={17}/><p>By submitting, you confirm these details are accurate and may be used to prepare your business listing.</p></div>
          <button className="button button-primary submit-button" type="submit">Submit business details <ArrowRight size={17}/></button>
          <p className="form-disclaimer">Prototype only: this form saves data in your current browser. Connect a database before collecting real registrations.</p>
        </form>}
      </section>
      <aside className="register-aside">
        <div className="aside-card aside-dark"><span className="aside-eyebrow">YOUR BUSINESS, MORE VISIBLE</span><h3>Great local businesses deserve to be found.</h3><p>PatnaBiz is being built to connect residents with the businesses around them.</p><div className="aside-stat"><span className="stat-icon"><Users size={18}/></span><span><strong>Local-first discovery</strong><small>Designed around Patna</small></span></div><div className="aside-stat"><span className="stat-icon"><MapPin size={18}/></span><span><strong>Area-aware listings</strong><small>Help customers find you</small></span></div></div>
        <div className="aside-card contact-card"><h3>Need help?</h3><p>Questions about registering your business?</p><a href="mailto:hello@patnabiz.in"><Mail size={17}/> hello@patnabiz.in</a><small>Replace this demo email with your official contact address before launch.</small></div>
      </aside>
    </div>
  </main>
}

function NotFound() {
  return <main className="not-found container"><span className="section-kicker">404 — PAGE NOT FOUND</span><h1>Looks like this page took a detour.</h1><p>Let's get you back to discovering Patna.</p><Link className="button button-primary" to="/">Back to homepage <ArrowRight size={16}/></Link></main>
}

export default function App() {
  return <><Header/><Routes><Route path="/" element={<HomePage/>}/><Route path="/register" element={<RegisterPage/>}/><Route path="*" element={<NotFound/>}/></Routes><Footer/></>
}