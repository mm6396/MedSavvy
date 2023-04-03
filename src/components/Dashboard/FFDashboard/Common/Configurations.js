export const config = {
    appendPadding: 10,
    data: data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "inner",
      offset: "-0.5",
      content: "{name} {percentage}",
      style: {
        fill: "#fff",
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [{ type: "element-active" }],
  };
  