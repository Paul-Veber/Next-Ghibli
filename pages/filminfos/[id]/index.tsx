import { gql } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
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
            {film.peoples?.map((people: People) =>
                <div key={people.id}>
                    <h2>{people.name}</h2>
                    <p>gender: {people.gender}</p>
                    <p>age: {people.age}</p>
                </div>
            )}
        </div>
    )
}

export const getStaticProps = async ({ params }) => {

    const { data }: FilmRes = await client.query({
        query: gql`
            query GetFilm {
                film(id:"${params.id}") {
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