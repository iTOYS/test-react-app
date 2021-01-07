import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { selectUsers, fetchUsers } from './UsersSlice';
import { UsersList } from './UsersList';
import { Status } from '../models/Status';
import { RootState } from '../app/store';

export function Users(): JSX.Element {
  const users = useSelector(selectUsers);
  const status = useSelector((state: RootState) => state.users.status);
  const error = useSelector((state: RootState) => state.users.error);
  const currentPage = useSelector(
    (state: RootState) => state.users.currentPage
  );
  const totalPages = useSelector((state: RootState) => state.users.totalPages);
  const isVisible = useSelector((state: RootState) => state.users.visible);
  const dispatch = useDispatch();
  const loader = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleObserver = (entities, observer) => {
      const target = entities[0];
      if (target.isIntersecting) {
        dispatch(fetchUsers());
        observer.unobserve(loader.current);
      }
    };
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);

    if (
      status === Status.Succeeded &&
      (totalPages === -1 || currentPage < totalPages)
    ) {
      if (loader && loader.current) {
        observer.observe(loader.current);
      }
    }

    if (status === Status.Idle || status === Status.Failed) {
      dispatch(fetchUsers());
    }
  }, [status, currentPage, totalPages, dispatch]);

  return (
    <Container className={!isVisible ? 'hiddenContainer' : ''}>
      <Row className="justify-content-md-center">
        <Col md={10} lg={6} className="usersHeader">
          Users
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={10} lg={6}>
          {error ? <div>Error: {error}</div> : <UsersList users={users} />}
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={10} lg={6} className="usersFooter">
          <footer ref={loader}>
            {status === Status.Loading ? (
              <Spinner animation="grow" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            ) : (
              `${currentPage} of ${totalPages} pages loaded`
            )}
          </footer>
        </Col>
      </Row>
    </Container>
  );
}
