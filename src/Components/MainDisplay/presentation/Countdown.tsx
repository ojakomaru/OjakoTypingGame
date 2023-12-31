import React from "react";
import { useCountdown } from "../../../Hooks";

interface CountdownProps {
  count: number;
  setCountdown: (a: number) => void;
}
const Countdown = ({ count, setCountdown }: CountdownProps) => {
  useCountdown(count, setCountdown);
  return <div>{count}</div>;
};

export default Countdown;
