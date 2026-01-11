import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { get } from "../api/api";

const StyledContainer = styled.section`
    width: 100rem;
    padding: 1rem 0 2rem 0;
`;

const StyledTitle = styled.h2`
    margin-bottom: 0.5rem;
`;

const StyledMeta = styled.p`
    margin: 0.25rem 0;
    color: #bdbdbd;
`;

const StyledError = styled.p`
    color: #ffb4a2;
`;

function MovieDetailPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        }

        let isMounted = true;

        const loadMovie = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await get(`/api/movies/${id}`);

                if (isMounted) {
                    setMovie(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err?.error || "Unable to load movie details.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadMovie();

        return () => {
            isMounted = false;
        };
    }, [id]);

    return (
        <StyledContainer>
            {loading && <p>Loading...</p>}
            {error && <StyledError>{error}</StyledError>}
            {!loading && movie && (
                <>
                    <StyledTitle>{movie.title || movie.name}</StyledTitle>
                    {movie.release_date && (
                        <StyledMeta>Released {movie.release_date}</StyledMeta>
                    )}
                    {movie.runtime && (
                        <StyledMeta>Runtime {movie.runtime} minutes</StyledMeta>
                    )}
                    {movie.vote_average && (
                        <StyledMeta>Rating {movie.vote_average}</StyledMeta>
                    )}
                    {movie.overview && <p>{movie.overview}</p>}
                </>
            )}
        </StyledContainer>
    );
}

export default MovieDetailPage;
