import { matcher as matchMMPReview } from '../../components/pages/mmp-review/mmp-review-tool/state';
import { matcher as matchNonVoters } from '../../components/pages/non-voters/non-voters-tool/state';

import { error } from './error';
import { homepage } from './homepage';
import { notFound } from './notFound';
import { Router } from './router';
import { baseMMPReview, getMMPReview, postMMPReview } from './tools/mmpReview';
import { baseNonVoters, getNonVoters, postNonVoters } from './tools/nonVoters';
import { tools } from './tools/tools';

export const routes = new Router({ error, notFound });
routes.get(/^\/$/, homepage);
routes.get(/^\/tools$/, tools);
routes.get(matchMMPReview, getMMPReview);
routes.get(matchNonVoters, getNonVoters);
routes.get(/^\/tools\/mmp-review$/, baseMMPReview);
routes.get(/^\/tools\/non-voters$/, baseNonVoters);
routes.post(/^\/tools\/mmp-review$/, postMMPReview);
routes.post(/^\/tools\/non-voters$/, postNonVoters);
