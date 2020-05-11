import React from 'react';

export default ({month, day, year, amount, description}) => {
    const date = month + '/' + day + '/' + year;

    return (
        <div>
            <div className="expense-divider"></div>
            <div className="individual-expense-data">
                <p className="individual-date">{date}</p>
                <p className="individual-amount">${amount}</p>
                <p className="individual-desc">{description}</p>
            </div>
            
            
        </div>
    )

}