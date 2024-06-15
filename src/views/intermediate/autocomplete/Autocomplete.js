import React, { useState } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CContainer,
    CFormInput
} from '@coreui/react';

const Autocomplete = () => {
    const [inputValue, setInputValue] = useState('');
    const [filteredFruits, setFilteredFruits] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');

    const fruits = ['Apple', 'Banana', 'Orange', 'Mango', 'Pineapple'];

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        const filtered = fruits.filter(fruit =>
            fruit.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredFruits(filtered);
        setShowDropdown(true);
    };

    const handleItemClick = (fruit) => {
        setInputValue(fruit);
        setSelectedValue(fruit);
        setShowDropdown(false);
    };

    return (
        <CRow className="justify-content-center">
            <CCol xs={12} md={6}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Example</strong><small>{' '}| Autocomplete</small>
                    </CCardHeader>
                    <CCardBody>
                        <CContainer>
                            <CRow>
                                <CCol xs={12} md={6}>
                                    <CFormInput
                                        id='searchBox'
                                        type="text"
                                        size="lg"
                                        placeholder="Search here..."
                                        aria-label="lg input example"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                    />
                                    {showDropdown && (
                                        <div className="autocomplete-dropdown">
                                            {filteredFruits.map((fruit, index) => (
                                                <div key={index} onClick={() => handleItemClick(fruit)}>
                                                    {fruit}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CCol>
                                <CCol id='selectedValue' xs={12} md={6} className='mt-2'>
                                    You selected: {selectedValue}
                                </CCol>
                            </CRow>
                        </CContainer>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default Autocomplete;
