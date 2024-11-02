import client from "../../../../prisma/db";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;

    const url = await client.url.findUnique({ where: { id: id } });

  return (
    <main className="grid place-items-center h-full">
      <div>
        <h1 className="text-xl underline  ">
          <a href={`${process.env.SHORT_ROOT_URL}/u/${id}`}>
            {process.env.SHORT_ROOT_URL}/u/{id}
          </a>
        </h1>
        <table className="">
          <tbody>
            <tr>
              <th className="text-left">source</th>
              <td className="text-right overflow-hidden text-xs">
                {url?.source}
              </td>
            </tr>
            <tr>
              <th className="text-left">created</th>
              <td className="text-right text-xs">
                {url?.created.toISOString()}
              </td>
            </tr>
            <tr>
              <th className="text-left">clicks</th>
              <td className="text-right text-xs">{url?.clicks}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
