import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

const METRIC_DEFAULTS = {
  fat: false,
  co2: false,
  sweat: false,
  energy: false
}

export default function RealtimeMetabolism({ user }) {
  const [hr, setHr] = useState(120)
  const weight = user.weight || 70
  const hrMax = user.hrMax || 190
  const [activeMetrics, setActiveMetrics] = useState(METRIC_DEFAULTS)

  useEffect(() => {
    if (hr > hrMax) setHr(hrMax)
  }, [hrMax, hr])

  const intensity = hr / hrMax
  const kcalPerHour = weight * hr * 0.063
  const fatPerH = (kcalPerHour * 0.6) / 9
  const co2 = kcalPerHour * 0.86
  const sweatLiters = 0.1 + intensity * 1.4
  const sweat = sweatLiters * 1000

  const metrics = [
    {
      key: 'fat',
      name: 'Fett (g/h)',
      val: +fatPerH.toFixed(1),
      formula: 'Fettverbrennung = (Energie * 60%) / 9',
      sourceText: 'Quelle wird ergänzt.',
      sourceHref: null
    },
    {
      key: 'co2',
      name: 'CO₂ (g/h)',
      val: +co2.toFixed(0),
      formula: 'CO₂-Abgabe = Energie * 0,86',
      sourceText: 'Quelle wird ergänzt.',
      sourceHref: null
    },
    {
      key: 'sweat',
      name: 'Schwitzen (g/h)',
      val: +sweat.toFixed(0),
      formula: 'Schweißmenge = (0,1 + Intensität * 1,4) * 1000',
      sourceText: 'Quelle wird ergänzt.',
      sourceHref: null
    },
    {
      key: 'energy',
      name: 'Energie (kcal/h)',
      val: +kcalPerHour.toFixed(0),
      formula: 'Energieumsatz = Körpergewicht * Herzfrequenz * 0,063',
      sourceText: 'Quelle wird ergänzt.',
      sourceHref: null
    }
  ]

  const chartData = [
    {
      name: 'Schwitzen + CO₂ + Fett',
      sweat: +sweat.toFixed(0),
      co2: +co2.toFixed(0),
      fat: +fatPerH.toFixed(1),
      kcal: 0
    },
    {
      name: 'Energie (kcal/h)',
      sweat: 0,
      co2: 0,
      fat: 0,
      kcal: +kcalPerHour.toFixed(0)
    }
  ]

  const activeEntries = metrics.filter(metric => activeMetrics[metric.key])

  const toggleMetric = key => {
    setActiveMetrics(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Realtime‑Metabolismus</h2>
      <div className="flex items-center gap-4">
        <span>Puls {hr} bpm</span>
        <input
          type="range"
          min="60"
          max={hrMax}
          value={hr}
          onChange={e => setHr(+e.target.value)}
          className="w-full"
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        {metrics.map(metric => (
          <Metric
            key={metric.key}
            label={metric.name}
            value={metric.val}
            active={!!activeMetrics[metric.key]}
            onToggle={() => toggleMetric(metric.key)}
          />
        ))}
      </div>
      <BarChart width={600} height={260} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="sweat" stackId="a" fill="#93c5fd" name="Schwitzen (g/h)" />
        <Bar dataKey="co2" stackId="a" fill="#60a5fa" name="CO₂ (g/h)" />
        <Bar dataKey="fat" stackId="a" fill="#3b82f6" name="Fett (g/h)" />
        <Bar dataKey="kcal" fill="#0ea5e9" name="Energie (kcal/h)" />
      </BarChart>
      {activeEntries.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-base font-medium text-slate-900">
            Details zu den ausgewählten Kennzahlen
          </h3>
          <div className="space-y-4">
            {activeEntries.map(entry => (
              <div
                key={entry.key}
                className="grid gap-4 sm:grid-cols-2 bg-slate-50 border border-slate-200 rounded-lg p-4 text-left"
              >
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Formel
                  </h4>
                  <p className="text-sm text-slate-700">{entry.formula}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Quelle
                  </h4>
                  {entry.sourceHref ? (
                    <a
                      href={entry.sourceHref}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {entry.sourceText}
                    </a>
                  ) : (
                    <p className="text-sm text-slate-700">{entry.sourceText}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Metric({ label, value, active, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`rounded p-3 border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 ${
        active
          ? 'bg-sky-600 text-white border-sky-600 shadow'
          : 'bg-blue-50 border-transparent text-slate-900 hover:bg-blue-100'
      }`}
    >
      <div className="text-sm font-medium">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </button>
  )
}
