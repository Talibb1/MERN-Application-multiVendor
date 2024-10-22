import * as React from "react"

export const Table = React.forwardRef<HTMLTableElement, React.TableHTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <table ref={ref} className={`w-full ${className}`} {...props} />
  )
)

Table.displayName = "Table"

export const TableHeader = ({ children }: React.PropsWithChildren) => (
  <thead className="bg-muted text-muted-foreground">{children}</thead>
)

export const TableBody = ({ children }: React.PropsWithChildren) => (
  <tbody className="divide-y">{children}</tbody>
)

export const TableRow = ({ children }: React.PropsWithChildren) => (
  <tr className="even:bg-muted/50">{children}</tr>
)

export const TableHead = ({ children }: React.PropsWithChildren) => (
  <th className="py-2 px-4 text-left text-sm font-medium">{children}</th>
)

export const TableCell = ({ children }: React.PropsWithChildren) => (
  <td className="py-2 px-4 text-sm">{children}</td>
)
