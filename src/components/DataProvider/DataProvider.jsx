import React from 'react';
import useSWR from 'swr';

import { AuthContext } from '../AuthProvider';
import { APIdataFetch, APIdataSet, GET_ENDPOINT } from '../../aux/APIHandler';

export const DataContext = React.createContext();

const itemParser = ({
  id,
  date,
  station,
  gasType,
  cost,
  liters,
  kilometers,
  efficiency
}) => ({
  id,
  date: new Date(date),
  station,
  gasType,
  cost: +cost,
  liters: +liters,
  kilometers: +kilometers,
  efficiency: +efficiency
});

function DataProvider({children}) {
  const { name, code } = React.useContext(AuthContext)

  const dataFetch = React.useCallback(async () => {
    const raw = await APIdataFetch({name, code});

    const ret = {...raw, list: !raw ? [] : raw.list.map(itemParser)}

    return ret;
  },[name, code]);

  const {data, error, isLoading, isValidating, mutate } = useSWR(GET_ENDPOINT, dataFetch);

  React.useEffect(() => {
    mutate([]);
  }, [name, code]);

  const dataAdd = React.useCallback(async (newEntryInput) => {
    const id = crypto.randomUUID();
    const newEntry = {id, ...newEntryInput};
    const nextData = data.list ? {...data, list: [...data.list, newEntry]} : {list: [newEntry]}
    await APIdataSet({data: nextData, name, code});
    mutate(nextData);
  },[name, code, data]);

  const ctx = {
    data,
    list: data?.list,
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
