import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import LZ_Audio from "./LZ-Audio";

ReactDOM.render(<div>
	<LZ_Audio src={require("./love.mp3")}/>
	<div>--------------</div>
	<LZ_Audio src={require("./love.mp3")}/>
</div>, document.getElementById('root'));
registerServiceWorker();
