// components/ui/TableSkeleton.tsx

import Skeleton from "./skeleton";
type TypeTableHead = {
  label: string;
  key: string;
};

interface TableSkeletonProps {
  rows?: number;
  // columns?: number;
  tableHead: TypeTableHead[];
}

export default function TableSkeleton({
  rows,
  // columns,
  tableHead,
}: TableSkeletonProps) {
  return (
    <table className="my-5 px-5 text-left !rounded-3xl shadow-md shadow-[#ccc]">
      <thead className="bg-[#F8F9FA] text-[#2F3746] !rounded-t-3xl border-b-2 border-[#000]/40">
        <tr className="!rounded-t-3xl  ">
          {tableHead.map((id) => {
            return (
              <th
                className="p-5 bg-blend border-l-1 border-r-1  border-[#000]/5"
                key={id.key.toString()}
              >
                <Skeleton width="70%" height="24px" />
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="px-5">
        {Array.from({ length: rows || 4 }).map((_, rowIndex) => {
          return (
            <tr key={rowIndex} className=" border-t-1 border-[#000]/20">
              {tableHead.map((j) => {
                return (
                  <td
                    key={j.key.toString()}
                    className="p-5 border-l-1 border-r-1  border-[#000]/5"
                  >
                    <Skeleton
                      height="24px"
                      width={`${50 + Math.random() * 40}%`}
                    />
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>

    // <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
    //   <table className="w-full border-collapse">
    //     <thead className="bg-gray-100">
    //       <tr>
    //         {Array.from({ length: columns || 6 }).map((_, i) => (
    //           <th
    //             key={i}
    //             className="px-4 py-2 text-left text-sm font-medium text-gray-500"
    //           >
    //             <Skeleton width="70%" height="24px" />
    //             <Skeleton width="70%" height="24px" />
    //           </th>
    //         ))}
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {Array.from({ length: rows || 4 }).map((_, rowIndex) => (
    //         <tr key={rowIndex} className="border-t">
    //           {Array.from({ length: columns || 6 }).map((_, colIndex) => (
    //             <td key={colIndex} className="px-4 py-3">
    //               <Skeleton
    //                 height="24px"
    //                 width={`${50 + Math.random() * 40}%`}
    //               />
    //               <Skeleton
    //                 height="24px"
    //                 width={`${50 + Math.random() * 40}%`}
    //               />
    //             </td>
    //           ))}
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  );
}
