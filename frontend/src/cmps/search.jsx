


export function Search() {
    const results = useSelector((storeState) =>
        storeState.playerModule.searchResults)

    function getresults(txt) {
        const songs = trackService.getVideos(txt)
    }

    return (
        <div>hello from search element
            <input
                value={txt}
                onChange={handleChange}
                name="txt"
                id="txt"
                type="text"
                placeholder='What do you want to listen to?'
            />
        </div>
    )
}











