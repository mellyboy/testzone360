import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardTitle,
  CCardSubtitle,
  CCardText,
  CCol,
  CContainer,
  CRow,
} from '@coreui/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Helper function to reorder the list
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const DraggableCards = () => {
  const [cards, setCards] = useState([
    {
      id: 'card-1',
      title: 'CARD 1',
      subtitle: 'You can drag me.',
      text: 'You can drop me inside the BIG card, but not on CARD 2.',
    },
    {
      id: 'card-2',
      title: 'CARD 2',
      subtitle: 'You can drag me',
      text: 'You can drop me inside the BIG card, but not on CARD 1.',
    },
  ]);

  const [insideCard, setInsideCard] = useState([]);
  const [bigCardColor, setBigCardColor] = useState('danger');

  useEffect(() => {
    if (insideCard.length === 0) {
      setBigCardColor('danger');
    } else if (insideCard.length === 1) {
      setBigCardColor('warning');
    } else if (insideCard.length === 2) {
      setBigCardColor('success');
    }
  }, [insideCard]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    // If dragging inside the main area
    if (source.droppableId === 'droppable' && destination.droppableId === 'droppable') {
      const newCards = reorder(cards, source.index, destination.index);
      setCards(newCards);
    }

    // If dragging into the big card
    if (source.droppableId === 'droppable' && destination.droppableId === 'insideCard') {
      const newCards = Array.from(cards);
      const [movedCard] = newCards.splice(source.index, 1);
      setCards(newCards);
      setInsideCard([...insideCard, movedCard]);
    }

    // If dragging inside the big card
    if (source.droppableId === 'insideCard' && destination.droppableId === 'insideCard') {
      const newInsideCards = reorder(insideCard, source.index, destination.index);
      setInsideCard(newInsideCards);
    }

    // If dragging out of the big card
    if (source.droppableId === 'insideCard' && destination.droppableId === 'droppable') {
      const newInsideCards = Array.from(insideCard);
      const [movedCard] = newInsideCards.splice(source.index, 1);
      setInsideCard(newInsideCards);
      setCards([...cards, movedCard]);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided) => (
          <CRow {...provided.droppableProps} ref={provided.innerRef}>
            {cards.map((card, index) => (
              <Draggable key={card.id} draggableId={card.id} index={index}>
                {(provided) => (
                  <CCol
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="mb-4"
                  >
                    <CCard className="h-100">
                      <CCardBody>
                        <CCardTitle>{card.title}</CCardTitle>
                        <CCardSubtitle className="mb-2 text-body-secondary">
                          {card.subtitle}
                        </CCardSubtitle>
                        <CCardText>
                          {card.text}
                        </CCardText>
                      </CCardBody>
                    </CCard>
                  </CCol>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </CRow>
        )}
      </Droppable>

      <Droppable droppableId="insideCard">
        {(provided) => (
          <CContainer {...provided.droppableProps} ref={provided.innerRef}>
            <CCard id='bigCard' color={bigCardColor} textColor="white" className="mt-4">
              <CCardBody id='bigCardBody'>
                <CCardTitle>BIG CARD</CCardTitle>
                <CCardSubtitle className="mb-2 text-body-secondary">
                  Drop cards here
                </CCardSubtitle>
                <CCardText >
                  {insideCard.length === 0
                    ? 'No cards here'
                    : 'Cards inside this big card:'}
                </CCardText>
                {insideCard.map((card, index) => (
                  <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided) => (
                      <CCol
                      sm={6}
                      md={4}
                      lg={3}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="mb-4"
                      >
                        <CCard id={card.id} className="h-100">
                          <CCardBody>
                            <CCardTitle>{card.title}</CCardTitle>
                            <CCardSubtitle className="mb-2 text-body-secondary">
                              {card.subtitle}
                            </CCardSubtitle>
                            <CCardText>
                              {card.text}
                            </CCardText>
                          </CCardBody>
                        </CCard>
                      </CCol>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </CCardBody>
            </CCard>
          </CContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableCards;
