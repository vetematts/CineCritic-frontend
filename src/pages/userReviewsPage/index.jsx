// Import packages to navigate users to the correct review page
import { Navigate, useParams } from 'react-router-dom';

// Import authorisation / security methods
import { useAuth } from '../../contexts/AuthContext';

// Import the review panel to show all the users reviews
import { UserReviewPanel } from '../../components/userReviewPanel';

// Import the CSS styling for the user reviews page elements
import { StyledContainer, StyledPageTitle } from './style';

export function UserReviewsPage() {
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
