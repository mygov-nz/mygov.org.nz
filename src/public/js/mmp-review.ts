import { h, render } from 'preact';

import { MMPReviewTool } from '../../components/pages/mmp-review/mmp-review-tool/mmp-review-tool';

const root = document.getElementById('mmp-review') as HTMLElement;

while (root.firstChild) {
  root.removeChild(root.lastChild as Node);
}

render(h(MMPReviewTool, null), root);
