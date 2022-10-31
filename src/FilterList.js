import React, { useState, useTransition } from "react";

export function FilterList({ names }) {
  const [highlight, setHighlight] = useState("");

  const [isPending, startTransition] = useTransition();

  const changeHandler = ({ target: { value } }) => {
    startTransition(() => setHighlight(value));
  };

  return (
    <div>
      <input onChange={changeHandler} type="text" />
      {isPending && <p>Updating list..</p>}
      <SearchList names={names} highlight={highlight} />
    </div>
  );
}

function SearchList({ names, highlight }) {
  return (
    <>
      {names.map((name, i) => (
        <ListItem key={i} name={name} highlight={highlight} />
      ))}
    </>
  );
}

function ListItem({ name, highlight }) {
  const index = name.toLowerCase().indexOf(highlight.toLowerCase());
  if (index === -1) {
    return <div>{name}</div>;
  }
  return (
    <div>
      {name.slice(0, index)}
      <span className="highlight">
        {name.slice(index, index + highlight.length)}
      </span>
      {name.slice(index + highlight.length)}
    </div>
  );
}
