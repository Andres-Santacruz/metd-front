import ReactApexChart from "react-apexcharts";

function LineChart(props: {
  chartData: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chartOptions: ApexCharts.ApexOptions;
}) {
  return (
    <ReactApexChart
      options={props.chartOptions}
      series={props.chartData}
      type="area"
      width="100%"
      height="100%"
    />
  );
}

export default LineChart;
