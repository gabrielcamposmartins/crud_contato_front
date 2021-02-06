import React, { Component } from "react";
import Table from "./Table";
import Form from "./Form";

export default class Home extends Component {
  table;
  constructor(props) {
    super(props);
    this.refreshTable = this.refreshTable.bind(this);
    this.setRef = this.setRef.bind(this);
  }

  refreshTable() {
    this.table.renderViews();
  }

  setRef(ref) {
    this.table = ref;
  }

  render() {
    return (
      <div className="main">
        <Form func={this.refreshTable} />
        <Table ref={this.setRef} />
      </div>
    );
  }
}
