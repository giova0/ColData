import React, { useReducer, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import carsfile from "./cars-small.json";
import { Dropdown } from "primereact/dropdown";

const init = initialState => initialState;

//OJO: action deconstruido automaticamente en type, payload y filtro
const reducer = (state, { type, filtro, payload }) => {
  switch (type) {
    //OJO: [filtro] se refiere a la propiedad del state cuyo valor venga en la variable filtro
    //En este caso equivale a brandFilter: payload.value
    case "onFilterChanged":
      return { ...state, loading: true, [filtro]: payload.value };
    case "dataLoaded":
      return { ...state, results: payload, loading: false };
    default:
      throw new Error();
  }
};

export const CarsTable = () => {
  const initialState = {
    results: [],
    loading: true,
    brandFilter: ""
  };
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const { results, loading, brandFilter } = state;

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        //OJO: Simulamos el filtrado en el servidor
        const data = carsfile.data.filter(row =>
          brandFilter ? row.brand === brandFilter : true
        );

        dispatch({ type: "dataLoaded", payload: data });
      }, 50);
    }
  }, [loading, brandFilter]);

  let brands = [
    { label: "Cualquiera", value: "" },
    { label: "VW", value: "VW" },
    { label: "Audi", value: "Audi" },
    { label: "Renault", value: "Renault" },
    { label: "Mercedes", value: "Mercedes" }
  ];

  let brandsFilter = (
    <Dropdown
      //OJO: Los estilos de primeReact suelen tener seteado el minWidth a algo bastante grande
      //Eso hace que se comporten de forma extraña, conviene ponerlos a 0px
      style={{ minWidth: "0px", width: "100%" }}
      panelStyle={{ minWidth: "0px", width: "120%" }}
      value={brandFilter}
      options={brands}
      onChange={e =>
        dispatch({ type: "onFilterChanged", payload: e, filtro: "brandFilter" })
      }
    />
  );

  return (
    <div>
      <DataTable value={results} loading={loading}>
        <Column field="vin" header="Vin" />
        <Column field="year" header="Year" />
        <Column
          field="brand"
          filter
          header="Brand"
          filterElement={brandsFilter}
        />
        <Column field="color" header="Color" />
      </DataTable>
    </div>
  );
};
