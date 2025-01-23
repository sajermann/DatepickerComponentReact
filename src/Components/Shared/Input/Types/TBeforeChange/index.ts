import { ChangeEvent } from 'react';
import { TCep } from '~/Components/Shared/Input/Types/TCep';
import { TCnpj } from '~/Components/Shared/Input/Types/TCnpj';
import { TCpf } from '~/Components/Shared/Input/Types/TCpf';
import { TCurrency } from '~/Components/Shared/Input/Types/TCurrency';

export type TBeforeChange = {
  removeNumber?: boolean;
  removeUpperCase?: boolean;
  removeLowerCase?: boolean;
  removeSpecialCharacter?: boolean;
  regexForReplace?: RegExp;
  fn?: (e: ChangeEvent<HTMLInputElement>) => ChangeEvent<HTMLInputElement>;
  applyMask?: TCurrency | TCnpj | TCpf | TCep;
};
