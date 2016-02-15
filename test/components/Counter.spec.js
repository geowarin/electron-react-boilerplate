import expect, { createSpy } from 'expect'
import {shallow} from 'enzyme';

import React from 'react';
import Counter from '../../app/ui/components/Counter';

const increment = createSpy();
const decrement = createSpy();
const counter = 42;
let props = {increment, decrement, counter};

describe('components', () => {

  describe('MyComponent', () => {

    it('should render the counter', () => {
      const component = shallow(<Counter {...props} />);
      expect(component.find('.counter').text()).toEqual('42');
    });

    it('should call increment on click', () => {
      const component = shallow(<Counter {...props} />);
      component.find('button').first().simulate('click');
      expect(increment).toHaveBeenCalled();
    });

    it('should call decrement on click', () => {
      const component = shallow(<Counter {...props} />);
      component.find('button').at(1).simulate('click');
      expect(decrement).toHaveBeenCalled();
    });
  });
});
