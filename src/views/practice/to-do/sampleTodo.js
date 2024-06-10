import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CCardFooter,
} from '@coreui/react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import axios from 'axios';

const columns = [
  { id: 'To Do', title: 'To Do' },
  { id: 'Doing', title: 'Doing' },
  { id: 'Done', title: 'Done' },
];

const SampleToDo = () => {
  const token = localStorage.getItem('token');
  const [userId, setUserId] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const userIdFromToken = decodedToken.id;
      setUserId(userIdFromToken);
    }

    axios.get('http://localhost:5000/api/tasks', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => console.error(error));
  }, [token]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    const sourceDroppableId = result.source.droppableId;
    const destinationDroppableId = result.destination.droppableId;

    const updatedTasks = Array.from(tasks);
    const sourceTasks = getTasksByStatus(sourceDroppableId);
    const destinationTasks = getTasksByStatus(destinationDroppableId);

    const [movedTask] = sourceTasks.splice(sourceIndex, 1);
    movedTask.status = destinationDroppableId;
    destinationTasks.splice(destinationIndex, 0, movedTask);

    const newTasks = tasks.map(task => 
      task.id === movedTask.id ? movedTask : task
    );

    setTasks(newTasks);

    axios.put(`http://localhost:5000/api/tasks/${movedTask.id}`, {
      title: movedTask.title,
      content: movedTask.content,
      start_date: movedTask.start_date,
      target_end_date: movedTask.target_end_date,
      status: movedTask.status,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .catch(error => console.error(error));
  };

  const getTasksByStatus = (status) => tasks.filter(task => task.status === status);

  return (
    <CContainer>
      <CRow xs={{ cols: 1 }} md={{ cols: 3 }} className="g-4">
        <DragDropContext onDragEnd={onDragEnd}>
          {columns.map((column) => (
            <CCol key={column.id}>
              <CCard className="h-100">
                <CCardHeader>{column.title}</CCardHeader>
                <CCardBody style={{ height: '650px', overflowY: 'auto', padding: '10px' }}>
                  <Droppable droppableId={column.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{ height: '100%', background: '#f8f9fa', padding: '5px', borderRadius: '5px' }}
                      >
                        {getTasksByStatus(column.id).map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="mb-2"
                                style={{
                                  ...provided.draggableProps.style,
                                  userSelect: 'none',
                                  padding: '0px',
                                  margin: '0 0 8px 0',
                                  minHeight: '50px',
                                  backgroundColor: '#fff',
                                  color: '#333',
                                  borderRadius: '6px',
                                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                                }}
                              >
                                <CCard>
                                  <CCardHeader>{task.title}</CCardHeader>
                                  <CCardBody>{task.content}</CCardBody>
                                </CCard>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </CCardBody>
                <CCardFooter>
                  <div className="d-grid gap-2">
                    <CButton color="primary">Add task button</CButton>
                  </div>
                </CCardFooter>
              </CCard>
            </CCol>
          ))}
        </DragDropContext>
      </CRow>
    </CContainer>
  );
};

export default SampleToDo;
