import { error } from './error';
import { homepage } from './homepage';
import { notFound } from './notFound';
import { Router } from './router';
import { getMMPReview, postMMPReview } from './tools/mmpReview';
import { getNonVoters, postNonVoters } from './tools/nonVoters';
import { tools } from './tools/tools';

export const routes = new Router({ error, notFound });
routes.get(/^\/$/, homepage);
routes.get(/^\/tools$/, tools);
routes.get(/^\/tools\/mmp-review/, getMMPReview);
routes.get(/^\/tools\/non-voters/, getNonVoters);
routes.post(/^\/tools\/mmp-review$/, postMMPReview);
routes.post(/^\/tools\/non-voters$/, postNonVoters);
