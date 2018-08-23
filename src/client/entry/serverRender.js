const React = require('react');
const ReactDOM = require('react-dom/server');

const doServerRender = true;

async function serverRender(PageDom) {
    if (!doServerRender) {
        return null
    }
    ReactDOM.renderToString(<PageDom/>)
}

export default serverRender;