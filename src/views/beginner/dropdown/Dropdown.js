import React, { useState, useEffect } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CFormSelect,
    CContainer,
    CDropdown,
    CDropdownToggle,
    CDropdownItem,
    CDropdownMenu
} from '@coreui/react';
import Multiselect from 'multiselect-react-dropdown';

const Dropdown = () => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');

    useEffect(() => {
        fetch(
            "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data.countries);
                setCountries(data.countries);
            });
    }, []);

    // Function to handle the change in selected country
    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelect = (selectedList, selectedItem) => {
        setSelectedItems(selectedList);
    };

    const handleRemove = (selectedList, removedItem) => {
        setSelectedItems(selectedList);
    };

    const multiselectStyle = {
        chips: {
            background: `--cui-primary-rgb`
        },
        multiselectContainer: {
            color: '--cui-primary-rgb'
        },
        optionContainer: {
            background: `var(--cui-body-bg)`
        },
        searchBox: {
            border: 'none',
            'borderBottom': 'none',
            'borderRadius': '0px'
        }
    }

    const [selectedAction, setSelectedAction] = useState('');

    const handleActionSelection = (action) => {
        setSelectedAction(action);
        switch (action) {
            case 'print':
                setSelectedAction("HELLO");
                break;
            case 'dashboard':
                window.location.href = '/welcome';
                break;
            case 'google':
                setSelectedAction("You should be redirected to Google...");
                window.open('https://www.google.com', '_blank');
                break;
            default:
                break;
        }
    };

    return (
        <CContainer>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Example 1</strong><small>{' '}| Select</small>
                        </CCardHeader>
                        <CCardBody>
                            <CContainer>
                                <CRow>
                                    <CCol xs={6}>
                                        <CRow>
                                            <CCol xs={12}>
                                                <CFormSelect
                                                    label="Select Country"
                                                    size="lg"
                                                    className="mb-3"
                                                    options={countries.map(country => ({
                                                        value: country.label,
                                                        label: country.label
                                                    }))}
                                                    onChange={handleCountryChange}
                                                />
                                            </CCol>
                                        </CRow>
                                    </CCol>
                                    <CCol xs={6}>
                                        <CRow>
                                            <CCol>
                                                {/* Display selected country */}
                                                <p>Selected Country:</p>
                                                <p id='selectedCountry'>{selectedCountry}</p>
                                            </CCol>
                                        </CRow>
                                    </CCol>
                                </CRow>
                            </CContainer>
                        </CCardBody>
                    </CCard>
                </CCol>

                <CCol xs={6}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Example 1</strong>
                            <small>{' '}| Multi-Select</small>
                        </CCardHeader>
                        <CCardBody>
                            <label className='form-label'>Programming Language</label>
                            <div className='mb-3'>
                                <Multiselect
                                    label="Multiselect"
                                    isObject={false}
                                    onKeyPressFn={() => { }}
                                    onRemove={handleRemove}
                                    onSearch={() => { }}
                                    onSelect={handleSelect}
                                    options={[
                                        'JavaScript',
                                        'TypeScript',
                                        'Java',
                                        'Python',
                                        'C++',
                                        'C#',
                                        'Ruby',
                                        'Swift',
                                        'Kotlin',
                                        'Go',
                                    ]}
                                    placeholder="Select options..."
                                    style={multiselectStyle}
                                />
                            </div>
                            <label className='form-label'>Automation Framework</label>
                            <div className='mb-3'>
                                <Multiselect
                                    showCheckbox
                                    isObject={false}
                                    onKeyPressFn={() => { }}
                                    onRemove={handleRemove}
                                    onSearch={() => { }}
                                    onSelect={handleSelect}
                                    options={[
                                        'Selenium',
                                        'Cypress',
                                        'Protractor',
                                        'TestComplete',
                                        'UFT (formerly QTP)',
                                        'Appium',
                                        'Robot Framework',
                                        'Watir',
                                        'TestNG',
                                        'JUnit',
                                    ]}
                                    placeholder="Select options..."
                                    style={multiselectStyle}
                                />
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>

                <CCol xs={6}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Example 1</strong><small>{' '}| Dropdown</small>
                        </CCardHeader>
                        <CCardBody>
                            <CContainer>
                                <CRow>
                                    <CCol xs={6}>
                                        <CRow>
                                            <CDropdown>
                                                <CDropdownToggle color="primary">Some Actions</CDropdownToggle>
                                                <CDropdownMenu>
                                                    <CDropdownItem onClick={() => handleActionSelection('print')}>Print: HELLO</CDropdownItem>
                                                    <CDropdownItem onClick={() => handleActionSelection('dashboard')}>Redirect to Dashboard</CDropdownItem>
                                                    <CDropdownItem onClick={() => handleActionSelection('google')}>Redirect to Google in New Tab</CDropdownItem>
                                                </CDropdownMenu>
                                            </CDropdown>
                                        </CRow>
                                    </CCol>
                                    <CCol xs={6}>
                                        <CRow>
                                            <p>{selectedAction}</p>
                                        </CRow>
                                    </CCol>
                                </CRow>
                            </CContainer>
                        </CCardBody>
                    </CCard>
                </CCol>

            </CRow>
        </CContainer>
    );
};

export default Dropdown;
