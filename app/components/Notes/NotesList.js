import React from 'react';

export class NotesList extends React.Component {
	render() {
		var notes = this.props.notes.map((note, index) => {
			//console.log(note[".value"]);
			return <li className="list-group-item" key={index}> {note} </li>
		});
		return (
			<ul className="list-group">
				{notes}
			</ul>
		);
	}
}


export default NotesList;