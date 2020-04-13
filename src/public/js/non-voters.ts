import { h, render } from 'preact';

import { NonVotersTool } from '../../components/organisms';

const root = document.getElementById('non-voters-tool') as HTMLElement;

while (root.firstChild) {
  root.removeChild(root.lastChild as Node);
}

render(h(NonVotersTool, { pathname: location.pathname }), root);
