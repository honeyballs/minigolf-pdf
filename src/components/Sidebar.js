import React from 'react';
import Dropzone from 'react-dropzone'

const Sidebar = props => {


    return (
        <div id="Sidebar">
        <section>
          <div className="dropzone">
            <Dropzone onDrop={props.loadFile}>
              <p>Try dropping some files here, or click to select files to upload.</p>
            </Dropzone>
          </div>
          <aside>
            <h2>Dropped file:</h2>
            {props.file? props.file.name:''}
          </aside>
        </section>
        </div>
    );
};

export default Sidebar;
