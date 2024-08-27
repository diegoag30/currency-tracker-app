export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  return <h1>Hello from {id}</h1>;
}
