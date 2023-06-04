import { useSelector } from "react-redux"

export function StationTalbe() {
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  )

  // return <div class="table">
  //   <div class="row header">
  //     <div class="cell">Column 1</div>
  //     <div class="cell">Column 2</div>
  //   </div>
  //   <div class="row">
  //     <div class="cell">Cell 1</div>
  //     <div class="cell">Cell 2</div>
  //   </div>
  //   <div class="row">
  //     <div class="cell">Cell 3</div>
  //     <div class="cell">Cell 4</div>
  //   </div>
  //   <div class="row">
  //     <div class="cell">Cell 5</div>
  //     <div class="cell">Cell 6</div>
  //   </div>
  // </div>


}