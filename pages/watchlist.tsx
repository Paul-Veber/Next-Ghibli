import { gql } from "@apollo/client"
import { GetStaticProps, NextPage } from "next"
import { FilmsProps, FilmsRes } from "../types/film"
import client from "../utils/client"

const Watchlist: NextPage<FilmsProps> = (props) => {

    const { films } = props

    return(
        <div>
            <div>
                <h2>To Watch</h2>
                <div></div>
            </div>
            <div>
                <h2>Already Watched</h2>
                <div></div>
            </div>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {

    const { data }: FilmsRes = await client.query({
        query: gql`
            query GetFilm {
                film {
                    id
                    title
                }
            }
        `
    })

    return {
        props: {
            films: data.films
        }
    }
}

export default Watchlist