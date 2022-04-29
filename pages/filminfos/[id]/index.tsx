import { gql } from "@apollo/client";
import { GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { Film, FilmProps, FilmRes, People } from "../../../types/film";
import client from "../../../utils/client";

const FilmInfos: NextPage<FilmProps> = (props) => {
    const { film } = props
    console.log("props", props)

    return (
        <div>
            <h1>{film.title}</h1>
            <p>{film.description}</p>
            <p>Release date : {film.release_date}</p>
            {film.people?.map((character: People) =>
                <div key={character.id}>
                    <h2>{character.name}</h2>
                    <p>gender: {character.gender}</p>
                    <p>age: {character.age}</p>
                </div>
            )}
        </div>
    )
}

interface IdParams extends ParsedUrlQuery {
    id: string
}

export const getStaticProps: GetStaticProps = async (context) => {

    const { id } = context.params as IdParams

    const { data }: FilmRes = await client.query({
        query: gql`
            query GetFilm {
                film(id:"${id}") {
                    id
                    title
                    description
                    release_date
                    people {
                        id
                        name
                        age 
                        gender
                    }
                }
            }
        `
    })

    return {
        props: {
            film: data.film
        }
    }
}

export async function getStaticPaths() {
    const { data } = await client.query({
        query: gql`
            query GetFilm {
                films {
                    id
                }
            }
        `
    })

    const films = await data.films


    const paths = films.map((film: Film) => ({
        params: { id: film.id }
    }))

    console.log(paths)

    return { paths: paths, fallback: false }

}

export default FilmInfos