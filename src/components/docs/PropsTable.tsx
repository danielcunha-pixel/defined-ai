interface PropDef {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

interface PropsTableProps {
  props: PropDef[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="my-6 overflow-hidden rounded-[8px] border border-grey-20">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-grey-20 bg-grey-5">
            <th className="px-4 py-2.5 ds-text-body-sm font-semibold text-grey-70">
              Prop
            </th>
            <th className="px-4 py-2.5 ds-text-body-sm font-semibold text-grey-70">
              Type
            </th>
            <th className="px-4 py-2.5 ds-text-body-sm font-semibold text-grey-70">
              Default
            </th>
            <th className="px-4 py-2.5 ds-text-body-sm font-semibold text-grey-70">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-grey-10">
          {props.map((prop) => (
            <tr key={prop.name} className="hover:bg-grey-5 transition-colors">
              <td className="px-4 py-2.5">
                <code className="rounded bg-grey-10 px-1.5 py-0.5 text-[13px] font-medium text-purple-70">
                  {prop.name}
                </code>
                {prop.required && (
                  <span className="ml-1 text-[10px] font-medium text-red-60">
                    *
                  </span>
                )}
              </td>
              <td className="px-4 py-2.5">
                <code className="text-[13px] text-grey-60">{prop.type}</code>
              </td>
              <td className="px-4 py-2.5">
                {prop.default ? (
                  <code className="text-[13px] text-grey-60">
                    {prop.default}
                  </code>
                ) : (
                  <span className="text-[13px] text-grey-30">-</span>
                )}
              </td>
              <td className="px-4 py-2.5 ds-text-body-sm font-regular text-grey-70">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
