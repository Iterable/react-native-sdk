class IterableAction {
  type: string;
  data?: string;
  userInput?: string;

  constructor(type: string, data?: string, userInput?: string) {
    this.type = type;
    this.data = data;
    this.userInput = userInput;
  }

  static fromDict(dict: any): IterableAction {
    return new IterableAction(dict.type, dict.data, dict.userInput);
  }
}

class IterableActionContext {
  action: IterableAction;
  source: IterableActionSource;

  constructor(action: IterableAction, source: IterableActionSource) {
    this.action = action;
    this.source = source;
  }

  static fromDict(dict: any): IterableActionContext {
    const action = IterableAction.fromDict(dict.action);
    const source = dict.source as IterableActionSource;
    return new IterableActionContext(action, source);
  }
}

enum IterableActionSource {
  push = 0,
  appLink = 1,
  inApp = 2,
}

enum IterableLogLevel {
  debug = 1,
  info = 2,
  error = 3,
}

export {
  IterableAction,
  IterableActionContext,
  IterableActionSource,
  IterableLogLevel,
};
