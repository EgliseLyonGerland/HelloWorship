// @flow

export type AbstractElement = {
  type: string,
};

export type AllElements = TextElement | FlexElement;

export type TextElement = AbstractElement & {
  bind: string,
  fontSize: number,
  fontWeight: number,
};

export type FlexElement = AbstractElement & {
  spacing: number,
  flexDirection: 'row' | 'row-reverse' | 'column' | 'column-reverse',
  alignItems: 'flex-start' | 'flex-end' | 'center',
  justifyContent:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly',
  elements: Array<AllElements>,
};

export type Template = {
  id: string,
  elements: Array<AllElements>,
};
