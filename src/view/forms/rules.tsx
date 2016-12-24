
import * as React from 'react';

// tslint:disable-next-line:no-var-requires no-require-imports
import {rules} from './base';

export const VALIDATION_RULES = {
  REQUIRED: 'REQUIRED'
};

// https://www.npmjs.com/package/react-validation
Object.assign(rules, {
  [VALIDATION_RULES.REQUIRED]: {

    rule: (value: any) => {
      return !!value.toString().trim();
    },

    hint: (/* value: any */) => {
      return <span className='form-error is-visible'>Required</span>;
    }

  }
});
