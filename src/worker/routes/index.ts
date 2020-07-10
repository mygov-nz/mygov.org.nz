import { matcher as matchAct } from '../../components/organisms/act-tool/state';
import { matcher as matchMMPReview } from '../../components/organisms/mmp-review-tool/state';
import { matcher as matchNonVoters } from '../../components/organisms/non-voters-tool/state';

import { electionResult, electionResults } from './election-results';
import { error } from './error';
import { homepage } from './homepage';
import { notFound } from './not-found';
import { Router } from './router';
import { baseAct, getAct, postAct } from './tools/act';
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
routes.get(/^\/election-results$/, electionResults);
routes.get(/^\/election-results\/[0-9]{4}$/, electionResult);
routes.get(/^\/tools$/, tools);
routes.get(matchMMPReview, getMMPReview);
routes.get(matchNonVoters, getNonVoters);
routes.get(matchAct, getAct);
routes.get(/^\/tools\/mmp-review\/placeholder$/, getMMPReview);
routes.get(/^\/tools\/non-voters\/placeholder$/, getNonVoters);
routes.get(/^\/tools\/act\/placeholder$/, getNonVoters);
routes.get(/^\/tools\/mmp-review$/, baseMMPReview);
routes.get(/^\/tools\/non-voters$/, baseNonVoters);
routes.get(/^\/tools\/act$/, baseAct);
routes.get(/^\/tools\/mmp-review\/[0-9a-zA-Z/+=]+$/, legacyMMPReview);
routes.get(/^\/tools\/non-voters\/[0-9a-zA-Z/+=]+$/, legacyNonVoters);
routes.post(/^\/tools\/mmp-review$/, postMMPReview);
routes.post(/^\/tools\/non-voters$/, postNonVoters);
routes.post(/^\/tools\/act$/, postAct);
