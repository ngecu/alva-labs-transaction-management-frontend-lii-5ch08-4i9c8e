import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import TransactionHistory from './components/TransactionHistory';
import { v4 as uuid } from 'uuid';

function App() {
  const [accountId, setAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [balances, setBalances] = useState({}); // Object to store balances for each account

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('https://infra.devskills.app/api/accounting/transactions');
        const sortedTransactions = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setTransactions(sortedTransactions);

        // Initialize balances object with all accounts starting at 0
        const initialBalances = {};
        sortedTransactions.forEach(transaction => {
          initialBalances[transaction.account_id] = 0;
        });
        setBalances(initialBalances);
        console.log("init b is ",initialBalances);
        
        // Calculate and update balances from transactions
        sortedTransactions.forEach(transaction => {
          // Update balance for the account involved in the transaction
          const updatedBalances = { ...balances };
          updatedBalances[transaction.account_id] += parseInt(transaction.amount);
          
          setBalances(updatedBalances);
        });
        console.log("init b is 2 ",balances);

      } catch (error) {
        console.error('Error fetching transactions:', error);
        setError('Error fetching transactions. Please try again later.');
      }
    };

    fetchTransactions();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (accountId.trim() === '' || isNaN(amount)) {
      setError('Please enter a valid Account ID and Amount.');
      return;
    }

    const currentDate = new Date();

    try {
      const response = await axios.post('https://infra.devskills.app/api/accounting/transaction', {
        account_id: accountId,
        amount: parseFloat(amount),
        created_at: currentDate.toISOString()
      });

      // Update balance for the account
      const updatedBalances = { ...balances };
      updatedBalances[accountId] += parseFloat(amount);
      setBalances(updatedBalances);

      console.log("updated balances ",updatedBalances);

      setAccountId('');
      setAmount('');
      setTransactions([response.data, ...transactions]);
      setSuccess("Transaction Completed Successfully");
      setError(null);
    } catch (error) {
      console.error('Error submitting transaction:', error);
      setError('Error submitting transaction. Please try again later.');
    }
  };

  return (
    <div style={{ height: "90vh", maxHeight: "90vh" }}>
      <Container>
        <Row>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Col sm={4}>
            <Card>
              <Card.Body>
                <fieldset>
                  <legend>Submit New Transaction</legend>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="accountId">
                      <Form.Label>Account ID</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Account ID"
                        value={accountId}
                        onChange={(e) => setAccountId(e.target.value)}
                        data-type="account-id"
                      />
                    </Form.Group>

                    <Form.Group controlId="amount">
                      <Form.Label>Amount</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        data-type="amount"
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit" data-type="transaction-submit">
                      Submit
                    </Button>
                  </Form>
                </fieldset>
              </Card.Body>
            </Card>


          </Col>

          <TransactionHistory balances={balances} transactions={transactions} />

        </Row>
      </Container>
    </div>
  )
}

export default App;
