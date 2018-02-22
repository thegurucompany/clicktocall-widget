const Styles = {
  edgeMargin: '1.0rem',
  iconSize: '50%'
}

module.exports = (options, settings) => {
  options.positionCss = settings.getPositionCss(Styles.edgeMargin)
  return `
    a.gcomm-click-to-call-button{
      background-color: ${options.buttonBackgroundColor};
      position: fixed;
      width: 3.0rem;
      height: 3.0rem;
      color: #FFFFFF;
      border: 0 none;
      text-align: center;
      border-radius: 50%;
      ${options.positionCss}
      bottom: ${Styles.edgeMargin};
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
      cursor: pointer;
      outline: none;
      text-decoration: none;
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
  `
}
