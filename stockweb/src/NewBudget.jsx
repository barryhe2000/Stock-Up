import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

export default ({callback}) => {
    const [amount, setAmount] = useState(0);

    return (
        <div className="new-budget">
            <p className="new-budget-title">Create New Budget</p>
            <Form className="add-funds-form">
            <Form.Group id="amount-input" controlId="formBasicEmail">
                <Form.Label className="amount-label">Amount</Form.Label>
                <InputGroup >
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control type="number" placeholder="e.g. 100.00" 
                    onChange={(e) => setAmount(e.target.value)} 
                    aria-describedby="inputGroupPrepend"
                    required 
                    id="amount-input" />
                    <Form.Control.Feedback type="invalid">
                    Please choose a username.
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>

            <Button id="add-funds-submit" variant="white" type="submit"
            >
                Create Budget
            </Button>
        </Form>
        </div>
    )
}