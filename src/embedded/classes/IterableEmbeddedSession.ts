import { generateUUID } from '../../core/utils/generateUUID';
import type { IterableEmbeddedImpressionData } from './IterableEmbeddedImpressionData';

export interface IterableEmbeddedSessionDict {
  /** The ID of the session. */
  id: string;
  /** The start date of the session. */
  start: Date | null;
  /** The end date of the session. */
  end: Date | null;
  /** The impressions of the session. */
  impressions: IterableEmbeddedImpressionData[];
}

export class IterableEmbeddedSession {
  public id: IterableEmbeddedSessionDict['id'] = '';
  public start: IterableEmbeddedSessionDict['start'] = null;
  public end: IterableEmbeddedSessionDict['end'] = null;
  public impressions: IterableEmbeddedSessionDict['impressions'] = [];

  constructor(options: Partial<IterableEmbeddedSessionDict> = {}) {
    const { start = null, end = null, impressions = [] } = options;
    this.id = generateUUID();
    this.start = start;
    this.end = end;
    this.impressions = impressions;
  }
}
