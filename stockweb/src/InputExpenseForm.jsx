import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

export default ({handleInput}) => {

    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState(0);
    const [month, setMonth] = useState(0);
    const [day, setDay] = useState(0);
    const [year, setYear] = useState(0);
    const [description, setDescription] = useState('');

    const [validated, setValidated] = useState(false);

    // handle form submit
    const handleSubmit = (event) => {
        let form = event.currentTarget;

        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        } 

        setValidated(true);
        handleInput();
        

    };

    return (
        <div>
            <Form className="input-expense-form" noValidate 
            validated={validated} onSubmit={handleSubmit} >

                {/* category */}
                <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label className="expense-form-label">Category</Form.Label>
                        <Form.Control as="select" 
                        onChange={(e) => setCategory(e.target.value)}>
                        <option>Bills</option>
                        <option>Entertainment</option>
                        <option>Food</option>
                        <option>Home</option>
                        <option>Shopping</option>
                        <option>Transport</option>
                        <option>Other</option>
                        </Form.Control>
                    </Form.Group>

                {/* amount */}
                <Form.Group controlId="formBasicEmail" className="input-expense-amount">
                    <Form.Label className="expense-form-label">Amount</Form.Label>
                        <InputGroup >

                        {/* prepend $ symbol */}
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" placeholder="e.g. 100.00" 
                        onChange={(e) => setAmount(parseInt(e.target.value))}
                        aria-describedby="inputGroupPrepend"
                        required
                        />
                        {/* feedback */}
                        <Form.Control.Feedback type="invalid">
                        Please enter a valid amount.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                {/* month */}
                <Form.Group controlId="formBasicPassword" className="input-expense-month">
                    <Form.Label className="expense-form-label">Month</Form.Label>
                    <Form.Control type="text" placeholder="MM" 
                    onChange={(e) => setMonth(parseInt(e.target.value))} required
                    />
                    <Form.Control.Feedback type="invalid">
                    Please enter a valid month.
                    </Form.Control.Feedback>
                </Form.Group>
            
                {/* day */}
                <Form.Group controlId="formBasicPassword" className="input-expense-day">
                    <Form.Label className="expense-form-label">Day</Form.Label>
                    <Form.Control type="text" placeholder="DD" 
                    onChange={(e) => setDay(parseInt(e.target.value))} required
                    />
                    <Form.Control.Feedback type="invalid">
                    Please enter a valid day.
                    </Form.Control.Feedback>
                </Form.Group>

                {/* year */}
                <Form.Group controlId="formBasicPassword" className="input-expense-year">
                    <Form.Label className="expense-form-label">Year</Form.Label>
                    <Form.Control type="text" placeholder="YYYY" 
                    onChange={(e) => setYear(parseInt(e.target.value))} required
                    />
                    <Form.Control.Feedback type="invalid">
                    Please enter a valid year.
                    </Form.Control.Feedback>
                </Form.Group>

                {/* description */}
                <Form.Group controlId="formBasicPassword" className="input-expense-desc">
                    <Form.Label className="expense-form-label">Description</Form.Label>
                    <Form.Control type="text" placeholder="e.g. Electricity bill" 
                    onChange={(e) => setDescription(parseInt(e.target.value))} required
                    />
                    <Form.Control.Feedback type="invalid">
                    Please enter a valid description.
                    </Form.Control.Feedback>
                </Form.Group>

                {/* description */}
                <Button id="input-expense-submit" 
                variant="white" type="submit" >
                    Input Expense
                </Button>
            </Form>

        </div>
    )


}