import React, { useState } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
    CContainer,
    CModal,
    CModalBody,
    CModalContent,
    CModalTitle,
    CModalHeader,
    CModalDialog,
    CModalFooter,
    CTooltip,
    CPopover,
    CLink,
    CFormInput,
    CFormTextarea
} from '@coreui/react';

const Modal = () => {

    const [shortModal, setShortModal] = useState(false)
    const [longModal, setLongModal] = useState(false)
    const [scrollableModal, setScrollableModal] = useState(false)
    const [staticModal, setStaticModal] = useState(false)

    const [fullScreenModal, setFullScreenModal] = useState(false)
    const [toggleBetweenModal, setToggleBetweenModal] = useState(false)
    const [toggleBetweenModal2, setToggleBetweenModal2] = useState(false)
    const [componentWithinModal, setComponentWithinModal] = useState(false)

    return (
        <CContainer>
            <CRow>
                <CCol xs={12} md={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Example 1</strong><small>{' '}| Basic Modal</small>
                        </CCardHeader>
                        <CCardBody>
                            <CContainer>
                                <CRow>
                                    <CCol xs={12} md={3}>
                                        <CRow className="mb-2">
                                            <CCol>
                                                <div className="d-grid gap-2">
                                                    <CButton id='btnShortContentModal' color="primary" onClick={() => setShortModal(!shortModal)}>Launch Short Content Modal</CButton>
                                                    <CModal
                                                        alignment="center"
                                                        scrollable
                                                        visible={shortModal}
                                                        onClose={() => setShortModal(false)}
                                                        aria-labelledby="ShortContentModal"
                                                    >
                                                        <CModalHeader>
                                                            <CModalTitle id="shortContentModal">
                                                                Cat chasing phantoms
                                                            </CModalTitle>
                                                        </CModalHeader>
                                                        <CModalBody>
                                                            <p>
                                                                Find box a little too small and curl up with fur hanging out my water bowl is clean and freshly replenished,
                                                                so i'll drink from the toilet so refuse to drink water except out of someone's glass pose purrfectly to show
                                                                my beauty but throwup on your pillow.
                                                            </p>
                                                            <p>
                                                                Spread kitty litter all over house allways wanting food or scratch so owner bleeds pushes butt to face. Purr purr purr
                                                                until owner pets why owner not pet me hiss scratch meow crash against wall but walk away like nothing happened being
                                                                gorgeous with belly side up.
                                                            </p>
                                                            <p>
                                                                Meow meow, i tell my human lay on arms while you're using the keyboard spread kitty litter all over house or hunt anything
                                                                that moves, for lie in the sink all day.
                                                            </p>
                                                        </CModalBody>
                                                        <CModalFooter>
                                                            <CButton color="secondary" onClick={() => setShortModal(false)}>
                                                                Close
                                                            </CButton>
                                                        </CModalFooter>
                                                    </CModal>
                                                </div>
                                            </CCol>
                                        </CRow>
                                    </CCol>
                                    <CCol xs={12} md={3}>
                                        <CRow className="mb-2">
                                            <CCol>
                                                <div className="d-grid gap-2">
                                                    <CButton id='btnLongContentModal' color="primary" onClick={() => setLongModal(!longModal)}>Long Content Modal</CButton>
                                                    <CModal
                                                        visible={longModal}
                                                        onClose={() => setLongModal(false)}
                                                        aria-labelledby="LongContentModal"
                                                    >
                                                        <CModalHeader>
                                                            <CModalTitle id="longContentModal">Cat chasing phantoms</CModalTitle>
                                                        </CModalHeader>
                                                        <CModalBody>
                                                            <p>
                                                                Find box a little too small and curl up with fur hanging out my water bowl is clean and freshly replenished,
                                                                so i'll drink from the toilet so refuse to drink water except out of someone's glass pose purrfectly to show
                                                                my beauty but throwup on your pillow.
                                                            </p>
                                                            <p>
                                                                Spread kitty litter all over house allways wanting food or scratch so owner bleeds pushes butt to face. Purr purr purr
                                                                until owner pets why owner not pet me hiss scratch meow crash against wall but walk away like nothing happened being
                                                                gorgeous with belly side up.
                                                            </p>
                                                            <p>
                                                                Meow meow, i tell my human lay on arms while you're using the keyboard spread kitty litter all over house or hunt anything
                                                                that moves, for lie in the sink all day.
                                                            </p>
                                                            <p>
                                                                Litter kitter kitty litty little kitten big roar roar feed me ooh, are those your $250 dollar sandals? lemme use that as
                                                                my litter box cough hairball, eat toilet paper.
                                                            </p>
                                                            <p>
                                                                Floof tum, tickle bum, jellybean footies curly toes Gate keepers of hell, gimme attention gimme attention gimme attention gimme
                                                                attention gimme attention gimme attention just kidding i don't want it anymore meow bye so sniff sniff.
                                                            </p>
                                                            <p>
                                                                Scratch the postman wake up lick paw wake up owner meow meow bite the neighbor's bratty kid so jump on human and sleep on her all
                                                                night long be long in the bed, purr in the morning and then give a bite to every human around for not waking up request food,
                                                            </p>
                                                            <p>
                                                                Look at dog hiiiiiisssss decide to want nothing to do with my owner today but jump five feet high and sideways when a shadow moves,
                                                                yet paw at beetle and eat it before it gets away but sleeps on my head.
                                                            </p>
                                                            <p>
                                                                Cough furball purr. Hiding behind the couch until lured out by a feathery toy when owners are asleep, cry for no apparent reason poop in a
                                                                handbag look delicious and drink the soapy mopping up water then puke giant foamy fur-balls and eat fish on floor.
                                                            </p>
                                                            <p>
                                                                Lick the plastic bag chase the pig around the house but pet my belly, you know you want to; seize the hand and shred it! run as fast as i
                                                                can into another room for no reason slap the dog because cats rule but steal raw zucchini off kitchen counter yet playing with balls of wool.
                                                            </p>
                                                            <p>
                                                                Meow ask for petting or cereal boxes make for five star accommodation but find empty spot in cupboard and sleep all day miaow then turn
                                                                around and show you my bum eat and than sleep on your face ccccccccccccaaaaaaaaaaaaaaatttttttttttttttttssssssssssssssss.
                                                            </p>
                                                            <p>
                                                                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus
                                                                vel augue laoreet rutrum faucibus dolor auctor.
                                                            </p>
                                                            <p>
                                                                Murr i hate humans they are so annoying cattt catt cattty cat being a cat and eat half my food and ask for more and sweet beast munch on tasty
                                                                moths climb into cupboard and lick the salt off rice cakes jump launch to pounce upon little yarn mouse, bare fangs at toy run hide in litter box
                                                                until treats are fed.
                                                            </p>
                                                            <p>
                                                                Find box a little too small and curl up with fur hanging out my water bowl is clean and freshly replenished,
                                                                so i'll drink from the toilet so refuse to drink water except out of someone's glass pose purrfectly to show
                                                                my beauty but throwup on your pillow.
                                                            </p>
                                                            <p>
                                                                Spread kitty litter all over house allways wanting food or scratch so owner bleeds pushes butt to face. Purr purr purr
                                                                until owner pets why owner not pet me hiss scratch meow crash against wall but walk away like nothing happened being
                                                                gorgeous with belly side up.
                                                            </p>
                                                            <p>
                                                                Meow meow, i tell my human lay on arms while you're using the keyboard spread kitty litter all over house or hunt anything
                                                                that moves, for lie in the sink all day.
                                                            </p>
                                                            <p>
                                                                Litter kitter kitty litty little kitten big roar roar feed me ooh, are those your $250 dollar sandals? lemme use that as
                                                                my litter box cough hairball, eat toilet paper.
                                                            </p>
                                                            <p>
                                                                Floof tum, tickle bum, jellybean footies curly toes Gate keepers of hell, gimme attention gimme attention gimme attention gimme
                                                                attention gimme attention gimme attention just kidding i don't want it anymore meow bye so sniff sniff.
                                                            </p>
                                                            <p>
                                                                Time to go zooooom pelt around the house and up and down stairs chasing phantoms and sometimes switches in french and say "miaou"
                                                                just because well why not so reaches under door into adjacent room.
                                                            </p>
                                                        </CModalBody>
                                                        <CModalFooter>
                                                            <CButton color="secondary" onClick={() => setLongModal(false)}>
                                                                Close
                                                            </CButton>
                                                        </CModalFooter>
                                                    </CModal>
                                                </div>
                                            </CCol>
                                        </CRow>
                                    </CCol>
                                    <CCol xs={12} md={3}>
                                        <CRow className="mb-2">
                                            <CCol>
                                                <div className="d-grid gap-2">
                                                    <CButton id='btnScrollableModal' color="primary" onClick={() => setScrollableModal(!scrollableModal)}>Scrollable Modal</CButton>
                                                    <CModal
                                                        scrollable
                                                        visible={scrollableModal}
                                                        onClose={() => setScrollableModal(false)}
                                                        aria-labelledby="ScrollableModal"
                                                    >
                                                        <CModalHeader>
                                                            <CModalTitle id="scrollableModal">Cat chasing phantoms</CModalTitle>
                                                        </CModalHeader>
                                                        <CModalBody>
                                                            <p>
                                                                Find box a little too small and curl up with fur hanging out my water bowl is clean and freshly replenished,
                                                                so i'll drink from the toilet so refuse to drink water except out of someone's glass pose purrfectly to show
                                                                my beauty but throwup on your pillow.
                                                            </p>
                                                            <p>
                                                                Spread kitty litter all over house allways wanting food or scratch so owner bleeds pushes butt to face. Purr purr purr
                                                                until owner pets why owner not pet me hiss scratch meow crash against wall but walk away like nothing happened being
                                                                gorgeous with belly side up.
                                                            </p>
                                                            <p>
                                                                Meow meow, i tell my human lay on arms while you're using the keyboard spread kitty litter all over house or hunt anything
                                                                that moves, for lie in the sink all day.
                                                            </p>
                                                            <p>
                                                                Litter kitter kitty litty little kitten big roar roar feed me ooh, are those your $250 dollar sandals? lemme use that as
                                                                my litter box cough hairball, eat toilet paper.
                                                            </p>
                                                            <p>
                                                                Floof tum, tickle bum, jellybean footies curly toes Gate keepers of hell, gimme attention gimme attention gimme attention gimme
                                                                attention gimme attention gimme attention just kidding i don't want it anymore meow bye so sniff sniff.
                                                            </p>
                                                            <p>
                                                                Scratch the postman wake up lick paw wake up owner meow meow bite the neighbor's bratty kid so jump on human and sleep on her all
                                                                night long be long in the bed, purr in the morning and then give a bite to every human around for not waking up request food,
                                                            </p>
                                                            <p>
                                                                Look at dog hiiiiiisssss decide to want nothing to do with my owner today but jump five feet high and sideways when a shadow moves,
                                                                yet paw at beetle and eat it before it gets away but sleeps on my head.
                                                            </p>
                                                            <p>
                                                                Cough furball purr. Hiding behind the couch until lured out by a feathery toy when owners are asleep, cry for no apparent reason poop in a
                                                                handbag look delicious and drink the soapy mopping up water then puke giant foamy fur-balls and eat fish on floor.
                                                            </p>
                                                            <p>
                                                                Lick the plastic bag chase the pig around the house but pet my belly, you know you want to; seize the hand and shred it! run as fast as i
                                                                can into another room for no reason slap the dog because cats rule but steal raw zucchini off kitchen counter yet playing with balls of wool.
                                                            </p>
                                                            <p>
                                                                Meow ask for petting or cereal boxes make for five star accommodation but find empty spot in cupboard and sleep all day miaow then turn
                                                                around and show you my bum eat and than sleep on your face ccccccccccccaaaaaaaaaaaaaaatttttttttttttttttssssssssssssssss.
                                                            </p>
                                                            <p>
                                                                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus
                                                                vel augue laoreet rutrum faucibus dolor auctor.
                                                            </p>
                                                            <p>
                                                                Murr i hate humans they are so annoying cattt catt cattty cat being a cat and eat half my food and ask for more and sweet beast munch on tasty
                                                                moths climb into cupboard and lick the salt off rice cakes jump launch to pounce upon little yarn mouse, bare fangs at toy run hide in litter box
                                                                until treats are fed.
                                                            </p>
                                                            <p>
                                                                Find box a little too small and curl up with fur hanging out my water bowl is clean and freshly replenished,
                                                                so i'll drink from the toilet so refuse to drink water except out of someone's glass pose purrfectly to show
                                                                my beauty but throwup on your pillow.
                                                            </p>
                                                            <p>
                                                                Spread kitty litter all over house allways wanting food or scratch so owner bleeds pushes butt to face. Purr purr purr
                                                                until owner pets why owner not pet me hiss scratch meow crash against wall but walk away like nothing happened being
                                                                gorgeous with belly side up.
                                                            </p>
                                                            <p>
                                                                Meow meow, i tell my human lay on arms while you're using the keyboard spread kitty litter all over house or hunt anything
                                                                that moves, for lie in the sink all day.
                                                            </p>
                                                            <p>
                                                                Litter kitter kitty litty little kitten big roar roar feed me ooh, are those your $250 dollar sandals? lemme use that as
                                                                my litter box cough hairball, eat toilet paper.
                                                            </p>
                                                            <p>
                                                                Floof tum, tickle bum, jellybean footies curly toes Gate keepers of hell, gimme attention gimme attention gimme attention gimme
                                                                attention gimme attention gimme attention just kidding i don't want it anymore meow bye so sniff sniff.
                                                            </p>
                                                            <p>
                                                                Time to go zooooom pelt around the house and up and down stairs chasing phantoms and sometimes switches in french and say "miaou"
                                                                just because well why not so reaches under door into adjacent room.
                                                            </p>
                                                        </CModalBody>
                                                        <CModalFooter>
                                                            <CButton color="secondary" onClick={() => setScrollableModal(false)}>
                                                                Close
                                                            </CButton>
                                                        </CModalFooter>
                                                    </CModal>
                                                </div>
                                            </CCol>
                                        </CRow>
                                    </CCol>
                                    <CCol xs={12} md={3}>
                                        <CRow className="mb-2">
                                            <CCol>
                                                <div className="d-grid gap-2">
                                                    <CButton id='btnStaticModal' color="primary" onClick={() => setStaticModal(!staticModal)}>Static Backdrop Modal</CButton>
                                                    <CModal
                                                        backdrop="static"
                                                        visible={staticModal}
                                                        onClose={() => setStaticModal(false)}
                                                        aria-labelledby="ShortContentModal"
                                                    >
                                                        <CModalHeader>
                                                            <CModalTitle id="shortContentModal">
                                                                Static Modal
                                                            </CModalTitle>
                                                        </CModalHeader>
                                                        <CModalBody>
                                                            <p>
                                                                I am a static modal. The modal will not close when clicking outside it.
                                                            </p>
                                                        </CModalBody>
                                                        <CModalFooter>
                                                            <CButton color="secondary" onClick={() => setStaticModal(false)}>
                                                                Close
                                                            </CButton>
                                                        </CModalFooter>
                                                    </CModal>
                                                </div>
                                            </CCol>
                                        </CRow>
                                    </CCol>
                                </CRow>
                            </CContainer>
                        </CCardBody>
                    </CCard>
                </CCol>

                <CCol xs={12} md={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Example 2</strong><small>{' '}| Advanced Modals</small>
                        </CCardHeader>
                        <CCardBody>
                            <CContainer>
                                <CRow>
                                    <CCol md={4} xs={12}>
                                        <CRow className="mb-2">
                                            <CCol>
                                                <div className="d-grid gap-2">
                                                    <CButton id='btnFullscreenModal' color="primary" onClick={() => setFullScreenModal(!fullScreenModal)}>Launch a Fullscreen Modal</CButton>
                                                    <CModal
                                                        id="fullscreenModal"
                                                        fullscreen
                                                        visible={fullScreenModal}
                                                        onClose={() => setFullScreenModal(false)}
                                                        aria-labelledby="FullscreenModal"
                                                    >
                                                        <CModalHeader>
                                                            <CModalTitle id="fullscreenModalTitle">Full Screen Modal</CModalTitle>
                                                        </CModalHeader>
                                                        <CModalBody>This is an example of fullscreen modal.</CModalBody>
                                                    </CModal>
                                                </div>
                                            </CCol>
                                        </CRow>
                                    </CCol>
                                    <CCol md={4} xs={12}>
                                        <CRow className="mb-2">
                                            <CCol>
                                                <div className="d-grid gap-2">
                                                    <CButton id='btnToggleBetweenModals' color="primary" onClick={() => setToggleBetweenModal(!toggleBetweenModal)}>Launch first modal</CButton>
                                                    <CModal
                                                        id="firstModal"
                                                        visible={toggleBetweenModal}
                                                        onClose={() => setToggleBetweenModal(false)}
                                                        aria-labelledby="ToggleBetweenModal1"
                                                    >
                                                        <CModalHeader>
                                                            <CModalTitle id="toggleBetweenModalTitle1">This is first modal...</CModalTitle>
                                                        </CModalHeader>
                                                        <CModalBody>
                                                            <p>Click the button to move to the second modal.</p>
                                                        </CModalBody>
                                                        <CModalFooter>
                                                            <CButton
                                                                id='toggleSecondModal'
                                                                color="primary"
                                                                onClick={() => {
                                                                    setToggleBetweenModal(false)
                                                                    setToggleBetweenModal2(true)
                                                                }}
                                                            >
                                                                Move to Second Modal
                                                            </CButton>
                                                        </CModalFooter>
                                                    </CModal>
                                                    <CModal
                                                        id='secondModal'
                                                        visible={toggleBetweenModal2}
                                                        onClick={() => {
                                                            setToggleBetweenModal(true)
                                                            setToggleBetweenModal2(false)
                                                        }}
                                                        aria-labelledby="ToggleBetweenModal2"
                                                    >
                                                        <CModalHeader>
                                                            <CModalTitle id="toggleBetweenModal2">This is the second modal...</CModalTitle>
                                                        </CModalHeader>
                                                        <CModalBody>
                                                            <p>Close this modal or click the button below to go back to first modal.</p>
                                                        </CModalBody>
                                                        <CModalFooter>
                                                            <CButton
                                                                id='toggleFirstModal'
                                                                color="primary"
                                                                onClick={() => {
                                                                    setToggleBetweenModal(true)
                                                                    setToggleBetweenModal2(false)
                                                                }}
                                                            >
                                                                Back to First Modal
                                                            </CButton>
                                                        </CModalFooter>
                                                    </CModal>
                                                </div>
                                            </CCol>
                                        </CRow>
                                    </CCol>

                                    <CCol md={4} xs={12}>
                                        <CRow className="mb-2">
                                            <CCol>
                                                <div className="d-grid gap-2">
                                                    <CButton id='btnComponentsWithinModal' color="primary" onClick={() => setComponentWithinModal(!componentWithinModal)}>Components Within Modal</CButton>
                                                    <CModal
                                                        id='componentsWithinModal'
                                                        alignment="center"
                                                        visible={componentWithinModal}
                                                        onClose={() => setComponentWithinModal(false)}
                                                        aria-labelledby="ComponentsWithinModal"
                                                    >
                                                        <CModalHeader>
                                                            <CModalTitle id="componentsWithinModalTitle">Components Within Modal</CModalTitle>
                                                        </CModalHeader>
                                                        <CModalBody>
                                                            <h5>Popover</h5>
                                                            <p>
                                                                Click{' '}
                                                                <CPopover title="Hello! I am the Popover Title" content="and I am the Popover Content">
                                                                    <CButton size='sm' id='popoverTriggerButtton' color="primary">this button</CButton>
                                                                </CPopover> to trigger a popover.
                                                            </p>
                                                            <hr />
                                                            <h5>Tooltips</h5>
                                                            <p>
                                                                You can hover over{' '}
                                                                <CTooltip content="Hi there!">
                                                                    <CLink id='modalHoverLink'>this link</CLink>
                                                                </CTooltip> to have tooltip.
                                                            </p>
                                                            <hr />
                                                            <h5>Textbox</h5>
                                                            <CFormInput placeholder="Textbox inside modal" type="text" id="modalTextbox" aria-label="Modal Text Box" />
                                                            <hr />
                                                            <h5>Textarea</h5>
                                                            <CFormTextarea
                                                                placeholder="Textarea inside modal"
                                                                id="modalFloatingTextArea"
                                                                style={{ height: '100px' }}
                                                            ></CFormTextarea>

                                                        </CModalBody>
                                                        <CModalFooter>
                                                            <CButton color="secondary" onClick={() => setComponentWithinModal(false)}>
                                                                Close
                                                            </CButton>
                                                        </CModalFooter>
                                                    </CModal>
                                                </div>
                                            </CCol>
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

export default Modal;
