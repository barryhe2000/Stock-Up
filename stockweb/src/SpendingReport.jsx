import React from 'react';
import BudgetStats from './BudgetStats';
import DonutChart from './DonutChart';
import LineChart from './LineChart';

export default ({ limit, yearExpenses, balance }) => {
    return (
        <div className="spending-report">

            <div className="line-chart-component">
                <LineChart yearExpenses={yearExpenses} />
            </div>

            <div className="graph-divider1"></div>

            <div className="donut-chart-component">
                <DonutChart limit={limit} balance={balance} />
            </div>

            <div className="graph-divider2"></div>

            <div className="stats-component">
                <BudgetStats limit={limit} balance={balance} />
            </div>

        </div>
    )
}