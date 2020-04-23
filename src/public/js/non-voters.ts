import { h, render } from 'preact';

import { NonVotersTool } from '../../components/organisms';

const root = document.getElementById('non-voters-tool') as HTMLElement;

while (root.firstChild) {
  root.removeChild(root.lastChild as Node);
}

const vnode = h(NonVotersTool, {
  pathname: location.pathname,
  placeholder: false
});

render(vnode, root);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
