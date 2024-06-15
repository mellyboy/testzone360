import React, { useEffect, useState } from 'react';
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react';

const generateRandomFinancialData = () => ({
    companies: ["Company A", "Company B", "Company C"],
    metrics: ["Gross Profit", "Operating Expenses", "Tax"],
    data: [
        [Math.floor(Math.random() * 100000), Math.floor(Math.random() * 20000), Math.floor(Math.random() * 10000)],
        [Math.floor(Math.random() * 80000), Math.floor(Math.random() * 30000), Math.floor(Math.random() * 15000)],
        [Math.floor(Math.random() * 120000), Math.floor(Math.random() * 40000), Math.floor(Math.random() * 20000)]
    ]
});

const calculateNetProfit = (grossProfit, operatingExpenses, tax) => grossProfit - operatingExpenses - tax;

const DynamicTable = () => {
    const [financialData, setFinancialData] = useState(generateRandomFinancialData());

    useEffect(() => {
        const interval = setInterval(() => {
            setFinancialData(generateRandomFinancialData());
        }, 15000); //15s

        //cleanup interval on component unmount
        return () => clearInterval(interval); 
    }, []);

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardBody>
                        Data are updating every 15s. Verify if the Net Profit computation is correct.
                        Net profit is gross profit minus operating expenses and taxes. You can also think of it as total income minus all expenses.
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardBody>
                        <CTable align="middle" className="mb-0 border" hover responsive>
                            <CTableHead className="text-nowrap">
                                <CTableRow>
                                    <CTableHeaderCell className="bg-body-tertiary">Company</CTableHeaderCell>
                                    {financialData.metrics.map((metric, index) => (
                                        <CTableHeaderCell key={index} className="bg-body-tertiary">{metric}</CTableHeaderCell>
                                    ))}
                                    <CTableHeaderCell className="bg-body-tertiary">Net Profit</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody id='dynamicTable'>
                                {financialData.companies.map((company, rowIndex) => (
                                    <CTableRow id={company} key={rowIndex}>
                                        <CTableHeaderCell id={rowIndex} scope="row">{company}</CTableHeaderCell>
                                        {financialData.data[rowIndex].map((value, colIndex) => (
                                            <CTableDataCell id={colIndex} key={colIndex}>{value}</CTableDataCell>
                                        ))}
                                        <CTableDataCell id='commputedNetProfit'>
                                            {calculateNetProfit(
                                                financialData.data[rowIndex][0], //gross Profit
                                                financialData.data[rowIndex][1], //operating Expenses
                                                financialData.data[rowIndex][2]  //tax
                                            )}
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default DynamicTable;
