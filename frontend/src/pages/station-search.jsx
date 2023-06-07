import { AppHeader } from '../cmps/app-header'

export function StationSearch() {
  return (
    <section>
      <h1>Hi from the Search component</h1>
      <input
        value=""
        onChange="{handleChange}"
        name="txt"
        id="txt"
        type="text"
        placeholder="What do you want to listen to?"
      />
    </section>
  )
}
