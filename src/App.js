import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import 'normalize.css'
import './reset.css'
import Sortable from 'sortablejs'
import * as localStore from './localStore'
import AV from 'leancloud-storage'
var APP_ID = 'fUWj9kUwc0tvfgPi2vPqYdlz-gzGzoHsz';
var APP_KEY = 'bEvGkmAfWt2nvNG3XvEzQuYV';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newTodo: '',
      todoList: localStore.load('todoList') || []
    }
  }
  render() {

    let todos = this.state.todoList
       .filter((item)=> !item.deleted)
       .map((item,index)=>{
      return (
        <li key={index}>
          <TodoItem todo={item} onToggle={this.toggle.bind(this)} 
            onDelete={this.delete.bind(this)}/>
        </li>
      )
    })
    
    return (
      <div className="App">
        <h1>我的待办</h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo} 
            onChange={this.changeTitle.bind(this)}
            onSubmit={this.addTodo.bind(this)} 
            />
        </div>
        <ol id="items">
          {todos}
        </ol>
      </div>
    )
  }
  componentDidUpdate(){
    localStore.save('todoList', this.state.todoList)
  }
  componentDidMount() {
       var el = document.getElementById('items');
       var sortable = Sortable.create(el,{
            animation: 150
       });
    }

    toggle(e, todo){
    todo.status = todo.status === 'completed' ? '' : 'completed'
    this.setState(this.state) 
    
  }
  changeTitle(event){
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    })
    
  }
  addTodo(event){
    if (!event.target.value){
      return alert('请检查输入内容')
    }
    this.state.todoList.push({
      id: idMaker(),
      title: event.target.value,
      status: null,
      deleted: false
    })
    this.setState({
      newTodo: '',
      todoList: this.state.todoList
    })
    
  }
    delete(event, todo){
    todo.deleted = true
    this.setState(this.state)
    
    }
}

export default App;
let id = 0
function idMaker(){
  id += 1
  return id
}
