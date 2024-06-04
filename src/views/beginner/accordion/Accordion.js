import React from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CAccordion,
    CAccordionHeader,
    CAccordionItem,
    CAccordionBody
} from '@coreui/react';

const Accordion = () => {
    return (
        <CRow>
            <CCol xs={6}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Example 1</strong><small>{' '}| Auto-close</small>
                    </CCardHeader>
                    <CCardBody>

                        <CAccordion activeItemKey={2}>
                            <CAccordionItem itemKey={1}>
                                <CAccordionHeader>Accordion Item #1</CAccordionHeader>
                                <CAccordionBody>
                                    <strong>First item.</strong> Attack feet behind the couch destroy 
                                    couch flop over give attitude hide when guests come over hopped up on goofballs hunt anything 
                                    that moves  claw drapes  stand in front of the computer screen  inspect anything brought into 
                                    the house shake treat  sweet beast under the bed lick butt bag stretch chase mice, swat at dog  
                                    intrigued by the shower why must they do that need to chase tail leave dead animals as gifts 
                                    chase imaginary bugs shake treat  attack feet flop over leave dead animals as gifts destroy couch 
                                    chase mice bag stretch.
                                </CAccordionBody>
                            </CAccordionItem>
                            <CAccordionItem itemKey={2}>
                                <CAccordionHeader>Accordion Item #2</CAccordionHeader>
                                <CAccordionBody>
                                    <strong>Second item.</strong> Hide when guests come over attack feet 
                                    swat at dog  intrigued by the shower sweet beast under the bed flop over need to chase tail bag 
                                    stretch  claw drapes inspect anything brought into the house behind the couch, give attitude lick 
                                    butt chase imaginary bugs destroy couch why must they do that  stand in front of the computer 
                                    screen  shake treat  chase mice leave dead animals as gifts, hunt anything that moves hopped up 
                                    on goofballs leave dead animals as gifts hunt anything that moves sweet beast under the bed flop 
                                    over behind the couch inspect anything brought into the house chase mice. Sweet beast under the 
                                    bed attack feet leave dead animals as gifts  intrigued by the shower chase imaginary bugs destroy 
                                    couch need to chase tail shake treat  hopped up on goofballs, swat at dog behind the couch  claw 
                                    drapes flop over give attitude lick butt chase mice,  stand in front of the computer screen  why 
                                    must they do that bag stretch hunt anything that moves inspect anything brought into the house 
                                    hide when guests come over need to chase tail.
                                </CAccordionBody>
                            </CAccordionItem>
                            <CAccordionItem itemKey={3}>
                                <CAccordionHeader>Accordion Item #3</CAccordionHeader>
                                <CAccordionBody>
                                    <strong>Third item.</strong>  Behind the couch need to chase tail 
                                    chase mice sweet beast under the bed bag stretch why must they do that attack feet destroy couch  
                                    claw drapes  stand in front of the computer screen , shake treat  flop over leave dead animals as 
                                    gifts hunt anything that moves inspect anything brought into the house give attitude hopped up on 
                                    goofballs chase imaginary bugs lick butt, hide when guests come over swat at dog  intrigued by the 
                                    shower chase mice hopped up on goofballs inspect anything brought into the house why must they do 
                                    that hunt anything that moves.
                                </CAccordionBody>
                            </CAccordionItem>
                        </CAccordion>

                    </CCardBody>
                </CCard>
            </CCol>

            <CCol xs={6}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Example 2</strong><small>{' '}| Stays Open</small>
                    </CCardHeader>
                    <CCardBody>

                        <CAccordion flush alwaysOpen activeItemKey={2} >
                        <CAccordionItem itemKey={1}>
                                <CAccordionHeader>Accordion Item #1</CAccordionHeader>
                                <CAccordionBody>
                                    <strong>First item.</strong> Attack feet behind the couch destroy 
                                    couch flop over give attitude hide when guests come over hopped up on goofballs hunt anything 
                                    that moves  claw drapes  stand in front of the computer screen  inspect anything brought into 
                                    the house shake treat  sweet beast under the bed lick butt bag stretch chase mice, swat at dog  
                                    intrigued by the shower why must they do that need to chase tail leave dead animals as gifts 
                                    chase imaginary bugs shake treat  attack feet flop over leave dead animals as gifts destroy couch 
                                    chase mice bag stretch.
                                </CAccordionBody>
                            </CAccordionItem>
                            <CAccordionItem itemKey={2}>
                                <CAccordionHeader>Accordion Item #2</CAccordionHeader>
                                <CAccordionBody>
                                    <strong>Second item.</strong> Hide when guests come over attack feet 
                                    swat at dog  intrigued by the shower sweet beast under the bed flop over need to chase tail bag 
                                    stretch  claw drapes inspect anything brought into the house behind the couch, give attitude lick 
                                    butt chase imaginary bugs destroy couch why must they do that  stand in front of the computer 
                                    screen  shake treat  chase mice leave dead animals as gifts, hunt anything that moves hopped up 
                                    on goofballs leave dead animals as gifts hunt anything that moves sweet beast under the bed flop 
                                    over behind the couch inspect anything brought into the house chase mice. Sweet beast under the 
                                    bed attack feet leave dead animals as gifts  intrigued by the shower chase imaginary bugs destroy 
                                    couch need to chase tail shake treat  hopped up on goofballs, swat at dog behind the couch  claw 
                                    drapes flop over give attitude lick butt chase mice,  stand in front of the computer screen  why 
                                    must they do that bag stretch hunt anything that moves inspect anything brought into the house 
                                    hide when guests come over need to chase tail.
                                </CAccordionBody>
                            </CAccordionItem>
                            <CAccordionItem itemKey={3}>
                                <CAccordionHeader>Accordion Item #3</CAccordionHeader>
                                <CAccordionBody>
                                    <strong>Third item.</strong>  Behind the couch need to chase tail 
                                    chase mice sweet beast under the bed bag stretch why must they do that attack feet destroy couch  
                                    claw drapes  stand in front of the computer screen , shake treat  flop over leave dead animals as 
                                    gifts hunt anything that moves inspect anything brought into the house give attitude hopped up on 
                                    goofballs chase imaginary bugs lick butt, hide when guests come over swat at dog  intrigued by the 
                                    shower chase mice hopped up on goofballs inspect anything brought into the house why must they do 
                                    that hunt anything that moves.
                                </CAccordionBody>
                            </CAccordionItem>
                        </CAccordion>

                    </CCardBody>
                </CCard>
            </CCol>

        </CRow>
    );
};

export default Accordion