export interface IReplacer {
  response: {
    body: string;
  };
}

export interface IRule {
  id: string;
  pattern: string;
  enable: boolean;
  replacer: IReplacer;
}
