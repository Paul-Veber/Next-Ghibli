export interface Film  {
    id?: String;
    title?: String;
    director?: String;
    description?: String;
    release_date?: String;
}

export interface FilmPrpos {
    props: {
        films: Film[]
    }
}