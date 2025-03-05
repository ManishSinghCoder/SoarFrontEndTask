import React, { useEffect, useRef } from 'react'
import Chart, {
  ChartConfiguration,
  ChartData,
  ChartOptions,
} from 'chart.js/auto'

Chart.register({
  id: 'customLabels',
  afterDraw: (chart) => {
    const ctx = chart.ctx
    ctx.font = 'bold 11px Arial'
    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    chart.data.datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex)
      if (!meta.hidden) {
        meta.data.forEach((element, index) => {
          const data = dataset.data[index]
          const label = chart.data.labels?.[index] as string

          const centerX = element.x
          const centerY = element.y
          const pieElement = element as any
          const midAngle = (pieElement.startAngle + pieElement.endAngle) / 2
          const radius = (element as any).outerRadius * 0.7

          const x = centerX + radius * Math.cos(midAngle) + 5
          const y = centerY + radius * Math.sin(midAngle)

          ctx.fillText(`${data}%`, x, y - 5)

          ctx.fillText(label, x, y + 12)
        })
      }
    })
  },
})

const ExpensePieChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const chartInstanceRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext('2d')
    if (!ctx) return

    const data: ChartData<'pie'> = {
      labels: ['Entertainment', 'Bill Expense', 'Others', 'Investment'],
      datasets: [
        {
          data: [30, 15, 20, 35],
          backgroundColor: ['#39447a', '#ff8c21', '#222222', '#4169e1'],
          borderWidth: 0,
          borderColor: '#ffffff',
          offset: [50, 80, 15, 10],
          hoverOffset: [70, 100, 35, 30],
        },
      ],
    }
    const options: ChartOptions<'pie'> = {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => `${context.label}: ${context.raw}%`,
          },
        },
      },
      rotation: -70,
      animation: {
        animateRotate: true,
        animateScale: true,
      },
      layout: { padding: 0 },
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'pie',
      data,
      options,
    } as ChartConfiguration<'pie'>)

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
      }
    }
  }, [])

  return (
    <div className="w-[100%] h-[17rem] flex justify-center items-center pr-[14px] bg-transparent  md:bg-white rounded-3xl md:shadow-custom-card">
      <canvas ref={chartRef}></canvas>
    </div>
  )
}

export default ExpensePieChart
