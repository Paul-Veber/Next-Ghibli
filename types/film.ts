import { Key } from "react";


export interface Film  {
    id?: Key ;
    title?: String;
    director?: String;
    description?: String;
    release_date?: String;
}

export interface FilmProps {
    data: {
        films: Film[]
    }
}