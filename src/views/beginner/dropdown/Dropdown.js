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
import { useNavigate } from 'react-router-dom';

const Dropdown = () => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const navigate = useNavigate();

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
    };

    const [selectedAction, setSelectedAction] = useState('');

    const handleActionSelection = (action) => {
        setSelectedAction(action);
        switch (action) {
            case 'print':
                setSelectedAction("HELLO");
                break;
            case 'welcome':
                navigate('/');
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
                                    <CCol xs={12} md={6}>
                                        <CFormSelect
                                            id='countrySelector'
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
                                    <CCol xs={12} md={6}>
                                        <p>Selected Country:</p>
                                        <p id='selectedCountry'>{selectedCountry}</p>
                                    </CCol>
                                </CRow>
                            </CContainer>
                        </CCardBody>
                    </CCard>
                </CCol>

                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Example 2</strong>
                            <small>{' '}| Multi-Select</small>
                        </CCardHeader>
                        <CCardBody>
                            <label className='form-label'>Programming Language</label>
                            <div className='mb-3'>
                                <Multiselect
                                    id='programmingLanguage'
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
                                    id='automationFramework'
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

                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Example 3</strong><small>{' '}| Dropdown</small>
                        </CCardHeader>
                        <CCardBody>
                            <CContainer>
                                <CRow>
                                    <CCol xs={12} md={6}>
                                        <CDropdown id='actionsBtn'>
                                            <CDropdownToggle color="primary">Some Actions</CDropdownToggle>
                                            <CDropdownMenu id='actionList'>
                                                <CDropdownItem onClick={() => handleActionSelection('print')}>Print: HELLO</CDropdownItem>
                                                <CDropdownItem onClick={() => handleActionSelection('welcome')}>Redirect to Welcome Page</CDropdownItem>
                                                <CDropdownItem onClick={() => handleActionSelection('google')}>Redirect to Google in New Tab</CDropdownItem>
                                            </CDropdownMenu>
                                        </CDropdown>
                                    </CCol>
                                    <CCol id='example3Output' xs={12} md={6}>
                                        <p>{selectedAction}</p>
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
