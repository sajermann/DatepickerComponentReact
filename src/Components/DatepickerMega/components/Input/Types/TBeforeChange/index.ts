import { ChangeEvent } from 'react';
import { TCep } from '../TCep';
import { TCnpj } from '../TCnpj';
import { TCpf } from '../TCpf';
import { TCurrency } from '../TCurrency';

export type TBeforeChange = {
  removeNumber?: boolean;
  removeUpperCase?: boolean;
  removeLowerCase?: boolean;
  removeSpecialCharacter?: boolean;
  regexForReplace?: RegExp;
  fn?: (e: ChangeEvent<HTMLInputElement>) => ChangeEvent<HTMLInputElement>;
  applyMask?: TCurrency | TCnpj | TCpf | TCep;
};
