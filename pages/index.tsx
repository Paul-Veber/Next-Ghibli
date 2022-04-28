import { gql } from '@apollo/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Film, FilmsProps, FilmsRes } from '../types/film'
import client from '../utils/client'
import Link from 'next/link'

const Home: NextPage<FilmsProps> = (props) => {

  const { films } = props

  return (
    <div className={styles.container}>
      <Head>
        <title>Ghibli Wiki et Watchlist</title>
        <meta name="description" content="Obtenez des informations sur le studio et vérifié les films que vous avez déjà vu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Ghibli Wiki et Watchlist
        </h1>

        <p className={styles.description}>
          Obtenez des informations sur le studio et vérifié les films que vous avez déjà vu
        </p>

        <div className={styles.grid}>
          {films.map((film: Film) =>
            <div key={film.id}>
              <Link href={{ pathname: '/filminfos/[id]', query: { id: film.id }, }}>
                <a className={styles.card}>
                  <h2>{film.title} &rarr;</h2>
                  <p>{film.description}</p>
                </a>
              </Link>
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export const getStaticProps = async () => {
  const { data }: FilmsRes = await client.query({
    query: gql`
        query GetFilms {
          films {
            id
            title
            description
          }
        }
      `,
  });

  return {
    props: {
      films: data.films,
    },
  };
}

export default Home
