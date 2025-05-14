
import { useState } from 'react'
import { LineChart,Line,XAxis,YAxis,Tooltip,CartesianGrid } from 'recharts'
export default function RealtimeMetabolism({user}){
 const [hr,setHr]=useState(120)
 const weight=user.weight||70
 const hrMax=user.hrMax||190
 const intensity=hr/hrMax
 const kcalPerHour=weight*hr*0.063
 const fat=g=>(g)
 const fatPerH=(kcalPerHour*0.6)/9
 const co2=kcalPerHour*0.86
 const sweat=0.1+intensity*1.4
 const data=[{name:'Fett (g/h)',val:+fatPerH.toFixed(1)},{name:'CO₂ (g/h)',val:+co2.toFixed(0)},{name:'Schwitzen (l/h)',val:+sweat.toFixed(2)},{name:'Energie (kcal/h)',val:+kcalPerHour.toFixed(0)}]
 return(<div className="space-y-4"><h2 className="text-lg font-medium">Realtime‑Metabolismus</h2>
  <div className="flex items-center gap-4"><span>Puls {hr} bpm</span>
   <input type="range" min="60" max={hrMax} value={hr} onChange={e=>setHr(+e.target.value)} className="w-full"/></div>
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
   {data.map(d=><Metric key={d.name} label={d.name} value={d.val}/>)}
  </div>
  <LineChart width={600} height={260} data={data}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name"/><YAxis/><Tooltip/><Line type="monotone" dataKey="val" stroke="#0ea5e9"/></LineChart>
 </div>)
}
function Metric({label,value}){return(<div className="bg-blue-50 rounded p-3"><div className="text-sm">{label}</div><div className="text-xl font-semibold">{value}</div></div>)}
