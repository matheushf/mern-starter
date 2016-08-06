var React = require('react');
// var ReactDOM = require('react-dom');
var ReactDOM = require('react');
var $ = require('jquery');

var BugFilter = React.createClass({
  displayName: 'BugFilter',

  render: function () {
    console.log("Rendering BugFilter");
    return React.createElement(
      'div',
      null,
      'A way to filter the list of bugs would come here.'
    );
  }
});

var BugRow = React.createClass({
  displayName: 'BugRow',

  render: function () {
    console.log("Rendering BugRow:", this.props.bug);
    return React.createElement(
      'tr',
      null,
      React.createElement(
        'td',
        null,
        this.props.bug._id
      ),
      React.createElement(
        'td',
        null,
        this.props.bug.status
      ),
      React.createElement(
        'td',
        null,
        this.props.bug.priority
      ),
      React.createElement(
        'td',
        null,
        this.props.bug.owner
      ),
      React.createElement(
        'td',
        null,
        this.props.bug.title
      )
    );
  }
});

var BugTable = React.createClass({
  displayName: 'BugTable',

  render: function () {
    console.log("Rendering bug table, num items:", this.props.bugs.length);
    var bugRows = this.props.bugs.map(function (bug) {
      return React.createElement(BugRow, { key: bug._id, bug: bug });
    });
    return React.createElement(
      'table',
      null,
      React.createElement(
        'thead',
        null,
        React.createElement(
          'tr',
          null,
          React.createElement(
            'th',
            null,
            'Id'
          ),
          React.createElement(
            'th',
            null,
            'Status'
          ),
          React.createElement(
            'th',
            null,
            'Priority'
          ),
          React.createElement(
            'th',
            null,
            'Owner'
          ),
          React.createElement(
            'th',
            null,
            'Title'
          )
        )
      ),
      React.createElement(
        'tbody',
        null,
        bugRows
      )
    );
  }
});

var BugAdd = React.createClass({
  displayName: 'BugAdd',

  render: function () {
    console.log("Rendering BugAdd");
    return React.createElement(
      'div',
      null,
      React.createElement(
        'form',
        { name: 'bugAdd' },
        React.createElement('input', { type: 'text', name: 'owner', placeholder: 'Owner' }),
        React.createElement('input', { type: 'text', name: 'title', placeholder: 'Title' }),
        React.createElement(
          'button',
          { onClick: this.handleSubmit },
          'Add Bug'
        )
      )
    );
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var form = document.forms.bugAdd;
    this.props.addBug({ owner: form.owner.value, title: form.title.value, status: 'New', priority: 'P1' });
    // clear the form for the next input
    form.owner.value = "";form.title.value = "";
  }
});

var BugList = React.createClass({
  displayName: 'BugList',

  getInitialState: function () {
    return { bugs: [] };
  },
  render: function () {
    console.log("Rendering bug list, num items:", this.state.bugs.length);
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        null,
        'Bug Tracker'
      ),
      React.createElement(BugFilter, null),
      React.createElement('hr', null),
      React.createElement(BugTable, { bugs: this.state.bugs }),
      React.createElement('hr', null),
      React.createElement(BugAdd, { addBug: this.addBug })
    );
  },

  componentDidMount: function () {
    $.ajax('/api/bugs').done(function (data) {
      this.setState({ bugs: data });
    }.bind(this));
    // In production, we'd also handle errors.
  },

  addBug: function (bug) {
    console.log("Adding bug:", bug);
    $.ajax({
      type: 'POST', url: '/api/bugs', contentType: 'application/json',
      data: JSON.stringify(bug),
      success: function (data) {
        var bug = data;
        // We're advised not to modify the state, it's immutable. So, make a copy.
        var bugsModified = this.state.bugs.concat(bug);
        this.setState({ bugs: bugsModified });
      }.bind(this),
      error: function (xhr, status, err) {
        // ideally, show error to user.
        console.log("Error adding bug:", err);
      }
    });
  }
});

ReactDOM.render(React.createElement(BugList, null), document.getElementById('main'));