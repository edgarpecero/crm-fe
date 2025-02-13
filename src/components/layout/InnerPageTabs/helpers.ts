import { CSSProperties } from 'react';

export const getTabContentStyle = (active: boolean): CSSProperties => ({
  display: active ? 'flex' : 'none',
  flexDirection: 'column',
  flex: 1,
});

export const enumToTabsArray = <T extends Record<string, string>>(enumObject: T) =>
  Object.values(enumObject).map((value) => ({ label: value, value }));
