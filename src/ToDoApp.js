import React, {Component} from 'react';
import './ToDoApp.css';
import ToDoList from './components/todolist/index';

export default class ToDoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            items: []
        };
    }

    componentDidMount() {
        fetch('http://localhost:6060/api/todolist', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
            // body: JSON.stringify({
            //     list: {
            //         name: 'my list'
            //     }
            // })
        })
            .then((result) => result.json())
            .then((data) => {

                this.setState({
                    items: data
                });


            });


    }

    onChange = (event) => {
        this.setState({term: event.target.value});
    }

    onSubmit = (event) => {
        event.preventDefault();
        const {listId, term} = this.state;

        fetch('http://localhost:6060/api/todolist', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({

                id: listId,
                taskName: term

            })
        })
            .then(() => {
                return fetch(`http://localhost:6060/api/todolist`, {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json',
                    }
                }).then((res) => res.json())
            })
            .then((data) => {
                this.setState({
                    items: data
                    // items: data.list.items.map(({description}) => description)
                })
            });
    }

    render() {
        return (
            <div>
                <form className="App" onSubmit={this.onSubmit}>
                    <input value={this.state.term} onChange={this.onChange}/>
                    <button>Submit</button>
                </form>
                <ToDoList items={this.state.items}/>
            </div>
        );
    }
}