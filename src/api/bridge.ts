/** Serializable map type used by React Native codegen for the native bridge. */
export type BridgeRecord = { [key: string]: string | number | boolean };

export const asBridgeRecord = (value: unknown): BridgeRecord =>
  value as BridgeRecord;

export const asBridgeRecordArray = (value: unknown): BridgeRecord[] =>
  value as BridgeRecord[];
