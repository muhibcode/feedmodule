import React, { useState } from 'react'
import * as XLSX from "sheetjs-style";
import FileSaver from 'file-saver';
import { Button } from 'react-bootstrap';


const ExportExcel = ({ excelData, fileName }) => {

  const [isClick, setisClick] = useState(false)
  const [timer, setTimer] = useState(120)

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx'
  // const fileType = 'charset=UTF-8';
  // const fileExtension = '.csv'

  const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(excelData)
    // XLSX.utils.sheet_to_csv(excelData)

    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] }
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: fileType })
    FileSaver.saveAs(data, fileName + fileExtension)
    setisClick(true)

    let timerId = setInterval(countdown, 1000);

    let timeLeft = 119

    // setStartTimer(true)

    function countdown() {
      if (timeLeft == -1) {
        clearTimeout(timerId);
        // setShowButton(true)
        // doSomething();
      } else {

        setTimer(timeLeft)
        timeLeft--;

      }
    }
  }
  return (
    !isClick ?
      <Button className='primary' onClick={(e) => exportToExcel(fileName)}>
        Download Excel
      </Button> :
      <h6>
        Please Wait and dont refresh the page until {timer}
      </h6>
  )

}

export default ExportExcel;