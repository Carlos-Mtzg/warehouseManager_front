import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import AxiosClient from '../../config/axios-client';

const ProductGauge = () => {
    const chartRef = useRef(null);
    const [totalQuantities, setTotalQuantities] = useState(0);

    useEffect(() => {
        const fetchTotalQuantities = async () => {
            try {
                const response = await AxiosClient.get('stock/');
                const stockData = response.data || [];
                const total = stockData.reduce((sum, item) => sum + item.quantity, 0);
                setTotalQuantities(total);

                const chartInstance = echarts.init(chartRef.current);
                const options = {
                    title: {
                        text: 'Total de Productos',
                        left: 'center',
                        bottom: 0,
                    },
                    tooltip: {
                        formatter: '{a} <br/>{b}: {c}',
                    },
                    series: [
                        {
                            name: 'Productos',
                            type: 'gauge',
                            startAngle: 90,
                            endAngle: -270,
                            detail: { formatter: '{value}' },
                            data: [{ value: total }],
                            axisLine: {
                                lineStyle: {
                                    width: 8,
                                    color: [
                                        [1, '#6A9C89'],
                                    ],
                                },
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLabel: {
                                show: false,
                            },
                            splitLine: {
                                show: false,
                            },
                            pointer: {
                                show: false,
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

        fetchTotalQuantities();
    }, []);

    return (
        <div
            ref={chartRef}
            style={{ width: '100%', height: '100%' }}
            className="bg-card p-2"
        ></div>
    );
};

export default ProductGauge;