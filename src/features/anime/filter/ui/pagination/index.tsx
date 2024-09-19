import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/shared/components/ui/pagination'

export const PaginationFilter = () => {
  return (
    <Pagination className="items-start justify-start">
      <PaginationContent>
        <PaginationItem>
          <PaginationLink isActive href="#">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
