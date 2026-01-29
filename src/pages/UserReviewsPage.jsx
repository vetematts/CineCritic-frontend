import { Navigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { UserReviewPanel } from '../components/userReviewPanel';

const StyledContainer = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  color: rgba(255, 255, 255, 0.87);

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const StyledPageTitle = styled.h1`
  color: rgba(255, 255, 255, 0.95);
  font-size: 2.5rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

export default function UserReviewsPage() {
  const { user, isAuthenticated } = useAuth();
  const { id: routeUserId } = useParams();
  const userId = user?.id ?? user?.sub ?? null;
  const targetUserId = routeUserId ? Number(routeUserId) : userId;
  const isOwner = !routeUserId || Number(routeUserId) === userId;

  if (!routeUserId && !isAuthenticated) return <Navigate to="/login" />;

  return (
    <StyledContainer>
      <StyledPageTitle>Reviews</StyledPageTitle>
      <UserReviewPanel
        userId={targetUserId}
        showViewAll={false}
        isOwner={isOwner}
        usePublicEndpoints={!isOwner}
      />
    </StyledContainer>
  );
}
