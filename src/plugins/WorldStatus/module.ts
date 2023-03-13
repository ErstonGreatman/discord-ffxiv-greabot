export const groupWorldStatusByDC = (datacenters: Record<string, string[]>, serverStatus: Record<string, number>) => {
  const dcMap = new Map();

  // Group worlds by Datacenters
  const grouped = Object.keys(datacenters).reduce((dcGroups, dc) => ({
    ...dcGroups,
    ...{ [dc]: Object.entries(serverStatus).filter(([world]) => datacenters[dc].includes(world)) },
  }), {});

  // Remove empty arrays; we must not have data for them (usually Chinese worlds)
  return Object.fromEntries(Object.entries(grouped).filter(([_, v]) => (v as []).length));
};
