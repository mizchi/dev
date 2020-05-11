/** @jsx h */
import { h, Fragment } from "preact";
import { useState } from "preact/hooks";

function Counter(props: { initialValue: number }) {
  const [state, setState] = useState(props.initialValue);
  return (
    <button onClick={() => setState((n) => n + 1)}>{String(state)}</button>
  );
}

export default function App(props: any) {
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
          <Counter initialValue={props.initialValue} />
        </div>
      )}
    </Fragment>
  );
}
