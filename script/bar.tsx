/** @jsx h */
import { h, Fragment } from "preact";
import { useState } from "preact/hooks";

function Counter() {
  const [state, setState] = useState(0);
  return (
    <button onClick={() => setState((n) => n + 1)}>{String(state)}</button>
  );
}

export default function App() {
  const [state, setState] = useState(false);
  return (
    <Fragment>
      <button
        onClick={() => {
          setState(true);
        }}
      >
        clickme
      </button>
      {state && (
        <div>
          <Counter />
        </div>
      )}
    </Fragment>
  );
}
