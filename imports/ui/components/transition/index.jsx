import React from "react";
import "./transition.css";

export default function Transition({ children, effect }) {
  const [runningEffect, setEffect] = React.useState("nonez");

  function onEndEffect() {
    setEffect(effect);
  }

  React.useEffect(() => {
    setTimeout(onEndEffect(), 2000);
  }, [effect]);

  return (
    <figcaption>
      <div className={runningEffect}>{children}</div>
    </figcaption>
  );
}
