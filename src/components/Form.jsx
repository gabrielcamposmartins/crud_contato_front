import React, { Component } from "react";
import UserService from "../services/UserService";
import { AiOutlineCheck } from "react-icons/ai";

export default class Form extends Component {
  userService;

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      email: "",
    };
    this.userService = new UserService();
    this.send = this.send.bind(this);
    this.baseState = this.state;
  }

  async send(e) {
    e.preventDefault();
    this.setState(this.baseState);
    let { name, phone, email } = this.state;
    let response = await this.userService.insertContact({ name, phone, email });
    if (response.status == 201 && response.ok == true) {
      this.props.func();
      alert("Contato criado com sucesso!");
    }
  }

  render() {
    return (
      <form>
        <div className="formTitle">
          <h2>Cadastro</h2>
        </div>
        <div>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={this.state.name}
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
            />
          </div>

          <div>
            <label>Phone</label>
            <input
              type="tel"
              value={this.state.phone}
              onChange={(e) => {
                this.setState({ phone: e.target.value });
              }}
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              value={this.state.email}
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="submitDiv">
          <button
            className="btnSubmit"
            onClick={(e) => {
              this.props.func();
              this.send(e);
            }}
          >
            Submit <AiOutlineCheck />
          </button>
        </div>
      </form>
    );
  }
}
