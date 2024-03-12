import { useSnapshot } from "valtio"

import state from '../store'

const Tab = ({tab, isFitlerTab, isActiveTab, handlClick}) => {
  const snap = useSnapshot(state)

  const activeStyle = isFitlerTab && isActiveTab 
  ? {backgroundColor: snap.color, opacity:0.5}
  : {backgroundColor: "transparent", opacity:1}
  return (
    <div 
      key={tab.name}
      className={`tab-btn ${isFitlerTab ? 'rounded-full glassmorhism' : 'rounded-4'}`}
      onClick={handlClick}
      style={activeStyle}
    >
      <img
        src={tab.icon}
        alt={tab.name}
        className={`${isFitlerTab ? 'w-2/3 h-2/3': 'w-11/12 h-11/12 object-contain'}`}
      />
    </div>
  )
}

export default Tab
