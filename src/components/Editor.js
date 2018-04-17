import React, { Component } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/theme/monokai';

class Editor extends Component {

    constructor(props) {
        super(props);
        this.updateJSON = this.updateJSON.bind(this);
        console.log(this.props.data);
        console.log();
        this.state = {data: JSON.stringify(this.props.data, null, 2)};
        console.log("DIE!");
    }

    updateJSON(event) {
        this.setState({data: event});
        try {
            var json = JSON.parse(event);
            this.props.updateJSON(json);
        } catch (e) {
            console.log(e);
        }
        
        this.setState({json: event});
    }

    render() {
        console.log("REMDER");
        return (
            <div>               
                <AceEditor
                    mode="json"
                    theme="monokai"
                    onChange={this.updateJSON}
                    name="editor"
                    value={this.state.data}
                    editorProps={{$blockScrolling: true}}
                    width="100%"
                  />
            </div> 
        );
    }
}

export default Editor;