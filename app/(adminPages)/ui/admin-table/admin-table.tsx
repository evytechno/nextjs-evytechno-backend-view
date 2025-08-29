type TypeTableHead = {
  label: string;
  key: string;
  render: (value: any) => string;
};

const AdminTable = ({
  tableHead,
  tableData,
}: {
  tableHead: TypeTableHead[];
  tableData: any[];
}) => {
  return (
    <table className="my-5 px-5 text-left rounded-3xl">
      <thead className="bg-[#F8F9FA] text-[#2F3746] rounded-3xl ">
        <tr className="rounded-3xl">
          {tableHead.map(({ label }, id) => {
            return (
              <th className="p-5" key={id}>
                {label}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="px-5">
        {tableData.map((data, i) => {
          return (
            <tr key={i}>
              {tableHead.map((colData, j) => {
                return (
                  <td key={j} className="p-5 ">
                    {colData.render
                      ? colData.render(data[colData.key])
                      : data[colData.key]}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AdminTable;
