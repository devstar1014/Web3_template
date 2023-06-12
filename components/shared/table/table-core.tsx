import {
  TableInstance,
  UsePaginationInstanceProps,
  UsePaginationState,
  UseSortByInstanceProps,
  useExpanded,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table'

import TableBody from './table-body'
import TableHead from './table-head'
import TablePagination from './table-pagination'

interface TableProps {
  className?: string
  data: Array<any>
  columns: Array<any>
}

interface TableInstanceProps extends TableInstance<object> {
  page?: number
  canPreviousPage?: boolean
  canNextPage?: boolean
  pageCount?: number
  gotoPage?: Function
  nextPage?: Function
  previousPage?: Function
  setPageSize?: Function
  pageSize?: number
  pageOptions?: Array<number>
  state: any
}

export type TableInstanceWithHooks<T extends object> = TableInstance<T> &
  UsePaginationInstanceProps<T> &
  UseSortByInstanceProps<T> & {
    state: UsePaginationState<T>
  }

export function TableCore({ className, columns, data }: TableProps) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {},
    },
    useSortBy,
    useExpanded,
    usePagination
  ) as TableInstanceWithHooks<{}>

  // Render the UI for your table
  return (
    <div className={className}>
      <table className="w-full overflow-hidden " {...getTableProps()}>
        <TableHead defaultStyle headerGroups={headerGroups} className=" bg-white text-neutral-700 dark:bg-neutral-800 dark:text-neutral-100" />
        <TableBody page={page} prepareRow={prepareRow} props={getTableBodyProps()} />
      </table>
      <TablePagination
        pageSize={pageSize}
        pageCount={pageCount}
        pageIndex={pageIndex}
        gotoPage={gotoPage}
        nextPage={nextPage}
        previousPage={previousPage}
        setPageSize={setPageSize}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
      />
    </div>
  )
}

export default TableCore
