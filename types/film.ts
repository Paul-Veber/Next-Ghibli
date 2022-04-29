import { Key } from "react";

export interface People {
    id?: Key
    name?: String
    gender?: String
    age?: String

}

export interface Film  {
    id: Key 
    title?: String
    director?: String
    description?: String
    release_date?: String
    people?: People[]
}

export interface Watchlist {
    toWatch: Film[]
    alreadyWatch: Film[] | []
}

export interface FilmProps {
    film: Film
}

export interface FilmRes {
    data: {
        film: Film
    }
}

export interface FilmsProps {
    films: Film[]
}

export interface FilmsRes {
    data: {
        films: Film[]
    }
}