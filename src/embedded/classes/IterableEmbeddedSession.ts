import type { IterableEmbeddedImpressionData } from './IterableEmbeddedImpressionData';
import { IterableUtil } from '../../core/classes/IterableUtil';

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
    const {
      id = IterableUtil.generateUUID(),
      start = new Date(),
      end = null,
      impressions = [],
    } = options;
    this.id = id;
    this.start = start;
    this.end = end;
    this.impressions = impressions;
  }
}
