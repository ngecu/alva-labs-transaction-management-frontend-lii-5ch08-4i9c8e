import React from 'react';
import { Badge, Col } from 'react-bootstrap';

const TransactionHistory = ({ transactions,balances }) => {
  console.log("balance is ",balances);
  const renderTransactions = () => {
    
    return transactions.map((transaction, index) => {
    
      const isFirstTransaction = index === 0;
      let currentBalance = balances[transaction.account_id] || 0;
      currentBalance += parseInt(transaction.amount);
  
      // Update the balances object if the balance for the account is undefined
      if (balances[transaction.account_id] === undefined) {
        const updatedBalances = { ...balances };
        updatedBalances[transaction.account_id] = 0;
        // setBalances(updatedBalances);
      }

      return (
        <div
          key={transaction.transaction_id}
          data-type="transaction"
          data-account-id={transaction.account_id}
          data-amount={transaction.amount}
          data-balance={isFirstTransaction ? currentBalance : null}
          style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}
        >
          <p>Transaction ID: {transaction.transaction_id}   -  {new Date(transaction.created_at).toLocaleString()}</p>
 
          <p>Account ID: {transaction.account_id}</p>
          <p>Amount: 
          
          
          {transaction.amount < 0 ? (
            <Badge variant="danger" className='bg-danger'> {transaction.amount}</Badge>
          ) : (
            <Badge variant="success" className='bg-primary'> {transaction.amount}</Badge>
          )}
          
          </p>
          {isFirstTransaction && <p>Current Account Balance: {currentBalance}</p>}
        </div>
      );
    });
  };

  return (
    <Col sm={8}>
      <h3>Transactions List</h3>
      {renderTransactions()}
    </Col>
  );
};

export default TransactionHistory;
