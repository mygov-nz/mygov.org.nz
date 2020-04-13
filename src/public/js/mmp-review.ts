import { h, render } from 'preact';

import { MMPReviewTool } from '../../components/organisms';

const root = document.getElementById('mmp-review-tool') as HTMLElement;

while (root.firstChild) {
  root.removeChild(root.lastChild as Node);
}

render(h(MMPReviewTool, { pathname: location.pathname }), root);
