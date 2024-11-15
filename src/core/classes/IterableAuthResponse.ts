// TODO: Add comments and descriptions
// REVIEW: This seems to currently be used as a type instead of a class, so it
// might be better to make it a type
export class IterableAuthResponse {
  authToken?: string = '';
  successCallback?: () => void;
  failureCallback?: () => void;
}
