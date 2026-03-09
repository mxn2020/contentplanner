import { useState, useCallback } from 'react';
import { useAction, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const PLATFORMS = ['Instagram', 'TikTok', 'YouTube', 'LinkedIn', 'Twitter/X', 'Facebook', 'Pinterest'];
const FREQUENCIES = ['Daily', '3x/week', '2x/week', 'Weekly'];
const DURATIONS = ['1 week', '2 weeks', '1 month', '3 months'];

function PlanPage() {
  const [niche, setNiche] = useState(''); const [platform, setPlatform] = useState('Instagram');
  const [freq, setFreq] = useState('3x/week'); const [dur, setDur] = useState('1 month');
  const [loading, setLoading] = useState(false); const [result, setResult] = useState<any>(null);
  const generate = useAction(api.ai.generatePlan); const save = useMutation(api.functions.savePlan);

  const handleGenerate = useCallback(async () => {
    if (!niche.trim()) return; setLoading(true);
    try {
      const r = await generate({ niche: niche.trim(), platform, frequency: freq, duration: dur }); setResult(r); await save({ niche, platform, frequency: freq, duration: dur, ...r });
    } catch (e) { console.error(e); } finally { setLoading(false); }
  }, [niche, platform, freq, dur, generate, save]);

  return (
    <div className="mc"><div className="pg">
      <h1 className="title">Plan Your <span className="a">Content</span></h1>
      <p className="sub">Enter your niche and platform — get a complete content calendar with captions and hashtags.</p>
      <input className="inp" value={niche} onChange={e => setNiche(e.target.value)} placeholder="Your niche (e.g. fitness coaching, SaaS marketing, travel photography...)" />
      <div className="row">
        <select className="sel" value={platform} onChange={e => setPlatform(e.target.value)}>{PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}</select>
        <select className="sel" value={freq} onChange={e => setFreq(e.target.value)}>{FREQUENCIES.map(f => <option key={f} value={f}>{f}</option>)}</select>
        <select className="sel" value={dur} onChange={e => setDur(e.target.value)}>{DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}</select>
      </div>
      <button className="btn" disabled={!niche.trim() || loading} onClick={handleGenerate}>{loading ? '⏳ Planning...' : '📅 Generate Calendar'}</button>
      {loading && <div className="ld"><span /><span /><span /></div>}
      {result && !loading && <>
        {result.strategy && <div className="strategy-box">📋 <strong>Strategy:</strong> {result.strategy}</div>}
        {result.pillars?.length > 0 && <div className="section"><div className="section-title">📊 Content Pillars</div>{result.pillars.map((p: any, i: number) => (
          <div key={i} className="pillar"><span className="pillar-pct">{p.percentage}%</span><div><div className="pillar-name">{p.name}</div><div className="pillar-desc">{p.description}</div></div></div>
        ))}</div>}
        {result.calendar?.length > 0 && <div className="section"><div className="section-title">📅 Content Calendar</div>{result.calendar.map((c: any, i: number) => (
          <div key={i} className="cal-item">
            <div className="cal-head"><span className="cal-day">Week {c.week} — {c.day}</span><span className="cal-type">{c.contentType}</span></div>
            <div className="cal-topic">{c.topic}</div><div className="cal-caption">{c.caption}</div>
            <div className="cal-tags">{c.hashtags?.map((h: string, j: number) => <span key={j} className="cal-tag">#{h}</span>)}</div>
          </div>
        ))}</div>}
        {result.tips?.length > 0 && <div className="tips"><strong>💡 Tips:</strong><br />{result.tips.map((t: string, i: number) => <div key={i}>• {t}</div>)}</div>}
      </>}
    </div></div>
  );
}

function App() {
  return (<BrowserRouter><div className="app">
    <header className="hdr"><a href="/"><span style={{ fontSize: '1.5rem' }}>📅</span><div><h1>ContentPlanner</h1></div></a></header>
    <Routes><Route path="/" element={<PlanPage />} /></Routes>
    <footer className="ftr">© {new Date().getFullYear()} ContentPlanner — An AVS Media App.</footer>
  </div></BrowserRouter>);
}
export default App;
