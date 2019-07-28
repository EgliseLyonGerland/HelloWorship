const gradients = [
  ['#254768', '#02183B'],
  ['#3AA874', '#1F5A3F'],
  ['#C31432', '#240B36'],
];

export default gradients.reduce(
  (acc, colors, index) => ({
    ...acc,
    [index]: {
      id: `${index}`,
      startColor: colors[0],
      endColor: colors[1],
      backgroundImage: `radial-gradient(circle, ${colors[0]} 0%, ${
        colors[1]
      } 90%)`,
    },
  }),
  {},
);
