module.exports = ({ accuracy }) => {
  if (!accuracy) {
    return { zoom: 3 };
  }

  const breakpoints = [
    { accuracy: 1000, zoom: 4 },
    { accuracy: 200, zoom: 6 },
    { accuracy: 100, zoom: 7 },
    { accuracy: 50, zoom: 8 },
    { accuracy: 10, zoom: 11 },
    { accuracy: 5, zoom: 12 },
    { accuracy: 0, zoom: 19 }
  ];

  const breakpoint = breakpoints.find(breakpoints => accuracy >= breakpoints.accuracy);
  return { zoom: breakpoint.zoom };
};
