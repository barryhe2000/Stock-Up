import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default ({callback}) => {

    const [stock, setStock] = useState('');
    const [username, setUsername] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [buy, setBuy] = useState('');

    return (
        <div>
            
            <Form className="transaction-form">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label className="transaction-form-label">Stock Name</Form.Label>
                    <Form.Control type="text" placeholder="e.g. TSLA, AAPL" 
                    onChange={(e) => setStock(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label className="transaction-form-label">Quantity</Form.Label>
                    <Form.Control type="text" placeholder="e.g. 1, 3, 8" 
                    onChange={(e) => setQuantity(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label className="transaction-form-label">Transaction Type</Form.Label>
                    <Form.Control as="select" onChange={(e) => setBuy(e.target.value)}>
                    <option>Buy</option>
                    <option>Sell</option>
                    </Form.Control>
                </Form.Group>

                <Button id="transaction-submit" variant="white" type="submit"
                
                >
                    Make Transaction
                </Button>
            </Form>

        </div>
    )


}