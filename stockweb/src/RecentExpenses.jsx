import React from 'react';
import Expense from './Expense';

export default ({expenses}, loggedIn) => {
    // NEED TO MAKE EACH EXPENSE HAVE A KEY

if (loggedIn) {
    return (
        <div>
            <p className="recent-title">Recent Expenses</p>
            <div className="expense-header">
                <p className="heading-date">Date</p>
                <p className="heading-amount">Amount</p>
                <p className="heading-desc">Description</p>
            </div>

            <div className="expenses">
                {expenses.map(expense => <div><Expense {...expense} /></div>)}
            </div>

        </div>

    )
}

}