/**
 * @vitest-environment jsdom
 */

import { ChangeEvent } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { onChangeCustom } from '.';

describe('Components/Input/Utils', () => {
  it(`must remove removeLowerCase`, async () => {
    const spyOnChange = vi.fn();
    onChangeCustom({
      e: {
        target: { id: 'test', value: 'Tests' },
      } as ChangeEvent<HTMLInputElement>,
      onChange: spyOnChange,
      onBeforeChange: {
        removeLowerCase: true,
      },
    });
    expect(spyOnChange).toBeCalledWith({
      target: {
        id: 'test',
        value: 'T',
      },
    });
  });

  it(`must remove removeUpperCase`, async () => {
    const spyOnChange = vi.fn();
    onChangeCustom({
      e: {
        target: { id: 'test', value: 'testsS' },
      } as ChangeEvent<HTMLInputElement>,
      onChange: spyOnChange,
      onBeforeChange: {
        removeUpperCase: true,
      },
    });
    expect(spyOnChange).toBeCalledWith({
      target: {
        id: 'test',
        value: 'tests',
      },
    });
  });

  it(`must remove removeNumber`, async () => {
    const spyOnChange = vi.fn();
    onChangeCustom({
      e: {
        target: { id: 'test', value: 'test9s' },
      } as ChangeEvent<HTMLInputElement>,
      onChange: spyOnChange,
      onBeforeChange: {
        removeNumber: true,
      },
    });
    expect(spyOnChange).toBeCalledWith({
      target: {
        id: 'test',
        value: 'tests',
      },
    });
  });

  it(`must remove removeSpecialCharacter`, async () => {
    const spyOnChange = vi.fn();
    onChangeCustom({
      e: {
        target: { id: 'test', value: 'test~!@#$%^&*()_+s' },
      } as ChangeEvent<HTMLInputElement>,
      onChange: spyOnChange,
      onBeforeChange: {
        removeSpecialCharacter: true,
      },
    });
    expect(spyOnChange).toBeCalledWith({
      target: {
        id: 'test',
        value: 'tests',
      },
    });
  });

  it(`must remove regexForReplace`, async () => {
    const spyOnChange = vi.fn();
    onChangeCustom({
      e: {
        target: { id: 'test', value: 'test~!@#$%^&*()_+s' },
      } as ChangeEvent<HTMLInputElement>,
      onChange: spyOnChange,
      onBeforeChange: {
        regexForReplace: /[!@#$%&*(),.?":{ }|<>'¨_=+[;^~´`°\]\\\-/]/g,
      },
    });
    expect(spyOnChange).toBeCalledWith({
      target: {
        id: 'test',
        value: 'tests',
      },
    });
  });

  it(`must remove applyMask - cep`, async () => {
    const spyOnChange = vi.fn();
    onChangeCustom({
      e: {
        target: { id: 'test', value: '00000000' },
      } as ChangeEvent<HTMLInputElement>,
      onChange: spyOnChange,
      onBeforeChange: {
        applyMask: {
          cep: true,
        },
      },
    });
    expect(spyOnChange).toBeCalledWith({
      target: {
        id: 'test',
        value: '00000-000',
      },
    });
  });

  it(`must remove applyMask - cnpj`, async () => {
    const spyOnChange = vi.fn();
    onChangeCustom({
      e: {
        target: { id: 'test', value: '12345678900000' },
      } as ChangeEvent<HTMLInputElement>,
      onChange: spyOnChange,
      onBeforeChange: {
        applyMask: {
          cnpj: true,
        },
      },
    });
    expect(spyOnChange).toBeCalledWith({
      target: {
        id: 'test',
        value: '12.345.678/9000-00',
      },
    });
  });

  it(`must remove applyMask - cpf`, async () => {
    const spyOnChange = vi.fn();
    onChangeCustom({
      e: {
        target: { id: 'test', value: '00000000000' },
      } as ChangeEvent<HTMLInputElement>,
      onChange: spyOnChange,
      onBeforeChange: {
        applyMask: {
          cpf: true,
        },
      },
    });
    expect(spyOnChange).toBeCalledWith({
      target: {
        id: 'test',
        value: '000.000.000-00',
      },
    });
  });

  it(`must remove applyMask - currency`, async () => {
    const spyOnChange = vi.fn();
    onChangeCustom({
      e: {
        target: { id: 'test', value: '10' },
      } as ChangeEvent<HTMLInputElement>,
      onChange: spyOnChange,
      onBeforeChange: {
        applyMask: {
          currency: {
            value: '10',
            decimalPlace: 2,
          },
        },
      },
    });
    expect(spyOnChange).toBeCalledWith({
      target: {
        id: 'test',
        value: 'R$ 0,10',
      },
    });
  });

  it(`must remove applyMask - currency`, async () => {
    const spyOnChange = vi.fn();
    onChangeCustom({
      e: {
        target: { id: 'test', value: '00000000' },
      } as ChangeEvent<HTMLInputElement>,
      onChange: spyOnChange,
      onBeforeChange: {
        applyMask: {
          cep: true,
        },
        fn: e =>
          ({
            target: { id: 'test', value: `My Cep is ${e.target.value}` },
          }) as ChangeEvent<HTMLInputElement>,
      },
    });
    expect(spyOnChange).toBeCalledWith({
      target: {
        id: 'test',
        value: 'My Cep is 00000-000',
      },
    });
  });
});
