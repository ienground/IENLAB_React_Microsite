import {RiAppleFill, RiComputerFill, RiPagesFill} from "@remixicon/react"
import IcAndroid from "@/assets/icon/android.svg?react"
import IcArduino from "@/assets/icon/arduino.svg?react"
import {Portfolio as Base} from "@/domain/model/Portfolio.ts"


export namespace PortfolioX {
  export namespace Platform {
    export function getIcon(value: Base.Platform, size: number = 16) {
      const map = {
        [Base.Platform.ANDROID]: <IcAndroid style={{ width: size, height: size }} />,
        [Base.Platform.IOS]: <RiAppleFill size={size} />,
        [Base.Platform.WEB]: <RiPagesFill size={size} />,
        [Base.Platform.PC]: <RiComputerFill size={size} />,
        [Base.Platform.ARDUINO]: <IcArduino style={{ width: size, height: size }} />,
      }

      return map[value]
    }
  }
}