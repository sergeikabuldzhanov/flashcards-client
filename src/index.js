import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//Import an instance of Sentry browser SDK
import * as Sentry from '@sentry/browser';

//Initialize Sentry, url is generated by sentry.io, should be an ENV variable.
Sentry.init({dsn: "https://f81df4c7dbce45a48fa2804b0baea861@sentry.io/2819421"});

ReactDOM.render(<App />, document.getElementById('root'));
