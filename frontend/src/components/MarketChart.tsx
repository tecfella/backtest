import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React, { useEffect, useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface MarketData {
  date: string
  timestamp: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export const MarketChart: React.FC = () => {
  const [data, setData] = useState<MarketData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/market-data/SPY')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const result = (await response.json()) as MarketData[]
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    void fetchData()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const options: Highcharts.Options = {
    title: {
      text: 'SPY Price History',
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Date',
      },
    },
    yAxis: {
      title: {
        text: 'Price',
      },
    },
    series: [
      {
        type: 'line',
        name: 'Close Price',
        data: data.map(item => [item.timestamp, item.close]),
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],
    chart: {
      height: 500,
    },
  }

  return (
    <Card className="w-full max-w-4xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Market Data (SPY)</CardTitle>
      </CardHeader>
      <CardContent>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </CardContent>
    </Card>
  )
}
