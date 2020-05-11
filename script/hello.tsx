/** @jsx h */
import { h } from "preact";

export default function Hello(props: any) {
  return (
    <div
      onClick={() => {
        console.log(props);
      }}
    >
      hello, {String(props.foo)} {props.bar}
    </div>
  );
}
