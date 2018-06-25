import React from 'react';
import ToDoList from '../index';
import {shallow, mount} from 'enzyme'
import jsdom from 'jsdom'

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });



const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView

describe('check the status of add todo list',  () => {

    it('load as it is', function (){
       shallow(<ToDoList />);
    });

    it('load data with list', () => {

        let items = [
            {
                "id" : 1,
                "taskName": "some task"
            },
            {
                "id" : 2,
                "taskName": "some another task"
            }
        ]

        const todo = mount(<ToDoList items={items}/>);
        let totalITems = todo.find('li').length;
        expect(totalITems).toEqual(2)

    })
});