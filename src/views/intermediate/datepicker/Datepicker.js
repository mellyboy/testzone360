import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import { getMonth, getYear } from 'date-fns';
import range from "lodash/range";
import "react-datepicker/dist/react-datepicker.css";
import Icon from '@mdi/react';
import { mdiCalendarMonthOutline } from '@mdi/js';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CContainer,
    CButton,
    CFormSelect
} from '@coreui/react';

const Datepicker = () => {
    // Example 1
    const [startDate, setStartDate] = useState(new Date());
    const [datePickerWithPortalStartDate, setDatePickerWithPortalStartDate] = useState(new Date());

    // Example 2
    const [example2StartDate, setExample2StartDate] = useState(new Date());
    const [example2EndDate, setExample2EndDate] = useState(new Date());

    // Example 3 - Date Picker with Custom Header
    const [customHeaderStartDate, setCustomHeaderStartDate] = useState(new Date());
    const years = range(1990, getYear(new Date()) + 1, 1);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    // Example 4 - Date Range with Single Input
    const [example4SimpleDateRange, setExample4SimpleDateRange] = useState([null, null]);
    const [example4SimpleStartDate, example4SimpleEndDate] = example4SimpleDateRange;
    const [example4PortalDateRange, setExample4PortalDateRange] = useState([null, null]);
    const [example4PortalStartDate, example4PortalEndDate] = example4PortalDateRange;

    // Example 5 - Month Picker
    const [monthPickerDate, setMonthPickerDate] = useState(new Date());
    const renderMonthContent = (month, shortMonth, longMonth, day) => {
        const fullYear = new Date(day).getFullYear();
        const tooltipText = `Tooltip for month: ${longMonth} ${fullYear}`;

        return <span title={tooltipText}>{shortMonth}</span>;
    };

    // Example 6 - Quarter Picker
    const [quarterPickerDate, setQuarterPickerDate] = useState(new Date());
    const renderQuarterContent = (quarter, shortQuarter) => {
        const tooltipText = `Tooltip for quarter: ${quarter}`;
        return <span title={tooltipText}>{shortQuarter}</span>;
    };

    // Example 7 - Year Picker
    const [yearPickerDate, setYearPickerDate] = useState(new Date());
    const renderYearContent = (year) => {
        const tooltipText = `Tooltip for year: ${year}`;
        return <span title={tooltipText}>{year}</span>;
    };

    return (
        <CContainer fluid>
            <CRow>
                <CCol lg={6} xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Example 1</strong><small>{' '}| Select Date</small>
                        </CCardHeader>
                        <CCardBody>
                            <CRow className="align-items-center">
                                <CCol xs={12} md={6}>
                                    <small>Simple Date Picker:</small>
                                </CCol>
                            </CRow>

                            <CRow className='mb-3'>
                                <CCol id='simpleDatepicker1' xs={12} md={6}>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        toggleCalendarOnIconClick
                                        calendarClassName="custom-datepicker-theme"
                                    />
                                </CCol>
                                <CCol id='simpleDatepicker1Output' xs={6}>
                                    {startDate.toDateString()}
                                </CCol>
                            </CRow>

                            <CRow className="align-items-center">
                                <CCol xs={12} md={6}>
                                    <small>Date Picker with Portal:</small>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol id='simpleDatepicker2' xs={12} md={6}>
                                    <DatePicker
                                        calendarClassName="custom-datepicker-theme"
                                        selected={datePickerWithPortalStartDate}
                                        onChange={(date) => setDatePickerWithPortalStartDate(date)}
                                        withPortal
                                    />
                                </CCol>
                                <CCol id='simpleDatepicker2Output' xs={6} className=''>
                                    {datePickerWithPortalStartDate.toDateString()}
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>

                <CCol lg={6} md={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Example 2</strong><small>{' '}| Date Range #1 - Separate Input Box</small>
                        </CCardHeader>
                        <CCardBody>
                            <CRow className="align-items-center">
                                <CCol xs={12} md={6}>
                                    <small>Start Date:</small>
                                </CCol>
                            </CRow>

                            <CRow className='mb-3'>
                                <CCol id='dateRange1' xs={12} md={6}>
                                    <DatePicker
                                        selected={example2StartDate}
                                        onChange={(date) => setExample2StartDate(date)}
                                        selectsStart
                                        startDate={example2StartDate}
                                        endDate={example2EndDate}
                                        calendarClassName="custom-datepicker-theme"
                                    />
                                </CCol>
                                <CCol id='dateRange1Output' xs={12} md={6}>
                                    {example2StartDate.toDateString()}
                                </CCol>
                            </CRow>

                            <CRow className="align-items-center">
                                <CCol xs={12} md={6}>
                                    <small>End Date:</small>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol id='dateRange2' xs={12} md={6}>
                                    <DatePicker
                                        selected={example2EndDate}
                                        onChange={(date) => setExample2EndDate(date)}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={example2EndDate}
                                        minDate={example2StartDate}
                                        calendarClassName="custom-datepicker-theme"
                                    />
                                </CCol>
                                <CCol id='dateRange2Output' xs={12} md={6}>
                                    {example2EndDate.toDateString()}
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>

                <CCol lg={6} xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Example 3</strong><small>{' '}| Select Date - Custom Header</small>
                        </CCardHeader>
                        <CCardBody>
                            <CRow className="align-items-center">
                                <CCol xs={12} md={6}>
                                    <CRow>
                                        <CCol>
                                            <small>Simple:</small>
                                        </CCol>
                                    </CRow>

                                    <CRow>
                                        <CCol xs={12} md={6} className='mb-2'>
                                            <DatePicker
                                            id='customDatepicker'
                                                calendarClassName="custom-datepicker-theme"
                                                renderCustomHeader={({
                                                    date,
                                                    changeYear,
                                                    changeMonth,
                                                    decreaseMonth,
                                                    increaseMonth,
                                                    prevMonthButtonDisabled,
                                                    nextMonthButtonDisabled,
                                                }) => (
                                                    <div
                                                        style={{
                                                            margin: 10,
                                                            display: "flex",
                                                            justifyContent: "center",
                                                        }}
                                                    >
                                                        <CButton
                                                            color="primary"
                                                            size='sm'
                                                            onClick={decreaseMonth}
                                                            disabled={prevMonthButtonDisabled}>
                                                            {"<"}
                                                        </CButton>
                                                        <CFormSelect
                                                            size='sm'
                                                            value={getYear(date)}
                                                            onChange={({ target: { value } }) => changeYear(value)}
                                                        >
                                                            {years.map((option) => (
                                                                <option key={option} value={option}>
                                                                    {option}
                                                                </option>
                                                            ))}
                                                        </CFormSelect>

                                                        <CFormSelect
                                                            size='sm'
                                                            value={months[getMonth(date)]}
                                                            onChange={({ target: { value } }) =>
                                                                changeMonth(months.indexOf(value))
                                                            }
                                                        >
                                                            {months.map((option) => (
                                                                <option key={option} value={option}>
                                                                    {option}
                                                                </option>
                                                            ))}
                                                        </CFormSelect>

                                                        <CButton
                                                            color="primary"
                                                            size='sm'
                                                            onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                                            {">"}
                                                        </CButton>
                                                    </div>
                                                )}
                                                selected={customHeaderStartDate}
                                                onChange={(date) => setCustomHeaderStartDate(date)}
                                            />
                                        </CCol>
                                    </CRow>

                                </CCol>

                                <CCol id='customDatepickerOutput'>
                                    {customHeaderStartDate.toDateString()}
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>

                <CCol lg={6} md={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Example 4</strong><small>{' '}| Date Range #2 - Single Input Box</small>
                        </CCardHeader>
                        <CCardBody>
                            <CRow className="align-items-center">
                                <CCol md={6} xs={12} >
                                    <CRow>
                                        <CCol>
                                            <small>Simple:</small>
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol id='dateRange3'>
                                            <DatePicker
                                                calendarClassName="custom-datepicker-theme"
                                                selectsRange={true}
                                                startDate={example4SimpleStartDate}
                                                endDate={example4SimpleEndDate}
                                                onChange={(update) => {
                                                    setExample4SimpleDateRange(update);
                                                }}
                                                isClearable={true}
                                            />
                                        </CCol>
                                    </CRow>
                                </CCol>

                                <CCol md={6} xs={12} >
                                    <CRow>
                                        <CCol>
                                            <small>With Portal:</small>
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol id='dateRange4'>
                                            <DatePicker
                                                calendarClassName="custom-datepicker-theme"
                                                selectsRange={true}
                                                startDate={example4PortalStartDate}
                                                endDate={example4PortalEndDate}
                                                onChange={(update) => {
                                                    setExample4PortalDateRange(update);
                                                }}
                                                withPortal
                                            />
                                        </CCol>
                                    </CRow>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>

                <CCol lg={4} md={6} sm={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Example 5</strong><small>{' '}| Month Picker</small>
                        </CCardHeader>
                        <CCardBody>
                            <CRow className="align-items-center">
                                <CCol id='monthpicker' md={8} xs={12} className='mb-2'>
                                    <DatePicker
                                        selected={monthPickerDate}
                                        onChange={(date) => setMonthPickerDate(date)}
                                        renderMonthContent={renderMonthContent}
                                        showMonthYearPicker
                                        dateFormat="MM/yyyy"
                                        calendarClassName="custom-datepicker-theme"
                                    />
                                </CCol>
                                <CCol md={4} xs={12} >
                                    {monthPickerDate.getMonth() + 1}/{monthPickerDate.getFullYear()}
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>

                <CCol lg={4} md={6} sm={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Example 6</strong><small>{' '}| Quarter Picker</small>
                        </CCardHeader>
                        <CCardBody>
                            <CRow className="align-items-center">
                                <CCol id='quarterpicker' md={8} xs={12} className='mb-2'>
                                    <DatePicker
                                        selected={quarterPickerDate}
                                        onChange={(date) => setQuarterPickerDate(date)}
                                        renderQuarterContent={renderQuarterContent}
                                        showQuarterYearPicker
                                        dateFormat="yyyy, QQQ"
                                        calendarClassName="custom-datepicker-theme"
                                    />
                                </CCol>
                                <CCol md={4} xs={12} >
                                    {quarterPickerDate.getFullYear()}, Q{Math.floor((quarterPickerDate.getMonth() + 3) / 3)}
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>

                <CCol lg={4} md={6} sm={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Example 7</strong><small>{' '}| Year Picker</small>
                        </CCardHeader>
                        <CCardBody>
                            <CRow className="align-items-center">
                                <CCol id='yearpicker' md={8} xs={12} className='mb-2'>
                                    <DatePicker
                                        selected={yearPickerDate}
                                        onChange={(date) => setYearPickerDate(date)}
                                        renderYearContent={renderYearContent}
                                        showYearPicker
                                        dateFormat="yyyy"
                                        calendarClassName="custom-datepicker-theme"
                                    />
                                </CCol>
                                <CCol md={4} xs={12} >
                                    {yearPickerDate.getFullYear()}
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default Datepicker;