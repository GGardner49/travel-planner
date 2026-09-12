import { useMemo, useState } from 'react';
import YearTabs from './components/YearTabs';
import YearView from './components/YearView';
import TripModal from './components/TripModal';
import MeetingView from './components/MeetingView';
import { tripsByYear } from './data/trips';
import './App.css';

function PlannerView() {
  const [activeYear, setActiveYear] = useState(2027);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const trips = useMemo(() => tripsByYear[activeYear] || [], [activeYear]);
  return <main className="planner-shell"><div className="planner-heading"><div><p className="eyebrow">WORKING DASHBOARD</p><h1>Build the year as it develops.</h1></div><p>Confirmed commitments, movable ideas, and the trips worth watching.</p></div><YearTabs activeYear={activeYear} onYearChange={setActiveYear}/><YearView year={activeYear} trips={trips} onTripClick={setSelectedTrip}/><TripModal key={selectedTrip?.id || 'closed'} trip={selectedTrip} onClose={()=>setSelectedTrip(null)}/></main>;
}

export default function App() {
  const [mode,setMode]=useState('meeting');
  return <div className="app"><nav className="topbar"><div className="brand"><span>G</span><div>GARDNER<small>TRAVEL STUDIO</small></div></div><div className="mode-switch"><button className={mode==='meeting'?'active':''} onClick={()=>setMode('meeting')}>Meeting mode</button><button className={mode==='planner'?'active':''} onClick={()=>setMode('planner')}>Planning dashboard</button></div></nav>{mode==='meeting'?<MeetingView/>:<PlannerView/>}</div>;
}
