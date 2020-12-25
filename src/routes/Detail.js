import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

import Movie from "../components/Movie";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      title
      medium_cover_image
      description_intro
      language
      rating
      genres
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
  /* padding: 10px; */
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  height: 60%;
  width: 25%;
  background-color: transparent;
  background-size: cover;
  background-position: center center;
`;

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 15px;
  padding: 10px;
  position: relative;
`;

const Divider = styled.hr`
  border-top: 3px white;
  margin-top: 50px;
`;
const Genres = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;
const Genre = styled.li`
  list-style-position: inside;
  border: 1px solid white;
  border-radius: 5px;
  padding: 3px;
  margin-right: 10px;
  font-size: 20px;
  border-style: solid;
  background-color: white;
  color: #2f2f2f;
`;
export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: +id },
  });

  return (
    <Container>
      <Column>
        <Title>{loading ? "Loading..." : data.movie.title}</Title>
        <Subtitle>
          {data?.movie?.language} · {data?.movie?.rating}
        </Subtitle>
        <Genres>
          {data?.movie?.genres?.map((genre) => (
            <Genre>{genre}</Genre>
          ))}
        </Genres>
        <Description>{data?.movie?.description_intro}</Description>

        <Divider />
        <Subtitle>suggestions for you</Subtitle>
        <Movies>
          {data?.suggestions?.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              bg={movie.medium_cover_image}
            ></Movie>
          ))}
        </Movies>
      </Column>
      <Poster bg={data?.movie?.medium_cover_image} />
    </Container>
  );
};
