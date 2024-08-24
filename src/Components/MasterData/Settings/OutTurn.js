import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBInput, MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';

const OutTurn = () => {
    // Initial state for entries with default value 68% and checked state true
    const [entries, setEntries] = useState([{ value: '68', checked: true }]);

    // Handle adding a new entry
    const addEntry = () => {
        setEntries([...entries, { value: '', checked: false }]);
    };

    // Handle change in input value
    const handleInputChange = (index, newValue) => {
        const newEntries = [...entries];
        newEntries[index].value = newValue;
        setEntries(newEntries);
    };

    // Handle change in checkbox state
    const handleCheckboxChange = (index) => {
        const newEntries = [...entries];
        newEntries[index].checked = !newEntries[index].checked;
        setEntries(newEntries);
    };

    // Calculate Due Rice Weight for each entry
    const calculateDueRiceWeights = () => {
        return entries.map(entry => {
            if (!entry.value || isNaN(entry.value)) {
                return 0;
            }
            const percentage = parseFloat(entry.value);
            return entry.checked ? percentage : 0;
        });
    };

    // Calculate the total Due Rice Weight
    const dueRiceWeights = calculateDueRiceWeights();
    const totalDueRiceWeight = dueRiceWeights.reduce((acc, weight) => acc + weight, 0);

    return (
        <MDBContainer fluid className='p-0 bgImg mt-5'>
            <MDBRow className='d-flex h-100 p-4 align-items-center'>
                <MDBCol md='12'>
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle>Here mentioned Outturn % is used to calculate the weight of rice:</MDBCardTitle>
                            <MDBCardText>Total Due Rice weight = {totalDueRiceWeight.toFixed(2)}% (Received Paddy weight).</MDBCardText>
                            <MDBCardHeader className="border-0">Out Turn %</MDBCardHeader>
                            <div>
                                {entries.map((entry, index) => (
                                    <div key={index} className='mb-3 d-flex align-items-center w-25'>
                                        <MDBInput
                                            type='number'
                                            label='Enter Out Turn Percentage'
                                            value={entry.value}
                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                            className='px-2'
                                        />
                                        <MDBCheckbox
                                            id={`checkbox-${index}`}
                                            label='Apply'
                                            checked={entry.checked}
                                            onChange={() => handleCheckboxChange(index)}
                                        />
                                    </div>
                                ))}
                                <MDBBtn onClick={addEntry}>Add New Entry</MDBBtn>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default OutTurn;