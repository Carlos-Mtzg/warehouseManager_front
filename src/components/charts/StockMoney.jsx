import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import AxiosClient from '../../config/axios-client';

const StockMoney = () => {
    const chartRef = useRef(null);
    const [formattedTotal, setFormattedTotal] = useState('0.00');

    useEffect(() => {
        const fetchTotalAmounts = async () => {
            try {
                const response = await AxiosClient.get('stock/');
                const stockData = response.data || [];
                const data = stockData.map((item) => ({
                    name: item.productName,
                    value: item.totalAmount,
                }));

                const totalSum = data.reduce((sum, item) => sum + item.value, 0);
                setFormattedTotal(totalSum.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }));

                const chartInstance = echarts.init(chartRef.current);
                const options = {
                    title: {
                        text: 'Dinero en Almacén',
                        left: 'center',
                        bottom: 0,
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: (params) => {
                            const value = params.value.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            });
                            return `${params.name}</br> $${value} (${params.percent}%)`;
                        },
                    },
                    legend: {
                        show: false,
                    },
                    series: [
                        {
                            name: 'Dinero Total',
                            type: 'pie',
                            radius: '65%',
                            data: data,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                                },
                            },
                            label: {
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

        fetchTotalAmounts();
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <div style={{
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '11px',
                fontWeight: 'normal',
                zIndex: 1,
            }}>
                Total: ${formattedTotal}
            </div>
            <div
                ref={chartRef}
                style={{ width: '100%', height: '100%' }}
                className="bg-card p-2"
            ></div>
        </div>
    );
};

export default StockMoney;