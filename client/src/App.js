import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SocketApi from './socket.api';

class App extends Component {
  state = {
    messages: [],
    typingMessage: ''
  };

  constructor(props) {
    super(props);
    SocketApi.subscribeToMessages(msgData => {
      this.setState({
        messages: this.state.messages.concat(msgData)
      });
    });
  }

  renderMessages = () => {
    return this.state.messages.map((message, i) => (
      <li key={i}>
        <strong>
          {message.sender}:
        </strong>&nbsp;
        {message.content}
      </li>
    ));
  };

  changeTypingMessage = evt => {
    this.setState({
      typingMessage: evt.target.value
    })
  }

  onSendMessage = () => {
    if (!this.state.name) {
      return;
    }
    SocketApi.emitMessage({
      sender: this.state.name,
      content: this.state.typingMessage
    });
    this.setState({ typingMessage: '' });
  }

  render() {
    return (
      <div className="App">
        <ul id="messages">
          {this.renderMessages()}
        </ul>
        <div className="form_div">
          <input
            type="text"
            value={this.state.name}
            onChange={evt => this.setState({ name: evt.target.value })}
            placeholder="Your Name"
          />
          <input
            id="m"
            autoComplete="off"
            onChange={this.changeTypingMessage}
            value={this.state.typingMessage}
          />
          <button onClick={this.onSendMessage}>Send</button>
        </div>
      </div>
    );
  }
}

export default App;
