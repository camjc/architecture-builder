import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { loader } from "graphql.macro";

import StateManagement from "./state-management";
import ArchitectureData from "../types/ArchitectureData";
import mapGraphqlForConsumption from "./map-graphql-for-consumption";

const query = loader("./GET_ALL_ARCHITECTURE.gql");

const App = () => {
  const { loading, error, data } = useQuery<ArchitectureData>(query);
  if (loading) return <div>Loading …</div>;
  if (error) return <div>Error :(</div>;
  if (!data) return <div>No data :(</div>;
  return <StateManagement {...mapGraphqlForConsumption(data)} />;
};

export default App;