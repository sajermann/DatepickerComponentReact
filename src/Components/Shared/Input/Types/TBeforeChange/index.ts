import { ChangeEvent } from 'react';
import { TCep } from '~/components/shared/Input/Types/TCep';
import { TCnpj } from '~/components/shared/Input/Types/TCnpj';
import { TCpf } from '~/components/shared/Input/Types/TCpf';
import { TCurrency } from '~/components/shared/Input/Types/TCurrency';

export type TBeforeChange = {
  removeNumber?: boolean;
  removeUpperCase?: boolean;
  removeLowerCase?: boolean;
  removeSpecialCharacter?: boolean;
  regexForReplace?: RegExp;
  fn?: (e: ChangeEvent<HTMLInputElement>) => ChangeEvent<HTMLInputElement>;
  applyMask?: TCurrency | TCnpj | TCpf | TCep;
};
