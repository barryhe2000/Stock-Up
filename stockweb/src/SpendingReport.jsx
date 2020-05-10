import React from 'react';
import BudgetStats from './BudgetStats';
import DonutChart from './DonutChart';
import LineChart from './LineChart';

export default () => {
    return (
        <div className="spending-report">

            <div className="line-chart-component">
                <LineChart />
            </div>
            
            <div className="graph-divider1"></div>

            <div className="donut-chart-component">
                <DonutChart />
            </div>

            <div className="graph-divider2"></div>
            
            <div className="stats-component">
                <BudgetStats />
            </div>
            
        </div>
    )
}