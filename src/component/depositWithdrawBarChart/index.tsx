import React, { useEffect, useRef } from 'react'
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartConfiguration,
} from 'chart.js'
import { Dataset } from '../../constent/type'


interface IDepossitWithdrawChart {
  dipositeWithdrawLabels: string[]
  dipositWithdrawDatasets: Dataset[]
}
const DepositWithdrawChart: React.FC<IDepossitWithdrawChart> = ({
  dipositeWithdrawLabels,
  dipositWithdrawDatasets,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const chartInstanceRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy()
    }

    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    Chart.register(
      CategoryScale,
      LinearScale,
      BarController,
      BarElement,
      Title,
      Tooltip,
      Legend
    )

    const data = {
      labels: dipositeWithdrawLabels,
      datasets: dipositWithdrawDatasets,
    }

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 500,
            ticks: {
              stepSize: 100,
              color: '#9CA3AF',
            },
            grid: {
              color: '#F3F4F6',
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: '#9CA3AF',
            },
          },
        },
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              boxWidth: 8,
              boxHeight: 8,
              padding: 20,
            },
          },
          tooltip: {
            backgroundColor: 'white',
            titleColor: '#374151',
            bodyColor: '#374151',
            bodyFont: {
              weight: 'bold',
            },
            borderWidth: 1,
            borderColor: '#E5E7EB',
            displayColors: false,
            padding: 10,
          },
        },
      },
    }

    chartInstanceRef.current = new Chart(ctx, config)

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
      }
    }
  }, [dipositWithdrawDatasets, dipositeWithdrawLabels])

  return (
    <div className="w-full h-[17rem] p-4  bg-transparent  md:bg-white rounded-3xl md:shadow-custom-card">
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

export default React.memo(DepositWithdrawChart)
