import React from 'react';

export default ({remaining_budget, balance, average_spending}) => {

    return(
        <div className="budget-stats">
            <p className="remaining-budget">Remaining Budget</p>
            <p className="remaining-budget-amount">$100.00</p>
            <div className="stats-divider"></div>
            <p className="current-balance">Spending This Month</p>
            <p className="current-balance-amount">$25.50</p>
            <div className="stats-divider"></div>
            <p className="average-spending">Average Monthly Expenses</p>
            <p className="average-spending-amount">$200.15</p>

        </div>
    )

}