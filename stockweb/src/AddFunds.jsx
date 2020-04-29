import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default ({callback, balance}) => {
    const [name, setName] = useState('');
    const [cardNumber, setCardNumber] = useState(0);
    const [ccv, setCcv] = useState(0);
    const [expirationDate, setExpirationDate] = useState('');
    const [depositAmount, setDepositAmount] = useState(0);

    return (
        <div>
        <Form className="add-funds-form">
            <Form.Group controlId="formBasicEmail">
                <Form.Label className="cardholder-label">Cardholder Name</Form.Label>
                <Form.Control type="text" placeholder="e.g. John Doe" 
                onChange={(e) => setName(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label className="card-number-label">Card Number</Form.Label>
                <Form.Control type="text" placeholder="e.g. XXXX-XXXX-XXXX" 
                onChange={(e) => setCardNumber(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label className="card-number-label">CCV</Form.Label>
                <Form.Control type="text" placeholder="e.g. XXX" 
                onChange={(e) => setCcv(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label className="expiration-label">Expiration Month/Year</Form.Label>
                <Form.Control type="text" placeholder="e.g. MM/YY" 
                onChange={(e) => setCardNumber(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label className="deposit-label">Card Number</Form.Label>
                <Form.Control type="text" placeholder="e.g. 100.00" 
                onChange={(e) => setCardNumber(e.target.value)}
                />
            </Form.Group>

            <Button id="add-funds-submit" variant="white" type="submit"
            >
                Add Funds
            </Button>
        </Form>

    </div>
    )


}