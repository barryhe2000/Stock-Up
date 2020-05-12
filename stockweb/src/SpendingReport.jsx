import React from 'react';
import BudgetStats from './BudgetStats';
import DonutChart from './DonutChart';
import LineChart from './LineChart';

export default ({ limit, yearExpenses, balance }) => {

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

    const calculateMonth = (exp) => {

        if (exp.month === 1) jan += exp.amount;
        else if (exp.month === 2) feb += exp.amount;
        else if (exp.month === 3) mar += exp.amount;
        else if (exp.month === 4) apr += exp.amount;
        else if (exp.month === 5) may += exp.amount;
        else if (exp.month === 6) jun += exp.amount;
        else if (exp.month === 7) jul += exp.amount;
        else if (exp.month === 8) aug += exp.amount;
        else if (exp.month === 9) sep += exp.amount;
        else if (exp.month === 10) oct += exp.amount;
        else if (exp.month === 11) nov += exp.amount;
        else if (exp.month === 12) dec += exp.amount;
        else {
            //do something here cuz it went wrong my dude 
            //erro msg for later

        }
    }

    yearExpenses.map((exp) => calculateMonth(exp));

    const data = [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec];
    const curMonth = new Date().getMonth() + 1;
    let total = 0;
    for (let i = 0; i < curMonth; i++) {
        total += data[i];
    }
    const average = total / curMonth;

    return (
        <div className="spending-report">

            <div className="line-chart-component">
                <LineChart monthData={data} />
            </div>

            <div className="graph-divider1"></div>

            <div className="donut-chart-component">
                <DonutChart limit={limit} balance={balance} />
            </div>

            <div className="graph-divider2"></div>

            <div className="stats-component">
                <BudgetStats limit={limit} balance={balance} average={average} />
            </div>

        </div>
    )
}