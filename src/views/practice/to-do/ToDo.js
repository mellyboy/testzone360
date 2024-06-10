import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import {
    CContainer,
    CRow,
    CCol,
    CCard,
    CCardBody,
    CCardHeader,
    CButton,
    CCardFooter,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CForm,
    CFormInput,
    CFormSelect,
    CFormTextarea,
    CTooltip,
    CAlert
} from '@coreui/react';
import Icon from '@mdi/react';
import { mdiDelete, mdiFileEdit } from '@mdi/js';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import axios from 'axios';
import CIcon from '@coreui/icons-react';
import { cilPlus } from '@coreui/icons';

const columns = [
    { id: 'To Do', title: 'To Do' },
    { id: 'Doing', title: 'Doing' },
    { id: 'Done', title: 'Done' },
];

const ToDo = () => {
    const token = localStorage.getItem('token');
    const [userId, setUserId] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [currentColumn, setCurrentColumn] = useState('To Do');
    const [newTask, setNewTask] = useState({
        title: '',
        content: '',
        start_date: '',
        target_end_date: '',
        status: 'To Do',
    });
    const [taskBeingEdited, setTaskBeingEdited] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            const userIdFromToken = decodedToken.id;
            setUserId(userIdFromToken);
        }

        fetchAllTasks(token);

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

    const validateFields = (task) => {
        const errors = {};
        if (!task.title) {
            errors.title = 'Title is required.';
        } else if (task.title.length > 100) {
            errors.title = 'Title cannot exceed 100 characters.';
        }
        if (task.content.length > 2500) {
            errors.content = 'Content cannot exceed 2500 characters.';
        }
        return errors;
    };

    const fetchAllTasks = async (token) => {
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
    }

    const handleAddTask = () => {
        const errors = validateFields(newTask);
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        const taskToAdd = {
            ...newTask,
            start_date: new Date(newTask.start_date).getTime() / 1000,
            target_end_date: newTask.target_end_date ? new Date(newTask.target_end_date).getTime() / 1000 : null,
        };

        axios.post('http://localhost:5000/api/tasks', taskToAdd, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                setTasks(prevTasks => [...prevTasks, response.data]);
                setModalVisible(false);
                setNewTask({
                    title: '',
                    content: '',
                    start_date: '',
                    target_end_date: '',
                    status: currentColumn,
                });
                fetchAllTasks(token);
                setErrors({});
            })
            .catch(error => console.error(error));
    };

    const handleOpenModal = (columnId) => {
        setCurrentColumn(columnId);
        setNewTask({
            ...newTask,
            status: columnId,
        });
        setErrors({});
        setModalVisible(true);
    };

    const handleOpenEditModal = (task) => {
        setTaskBeingEdited(task);
        setErrors({});
        setEditModalVisible(true);
    };

    const handleEditTask = () => {
        const errors = validateFields(taskBeingEdited);
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        const updatedTask = {
            ...taskBeingEdited,
            start_date: new Date(taskBeingEdited.start_date).getTime() / 1000,
            target_end_date: taskBeingEdited.target_end_date ? new Date(taskBeingEdited.target_end_date).getTime() / 1000 : null,
        };

        axios.put(`http://localhost:5000/api/tasks/${taskBeingEdited.id}`, updatedTask, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                setTasks(prevTasks => prevTasks.map(task => task.id === response.data.id ? response.data : task));
                setEditModalVisible(false);
                setTaskBeingEdited(null);
                fetchAllTasks(token);
                setErrors({});
            })
            .catch(error => console.error(error));
    };

    const handleDeleteTask = (taskId) => {
        axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(() => {
                const updatedTasks = tasks.filter(task => task.id !== taskId);
                setTasks(updatedTasks);
            })
            .catch(error => console.error(error));
    };

    return (
        <CContainer>
            <CRow xs={{ cols: 1 }} md={{ cols: 3 }} className="g-4">
                <DragDropContext onDragEnd={onDragEnd}>
                    {columns.map((column) => (
                        <CCol key={column.id}>
                            <CCard className="h-100">
                                <CCardHeader>{column.title}</CCardHeader>
                                <Droppable droppableId={column.id}>
                                    {(provided) => (
                                        <CCardBody
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            style={{ height: '650px', overflowY: 'auto', padding: '10px' }}
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
                                                                borderRadius: '7px',
                                                                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                                                            }}
                                                        >
                                                            <CCard>
                                                                <CCardHeader>
                                                                    {task.title}
                                                                    <div className="task-corner-buttons">
                                                                        <CTooltip
                                                                            content="Edit Task"
                                                                            trigger={['hover']}
                                                                        >
                                                                            <CButton
                                                                                variant="ghost"
                                                                                className='task-small-button mdi-icon'
                                                                                size='sm'
                                                                                color='warning'
                                                                                onClick={() => handleOpenEditModal(task)}>
                                                                                <Icon path={mdiFileEdit} size={0.6} />
                                                                            </CButton>
                                                                        </CTooltip>

                                                                        <CTooltip
                                                                            content="Delete Task"
                                                                            trigger={['hover']}
                                                                        >
                                                                            <CButton
                                                                                variant="ghost"
                                                                                className='task-small-button mdi-icon'
                                                                                size='sm' color='danger'
                                                                                onClick={() => handleDeleteTask(task.id)}>
                                                                                <Icon path={mdiDelete} size={0.6} />
                                                                            </CButton>
                                                                        </CTooltip>
                                                                    </div>
                                                                </CCardHeader>
                                                                <CCardBody>{task.content}</CCardBody>
                                                            </CCard>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </CCardBody>
                                    )}
                                </Droppable>
                                <CCardFooter>
                                    <div className="d-grid gap-2">
                                        <CButton color="primary" variant="ghost" onClick={() => handleOpenModal(column.id)}>
                                            <CIcon icon={cilPlus} size="lg" />
                                            Add task
                                        </CButton>
                                    </div>
                                </CCardFooter>
                            </CCard>
                        </CCol>
                    ))}
                </DragDropContext>
            </CRow>
            <CModal
                transition={false}
                visible={modalVisible}
                onClose={() => { setModalVisible(false); setErrors({}); }}>
                <CModalHeader>
                    <CModalTitle>Add New Task</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CFormInput
                            className='mb-2'
                            label='Title *'
                            placeholder='Max 100 characters only.'
                            id="title"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        />
                        {errors.title && <CAlert color="danger">{errors.title}</CAlert>}
                        <CFormTextarea
                            className='mb-3'
                            label="Details"
                            placeholder='Max 2500 characters only.'
                            id="content"
                            value={newTask.content}
                            onChange={(e) => setNewTask({ ...newTask, content: e.target.value })}
                        />
                        {errors.content && <CAlert color="danger">{errors.content}</CAlert>}

                        <CRow>
                            <CCol xs={6}>
                                <CFormInput
                                    className='mb-3'
                                    label="Target Start Date"
                                    type="date"
                                    id="start_date"
                                    value={newTask.start_date}
                                    onChange={(e) => setNewTask({ ...newTask, start_date: e.target.value })}
                                />
                            </CCol>

                            <CCol xs={6}>
                                <CFormInput
                                    className='mb-3'
                                    label="Target End Date"
                                    type="date"
                                    id="target_end_date"
                                    value={newTask.target_end_date}
                                    onChange={(e) => setNewTask({ ...newTask, target_end_date: e.target.value })}
                                />
                            </CCol>
                        </CRow>

                        <CFormSelect
                            label="Status"
                            id="status"
                            value={newTask.status}
                            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                        >
                            {columns.map((column) => (
                                <option key={column.id} value={column.id}>{column.title}</option>
                            ))}
                        </CFormSelect>

                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setModalVisible(false)}>Cancel</CButton>
                    <CButton color="primary" onClick={handleAddTask}>Add Task</CButton>
                </CModalFooter>
            </CModal>

            <CModal
                transition={false}
                visible={editModalVisible}
                onClose={() => { setEditModalVisible(false); setErrors({}); }}>
                <CModalHeader>
                    <CModalTitle>Edit Task</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CFormInput
                            className='mb-2'
                            label='Title *'
                            placeholder='Max 100 characters only.'
                            id="title"
                            value={taskBeingEdited?.title || ''}
                            onChange={(e) => setTaskBeingEdited({ ...taskBeingEdited, title: e.target.value })}
                        />
                        {errors.title && <CAlert color="danger">{errors.title}</CAlert>}
                        <CFormTextarea
                            className='mb-3'
                            label="Details"
                            placeholder='Max 2500 characters only.'
                            id="content"
                            value={taskBeingEdited?.content || ''}
                            onChange={(e) => setTaskBeingEdited({ ...taskBeingEdited, content: e.target.value })}
                        />
                        {errors.content && <CAlert color="danger">{errors.content}</CAlert>}

                        <CRow>
                            <CCol xs={6}>
                                <CFormInput
                                    className='mb-3'
                                    label="Target Start Date"
                                    type="date"
                                    id="start_date"
                                    value={taskBeingEdited?.start_date || ''}
                                    onChange={(e) => setTaskBeingEdited({ ...taskBeingEdited, start_date: e.target.value })}
                                />
                            </CCol>

                            <CCol xs={6}>
                                <CFormInput
                                    className='mb-3'
                                    label="Target End Date"
                                    type="date"
                                    id="target_end_date"
                                    value={taskBeingEdited?.target_end_date || ''}
                                    onChange={(e) => setTaskBeingEdited({ ...taskBeingEdited, target_end_date: e.target.value })}
                                />
                            </CCol>
                        </CRow>

                        <CFormSelect
                            label="Status"
                            id="status"
                            value={taskBeingEdited?.status || ''}
                            onChange={(e) => setTaskBeingEdited({ ...taskBeingEdited, status: e.target.value })}
                        >
                            {columns.map((column) => (
                                <option key={column.id} value={column.id}>{column.title}</option>
                            ))}
                        </CFormSelect>

                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setEditModalVisible(false)}>Cancel</CButton>
                    <CButton color="primary" onClick={handleEditTask}>Save Changes</CButton>
                </CModalFooter>
            </CModal>
        </CContainer>
    );
};

export default ToDo;
