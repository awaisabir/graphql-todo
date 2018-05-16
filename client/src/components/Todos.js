import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export default class Todos extends Component {
  state = {
    selected: [1],
  };

  isSelected = (index) => {
    return this.state.selected.indexOf(index) !== -1;
  };

  handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows,
    });
  };

  mapTodos(todos) {
    return todos.map((todo, i) => (
      <TableRow selected={this.isSelected(i)}>
        <TableRowColumn>{i}</TableRowColumn>
        <TableRowColumn>{todo.title}</TableRowColumn>
        <TableRowColumn>This will be the description</TableRowColumn>
      </TableRow>
    ))
  }

  render() {
    const { todos } = this.props;

    return (
      <Table onRowSelection={this.handleRowSelection}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Title</TableHeaderColumn>
            <TableHeaderColumn>Description</TableHeaderColumn>
            <TableHeaderColumn>Completed</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          { todos ? this.mapTodos(todos) : null }
        </TableBody>
      </Table>
    );
  }
}