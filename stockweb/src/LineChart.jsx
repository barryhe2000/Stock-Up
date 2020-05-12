import React from 'react';
import { Line } from 'react-chartjs-2';

export default ({ monthData }) => {




    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
            'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Amount Spent',
                data: monthData,
                backgroundColor: 'rgba(206, 204, 245, 0.3)',

                pointBackgroundColor: '#6460B9',
                borderColor: '#6460B9',
                pointHoverRadius: 5
            }
        ]
    }



    return (
        <div className="line-chart">
            <p className="line-chart-title">Monthly Spending</p>
            <Line className="line-chart"
                data={data}
                options={{
                    legend: {
                        display: false
                    },
                    maintainAspectRatio: false,
                    responsive: true,

                    scales: {
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Month',
                                padding: 10



                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Amount Spent',
                                padding: 10

                            }
                        }]
                    }

                }}
            />

        </div>
    )
}