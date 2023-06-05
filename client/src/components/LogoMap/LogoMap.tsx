import { Airlines } from '../common/common'

type LogoData = {
  airline: string
}

export const LOGO_MAP = {
  [Airlines.VIETNAM_AIRLINES]: (
    <>
      <img
        src={require('../../images/vna-logo-05.png')}
        style={{ maxHeight: 100 }}
      />
    </>
  ),
  [Airlines.BAMBOO_AIRWAYS]: (
    <>
      <img
        src={require('../../images/bamboo.png')}
        style={{ maxHeight: 100 }}
      />
    </>
  ),
  [Airlines.VIETJET_AIR]: (
    <>
      <img src={require('../../images/vj.png')} style={{ maxHeight: 100 }} />
    </>
  ),
}

export const getLogoComponent = (data: LogoData) => {
  let logoId: Airlines
  let { airline } = data

  if (airline.includes(Airlines.VIETNAM_AIRLINES)) {
    logoId = Airlines.VIETNAM_AIRLINES
    const Logo: JSX.Element = LOGO_MAP[logoId]

    if (!Logo) {
      return <>'LOGO_NOT_FOUND'</>
    }

    return Logo
  } else if (airline.includes(Airlines.BAMBOO_AIRWAYS)) {
    logoId = Airlines.BAMBOO_AIRWAYS
    const Logo: JSX.Element = LOGO_MAP[logoId]

    if (!Logo) {
      return <>'LOGO_NOT_FOUND'</>
    }

    return Logo
  } else if (airline.includes(Airlines.VIETJET_AIR)) {
    logoId = Airlines.VIETJET_AIR
    const Logo: JSX.Element = LOGO_MAP[logoId]

    if (!Logo) {
      return <>'LOGO_NOT_FOUND'</>
    }

    return Logo
  }
}

export const LogoContainer = (airline: LogoData): JSX.Element => {
  const Logo = getLogoComponent(airline)

  return <>{Logo}</>
}
