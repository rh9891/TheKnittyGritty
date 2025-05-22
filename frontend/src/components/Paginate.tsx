import { Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

type PaginateProps = {
  pages: number;
  page: number;
  isAdmin?: boolean;
  keyword?: string;
};

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = "",
}: PaginateProps) => {
  const navigate = useNavigate();

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin ? `/page/${x + 1}` : `/admin/productlist/page/${x + 1}`
            }
          >
            <Pagination.Item key={x + 1} active={x + 1 === page}>
              {x + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
