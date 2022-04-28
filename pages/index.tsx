import { gql } from '@apollo/client'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Film, FilmProps } from '../types/film'
import client from '../utils/client'

const Home: NextPage = ({ films }) => {
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
{/*           <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a> */}

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

export const getStaticProps: GetStaticProps<FilmProps> = async () => {
    const { data } = await client.query({
      query: gql`
        query GetFilms {
          films {
            id
            title
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
