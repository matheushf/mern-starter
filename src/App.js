var React = require('react');
var ReactDOM = require('react');
var $ = require('jquery');

var BugFilter = React.createClass({
    render: function () {
        return (
            <div> Filter stuff </div>
        )
    }
});

var BugRow = React.createClass({
    render: function () {

        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.status}</td>
                <td>{this.props.priority}</td>
                <td>{this.props.owner}</td>
                <td>{this.props.title}</td>
            </tr>
        )
    }
});

var BugTable = React.createClass({
    render: function () {
        console.log(this.props.data);
        var bugRows = this.props.data.map(function (data) {
            return <BugRow id={data._id} status={data.status} priority={data.priority} owner={data.owner}
                           title={data.title} key={data._id}/>
        });

        return (
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Owner</th>
                    <th>Title</th>
                </tr>
                </thead>

                <tbody>
                {bugRows}
                </tbody>
            </table>
        )
    }
});

var BugAdd = React.createClass({
    render: function () {
        return (
            <div>
                <form name="bugAdd">
                    <label> Owner </label>
                    <input type="text" name="owner" placeholder="Owner"/>
                    <label> Title </label>
                    <input type="text" name="title" placeholder="Title"/>

                    <button onClick={this.handleSubmit}> Add Bugs</button>
                </form>
            </div>
        )
    },

    handleSubmit: function (e) {
        e.preventDefault();
        var form = document.forms.bugAdd;
        this.props.addBug({owner: form.owner.value, title: form.title.value, status: 'New', priority: 'P1'});
        // clear the form for the next input
        form.owner.value = "";
        form.title.value = "";
    }
});

var BugList = React.createClass({
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        $.ajax('/api/bugs').done(function (data) {
            this.setState({data: data});
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
                this.setState({data: bugsModified});
            }.bind(this),
            error: function (xhr, status, err) {
                console.log("Error adding bug:", err);
            }
        });
    },
    render: function () {
        console.log('render bugList');
        return (
            <div>
                <h1> Bug Tracker </h1>
                <BugFilter />
                <hr />
                <BugTable data={this.state.data}/>
                <hr />
                <br />
                <BugAdd addBug={this.addBug}/>
                <br />
            </div>
        )
    }
});

ReactDOM.render(
    <BugList />, document.getElementById('main')
);