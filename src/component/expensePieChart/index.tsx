import React, { useEffect, useRef } from 'react'
import Chart, {
  ChartConfiguration,
  ChartData,
  ChartOptions,
} from 'chart.js/auto'
import { PieDataset } from '../../constants/type'



interface IExpensePieChart {
  pieChartLabels: string[]
  pieChartDatasets: PieDataset[]
}

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

const ExpensePieChart: React.FC<IExpensePieChart> = ({
  pieChartLabels,
  pieChartDatasets,
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const chartInstanceRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext('2d')
    if (!ctx) return

    const data: ChartData<'pie'> = {
      labels: pieChartLabels,
      datasets: pieChartDatasets,
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
  }, [pieChartDatasets, pieChartLabels])

  return (
    <div className="w-[100%] h-[17rem] flex justify-center items-center pr-[14px] bg-transparent  md:bg-white rounded-3xl md:shadow-custom-card">
      <canvas ref={chartRef}></canvas>
    </div>
  )
}

export default React.memo(ExpensePieChart)
