// 'use client';

// import { createContext, useContext, useEffect, useState } from 'react';

// interface DataGridContextType {}

// interface Props {
//   children: React.ReactNode;
// }

// const DataGridContext = createContext<DataGridContextType>({});

// export const DataGridProvider = ({ children }: Props) => {
//   const value = useDataGridProvider();
//   return <DataGridContext.Provider value={value}>{children}</DataGridContext.Provider>;
// };

// export const useDataGrid = () => {
//   const context = useContext(DataGridContext);
//   if (!context) {
//     throw new Error('useDataGrid must be used within a DataGridProvider');
//   }
//   return context;
// };

// const useDataGridProvider = () => {
//   return {};
// };
