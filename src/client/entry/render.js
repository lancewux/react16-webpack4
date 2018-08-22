
import * as React from 'react';

async function clientRender(PageDom) {
    const mountDom = window.document.querySelector('#react-root');
    const renderFnc = mountDom.childNodes.length ? 'hydrate' : 'render';
    (ReactDOM)[renderFnc](
        <PageDom/>
    )
}

export default clientRender;