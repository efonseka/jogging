
import { useState, useEffect } from 'react'
import { BarChart,Bar,XAxis,YAxis,Tooltip,CartesianGrid } from 'recharts'
export default function RealtimeMetabolism({user}){
const [hr,setHr]=useState(120)
const weight=user.weight||70
const hrMax=user.hrMax||190
 useEffect(()=>{ if(hr>hrMax) setHr(hrMax) },[hrMax])
 const intensity=hr/hrMax
 const kcalPerHour=weight*hr*0.063
 const fatPerH=(kcalPerHour*0.6)/9
 const co2=kcalPerHour*0.86
 const sweat=0.1+intensity*1.4
 const metrics=[
   {name:'Fett (g/h)',       val:+fatPerH.toFixed(1)},
   {name:'CO₂ (g/h)',        val:+co2.toFixed(0)},
   {name:'Schwitzen (l/h)',  val:+sweat.toFixed(2)},
   {name:'Energie (kcal/h)', val:+kcalPerHour.toFixed(0)}
 ]

 const chartData=[
   {
     name:'Schwitzen + CO₂ + Fett',
     sweat:+sweat.toFixed(2),
     co2:+co2.toFixed(0),
     fat:+fatPerH.toFixed(1),
     kcal:0
   },{
     name:'Energie (kcal/h)',
     sweat:0,
     co2:0,
     fat:0,
     kcal:+kcalPerHour.toFixed(0)
   }
 ]
  return(
   <div className="space-y-4">
    <h2 className="text-lg font-medium">Realtime‑Metabolismus</h2>
    <div className="flex items-center gap-4">
      <span>Puls {hr} bpm</span>
      <input
        type="range"
        min="60"
        max={hrMax}
        value={hr}
        onChange={e=>setHr(+e.target.value)}
        className="w-full"
      />
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
      {metrics.map(d => (
        <Metric key={d.name} label={d.name} value={d.val} />
      ))}
    </div>
    <BarChart width={600} height={260} data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="sweat" stackId="a" fill="#93c5fd" name="Schwitzen (l/h)" />
      <Bar dataKey="co2" stackId="a" fill="#60a5fa" name="CO₂ (g/h)" />
      <Bar dataKey="fat" stackId="a" fill="#3b82f6" name="Fett (g/h)" />
      <Bar dataKey="kcal" fill="#0ea5e9" name="Energie (kcal/h)" />
    </BarChart>
   </div>
  )
}
function Metric({label,value}){return(<div className="bg-blue-50 rounded p-3"><div className="text-sm">{label}</div><div className="text-xl font-semibold">{value}</div></div>)}
