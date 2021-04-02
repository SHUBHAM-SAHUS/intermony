export const TextTruncate = ({ str, limit }) => {
  if (str && str.length >= limit) return str.substring(0, limit) + "...";
  return str;
};
