import { h, render } from 'preact';

import { NonVotersTool } from '../../components/pages/non-voters/non-voters-tool/non-voters-tool';

const root = document.getElementById('non-voters') as HTMLElement;

while (root.firstChild) {
  root.removeChild(root.lastChild as Node);
}

render(h(NonVotersTool, null), root);
