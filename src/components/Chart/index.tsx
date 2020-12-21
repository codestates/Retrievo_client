/* eslint-disable prefer-rest-params */
/* eslint-disable react/no-this-in-sfc */
import React from "react";
import { Spinner } from "@chakra-ui/react";
import { Doughnut, Bar } from "react-chartjs-2";
import format from "date-fns/format";
import { enUS } from "date-fns/esm/locale";
import { chartVariant } from "./types";
import dataSchemaGenerator from "./utils";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Chartjs2 = require("react-chartjs-2").Chart;

export type chartProps = {
  variant: chartVariant;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

const Chart: React.FC<chartProps> = ({ variant, data, ...props }) => {
  if (variant === "taskCountSummary") {
    const options = {
      title: {
        display: true,
        text: "Task Count Summary",
        fontSize: 24,
      },
    };

    const legend = {
      display: false,
    };

    const originalDoughnutDraw = Chartjs2.controllers.doughnut.prototype.draw;
    Chartjs2.helpers.extend(Chartjs2.controllers.doughnut.prototype, {
      draw() {
        originalDoughnutDraw.apply(this, arguments);

        const { chart } = this;
        const { width } = chart;
        const { height } = chart;
        const { ctx } = chart;

        const fontSize = (height / 228).toFixed(2);
        ctx.font = `${fontSize}em sans-serif`;
        ctx.textBaseline = "middle";
        const formattedToday = format(new Date(), "MMM d");

        const text = `${formattedToday}`;
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 1.8;

        ctx.fillText(text, textX, textY);
      },
    });

    return (
      <>
        <Doughnut
          data={dataSchemaGenerator(variant, data)}
          options={options}
          legend={legend}
        />
      </>
    );
  }
  if (variant === "tasksByAssignee") {
    const options = {
      title: {
        display: true,
        text: "Tasks By Assignee",
        fontSize: 24,
      },
      scales: {
        xAxes: [
          {
            ticks: {
              maxTicksLimit: 5,
              display: true,
              autoSkip: true,
            },
            stacked: true,
            gridLines: { display: false },
          },
        ],
        yAxes: [
          {
            display: false,
            stacked: true,
            gridLines: { display: false },
            ticks: {
              beginAtZero: true, // minimum value will be 0.
            },
          },
        ],
      },
    };

    const legend = {
      display: false,
    };

    return (
      <>
        <Bar
          data={dataSchemaGenerator(variant, data)}
          options={options}
          legend={legend}
          {...props}
        />
      </>
    );
  }
  if (variant === "incompleteTaskStatus") {
    const options = {
      title: {
        display: true,
        text: "Incomplete Tasks",
        fontSize: 24,
      },
      scales: {
        xAxes: [
          {
            maxTicksLimit: 4,
            gridLines: { display: false },
          },
        ],
        yAxes: [
          {
            display: true,
            ticks: {
              beginAtZero: true, // minimum value will be 0.
              autoSkip: true,
              maxTicksLimit: 3,
            },
          },
        ],
      },
    };

    const legend = {
      display: false,
    };

    return (
      <>
        <Bar
          data={dataSchemaGenerator(variant, data)}
          options={options}
          legend={legend}
        />
      </>
    );
  }
  return <Spinner />;
};

export default Chart;
