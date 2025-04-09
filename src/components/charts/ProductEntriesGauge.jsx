import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import AxiosClient from '../../config/axios-client';

const ProductEntriesGauge = () => {
    const chartRef = useRef(null);
    const [totalEntries, setTotalEntries] = useState(0);

    useEffect(() => {
        const fetchProductEntries = async () => {
            try {
                const response = await AxiosClient.get('productEntry/');
                const entriesData = response.data || [];
                setTotalEntries(entriesData.length);
                const chartInstance = echarts.init(chartRef.current);
                const options = {
                    title: {
                        text: 'Entradas',
                        left: 'center',
                        bottom: 0,
                    },
                    tooltip: {
                        formatter: '{a} <br/>{b}: {c}',
                    },
                    series: [
                        {
                            name: 'Entradas',
                            type: 'gauge',
                            startAngle: 90,
                            endAngle: -270,
                            detail: { formatter: '{value}' },
                            data: [{ value: entriesData.length }],
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
                console.error('Error al obtener las entradas de productos:', error);
            }
        };

        fetchProductEntries();
    }, []);

    return (
        <div
            ref={chartRef}
            style={{ width: '100%', height: '100%' }}
            className="bg-card p-2"
        ></div>
    );
};

export default ProductEntriesGauge;