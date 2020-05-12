import React from 'react';
import { Line } from 'react-chartjs-2';

export default ({ yearExpenses }) => {

    let jan = 0;
    let feb = 0;
    let mar = 0;
    let apr = 0;
    let may = 0;
    let jun = 0;
    let jul = 0;
    let aug = 0;
    let sep = 0;
    let oct = 0;
    let nov = 0;
    let dec = 0;
    for (exp of yearExpenses) {
        if (exp.month == 1) jan += exp.amount;
        else if (exp.month == 2) feb += exp.amount;
        else if (exp.month == 3) mar += exp.amount;
        else if (exp.month == 4) apr += exp.amount;
        else if (exp.month == 5) may += exp.amount;
        else if (exp.month == 6) jun += exp.amount;
        else if (exp.month == 7) jul += exp.amount;
        else if (exp.month == 8) aug += exp.amount;
        else if (exp.month == 9) sep += exp.amount;
        else if (exp.month == 10) oct += exp.amount;
        else if (exp.month == 11) nov += exp.amount;
        else if (exp.month == 12) dec += exp.amount;
        else {
            //do something here cuz it went wrong my dude 
            //erro msg for later
        }
    }
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
            'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Amount Spent',
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
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