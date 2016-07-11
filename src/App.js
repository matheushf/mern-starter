var Bugs = [
    {id: 1, status: ""}
]

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
        var bugRows = this.props.data.map(function (data) {
            <BugRow id={data.id} status={data.status} priority={data.priority} owner={data.owner} title={data.title}/>
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
            <div> add bugs </div>
        )
    }
});

var BugList = React.createClass({
    render: function () {
        return (
            <div>
                <h1> Bug Tracker </h1>
                <BugFilter />
                <hr />
                <BugTable />
                <hr />
                <BugAdd />
            </div>
        )
    }
});

ReactDOM.render(
    <BugList data={data}/>, document.getElementById('main')
);