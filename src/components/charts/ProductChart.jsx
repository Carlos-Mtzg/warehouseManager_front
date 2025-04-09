import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import AxiosClient from '../../config/axios-client';

const ProductChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await AxiosClient.get('stock/');
        const stockData = response.data || [];
        const productNames = stockData.map((item) => item.productName);
        const quantities = stockData.map((item) => item.quantity);
        const totalAmounts = stockData.map((item) => item.totalAmount);

        if (productNames.length === 0 || quantities.length === 0 || totalAmounts.length === 0) {
          console.warn('No hay datos para mostrar en la gráfica.');
          return;
        }

        const chartInstance = echarts.init(chartRef.current);
        const options = {
          title: {
            text: 'Productos en Almacén',
            subtext: 'Cantidad y Valor Total',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['Cantidad', 'Valor Total'],
            bottom: 0,
          },
          xAxis: {
            type: 'category',
            data: productNames,
          },
          yAxis: [
            {
              type: 'value',
              name: 'Cantidad',
            },
            {
              type: 'value',
              name: 'Valor Total',
              axisLabel: {
                formatter: '${value}',
              },
            },
          ],
          series: [
            {
              name: 'Cantidad',
              type: 'bar',
              data: quantities,
              yAxisIndex: 0,
              itemStyle: {
                color: '#6A9C89',
              },
            },
            {
              name: 'Valor Total',
              type: 'line',
              data: totalAmounts,
              yAxisIndex: 1,
              itemStyle: {
                color: '#16423C',
              },
              lineStyle: {
                width: 2,
              },
            },
          ],
        };

        chartInstance.setOption(options);
        return () => {
          chartInstance.dispose();
        };
      } catch (error) {
        console.error('Error al obtener los datos del stock:', error);
      }
    };

    fetchStockData();
  }, []);

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '100%' }}
      className="bg-card p-2"
    ></div>
  );
};
export default ProductChart;