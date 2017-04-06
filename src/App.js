import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import 'react-table/react-table.css'
import 'react-dates/lib/css/_datepicker.css';

import ReactTable from 'react-table';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import S from 'string';

class App extends Component {

  state = {
    dobStartDate: null,
    dobEndDate: null
  }

  gridData = [{
    dob: 1491111111111,
    txt: "test1"
  },
  {
    dob: 1481111111111,
    txt: "test2"
  },
  {
    dob: 1471111111111,
    txt: "test3"
  }]
  gridColumns = [{
    header: 'txt',
    accessor: 'txt',
    render: row => (
      <span>
        {row.value}
      </span>
    ),
    filterRender: ({filter, onFilterChange}) => (
      <input 
        type="text"
        value={filter ? filter.value : ''}
        placeholder="Chercher..."
        style={{width: '100%'}}
        onChange={event => onFilterChange(event.target.value)}
      />
    )
  },{
    header: 'Date',
    accessor: 'dob',
    headerClassName: "contain-react-date",
    render: row => (
      <div>
        {moment(row.value).format("DD.MM.YYYY")}
      </div>
    ),
    filterRender: ({filter, onFilterChange}) => (
      <DateRangePicker
        startDate={this.state.dobStartDate}
        endDate={this.state.dobEndDate}
        onDatesChange={({ startDate, endDate }) => {this.setState({ dobStartDate: startDate, dobEndDate: endDate }); onFilterChange({startDate, endDate});}}
        focusedInput={this.state.focusedInput}
        onFocusChange={focusedInput => this.setState({ focusedInput })}
        isOutsideRange={() => false}
        withPortal={true}
        showClearDates={true}
      />
    ),
    filterMethod: (filter, row) => {
      if (filter.value.startDate === null || filter.value.endDate === null) {
        // Incomplet or cleared date picker
        console.log("Incomplet or cleared date picker")
        return true
      }

      if (moment(row[filter.id]).isBetween(filter.value.startDate, filter.value.endDate)) {
        // Found row matching filter
        console.log("Found row matching filter")
        return true
      }
    }
  }]

  render() {
    return (
      <div className="App">
        <ReactTable
          data={this.gridData}
          columns={this.gridColumns}
          defaultPageSize={10}
          className='-striped -highlight'
          previousText='Précedente'
          nextText='Suivante'
          loadingText='Chargement...'
          noDataText="Aucun contact n'a été trouvé" 
          pageText='Page'
          ofText='sur'
          rowsText='lignes'
          showFilters="true"
          resizable="true"
          defaultSorting={[{
            id: 'dob',
            desc: false
          }]}
        />
      </div>
    );
  }
}

export default App;
