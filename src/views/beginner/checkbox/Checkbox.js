import React, { useState, useEffect } from 'react';
import { animals, fruits, chapters, languages } from './checkboxLabels';
import { CRow, CCol, CCard, CCardHeader, CCardBody, CFormCheck } from '@coreui/react';

const Checkbox = () => {
    const [selectedFruits, setSelectedFruits] = useState(new Array(fruits.length).fill(false));
    const [selectedAnimals, setSelectedAnimals] = useState(new Array(animals.length).fill(false));
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedChapters, setSelectedChapters] = useState({});
    const [selectedLanguages, setSelectedLanguages] = useState([]);

    const handleFruitChange = (position) => {
        const updatedCheckedState = selectedFruits.map((fruit, index) =>
            index === position ? !fruit : fruit
        );
        setSelectedFruits(updatedCheckedState);

        const newTotalPrice = updatedCheckedState.reduce((sum, currentState, index) => {
            if (currentState) {
                return sum + fruits[index].price;
            }
            return sum;
        }, 0);
        setTotalPrice(newTotalPrice);
    };

    const handleAnimalChange = (position) => {
        const updatedCheckedState = selectedAnimals.map((animal, index) =>
            index === position ? !animal : animal
        );
        setSelectedAnimals(updatedCheckedState);
    };

    const handleCheckboxChange = (item, checked) => {
        const updateState = (node, state) => {
            state[node.label] = checked;

            if (node.children) {
                node.children.forEach(child => updateState(child, state));
            }
        };

        const updateParentState = (node, state) => {
            if (node.parent) {
                const allChecked = node.parent.children.every(child => state[child.label] === true);
                const someChecked = node.parent.children.some(child => state[child.label] === true || state[child.label] === 'indeterminate');

                if (allChecked) {
                    state[node.parent.label] = true;
                } else if (someChecked) {
                    state[node.parent.label] = 'indeterminate';
                } else {
                    state[node.parent.label] = false;
                }

                updateParentState(node.parent, state);
            }
        };

        const newState = { ...selectedChapters };
        updateState(item, newState);
        updateParentState(item, newState);
        setSelectedChapters(newState);
    };

    useEffect(() => {
        const initializeState = (nodes, parent) => {
            nodes.forEach((node) => {
                node.parent = parent;
                selectedChapters[node.label] = false;
                if (node.children.length > 0) {
                    initializeState(node.children, node);
                }
            });
        };

        const initialState = {};
        initializeState(chapters, null);
        setSelectedChapters(initialState);
    }, []);

    const renderCheckboxes = (items) => {
        return items.map((item) => {
            const isChecked = selectedChapters[item.label] === true;
            const isIndeterminate = selectedChapters[item.label] === 'indeterminate';

            return (
                <div key={item.label} style={{ marginLeft: '20px' }}>
                    <CFormCheck
                        id={`${item.label}-checkbox`}
                        label={item.label}
                        checked={isChecked}
                        onChange={(e) => handleCheckboxChange(item, e.target.checked)}
                        indeterminate={isIndeterminate}
                    />
                    {item.children.length > 0 && renderCheckboxes(item.children)}
                </div>
            );
        });
    };

    const renderSelectedChaptersOutput = () => {
        const selectedChaptersOutput = [];

        chapters.forEach((chapter) => {
            // Check if the chapter itself is selected
            if (selectedChapters[chapter.label] === true) {
                selectedChaptersOutput.push(<li key={chapter.label}>{chapter.label}</li>);
            } else if (chapter.children.some(child => selectedChapters[child.label] === true)) {
                // Check if any child is individually selected
                chapter.children.forEach(child => {
                    if (selectedChapters[child.label] === true) {
                        selectedChaptersOutput.push(<li key={child.label}>{child.label}</li>);
                    }
                });
            }
        });

        if (selectedChaptersOutput.length === 0) {
            return <div>No chapters selected.</div>;
        }

        return (
            <div>
                <p>You selected:</p>
                <ul>
                    {selectedChaptersOutput}
                </ul>
            </div>
        );
    };

    const handleLanguageToggle = (language) => {
        setSelectedLanguages(prevState => {
            if (prevState.includes(language)) {
                return prevState.filter(lang => lang !== language);
            } else {
                return [...prevState, language];
            }
        });
    };


    return (
        <CRow className="d-flex align-items-stretch">
            <CCol xs={12} md={6} className="d-flex flex-grow-1">
                <CCard className="d-flex flex-column mb-4 flex-grow-1">
                    <CCardHeader>
                        <strong>Example 1</strong><small>{' '}| Basic Checkbox</small>
                    </CCardHeader>
                    <CCardBody className="d-flex">
                        <div className="flex-grow-1">
                            {fruits.map((fruit, index) => (
                                <CFormCheck
                                    key={index}
                                    id={`${index}-Checkbox`}
                                    name={fruit.name}
                                    label={`${fruit.name} (₱${fruit.price.toFixed(2)})`}
                                    value={fruit.name}
                                    checked={selectedFruits[index]}
                                    onChange={() => handleFruitChange(index)}
                                />
                            ))}
                        </div>
                        <div className="flex-grow-1 ms-3">
                            <div className="mt-3"><strong>Total Price: ₱{totalPrice.toFixed(2)}</strong></div>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>

            <CCol xs={12} md={6} className="d-flex flex-grow-1">
                <CCard className="d-flex flex-column mb-4 flex-grow-1">
                    <CCardHeader>
                        <strong>Example 2</strong><small>{' '}| with Disabled Checkbox</small>
                    </CCardHeader>
                    <CCardBody className="d-flex">
                        <div className="flex-grow-1">
                            {animals.map((animal, index) => (
                                <CFormCheck
                                    key={index}
                                    id={`${animal.name}Checkbox`}
                                    name={animal.name}
                                    label={animal.name}
                                    value={animal.name}
                                    checked={selectedAnimals[index]}
                                    onChange={() => handleAnimalChange(index)}
                                    disabled={animal.disabled}
                                />
                            ))}
                        </div>
                        <div className="flex-grow-1 ms-3">
                            <ul>
                                {selectedAnimals.map((isChecked, index) => (
                                    isChecked && <li key={index}>{animals[index].name}</li>
                                ))}
                            </ul>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>



            <CCol xs={12} md={6} className="d-flex flex-grow-1">
                <CCard className="d-flex flex-column mb-4 flex-grow-1">
                    <CCardHeader>
                        <strong>Example 3</strong><small>{' '}| Intermediate Checkbox</small>
                    </CCardHeader>
                    <CCardBody className="d-flex flex-column">
                        {renderCheckboxes(chapters)}
                    </CCardBody>
                </CCard>
            </CCol>

            <CCol xs={12} md={6} className="d-flex flex-grow-1">
                <CCard className="d-flex flex-column mb-4 flex-grow-1">
                    <CCardHeader>
                        Output of Example 3
                    </CCardHeader>
                    <CCardBody className="d-flex flex-column">
                        {renderSelectedChaptersOutput()}
                    </CCardBody>
                </CCard>
            </CCol>

            <CCol xs={12} md={6} className="d-flex flex-grow-1">
                <CCard className="d-flex flex-column mb-4 flex-grow-1">
                    <CCardHeader>
                        <strong>Example 4</strong><small>{' '}| Checkbox as Toggle</small>
                    </CCardHeader>
                    <CCardBody className="d-flex">
                        <div className="flex-grow-1">
                            {languages.map((language, index) => (
                                <CFormCheck
                                    key={index}
                                    button={{ color: 'primary', variant: 'outline' }}
                                    id={`${language}Checkbox`}
                                    name={language}
                                    label={language}
                                    value={language}
                                    checked={selectedLanguages.includes(language)}
                                    onChange={() => handleLanguageToggle(language)}
                                    className="mb-2"
                                />
                            ))}
                        </div>
                        <div className="flex-grow-1 ms-3">
                            <ul>
                                {selectedLanguages.map((language, index) => (
                                    <li key={index}>{language}</li>
                                ))}
                            </ul>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>

        </CRow>
    );
};

export default Checkbox;
