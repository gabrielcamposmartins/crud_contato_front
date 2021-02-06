import React, { Component } from "react";
import UserService from "../services/UserService";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export default class Table extends Component {
  userService;

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      rows: [],
      id: 0,
      name: "",
      phone: "",
      email: "",
      tdRefs: [],
    };
    this.userService = new UserService();
    this.componentDidMount = this.componentDidMount.bind(this);
    this.setRef = this.setRef.bind(this);
    this.edit = this.edit.bind(this);
    this.renderViews = this.renderViews.bind(this);
  }

  setRef(ref, id, field) {
    if (ref) {
      ref.addEventListener("input", (e) => {
        if (id != this.state.id) {
          this.setState({ name: null, phone: null, email: null });
        }
        this.setState({ id: id });
        switch (field) {
          case "name":
            this.setState({ name: e.target.innerHTML });
            break;
          case "phone":
            this.setState({ phone: e.target.innerHTML });
            break;
          case "email":
            this.setState({ email: e.target.innerHTML });
            break;
        }
      });
      let array = this.state.tdRefs;
      array.push(ref);
      this.setState({ tdRefs: array });
    }
  }

  async edit(data) {
    let { id, name, phone, email } = this.state;
    if (id == 0 || data.id != id) {
      alert("Nenhum dado alterado para " + data.id);
    } else {
      name == null ? (name = data.name) : (name = name);
      phone == null ? (phone = data.phone) : (phone = phone);
      email == null ? (email = data.email) : (email = email);
      let response = await this.userService.updateContact(id, {
        name,
        phone,
        email,
      });
      if (response.status == 204 && response.ok == true) {
        alert("Contato editado com sucesso!");
      }
    }
    console.log(id, name, phone, email);
  }

  async delete(id) {
    let response = await this.userService.deleteContact(id);
    if (response.status == 204 && response.ok == true) {
      alert("Contato deletado com sucesso!");
    }

    for (let d in this.state.rows) {
      if (this.state.rows[d].key == id) {
        let rows = this.state.rows;
        rows.splice(d, 1);
        this.setState({ rows: rows });
      }
    }
  }

  async renderViews() {
    this.setState({ tdRefs: [] });

    let data = await this.userService.getContacts();
    let rows = [];
    for (let d in data) {
      rows.push(
        <tr key={data[d].id}>
          <td>{data[d].id}</td>
          <td
            ref={(ref) => {
              this.setRef(ref, data[d].id, "name");
            }}
            contentEditable="true"
          >
            {data[d].name}
          </td>
          <td
            ref={(ref) => {
              this.setRef(ref, data[d].id, "phone");
            }}
            contentEditable="true"
          >
            {data[d].phone}
          </td>
          <td
            ref={(ref) => {
              this.setRef(ref, data[d].id, "email");
            }}
            contentEditable="true"
          >
            {data[d].email}
          </td>
          <td>
            <button
              className="btnEdit"
              onClick={(e) => {
                this.edit(data[d]);
              }}
            >
              <AiFillEdit />
            </button>
            <button
              className="btnDelete"
              onClick={(e) => {
                this.delete(data[d].id);
              }}
            >
              <AiFillDelete />
            </button>
          </td>
        </tr>
      );
    }
    this.setState({ loading: false, rows: rows });
  }

  componentDidMount() {
    this.renderViews();
  }

  render() {
    return (
      <table className="tableItSelf">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="5">
              <div className="tableBody">
                <table>
                  {/* colspan="5" */}
                  <tbody className="tableBody">{this.state.rows}</tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
