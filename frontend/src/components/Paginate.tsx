import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

type PaginateProps = {
  pages: number;
  page: number;
  isAdmin?: boolean;
  keyword?: string;
  currentPath?: string;
};

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = "",
  currentPath = "",
}: PaginateProps) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => {
          let pagePath = "";

          if (isAdmin) {
            pagePath = `/admin/products/page/${x + 1}`;
          } else if (currentPath.includes("/top-rated")) {
            pagePath = keyword
              ? `/top-rated/search/${keyword}/page/${x + 1}`
              : `/top-rated/page/${x + 1}`;
          } else {
            pagePath = keyword
              ? `/search/${keyword}/page/${x + 1}`
              : `/page/${x + 1}`;
          }

          return (
            <LinkContainer key={x + 1} to={pagePath}>
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </LinkContainer>
          );
        })}
      </Pagination>
    )
  );
};

export default Paginate;
