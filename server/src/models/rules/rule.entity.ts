export class Rule {
  id: string;
  url: string;
  enable: boolean;
  method: string;
  response: {
    body: string;
  };
}
