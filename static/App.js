/*var Bugs = [
 {id: 1, status: ""}
 ]*/

var BugFilter = React.createClass({
    displayName: "BugFilter",

    render: function () {
        return React.createElement(
            "div",
            null,
            " Filter stuff "
        );
    }
});

var BugRow = React.createClass({
    displayName: "BugRow",

    render: function () {
        return React.createElement(
            "tr",
            null,
            React.createElement(
                "td",
                null,
                this.props.id
            ),
            React.createElement(
                "td",
                null,
                this.props.status
            ),
            React.createElement(
                "td",
                null,
                this.props.priority
            ),
            React.createElement(
                "td",
                null,
                this.props.owner
            ),
            React.createElement(
                "td",
                null,
                this.props.title
            )
        );
    }
});

var BugTable = React.createClass({
    displayName: "BugTable",

    render: function () {
        return React.createElement(
            "table",
            null,
            React.createElement(
                "thead",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        "Id"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "Status"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "Priority"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "Owner"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "Title"
                    )
                )
            ),
            React.createElement(
                "tbody",
                null,
                React.createElement(BugRow, { id: 1, status: "Active", priority: "High", owner: "Someone", title: "The bug buggable" }),
                React.createElement(BugRow, { id: 2, status: "Active", priority: "Low", owner: "You", title: "The buggable bug" })
            )
        );
    }
});

var BugAdd = React.createClass({
    displayName: "BugAdd",

    render: function () {
        return React.createElement(
            "div",
            null,
            " add bugs "
        );
    }
});

var BugList = React.createClass({
    displayName: "BugList",

    render: function () {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h1",
                null,
                " Bug Tracker "
            ),
            React.createElement(BugFilter, null),
            React.createElement("hr", null),
            React.createElement(BugTable, null),
            React.createElement("hr", null),
            React.createElement(BugAdd, null)
        );
    }
});

ReactDOM.render(React.createElement(BugList, null), document.getElementById('main'));