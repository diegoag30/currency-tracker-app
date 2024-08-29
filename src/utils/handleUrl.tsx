export function extractSubpathAndQuery(url: URL): {
  subpath: string;
  queryString: string;
} {
  const copyUrl = url;
  const subpath = copyUrl.searchParams.get("subpath") || "";
  copyUrl.searchParams.delete("subpath");

  const queryString = copyUrl.searchParams.toString();
  console.log(subpath, queryString);
  return { subpath, queryString };
}
