import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent({color="#F0F0F0",...props}) {
  return (
    <Svg
      width={120}
      height={114}
      viewBox="0 0 120 114"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M99.65 8.083c10.467 7.401 17.681 21.102 19.746 36.893 2.065 15.79-1.019 33.616-11.485 47.034-10.467 13.418-28.317 22.429-45.375 21.582-17.03-.819-33.239-11.469-44.979-24.887C5.817 75.287-1.453 59.1.245 44.609c1.697-14.492 12.39-27.26 24.13-34.662C36.115 2.575 48.9.57 62.168.09 75.464-.363 89.184.71 99.65 8.083z"
        fill={color}

      />
    </Svg>
  )
}

export default SvgComponent