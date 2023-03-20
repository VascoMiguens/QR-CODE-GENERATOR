import QRCode from "qrcode"
import { useState } from "react"

function App() {
  const [url, setUrl ] = useState("")
  const [qrcode, setQrcode] = useState("")
  const [selectedOption, setSelectedOption] = useState("website")

  //generate QR code data based on selected option
  const generateQRCodeData = () => {
    if (selectedOption === "bank") {
      return `bank:${url}`
    } else {
      return url
    }
  }

  //generate QR code image
  const generateQRCode = () => {
    const data = generateQRCodeData()
    QRCode.toDataURL(data, {
      width: 800,
      margin: 2
    }, (err, url) => {
      if(err) return console.error(err)

      console.log(url)
      setQrcode(url)
    })
  }

  return (
    <div className="App">
      <h1>QR Code Generator</h1>
      <label htmlFor="options">Select Option:</label>
      <select id="options" value={selectedOption} onChange={(evt) => setSelectedOption(evt.target.value)}>
        <option value="website">Website</option>
        <option value="bank">Bank Number</option>
      </select>
      <br/>
      <br/>
      <label htmlFor="url">{selectedOption === "website" ? "Website URL:" : "Bank Number:"}</label>
      <input 
        type="text"
        placeholder={selectedOption === "website" ? "e.g. https://google.com" : "e.g. 1234567890"}
        id="url"
        value={url}
        onChange={(evt) => setUrl(evt.target.value)}
      />
      <br/>
      <br/>
      <button onClick={generateQRCode}>Generate</button>
      {qrcode &&
      <>
      <img src={qrcode} />
      <a href={qrcode} download="qrcode.png">Download</a>
      </>}
    </div>
  )
}

export default App
