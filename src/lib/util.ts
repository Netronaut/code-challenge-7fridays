export function sortBy<T>(sortBy: keyof T, order: "asc" | "desc" = "asc") {
  return (a: T, b: T) => {
    return a[sortBy] > b[sortBy]
      ? order === "asc"
        ? 1
        : -1
      : a[sortBy] < b[sortBy]
      ? order === "asc"
        ? -1
        : 1
      : 0;
  };
}
