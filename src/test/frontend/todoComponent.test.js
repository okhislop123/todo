/* eslint-disable no-new */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Todo from '../../frontend/components/Todo';

const mockStore = configureStore([thunk]);
const store = mockStore({
  startup: { complete: false },
});

configure({ adapter: new Adapter() });

// eslint-disable-next-line no-undef
it('renders without crashing', () => {
  const wrapper = render(
    <Provider store={store}>
      <Todo />
    </Provider>,
  );
  expect(wrapper).toMatchSnapshot();
  // expect(wrapper.find('.container')).to.have.lengthOf(3);
  // expect(test.find('Startup').length).toEqual(1);
});
