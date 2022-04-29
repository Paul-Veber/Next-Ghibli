import { Film, Watchlist } from "../types/film"

const localStorageKey = "watchlist"

const localStorageData = () => {
    const localData = localStorage.getItem(localStorageKey)

    return (typeof localData === "string" ?
        JSON.parse(localData) as Watchlist :
        null
    )
}

const dataToStorage = (films: Film[]) => {
    if (localStorageData === null) {

        const watchlist: Watchlist = { toWatch: films, alreadyWatched: [] }

        const dataToString = JSON.stringify(watchlist)

        localStorage.setItem(localStorageKey, dataToString)
    }
}

export const fetchStorage = (films: Film[]) => {

    dataToStorage(films)

    return localStorage
}

const checkMovieAlreadyWatched = (idToCheck: string, watchlist: Watchlist | null) => {
    const check = watchlist?.alreadyWatched.find(element => element.id = idToCheck)
    return check !== undefined
}

export const setwatchedMovie = (id: string) => {

    const localData = localStorageData()

    if (localData !== null) {

        if (checkMovieAlreadyWatched(id, localData)) {

            const filmToMove = localData.toWatch.find(element => element.id = id)

            const newToWatch = localData.toWatch.filter((value) => {
                value !== filmToMove
            })

            const newAlreadyWatched = [...localData.alreadyWatched, filmToMove]

            const newWatchlist = JSON.stringify({toWatch: newToWatch, alreadyWatched: newAlreadyWatched} as Watchlist)

            localStorage.setItem(localStorageKey, newWatchlist)
        }
    }
}