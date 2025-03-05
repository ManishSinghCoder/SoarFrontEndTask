import React, { useEffect, useRef } from 'react'
import Chart, { ChartConfiguration } from 'chart.js/auto'

interface IMonthlyDataChart {
  monthlyDateLabels: string[]
  monthlyDatasets: number[]
}

const MonthlyDataChart: React.FC<IMonthlyDataChart> = ({
  monthlyDateLabels,
  monthlyDatasets,
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const areaChartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    if (areaChartInstance.current) {
      areaChartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext('2d')
    if (!ctx) return

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: monthlyDateLabels,
        datasets: [
          {
            fill: true,
            label: '',
            data: monthlyDatasets,
            borderColor: 'rgb(33, 66, 252)',
            backgroundColor: 'rgba(33, 66, 252, 0.2)',
            tension: 0.4,
            pointRadius: 0,
            borderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          y: {
            border: {
              dash: [5, 5],
              display: true,
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
              display: true,
            },
          },
          x: {
            border: {
              dash: [5, 5],
              display: true,
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
              display: true,
            },
          },
        },
        elements: {
          line: {
            borderJoinStyle: 'round',
          },
        },
      },
    }

    areaChartInstance.current = new Chart(ctx, config)

    return () => {
      if (areaChartInstance.current) {
        areaChartInstance.current.destroy()
      }
    }
  }, [monthlyDatasets, monthlyDateLabels])

  return (
    <div className="w-full h-[17rem] p-4  bg-transparent  md:bg-white rounded-3xl md:shadow-custom-card">
      <canvas ref={chartRef} />
    </div>
  )
}

export default React.memo(MonthlyDataChart)
