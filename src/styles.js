/**
 * Click To Call Widget Stylesheets
 * @author TheGurúCompany SAPI de CV
 *
 * This module defines all applicable css stylesheets that are injected in a
 *  wiget's website
 * All definitions are applied to `a` tags and `divs` using
 *  `gcomm-click-to-call` namespace
**/
const Styles = {
  edgeMargin: '1.0rem',
  iconSize: '50%',
  buttonSize: 3.0
}

module.exports = (options, settings) => {
  options.positionCss = settings.getPositionCss(Styles.edgeMargin)
  return `
    a.gcomm-click-to-call-button, a.gcomm-click-to-call-button:hover,
    a.gcomm-click-to-call-button:active,
    a.gcomm-click-to-call-button:visited{
      background-color: ${options.buttonBackgroundColor};
      position: fixed;
      width: ${Styles.buttonSize}rem;
      height: ${Styles.buttonSize}rem;
      color: #FFFFFF;
      border: 0 none;
      text-align: center;
      border-radius: 50%;
      ${options.positionCss}
      bottom: 2.0rem;
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
      cursor: pointer;
      outline: none;
      text-decoration: none;
      z-index: 9999;
    }
    a.gcomm-click-to-call-button:hover{
      background-color: ${options.buttonHoverBackgroundColor};
    }
    a.gcomm-click-to-call-button svg{
      width: ${Styles.iconSize};
      height: ${Styles.iconSize};
      left: 50%;
      top: 50%;
      position: absolute;
      margin-top: -25%;
      margin-left: -25%;
    }
    a.gcomm-click-to-call-button .gcomm-click-to-call-off-hours {
      width: 25.0rem;
      position: absolute;
      bottom: ${Styles.buttonSize + 1.5}rem;
      box-shadow: rgba(0, 0, 0, 0.17) 2px 2px 15px 2px;
      background-color: #FFFFFF;
      color: #434343;
      padding-left: 1.0rem;
      padding-right: 1.0rem;
      padding-top: 1.0rem;
      padding-bottom: 1.0rem;
      line-height: 1.4em;
      font-size: 1.0rem;
      display: none;
    }
  `
}
