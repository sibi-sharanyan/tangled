import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import TouchBackend from 'react-dnd-touch-backend'
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch'; // or any other pipeline


ReactDOM.render(
    <DndProvider  backend={MultiBackend} options={HTML5toTouch}>
<App />
</DndProvider> , document.getElementById('root'));


