import { h, render } from 'preact';

import { ActTool } from '../../components/organisms';

const root = document.getElementById('act-tool') as HTMLElement;

while (root.firstChild) {
  root.removeChild(root.lastChild as Node);
}

const vnode = h(ActTool, {
  pathname: location.pathname,
  placeholder: false
});

render(vnode, root);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
