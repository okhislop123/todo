import React, { useEffect, useState } from 'react';
import { List, Checkbox, Typography, Button, Input, Popconfirm, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchTodo } from '../../store/actions/todo';
import { getUrl } from '../../helpers/url';
import { successMessage, warningMessage } from '../../helpers/message';

const { Title } = Typography;

export default function Todo() {
  const dispatch = useDispatch();
  const [todoName, setTodoName] = useState('');
  const [editTodoName, setEditToDoName] = useState('');
  const [editTodoId, setEditToDoId] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    dispatch(fetchTodo);
  }, [dispatch]);

  const todos = useSelector(state => state.todo.todos);
  const createTodo = async () => {
    try {
      const res = await axios({
        url: getUrl('/api/v1/doto'),
        method: 'POST',
        data: {
          name: todoName,
        },
      });
      successMessage(res.data.message);
      setTodoName('');
      dispatch(fetchTodo);
    } catch (err) {
      const showErr = { ...err };
      warningMessage(showErr.response.data.message);
    }
  };
  const deleteTodo = async id => {
    try {
      const res = await axios({
        url: getUrl(`/api/v1/doto/${id}`),
        method: 'delete',
      });
      dispatch(fetchTodo);
      successMessage(res.data.message);
    } catch (err) {
      const showErr = { ...err };
      warningMessage(showErr.response.data.message);
    }
  };
  const showModal = (name, id) => {
    setIsModalVisible(true);
    setEditToDoName(name);
    setEditToDoId(id);
  };

  const handleOk = async () => {
    try {
      const res = await axios({
        url: getUrl(`/api/v1/doto/${editTodoId}`),
        method: 'put',
        data: {
          name: editTodoName,
        },
      });
      dispatch(fetchTodo);
      successMessage(res.data.message);
      setIsModalVisible(false);
    } catch (err) {
      const showErr = { ...err };
      warningMessage(showErr.response.data.message);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditToDoName('');
    setEditToDoId(0);
  };

  return (
    <div className="container" style={{ margin: '30px 0' }}>
      <div style={{ marginBottom: 30 }}>
        <Input onChange={e => setTodoName(e.target.value)} value={todoName} size="large" style={{ width: 'calc(100% - 100px)' }} />
        <Button style={{ width: 100 }} size="large" type="primary" onClick={createTodo}>
          Add
        </Button>
      </div>
      <List
        size="small"
        bordered
        dataSource={
          todos &&
          todos.map((item, index) => {
            return (
              <div key={index} className="todolist">
                <Title level={5} style={{ margin: 0 }}>
                  <Checkbox> {item.name}</Checkbox>
                </Title>

                <div>
                  <Button className="delbutton">
                    <Popconfirm title="Are you sure to delete todo?" onConfirm={() => deleteTodo(item._id)} okText="Yes" cancelText="No">
                      Delete
                    </Popconfirm>
                  </Button>
                  <Button className="editbutton" onClick={() => showModal(item.name, item._id)}>
                    {' '}
                    Edit{' '}
                  </Button>
                </div>
              </div>
            );
          })
        }
        renderItem={item => <List.Item>{item}</List.Item>}
      />
      <Modal title="Edit Todo" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Input value={editTodoName} onChange={e => setEditToDoName(e.target.value)} placeholder="Todo name" />
      </Modal>
    </div>
  );
}
