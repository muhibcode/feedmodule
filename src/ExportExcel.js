import React from 'react'
import * as XLSX from "sheetjs-style";
import FileSaver from 'file-saver';
import { Button } from 'react-bootstrap';
const ExportExcel = ({ excelData, fileName }) => {

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx'
  // const fileType = 'charset=UTF-8';
  // const fileExtension = '.csv'

  const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(excelData)
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] }
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: fileType })
    FileSaver.saveAs(data, fileName + fileExtension)
  }
  return (
    <Button className='primary' onClick={(e) => exportToExcel(fileName)}>
      Download Excel
    </Button>
  )

}

export default ExportExcel;