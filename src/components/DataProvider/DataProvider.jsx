import React from 'react';
import useSWR from 'swr';

import { AuthContext } from '../AuthProvider';
import { APIdataFetch, APIdataSet, GET_ENDPOINT } from '../../aux/APIHandler';

export const DataContext = React.createContext();

function DataProvider({children}) {
  const { name, code } = React.useContext(AuthContext)

  const dataFetch = React.useCallback(async () => {
    const ret = await APIdataFetch({name, code});
    return ret;
  },[name, code]);

  const {data, error, isLoading, isValidating, mutate } = useSWR(GET_ENDPOINT, dataFetch);

  React.useEffect(() => {
    mutate();
  }, [name, code]);

  const dataAdd = React.useCallback(async (newEntry) => {
    const nextData = data ? [...data, newEntry] : [newEntry]
    await APIdataSet({data: nextData, name, code});
    mutate(nextData);
  },[name, code, data]);

  const ctx = {
    data,
    dataAdd,
    isLoading,
    isValidating,
    error
  };

  return (
    <DataContext.Provider
      value={ctx}
    >
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider;
