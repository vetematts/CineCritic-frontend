import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`;

export const StyledSkeletonList = styled.ul`
  list-style: none;
  padding: 0 16px;
  margin: 0;
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: thin;
  scrollbar-color: #5a5b5f #242424;
  width: 100%;
  min-width: 0;

  & > li {
    flex-shrink: 0;
    padding: 16px 0;
    margin: 0;
  }

  @media (max-width: 768px) {
    padding: 0 8px;
    gap: 0.5rem;
  }
`;

export const StyledSkeletonItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const StyledSkeletonCard = styled.div`
  width: 150px;
  border-radius: 5px;
  overflow: hidden;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.06) 0%,
    rgba(255, 255, 255, 0.12) 50%,
    rgba(255, 255, 255, 0.06) 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.1s ease-in-out infinite;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
`;

export const StyledSkeletonPoster = styled.div`
  width: 100%;
  height: 225px;
  background-color: rgba(255, 255, 255, 0.08);
`;

export const StyledSkeletonContent = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const StyledSkeletonLine = styled.div`
  height: 0.7rem;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.15);
`;

export const StyledSkeletonLineShort = styled(StyledSkeletonLine)`
  width: 60%;
`;
