/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { createAction, types } from '.';
import { getUrl } from '../../helpers/url';

export const fetchTodo = async dispatch => {
  try {
    const res = await axios({
      url: getUrl('/api/v1/doto'),
      method: 'get',
    });
    dispatch(createAction(types.FET_TODO, res.data.data));
  } catch (err) {
    console.log(err);
  }
};
