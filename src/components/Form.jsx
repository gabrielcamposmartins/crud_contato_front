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
  }

  async send(e) {
    e.preventDefault();
    let { name, phone, email } = this.state;
    let response = await this.userService.insertContact({ name, phone, email });
    if (response.status == 201 && response.ok == true) {
      this.props.func();
      alert("Contato criado com sucesso!");
    }
  }

  render() {
    return (
      <div>
        <form>
          <label>Name</label>
          <input
            type="text"
            onChange={(e) => {
              this.setState({ name: e.target.value });
            }}
          />
          <label>Phone</label>
          <input
            type="tel"
            onChange={(e) => {
              this.setState({ phone: e.target.value });
            }}
          />
          <label>Email</label>
          <input
            type="email"
            onChange={(e) => {
              this.setState({ email: e.target.value });
            }}
          />
          <button
            onClick={(e) => {
              this.props.func();
              this.send(e);
            }}
          >
            Submit <AiOutlineCheck />
          </button>
        </form>
      </div>
    );
  }
}
