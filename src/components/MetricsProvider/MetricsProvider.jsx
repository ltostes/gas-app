import React from 'react';

import * as d3 from 'd3';

import { DataContext } from '../DataProvider';

export const MetricsContext = React.createContext();

function MetricsProvider({children}) {

  const { data, list , error, isLoading, isValidating} = React.useContext(DataContext);
  
  const registries_metrics = React.useMemo(() => {
    if (!list) return [];
    
    const olist = list.sort((a, b) => d3.ascending(a.date, b.date));
  
    // Available base metrics
    //   id,
    //   date,
    //   station,
    //   gasType,
    //   cost,
    //   liters,
    //   kilometers,
    //   efficiency
  
    const get_by_id = (input_id, arr = olist) =>
      arr.find(({ id }) => id == input_id);
  
    // It is defined as functions so we can reuse previous definitions results in forward calculations
    const calculations = {
      is_first: ({}, index) => index == 0,
      date: ({ date }) => new Date(date),
      prev_id: ({ is_first }, index, array) =>
        is_first ? null : array[index - 1].id,
      price: ({ cost, liters }) => cost / liters,
      runkm: ({ kilometers, prev_id, is_first }) =>
        is_first ? null : kilometers - get_by_id(prev_id).kilometers,
      c_efficiency: ({ runkm, liters, is_first }) =>
        is_first ? null : runkm / liters,
      days_passed: ({ date, prev_id, is_first }, i, arr) =>
        is_first ? null : d3.timeDay.count(get_by_id(prev_id, arr).date, date),
      days_ago: ({ date }) => d3.timeDay.count(date, new Date())
    };
  
    // Sequentially calculating each function
    return Object.entries(calculations).reduce(
      (acc, [key, fun]) => acc.map((d, i, a) => ({ ...d, [key]: fun(d, i, a) })),
      olist
    );
  },[list])

  const periodMetrics = React.useMemo(() => {
    const last30daysRegistries = registries_metrics.filter(
      ({ days_ago }) => days_ago <= 30
    );
    const last60to30daysRegistries = registries_metrics.filter(
      ({ days_ago }) => days_ago > 30 && days_ago <= 60
    );
  
    function summaries(registries) {
      const calculations = {
        total_runkm: ({}) => d3.sum(registries, (d) => d.runkm),
        total_cost: ({}) => d3.sum(registries, (d) => d.cost),
        total_liters: ({}) => d3.sum(registries, (d) => d.liters),
        supply_amount: ({}) => registries.length,
        total_efficiency: ({ total_runkm, total_liters }) =>
          total_runkm / total_liters,
        gasTypes_uniques: ({}) => [...new Set(registries.map((d) => d.gasType))],
        gasTypes_shares: ({ gasTypes_uniques }) =>
          gasTypes_uniques.map((gasType) => ({
            gasType,
            liters: d3.sum(
              registries.filter((f) => f.gasType == gasType),
              (d) => d.liters
            )
          })),
        total_price: ({ total_cost, total_liters }) => total_cost / total_liters,
        mean_dayspassed: ({ supply_amount }) =>
          d3.sum(registries, (d) => d.days_passed) / supply_amount
      };
  
      return Object.entries(calculations).reduce(
        (acc, [key, fun]) => ({ ...acc, [key]: fun(acc) }),
        {}
      );
    }
  
    return {
      last30Days: summaries(last30daysRegistries),
      last60to30Days: summaries(last60to30daysRegistries)
    };
  },[registries_metrics])

  function get_metrics_by_id(input_id) {
    return registries_metrics.find(({id}) => input_id == id)
  }

  const ctx = {
    registries_metrics,
    get_metrics_by_id,
    periodMetrics
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