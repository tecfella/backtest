import { MarketChart } from './components/MarketChart'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Backtesting Dashboard</h1>
        <MarketChart />
      </div>
    </div>
  )
}

export default App
