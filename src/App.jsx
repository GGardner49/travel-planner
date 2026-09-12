import { useMemo, useState } from 'react';
import YearTabs from './components/YearTabs';
import YearView from './components/YearView';
import TripModal from './components/TripModal';
import { tripsByYear } from './data/trips';
import './App.css';

const months = [
  ['JAN', 'Open', 'Protect space after the holidays'], ['FEB', 'Pensacola?', 'Sailing certification · 6–7 nights'],
  ['MAR', 'Couples?', 'Anniversary window · late Mar / early Apr'], ['APR', 'Couples?', 'Nashville or another easy escape'],
  ['MAY', 'Tampa + Friends?', 'GST May 1–6 · Memorial Day option'], ['JUN', 'Quick reset', 'Asheville · Chattanooga · open'],
  ['JUL', 'Summer option', 'Avon if the points deal returns'], ['AUG', 'Open', 'Leave breathing room'],
  ['SEP', 'ISO + Friends?', 'Audit · Labor Day option'], ['OCT', 'Japan candidate', 'Also possible NC family weekend'],
  ['NOV', 'Japan candidate', 'Fall Japan alternative'], ['DEC', 'Cora birthday?', 'Ireland or Christmas tradition'],
];

const priorities = [
  ['01', 'Japan happens', 'The decision is when—not whether. Compare mid-May with October or November.'],
  ['02', 'Keep the year breathable', 'Frequent short resets matter, but undefined trips stay movable until the large anchors settle.'],
  ['03', 'Travel with our people', 'Plan one easy resort trip with friends and two real weekend visits with family in North Carolina.'],
  ['04', 'Use what we already have', 'Assign both Delta companion certificates intentionally instead of scrambling near expiration.'],
];

function MeetingView() {
  const [section, setSection] = useState(0);
  const slides = [
    <section className="hero-slide" key="hero"><p className="eyebrow">THE GARDNER FAMILY · OCTOBER PLANNING MEETING</p><h1>What do we want<br />2027 to <em>feel</em> like?</h1><p className="lead">Choose the anchors. Protect the breathing room. Be ready when the right deal appears.</p><div className="hero-stats"><div><strong>1</strong><span>Japan adventure</span></div><div><strong>1</strong><span>friends resort</span></div><div><strong>2</strong><span>NC weekends</span></div><div><strong>2</strong><span>companion certificates</span></div></div></section>,
    <section className="content-slide" key="priorities"><p className="eyebrow">OUR FILTER</p><h2>The trips that earn space</h2><div className="priority-grid">{priorities.map(([n,t,c]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{c}</p></article>)}</div></section>,
    <section className="content-slide" key="calendar"><p className="eyebrow">THE YEAR AT A GLANCE</p><h2>Start with the shape of the year</h2><div className="month-grid">{months.map(([m,t,d]) => <article key={m}><span>{m}</span><div><h3>{t}</h3><p>{d}</p></div></article>)}</div></section>,
    <section className="content-slide" key="decisions"><p className="eyebrow">DECISIONS TO LEAVE WITH</p><h2>October meeting finish line</h2><div className="decision-list">{['Choose Japan’s target month and backup window','Pick Memorial Day or Labor Day for the friends resort','Decide whether February can hold the sailing certification','Protect the anniversary weekend and two NC weekends','Assign both Delta companion certificates','Choose one deal to begin watching immediately'].map(x=><label key={x}><input type="checkbox" />{x}</label>)}</div></section>
  ];
  return <div className="meeting-shell">{slides[section]}<footer className="slide-controls"><span>{String(section+1).padStart(2,'0')} / {String(slides.length).padStart(2,'0')}</span><div><button disabled={!section} onClick={()=>setSection(s=>s-1)}>← Back</button><button disabled={section===slides.length-1} onClick={()=>setSection(s=>s+1)}>Next →</button></div></footer></div>;
}

function PlannerView() {
  const [activeYear, setActiveYear] = useState(2027); const [selectedTrip, setSelectedTrip] = useState(null);
  const trips = useMemo(() => tripsByYear[activeYear] || [], [activeYear]);
  return <main className="planner-shell"><div className="planner-heading"><div><p className="eyebrow">WORKING DASHBOARD</p><h1>Build the year as it develops.</h1></div><p>Confirmed commitments, movable ideas, and the trips worth watching.</p></div><YearTabs activeYear={activeYear} onYearChange={setActiveYear}/><YearView year={activeYear} trips={trips} onTripClick={setSelectedTrip}/><TripModal key={selectedTrip?.id || 'closed'} trip={selectedTrip} onClose={()=>setSelectedTrip(null)}/></main>;
}

export default function App() { const [mode,setMode]=useState('meeting'); return <div className="app"><nav className="topbar"><div className="brand"><span>G</span><div>GARDNER<small>TRAVEL STUDIO</small></div></div><div className="mode-switch"><button className={mode==='meeting'?'active':''} onClick={()=>setMode('meeting')}>Meeting mode</button><button className={mode==='planner'?'active':''} onClick={()=>setMode('planner')}>Planning dashboard</button></div></nav>{mode==='meeting'?<MeetingView/>:<PlannerView/>}</div>; }
