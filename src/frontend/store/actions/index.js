// eslint-disable-next-line import/prefer-default-export
export const createAction = (type, payload) => {
  return {
    type,
    payload,
  };
};

export const types = {
  FET_TODO: 'FET_TODO',
};
