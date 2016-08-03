var React = require('react');
var ReactDOM = require('react');
var $ = require('jquery');

var BugFilter = React.createClass({
    displayName: 'BugFilter',

    render: function () {
        return React.createElement(
            'div',
            null,
            ' Filter stuff '
        );
    }
});

var BugRow = React.createClass({
    displayName: 'BugRow',

    render: function () {

        return React.createElement(
            'tr',
            null,
            React.createElement(
                'td',
                null,
                this.props.id
            ),
            React.createElement(
                'td',
                null,
                this.props.status
            ),
            React.createElement(
                'td',
                null,
                this.props.priority
            ),
            React.createElement(
                'td',
                null,
                this.props.owner
            ),
            React.createElement(
                'td',
                null,
                this.props.title
            )
        );
    }
});

var BugTable = React.createClass({
    displayName: 'BugTable',

    render: function () {
        console.log(this.props.data);
        var bugRows = this.props.data.map(function (data) {
            return React.createElement(BugRow, { id: data._id, status: data.status, priority: data.priority, owner: data.owner,
                title: data.title, key: data._id });
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
        return React.createElement(
            'div',
            null,
            React.createElement(
                'form',
                { name: 'bugAdd' },
                React.createElement(
                    'label',
                    null,
                    ' Owner '
                ),
                React.createElement('input', { type: 'text', name: 'owner', placeholder: 'Owner' }),
                React.createElement(
                    'label',
                    null,
                    ' Title '
                ),
                React.createElement('input', { type: 'text', name: 'title', placeholder: 'Title' }),
                React.createElement(
                    'button',
                    { onClick: this.handleSubmit },
                    ' Add Bugs'
                )
            )
        );
    },

    handleSubmit: function (e) {
        e.preventDefault();
        var form = document.forms.bugAdd;
        this.props.addBug({ owner: form.owner.value, title: form.title.value, status: 'New', priority: 'P1' });
        // clear the form for the next input
        form.owner.value = "";
        form.title.value = "";
    }
});

var BugList = React.createClass({
    displayName: 'BugList',

    getInitialState: function () {
        return { data: [] };
    },
    componentDidMount: function () {
        $.ajax('/api/bugs').done(function (data) {
            this.setState({ data: data });
        }.bind(this));
    },
    addBug: function (bug) {
        console.log("Adding bug: ", bug);

        $.ajax({
            type: 'POST', url: '/api/bugs', contentType: 'application/json',
            data: JSON.stringify(bug),
            success: function (data) {
                var bug = data;
                var bugsModified = this.state.data.concat(bug);
                this.setState({ data: bugsModified });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log("Error adding bug:", err);
            }
        });
    },
    render: function () {
        console.log('render bugList');
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                null,
                ' Bug Tracker '
            ),
            React.createElement(BugFilter, null),
            React.createElement('hr', null),
            React.createElement(BugTable, { data: this.state.data }),
            React.createElement('hr', null),
            React.createElement('br', null),
            React.createElement(BugAdd, { addBug: this.addBug }),
            React.createElement('br', null)
        );
    }
});

ReactDOM.render(React.createElement(BugList, null), document.getElementById('main'));