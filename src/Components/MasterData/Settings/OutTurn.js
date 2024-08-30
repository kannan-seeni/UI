import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBInput, MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';

const OutTurn = () => {
    // Load entries from localStorage or use default
    const loadEntriesFromStorage = () => {
        const storedEntries = localStorage.getItem('entries');
        return storedEntries ? JSON.parse(storedEntries) : [{ value: '68', checked: true }];
    };

    const [entries, setEntries] = useState(loadEntriesFromStorage);

    // Save entries to localStorage
    useEffect(() => {
        localStorage.setItem('entries', JSON.stringify(entries));
    }, [entries]);

    // Handle adding a new entry and sending data to server
    const addEntry = async () => {
        // Send the current entries to the server
        try {
            const response = await fetch('http://localhost:3001/OutTurn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(entries)
            });
            if (!response.ok) throw new Error('Network response was not ok');
            // Handle response if needed
            console.log('Data sent successfully:', await response.json());
        } catch (error) {
            console.error('Error sending data:', error);
        }

        // Add a new entry to the local state
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
        const newEntries = entries.map((entry, i) => ({
            ...entry,
            checked: i === index // Uncheck all except the clicked one
        }));
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

