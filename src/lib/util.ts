import { Response } from 'superagent';

export class SwitchboardError extends Error {
  errors: any[];

  constructor(errors: any[] = []) {
    const errorText = errors
      .map(
        (err) => `  - message: ${err.message}\n  path: ${err.path.join('::')}`,
      )
      .join('\n');
    super(`Encountered Switchboard error(s):\n${errorText}`);
    this.errors = errors;
  }
}

export const raiseGqlErrors = (res: Response): Response => {
  const { errors = [] } = res.body;
  if (errors.length > 0) {
    throw new SwitchboardError(errors);
  }

  return res;
};
