import { RNIterableAPI } from '../../api';
import type { IterableEmbeddedSession } from '../../embedded/classes/IterableEmbeddedSession';

export class IterableTracking {
  public static trackEmbeddedSession(session: IterableEmbeddedSession) {
    RNIterableAPI.trackEmbeddedSession(session);
  }
}
