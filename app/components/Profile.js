var React = require("react");
var Router = require("react-router");
var ReactFireMixin = require("reactfire");
var Repos = require("./Github/Repos");
var UserProfile = require("./Github/UserProfile");
var Notes = require("./Notes/Notes");
var Firebase = require('firebase');
var helpers = require('../utils/helpers');

var Profile = React.createClass({
	mixins : [Router.State, ReactFireMixin],
	componentDidMount: function() {
		//this.ref = new Firebase("https://ghntaker.firebaseio.com");
		this.ref = new Firebase("https://github-note-taker.firebaseio.com");

		var childRef = this.ref.child(this.getParams().username);
		this.bindAsArray(childRef, 'notes');

		helpers.getGithubInfo(this.getParams().username).then(function(dataObj) {
			this.setState({
				repos: dataObj.repos,
				bio: dataObj.bio
			});
		}.bind(this));

	},
	componentWillUnmount: function() {
		this.unbind('notes');
	},
	getInitialState: function() {
		return {
			notes: [],
			bio: {},
			repos: []
		}
	},
	handleAddNote: function(newNote) {
		this.ref.child(this.getParams().username).set(this.state.notes.concat([newNote]));
	},
	render: function  () {
		var username = this.getParams().username;
		return (
			<div className="row">
		        <div className="col-md-4">
		         	<UserProfile username= {username} bio= {this.state.bio}/>
		        </div>
		        <div className="col-md-4">
		          <Repos username= {username} repos={this.state.repos}/>
		        </div>
		        <div className="col-md-4">
		          <Notes username={username} notes={this.state.notes}
		          	addNote={this.handleAddNote}/>
		        </div>
		      </div>
	      );
	}
});

module.exports= Profile;