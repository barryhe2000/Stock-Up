import React from 'react';

export default ({limit, balance, average_spending}) => {

    const remaining = limit - balance;

    return(
        <div className="budget-stats">
            <p className="remaining-budget">Remaining Budget</p>
            <p className="remaining-budget-amount">${remaining}</p>
            <div className="stats-divider"></div>
            <p className="current-balance">Spending This Month</p>
            <p className="current-balance-amount">${balance}</p>
            <div className="stats-divider"></div>
            <p className="average-spending">Average Monthly Expenses</p>
            <p className="average-spending-amount">$200.15</p>

        </div>
    )

}