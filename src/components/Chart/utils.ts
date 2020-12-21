import Spinner from "../Spinner";
import {
  taskCountSummary,
  tasksByAssignee,
  incompleteTaskStatus,
} from "./types";

export const dataSchemaGenerator = (
  variant: string,
  data: taskCountSummary & tasksByAssignee & incompleteTaskStatus
): Record<string, unknown> | null => {
  if (variant === "incompleteTaskStatus") {
    if (!data) return null;
    const labels = Object.keys(data);
    const numbers = Object.values(data);
    const schema = {
      labels,
      datasets: [
        {
          data: numbers,
          backgroundColor: [
            "#31D5BF",
            "#9F7AEA",
            "#EE8030",
            "#3949AB",
            "#76B515",
          ],
          hoverBackgroundColor: [
            "#E9E9E9",
            "#E9E9E9",
            "#E9E9E9",
            "#E9E9E9",
            "#E9E9E9",
          ],
          barPercentage: 0,
          barThickness: 50,
          maxBarThickness: 50,
          minBarLength: 25,
        },
      ],
    };
    return schema;
  }

  if (variant === "tasksByAssignee" && Array.isArray(data)) {
    const criterion = [
      "incompleteTasksCount",
      "completedTasksCount",
      "overdueTasksCount",
    ];

    const context = data.slice(0, 5);

    const backgroundColors = ["#31D5BF", "#3949AB", "#76B515"];
    const hoverBackgroundColor = ["#CDF1EC", "#933183", "#FFE81D"];
    const labels = context.map(
      (
        assignee: Record<string, string | number | null | undefined>,
        index: number
      ) => {
        const name = context[index].username?.split(" ");
        if (!name) {
          return null;
        }
        if (name.length > 1) {
          return `${name[0].toUpperCase()} ${name[1][0].toUpperCase()}.`;
        }
        return name[0].toUpperCase();
      }
    );
    const incompleteTasksCountData = context.map(
      (assignee) => assignee.incompleteTasksCount
    );
    const completedTasksCountData = context.map(
      (assignee) => assignee.completedTasksCount
    );
    const overdueTasksCountData = context.map(
      (assignee) => assignee.overdueTasksCount
    );
    const compositeCountData = [
      incompleteTasksCountData,
      completedTasksCountData,
      overdueTasksCountData,
    ];
    const dataLabel = ["Complete", "Incomplete", "Overdue"];
    const datasets = criterion.map((criteria: string, index: number) => {
      return {
        label: dataLabel[index],
        data: compositeCountData[index],
        backgroundColor: backgroundColors[index],
        hoverBackgroundColor: hoverBackgroundColor[index],
        hoverBorderWidth: 1,
        hoverBorderColor: "lightgrey",
        barPercentage: 0,
        barThickness: 50,
        maxBarThickness: 50,
        minBarLength: 25,
      };
    });

    const schema = {
      labels,
      datasets,
    };
    return schema;
  }

  if (variant === "taskCountSummary") {
    if (!data) return null;
    const mappedData = [
      data.incompleteTasksCount,
      data.completedTasksCount,
      data.overdueTasksCount,
    ];

    const schema = {
      labels: ["Incomplete", "Complete", "Overdue"],
      datasets: [
        {
          backgroundColor: [
            "#31D5BF",
            "#9F7AEA",
            "#EE8030",
            "#3949AB",
            "#76B515",
          ],
          data: mappedData,
        },
      ],
    };

    return schema;
  }

  return {};
};

export default dataSchemaGenerator;
