/* eslint-disable no-undef */
const { agent } = require('supertest');

const http = process.env.PORT || 'http://127.0.0.1:3000';
const request = agent(http);

describe('TODO', () => {
  beforeEach(() => {
    jest.setTimeout(30000);
  });
  test('Get all doto', async () => {
    const res = await request.get('/api/v1/doto');
    expect(res.statusCode).toBe(200);
  });
  test('Create doto success', async () => {
    const res = await request.post('/api/v1/doto').send({
      name: `To be name ${Math.random() * 3}`,
    });
    expect(res.statusCode).toBe(201);
  });
  // test('Create doto fail, doto exits', async () => {
  //   const res = await request.post('/api/v1/doto').send({
  //     name: 'Todo test 2',
  //   });
  //   expect(res.statusCode).toBe(404);
  //   expect(res.request._data.name).not.toBeNull();
  // });
  test('Create doto fail, doto name empty', async () => {
    const res = await request.post('/api/v1/doto').send({
      name: '',
    });
    expect(res.statusCode).toBe(404);
    expect(res.request._data.name).toBeFalsy();
  });
  test('Update doto ', async () => {
    const listDoto = await request.get('/api/v1/doto');

    if ((JSON.parse(listDoto.res.text)).data.length) {
      const id = (JSON.parse(listDoto.res.text)).data[0]._id;
      const res = await request.put(`/api/v1/doto/${id}`).send({
        name: 'updated new name',
      });
      expect(res.statusCode).toBe(200);
    }
    expect('ID not found').toBe('ID not found');
  });
  test('Update doto fail, too name exits', async () => {
    const listDoto = await request.get('/api/v1/doto');
    if ((JSON.parse(listDoto.res.text)).data.length) {
      const id = (JSON.parse(listDoto.res.text)).data[0]._id;
      const res = await request.put(`/api/v1/doto/${id}`).send({
        name: 'updated new name',
      });
      expect(res.statusCode).toBe(404);
    }
    expect('ID not found').toBe('ID not found');
  });
  test('Delete doto', async () => {
    const listDoto = await request.get('/api/v1/doto');
    if ((JSON.parse(listDoto.res.text)).data.length) {
      const id = (JSON.parse(listDoto.res.text)).data[0]._id;
      const response = await request
        .delete(`/api/v1/doto/${id}`)
        .expect(200);
    } else {
      expect('ID not found').toBe('ID not found');
    }
  });
});
