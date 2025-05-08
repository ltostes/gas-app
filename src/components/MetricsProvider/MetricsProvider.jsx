import React from 'react';

import * as d3 from 'd3';

import { DataContext } from '../DataProvider';

export const MetricsContext = React.createContext();

function MetricsProvider({children}) {

  const { data, list , error, isLoading, isValidating} = React.useContext(DataContext);

  
  const registries_metrics = React.useMemo(() => {
    if (!list) return [];

    const olist = list.sort((a,b) => d3.ascending(a.date, b.date));

    // Available base metrics
    //   id,
    //   date,
    //   station,
    //   gasType,
    //   cost,
    //   liters,
    //   kilometers,
    //   efficiency

    const get_by_id = (input_id, arr=olist) => arr.find(({id}) => id == input_id);

    // It is defined as functions so we can reuse previous definitions results in forward calculations
    const calculations = {
      prev_id: ({}, index, array) => index == 0 ? null : array[index -1].id,
      price: ({cost, liters}) => cost / liters,
      runkm: ({ kilometers, prev_id }, i, arr) => !prev_id ? null : kilometers - get_by_id(prev_id, arr).kilometers,
      c_efficiency: ({runkm, liters}) => !runkm ? null : runkm / liters
    }

    // Sequentially calculating each function
    return Object.entries(calculations).reduce(
      (acc, [key, fun]) => acc.map((d, i, a) => ({ ...d, [key]: fun(d, i, a) })),
      olist
    );
  },[list])

  function get_metrics_by_id(input_id) {
    return registries_metrics.find(({id}) => input_id == id)
  }

  const ctx = {
    registries_metrics,
    get_metrics_by_id
  };

  return (
    <MetricsContext.Provider
      value={ctx}
    >
      {children}
    </MetricsContext.Provider>
  )
}

export default MetricsProvider;