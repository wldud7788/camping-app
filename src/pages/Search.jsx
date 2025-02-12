import { useParams } from "react-router-dom";

export const Search = () => {
  const params = useParams();
  return <div>{params.id}</div>;
};
