/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";

export default function Counter(props: { initialValue: number }) {
  const [state, setState] = useState(props.initialValue);
  return (
    <div>
      <h1>Counter Example</h1>
      <span>{String(state)}</span>
      <button onClick={() => setState((n) => n + 1)}>+</button>
      <button onClick={() => setState((n) => n - 1)}>-</button>
    </div>
  );
}
