import React from 'react';
import {Doughnut} from 'react-chartjs-2';

export default () => {
    const budget = 200;
    const balance = 80;
    const difference = budget - balance;
    const data = {
        labels: ['Amount Spent', 'Remaining Budget'],
        datasets: [
            {
                label: 'Amount Spent',
                backgroundColor: ['#6460B9'],
                hoverBackgroundColor: ['#9B98DA'],
                data: [balance, difference]
            }
        ]
    }

    return (
        <div className="donut">
            <p className="donut-title">Budget Spent</p>

            <div className="donut-chart">
                <Doughnut
                data={data}
                options={{
                    legend: {
                        display:false,
                    },
                    maintainAspectRatio: false,
                    responsive: true
                }} />
            </div>

        </div>
    )

}