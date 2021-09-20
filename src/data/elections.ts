import { election1996 } from './election-1996';
import { election1999 } from './election-1999';
import { election2002 } from './election-2002';
import { election2005 } from './election-2005';
import { election2008 } from './election-2008';
import { election2011 } from './election-2011';
import { election2014 } from './election-2014';
import { election2017 } from './election-2017';
import { election2020 } from './election-2020';
import type { ElectionData, ElectionYear } from './types';

export const elections: Record<ElectionYear, ElectionData> = {
  '1996': election1996,
  '1999': election1999,
  '2002': election2002,
  '2005': election2005,
  '2008': election2008,
  '2011': election2011,
  '2014': election2014,
  '2017': election2017,
  '2020': election2020
};
