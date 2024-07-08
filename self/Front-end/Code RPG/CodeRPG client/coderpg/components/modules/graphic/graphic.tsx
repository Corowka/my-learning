import React, { PureComponent, useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./graphic.module.css";

interface WeekGraphicProps {
  labels: string[];
  values: number[];
  title: string;
  labelName?: string;
  color?: string;
}

export const WeekGraphic = ({
  labels,
  values,
  title,
  labelName = "value",
  color = "#8884d8",
}: WeekGraphicProps) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{title}</p>
      <div className={styles.content}>
        <ResponsiveContainer>
          <AreaChart
            data={
              new Array(labels.length).fill(null).map((_, i) => ({
                label: labels[i],
                value: values[i],
              })) as { value: number; label: string }[]
            }
            margin={{
              top: 10,
              right: 30,
              left: 30,
              bottom: 0,
            }}
          >
            <XAxis dataKey="label" />
            <Tooltip />
            <Area
              name={labelName}
              type="monotone"
              dataKey="value"
              stackId="1"
              stroke={color}
              fill={color}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
