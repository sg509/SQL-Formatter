import React, { Component } from "react";
import sqlFormatter from "sql-formatter-plus";
import { MySQLAnalyzer } from "ts-mysql-analyzer";

class SQLFromat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Write your SQL Code here",
      value2: "Your formatted SQL Code",
      value3: "SQL Code is empty",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    const analyzer = new MySQLAnalyzer();
    const diagnostics = analyzer.analyze(this.state.value);
    diagnostics.length === 0
      ? this.setState({ value3: "Code is Correct" })
      : this.setState({ value3: diagnostics[0].message });
  }

  handleSubmit(event) {
    this.setState({
      value2: sqlFormatter.format(this.state.value, { uppercase: true }),
    });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          SQL Code:
          <textarea
            rows="20"
            columns="100"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <textarea
            columns="100"
            rows="20"
            value={this.state.value2}
            readOnly
          />
          <textarea value={this.state.value3} readOnly />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default SQLFromat;
