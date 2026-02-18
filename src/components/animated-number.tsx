"use client";

import CountUp from 'react-countup';

type Props = {
  number: number;
};

export function AnimatedNumbers({ number }: Props) {
  return (
    <CountUp
      start={0}
      end={number}
      delay={0.5}
      duration={8}
      separator=","
      decimals={0}
    //   onEnd={() => console.log('结束！')}
    //   onStart={() => console.log('开始！')}
    />
  );
}

export default AnimatedNumbers;
