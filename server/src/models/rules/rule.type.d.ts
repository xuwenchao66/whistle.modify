export interface Replacer {
  response: {
    body: string;
  };
}

export interface Rule {
  id: string;
  pattern: string;
  enable: boolean;
  replacer: Replacer;
}
