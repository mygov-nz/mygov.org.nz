import { h, render } from 'preact';

import { MMPReviewTool } from '../../components/organisms';

const root = document.getElementById('mmp-review-tool') as HTMLElement;

while (root.firstChild) {
  root.removeChild(root.lastChild as Node);
}

const vnode = h(MMPReviewTool, {
  pathname: location.pathname,
  placeholder: false
});

render(vnode, root);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
