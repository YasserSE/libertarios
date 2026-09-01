"use client";

export interface TableRow {
  code: string;
  territory: string;
  group: string;
  count: number;
  share: number;
  growth30d: number;
}

/**
 * Table view of the same figures the choropleth encodes.
 *
 * Required, not optional: it is the relief channel for the lightest ramp steps
 * and the only way the map's content is available to a screen reader in full.
 */
export function AffiliateDataTable({ rows, groupLabel }: { rows: TableRow[]; groupLabel: string }) {
  return (
    <div className="max-h-[28rem] overflow-auto rounded-2xl border border-border">
      <table className="w-full border-collapse text-sm">
        <caption className="sr-only">
          Simpatizantes registrados por territorio, con su porcentaje sobre el total y las altas
          de los últimos 30 días.
        </caption>
        <thead className="sticky top-0 z-10 bg-card">
          <tr className="border-b border-border text-left">
            <th scope="col" className="px-4 py-3 font-display text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Territorio
            </th>
            <th scope="col" className="hidden px-4 py-3 font-display text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:table-cell">
              {groupLabel}
            </th>
            <th scope="col" className="px-4 py-3 text-right font-display text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Simpatizantes
            </th>
            <th scope="col" className="px-4 py-3 text-right font-display text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              %
            </th>
            <th scope="col" className="hidden px-4 py-3 text-right font-display text-xs font-semibold uppercase tracking-wide text-muted-foreground md:table-cell">
              30 días
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.code} className="border-b border-border/60 last:border-0 hover:bg-accent/40">
              <th scope="row" className="px-4 py-2.5 text-left font-medium text-foreground">
                {row.territory}
              </th>
              <td className="hidden px-4 py-2.5 text-muted-foreground sm:table-cell">{row.group}</td>
              <td className="px-4 py-2.5 text-right tabular-nums text-foreground">
                {row.count.toLocaleString("es-ES")}
              </td>
              <td className="px-4 py-2.5 text-right tabular-nums text-muted-foreground">
                {(row.share * 100).toFixed(1)}%
              </td>
              <td className="hidden px-4 py-2.5 text-right tabular-nums text-muted-foreground md:table-cell">
                +{row.growth30d.toLocaleString("es-ES")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
