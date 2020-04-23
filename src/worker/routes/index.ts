import { matcher as matchMMPReview } from '../../components/organisms/mmp-review-tool/state';
import { matcher as matchNonVoters } from '../../components/organisms/non-voters-tool/state';

import { error } from './error';
import { homepage } from './homepage';
import { notFound } from './notFound';
import { Router } from './router';
import {
  baseMMPReview,
  getMMPReview,
  legacyMMPReview,
  postMMPReview
} from './tools/mmpReview';
import {
  baseNonVoters,
  getNonVoters,
  legacyNonVoters,
  postNonVoters
} from './tools/nonVoters';
import { tools } from './tools/tools';

export const routes = new Router({ error, notFound });
routes.get(/^\/$/, homepage);
routes.get(/^\/tools$/, tools);
routes.get(matchMMPReview, getMMPReview);
routes.get(matchNonVoters, getNonVoters);
routes.get(/^\/tools\/mmp-review\/placeholder$/, getMMPReview);
routes.get(/^\/tools\/non-voters\/placeholder$/, getNonVoters);
routes.get(/^\/tools\/mmp-review$/, baseMMPReview);
routes.get(/^\/tools\/non-voters$/, baseNonVoters);
routes.get(/^\/tools\/mmp-review\/[0-9a-zA-Z/+=]+$/, legacyMMPReview);
routes.get(/^\/tools\/non-voters\/[0-9a-zA-Z/+=]+$/, legacyNonVoters);
routes.post(/^\/tools\/mmp-review$/, postMMPReview);
routes.post(/^\/tools\/non-voters$/, postNonVoters);
