export interface Replacer {
  response: {
    body: string;
  };
}

export interface Rule {
  id: string;
  groupId?: string;
  description?: string;
  pattern: string;
  enable: boolean;
  replacer: Replacer;
}
