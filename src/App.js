import './App.css';
import Papa from "papaparse";
import { useState, useEffect, useRef } from "react";
import { Badge, Button, Col, Container, Pagination, Row } from 'react-bootstrap';
import ExportExcel from './ExportExcel';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React from 'react';
import dateFormat from 'dateformat';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosClient, { base_url } from './Api';
import * as XLSX from 'xlsx/xlsx.mjs';
import FileSaver from 'file-saver';

// import Dexie from 'dexie';

// const allowedExtensions = ["csv"];

function App() {
  // let timer = 0;
  const [rtime, setrtime] = useState(10)
  const [startTimer, setStartTimer] = useState(false)
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useState(20)
  const [supName, setSupName] = useState([])
  const [showButton, setShowButton] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState('')
  const [hSearch, setHSearch] = useState('')
  const [searchStock, setSearchStock] = useState('')

  const [priceTag, setPriceTag] = useState([])
  const [skuTag, setSkuTag] = useState([])
  const [stockTag, setStockTag] = useState([])

  const [usd, setUsd] = useState(0)
  const [euro, setEuro] = useState(0)
  const [searchArr, setSearchArr] = useState([])
  const [stockInRec, setStockInRec] = useState([])
  const [history, sethistory] = useState([])
  const [donFeed, setdonFeed] = useState([])

  const [skus, setSkus] = useState([])
  const [dateFeed, setDateFeed] = useState([])
  const [mDateFeed, setMDateFeed] = useState([])
  const [warr, setWarr] = useState([])
  const [file, setFile] = useState([]);
  const [mainArr, setMainArr] = useState([])
  const [startDate, setStartDate] = useState(new Date());
  const [startMDate, setMStartDate] = useState(new Date());
  const [farr, setFarr] = useState([])

  const [csvF, setCsvF] = useState('');
  let csvf = []
  let csvnames = []

  let data = {}
  let fData = {}
  let pData = {}
  let nData = {}

  let fSkus = []
  let skuArr = []
  let nSkuArr = []
  let priceArr = []
  let stockArr = []
  let nameArr = []

  let newRR = []
  let mArr = []
  let filesArr = []

  let fname = []
  let nSkus = []
  let stock = []
  let price = []
  let newNum = []
  let newStock = []

  let minimum = 0
  let ind = 0
  // It will store the file uploaded by the user
  // useEffect(() => {

  // }, [farr, skus])

  // var db = new Dexie('dbname');
  // db.version(1).stores({
  //   sks: 'stores'
  // });
  // // db.version(1).stores({
  // //   minRrr: []
  // // });
  // db.open()
  const handleSearch = () => {
    let locArr = []
    let sData = {}
    // let locSearchSku = []
    // let locSearchStock = []
    // let locSearchPrice = []

    for (let index = 0; index < mainArr.length; index++) {
      for (let q = 0; q < mainArr[index]['sku'].length; q++) {
        if (search.toLowerCase() == String(mainArr[index]['sku'][q]).toLowerCase()) {

          sData['sku'] = mainArr[index]['sku'][q]
          sData['price'] = mainArr[index]['price'][q]
          sData['stock'] = mainArr[index]['stock'][q]
          sData['supplier_name'] = mainArr[index]['supplier'][q]
          locArr.push(sData)
          // locArr.sort()
          setSearchArr(locArr)
          sData = {}
          // console.log('hit times');
        }
      }

    }

  }

  const handleFileChange = async (e) => {
    setError("");


    // Check if user has entered the file
    // if (e.target.files.length) {
    //     const inputFile = e.target.files;

    //     // Check the file extensions, if it not
    //     // included in the allowed extensions
    //     // we show the error
    //     // const fileExtension = inputFile?.type.split("/")[1];
    //     // if (!allowedExtensions.includes(fileExtension)) {
    //     //     setError("Please input a csv file");
    //     //     return;
    //     // }

    //     // If input type is correct set the state
    //     setFile(inputFile);
    // }
    const inputFile = e.target.files;
    let drr = []
    let sname = []
    // console.log(inputFile);
    setFile(inputFile)
    for (let index = 0; index < inputFile.length; index++) {
      const element = inputFile[index];
      Papa.parse(element, {
        download: true,
        header: true,
        skipEmptyLines: true,

        complete: function (results, file) {
          pData['name'] = file.name
          pData['results'] = results
          drr.push(pData)
          // sname.push(file.name)
          pData = {}
          // console.log(file.name);

          if (drr.length == inputFile.length) {
            setWarr(drr)
            setSupName(sname)
            console.log(drr);

          }

        },
      });
    }
    // console.log(base_url);

  };



  function toNumber(value) {
    return Number(value);
  }

  const handleXlUpoad = async (e) => {
    const inputFile = await e.target.files;
    setFile(inputFile)




    // XLSX.utils.sheet_to_json
    // for (let index = 0; index < inputFile.length; index++) {
    // const wb = XLSX.read(inputFile)

    // const sh = XLSX.utils.sheet_to_csv(wb.Sheets[0]);
    // XLSX.writeFile(wb, 'converted.csv', { bookType: 'csv', type: 'array' })
    // var res = "";
    // wb.SheetNames.forEach((n, idx) => {
    //   const ws = wb.Sheets[n];
    //   // res += `<b>Sheet #${idx + 1} (${n})</b>\n`;
    //   res += XLSX.utils.sheet_to_csv(ws) + "\n\n";

    // });
    // csvf.push(res)

    // console.log(inputFile);

    // const ws = res.Sheets
    // const sj = { Sheets: { 'data': res }, SheetNames: ['data'] }
    // const ws = XLSX.utils.sheet_to_csv(inputFile)

    // const excelBuffer = XLSX.write(sj, { bookType: 'csv', type: 'array' })
    // const data = new Blob([excelBuffer], { type: 'charset=UTF-8' })
    // FileSaver.saveAs(sh, 'converted.csv')


    // }

  }

  const handleNParse = async (event) => {
    for (let index = 0; index < file.length; index++) {
      const element = file[index];
      const wb = XLSX.read(await element.arrayBuffer())
      const ws = wb.Sheets[wb.SheetNames[0]]
      const nsheet = XLSX.utils.sheet_to_json(ws)
      console.log(element['name']);
      if (element['name'].includes('WERD')) {
        let fdata = {}
        for (let index = 0; index < nsheet.length; index++) {
          for (let q = index + 1; q < nsheet.length; q++) {
            if (nsheet[index]['__EMPTY_3'] != undefined && !String(nsheet[index]['__EMPTY_3']).includes('EUR')) {
              if (nsheet[index]['__EMPTY'] == nsheet[q]['__EMPTY'] &&
                nsheet[index]['__EMPTY_3'] == nsheet[q]['__EMPTY_3']) {
                console.log(nsheet[index]['__EMPTY']);
                nsheet.splice(q, 1)

              }
            }

          }
        }
        // console.log(nsheet);

        nsheet.forEach((e) => {
          if (e['__EMPTY_3'] != undefined && !String(e['__EMPTY_3']).includes('EUR')) {

            let newPrice = String(e['__EMPTY_3']).replace(/,/g, '')
            let fPrice = newPrice.replace(/£/g, '')

            if (!isNaN(fPrice)) {
              skuArr.push(e['__EMPTY'])
              priceArr.push((euro * toNumber(fPrice)).toString())
              stockArr.push(String(e['__EMPTY_1']).replace(/[^\d\+]+/g, ''))
              nameArr.push(element['name'])
              // console.log(stockArr);
              nSkuArr.push(e['__EMPTY'])
              setSkus(skuArr)
            }
            // console.log(String(e['__EMPTY']));
            // fdata['SKU'] = e['__EMPTY']
            // fdata['EUR'] = e['__EMPTY_3']
            // fdata['QTY'] = e['__EMPTY_1']
            // fdata['Supplier Name'] = element['name']


            // csvnames.push(fdata)
            // fdata = {}
          }

        })
        nData['sku'] = nSkuArr
        nData['price'] = priceArr
        nData['stock'] = stockArr
        nData['supplier'] = nameArr
        mArr.push(nData)
        setMainArr(mArr)
        nData = {}
        nSkuArr = []
        priceArr = []
        stockArr = []
        nameArr = []


      }
      // let count = 0

      if (element['name'].includes('PL')) {
        let fdata = {}
        for (let index = 0; index < nsheet.length; index++) {
          for (let q = index + 1; q < nsheet.length; q++) {
            if (Object.keys(nsheet[index]).includes('  PROKS PRICELIST ') && !String(nsheet[index]['__EMPTY_1']).includes('EURO')) {
              if (nsheet[index]['  PROKS PRICELIST '] == nsheet[q]['  PROKS PRICELIST '] &&
                nsheet[index]['__EMPTY_1'] == nsheet[q]['__EMPTY_1']) {
                console.log(nsheet[index]['  PROKS PRICELIST ']);
                nsheet.splice(q, 1)

              }
            }

          }
        }
        console.log(nsheet);

        nsheet.forEach((e, i) => {

          if (Object.keys(e).includes('  PROKS PRICELIST ') && !String(e['__EMPTY_1']).includes('EURO')) {

            let newPrice = String(e['__EMPTY_1']).replace(/,/g, '')
            let fPrice = newPrice.replace(/£/g, '')

            if (!isNaN(fPrice)) {
              skuArr.push(e['  PROKS PRICELIST '])
              priceArr.push((euro * toNumber(fPrice)).toString())
              stockArr.push(String(e['__EMPTY_5']).replace(/[^\d\+]+/g, ''))
              nameArr.push(element['name'])
              // console.log(stockArr);
              nSkuArr.push(e['  PROKS PRICELIST '])
              setSkus(skuArr)
            }
          }

        })

        nData['sku'] = nSkuArr
        nData['price'] = priceArr
        nData['stock'] = stockArr
        nData['supplier'] = nameArr
        mArr.push(nData)
        setMainArr(mArr)
        nData = {}
        nSkuArr = []
        priceArr = []
        stockArr = []
        nameArr = []
      }

      if (element['name'].includes('synaxon')) {
        for (let index = 0; index < nsheet.length; index++) {
          for (let q = index + 1; q < nsheet.length; q++) {
            if (nsheet[index]['MPN'] == nsheet[q]['MPN'] &&
              nsheet[index]['Price'] == nsheet[q]['Price']) {

              nsheet.splice(q, 1)
              // console.log(q);

            }
          }
        }

        console.log(nsheet);

        nsheet.forEach((e, i) => {

          let newPrice = String(e['Price']).replace(/,/g, '')
          let fPrice = newPrice.replace(/£/g, '')

          if (!isNaN(fPrice)) {
            skuArr.push(String(e['MPN']))
            priceArr.push(fPrice)
            stockArr.push(String(e['Stock']).replace(/[^\d\+]+/g, ''))
            nameArr.push(element['name'])
            nSkuArr.push(String(e['MPN']))
            setSkus(skuArr)
          }

        })

        nData['sku'] = nSkuArr
        nData['price'] = priceArr
        nData['stock'] = stockArr
        nData['supplier'] = nameArr
        mArr.push(nData)
        setMainArr(mArr)
        nData = {}
        nSkuArr = []
        priceArr = []
        stockArr = []
        nameArr = []
      }

      if (element['name'].includes('Spire')) {
        for (let index = 0; index < nsheet.length; index++) {
          for (let q = index + 1; q < nsheet.length; q++) {
            if (nsheet[index]['Product Number'] == nsheet[q]['Product Number'] &&
              nsheet[index]['Cost'] == nsheet[q]['Cost']) {
              // console.log('shit happens here');

              nsheet.splice(q, 1)

            }
          }

        }
        nsheet.forEach((e, i) => {
          if (!String(e['Product Number']).includes('Laptops') ||
            !String(e['Product Number']).includes('Desktops')) {
            let newPrice = String(e['Cost']).replace(/,/g, '')
            let fPrice = newPrice.replace(/£/g, '')

            if (!isNaN(fPrice)) {
              skuArr.push(e['Product Number'])
              priceArr.push(fPrice)
              stockArr.push(String(e['Stock Level']).replace(/[^\d\+]+/g, ''))
              nameArr.push(element['name'])
              nSkuArr.push(e['Product Number'])
              setSkus(skuArr)
            }
          }


        })

        nData['sku'] = nSkuArr
        nData['price'] = priceArr
        nData['stock'] = stockArr
        nData['supplier'] = nameArr
        mArr.push(nData)
        setMainArr(mArr)
        nData = {}
        nSkuArr = []
        priceArr = []
        stockArr = []
        nameArr = []

      }

      if (element['name'].includes('Target Product Feed')) {
        for (let index = 0; index < nsheet.length; index++) {
          for (let q = index + 1; q < nsheet.length; q++) {
            if (nsheet[index]['Stock_Code'] == nsheet[q]['Stock_Code'] &&
              nsheet[index]['1_4'] == nsheet[q]['1_4']) {
              // console.log('shit happens here');
              console.log(nsheet[q]['Stock_Code'].toString());

              nsheet.splice(q, 1)

            }
          }

        }

        nsheet.forEach((e, i) => {

          let newPrice = String(e['1_4']).replace(/,/g, '')
          let fPrice = newPrice.replace(/£/g, '')

          if (!isNaN(fPrice)) {
            skuArr.push(e['Stock_Code'])
            priceArr.push(fPrice)
            stockArr.push(String(e['Stock']).replace(/[^\d\+]+/g, ''))
            nameArr.push(element['name'])
            nSkuArr.push(e['Stock_Code'])
            setSkus(skuArr)
          }

        })

        nData['sku'] = nSkuArr
        nData['price'] = priceArr
        nData['stock'] = stockArr
        nData['supplier'] = nameArr
        mArr.push(nData)
        setMainArr(mArr)
        nData = {}
        nSkuArr = []
        priceArr = []
        stockArr = []
        nameArr = []
      }

      if (element['name'].includes('T.I DIG')) {
        for (let index = 0; index < nsheet.length; index++) {
          for (let q = index + 1; q < nsheet.length; q++) {
            if (nsheet[index]['stock_code'] == nsheet[q]['stock_code'] &&
              nsheet[index]['Price'] == nsheet[q]['Price']) {

              nsheet.splice(q, 1)

            }
          }

        }
        console.log(nsheet);
        nsheet.forEach((e, i) => {

          let newPrice = String(e['Price']).replace(/,/g, '')
          let fPrice = newPrice.replace(/£/g, '')

          if (!isNaN(fPrice)) {
            skuArr.push(e['stock_code'])
            priceArr.push(fPrice)
            stockArr.push(String(e['Qty']).replace(/[^\d\+]+/g, ''))
            nameArr.push(element['name'])
            nSkuArr.push(e['stock_code'])
            setSkus(skuArr)
          }

        })

        nData['sku'] = nSkuArr
        nData['price'] = priceArr
        nData['stock'] = stockArr
        nData['supplier'] = nameArr
        mArr.push(nData)
        setMainArr(mArr)
        nData = {}
        nSkuArr = []
        priceArr = []
        stockArr = []
        nameArr = []


      }

      if (element['name'].includes('TID006STOCK')) {
        for (let index = 0; index < nsheet.length; index++) {
          for (let q = index + 1; q < nsheet.length; q++) {
            if (nsheet[index]['PART NO'] == nsheet[q]['PART NO'] &&
              nsheet[index]['SELL_PRICE'] == nsheet[q]['SELL_PRICE']) {

              nsheet.splice(q, 1)

            }
          }

        }
        console.log(nsheet);
        nsheet.forEach((e, i) => {

          let newPrice = String(e['SELL_PRICE']).replace(/,/g, '')
          let fPrice = newPrice.replace(/£/g, '')

          if (!isNaN(fPrice)) {
            skuArr.push(e['PART NO'])
            priceArr.push(fPrice)
            stockArr.push(String(e['QTY']).replace(/[^\d\+]+/g, ''))
            nameArr.push(element['name'])
            nSkuArr.push(e['PART NO'])
            setSkus(skuArr)
          }

        })

        nData['sku'] = nSkuArr
        nData['price'] = priceArr
        nData['stock'] = stockArr
        nData['supplier'] = nameArr
        mArr.push(nData)
        setMainArr(mArr)
        nData = {}
        nSkuArr = []
        priceArr = []
        stockArr = []
        nameArr = []


      }

      // if (element['name'].includes('list1')) {
      //   csvf.push(nsheet)
      // }

      // if (csvf.length == file.length) {
      //   setWarr(csvf)
      //   console.log(csvf);

      // }

    }
    let timerId = setInterval(countdown, 1000);
    let timeLeft = 19

    setStartTimer(true)

    function countdown() {
      if (timeLeft == -1) {
        clearTimeout(timerId);
        setShowButton(true)
        // doSomething();
      } else {

        setTimer(timeLeft)
        timeLeft--;

      }
    }
  }
  const handleParse = (event) => {
    // console.log(warr);
    if (!file) return setError("Enter a valid file");
    // -------------------------------------------------------------------------------------------
    for (let j = 0; j < warr.length; j++) {
      warr[j].forEach((e, i) => {

        // for (const key in object) {
        //   if (Object.hasOwnProperty.call(object, key)) {
        //     const element = object[key];

        //   }
        // }
        for (const [key, value] of Object.entries(e)) {
          // console.log(key);
          if ((Object.keys(e).toString().toLowerCase().includes('eur')) && (Object.keys(e).toString().toLowerCase().includes('usd'))) {
            console.log('dual exist');

            if (key.toLowerCase().includes('eur')) {

              priceTag.push(key)

            }

          } else {

            if (key.toLowerCase().includes('eur')
              || key.toLowerCase().includes('usd')
              || key.toLowerCase().includes('cost')
              || key.toLowerCase().includes('price')
              || key.toLowerCase().includes('1_4')) {
              // console.log(key.toLowerCase());

              if (priceTag[j] === undefined) {
                priceTag.push(key)
              }
            }
          }

          if (key.toLowerCase() === 'stock' || key.toLowerCase().includes('qty')
            || key.toLowerCase() === 'on stock' || key.toLowerCase() === 'stock level'
            || key.toLowerCase().includes('quantity')) {
            stockTag.push(key)
          }
          if (key.toLowerCase().includes('sku') || key.toLowerCase().includes('mpn') || key.toLowerCase().includes('part number')
            || key.toLowerCase().includes('part no') || key.toLowerCase().includes('p/n') || key.toLowerCase().includes('mfr')
            || key.toLowerCase().includes('stock_code') || key.toLowerCase().includes('pn') || key.toLowerCase().includes('product number')) {

            if (skuTag[j] === undefined) {
              skuTag.push(key)
            }
          }

        }

        // if (e.toLowerCase().includes('price')
        //   || e.toLowerCase().includes('euro') || e.toLowerCase().includes('usd')) {

      })
      console.log(priceTag);

      // for (let c = 0; c < warr[j]['results'].data.length; c++) {
      //   // console.log(results.data[c]); && !isNaN(warr[j]['results'].data[c][stockTag[j]])
      //   let newPrice = String(warr[j]['results'].data[c][priceTag[j]]).replace(/,/g, '')
      //   let fPrice = newPrice.replace(/£/g, '')
      //   // let nPrice = String(fPrice).replace(/./g, '')

      //   // console.log(!isNaN(fPrice));
      // if (!isNaN(fPrice)) {
      //   skuArr.push(warr[j]['results'].data[c][skuTag[j]])
      //   if (priceTag[j].toLowerCase().includes('eur')) {
      //     // console.log('its exist');
      //     priceArr.push((euro * toNumber(fPrice)).toString())

      //   }
      //   if (priceTag[j].toLowerCase().includes('usd')) {
      //     // console.log('its exist');
      //     priceArr.push((usd * toNumber(fPrice)).toString())

      //   }
      //   if (priceTag[j].toLowerCase().includes('cost') || priceTag[j].toLowerCase().includes('price') || priceTag[j].toLowerCase().includes('1_4')) {
      //     // console.log('its exist');
      //     priceArr.push(fPrice)

      //   }
      //   stockArr.push(String(warr[j]['results'].data[c][stockTag[j]]).replace(/[^\d\+]+/g, ''))
      //   // console.log(stockArr);
      //   nSkuArr.push(warr[j]['results'].data[c][skuTag[j]])
      //   setSkus(skuArr)
      // }

      //}

      // nData['sku'] = nSkuArr
      // nData['price'] = priceArr
      // nData['stock'] = stockArr

      // mArr.push(nData)
      // setMainArr(mArr)
      // nData = {}
      // nSkuArr = []
      // priceArr = []
      // stockArr = []
    }

    // console.log(mArr);
    // let num = 'sred,12345'
    // let nnum = num.replace(/,/g, '')
    // console.log(nnum);
    // if (!isNaN(nnum)) {
    //   console.log(nnum);
    //   console.log('done');

    // }
    let timerId = setInterval(countdown, 1000);
    let timeLeft = 19

    setStartTimer(true)

    function countdown() {
      if (timeLeft == -1) {
        clearTimeout(timerId);
        setShowButton(true)
        // doSomething();
      } else {

        setTimer(timeLeft)
        timeLeft--;

      }
    }

  };

  const findMultiple = (arr, value) => {
    return arr.filter((v, i) => v == value).length
  }

  async function finalres() {
    let sArr = []
    // setLoading(true)

    // prices [130,230,100,110]

    // stock [20,30,0,50]
    console.log(mainArr);

    skus.forEach((e) => {

      if (!fSkus.includes(e)) {
        fSkus.push(e)
      }
    })
    for (let j = 0; j < mainArr.length; j++) {

      const eSku = mainArr[j]['sku'];
      const ePrice = mainArr[j]['price'];
      const eStock = mainArr[j]['stock']
      const eName = mainArr[j]['supplier']
      for (let n = 0; n < eSku.length; n++) {

        fData['Supplier'] = eName[n]
        fData['SKU'] = eSku[n]
        fData['PRICE'] = ePrice[n]
        fData['STOCK'] = eStock[n]

        filesArr.push(fData)
        fData = {}
      }

    }
    for (let i = 0; i < fSkus.length; i++) {

      for (let j = 0; j < mainArr.length; j++) {

        const eSku = mainArr[j]['sku'];
        const ePrice = mainArr[j]['price'];
        const eStock = mainArr[j]['stock']
        const eName = mainArr[j]['supplier']
        // console.log(`EPrice ${ePrice}`);&& !nSkus.includes(eSku[n])

        for (let n = 0; n < eSku.length; n++) {
          if (fSkus[i] == eSku[n]) {
            price.push(ePrice[n])
            stock.push(eStock[n])
            fname.push(eName[n])

            // if (nSkus.includes(eSku[n])) {

            //   nSkus.indexOf

            //   if (ePrice) {

            //   }

            // }else{
            //   // nSkus.push(eSku[n])

            // }

          }
        }

        if (j == mainArr.length - 1) {
          // if (price.length != j) {
          //   console.log('prices are not same');
          //   console.log(price);

          // }
          if (price.length == 1) {
            newNum = price.map((e) => toNumber(e))
            minimum = Math.min(...newNum)

            ind = newNum.indexOf(minimum)

            data['Supplier'] = fname[ind]
            data['SKU'] = fSkus[i]
            data['PRICE'] = minimum.toString()
            data['STOCK'] = stock[ind]

            newRR.push(data)
            setFarr(newRR)

            data = {}
            price = []
            stock = []
            fname = []
            newNum = []

          } else {

            newNum = price.map((e) => toNumber(e))

            minimum = Math.min(...newNum)
            ind = newNum.indexOf(minimum)

            let res = findMultiple(newNum, minimum)

            if (res >= 2) {
              newStock = stock.map((e) => e.includes('+') ? toNumber(e.split('+')[0]) : toNumber(e))

              newNum.forEach((v, i) => {
                if (minimum == v) {
                  sArr.push(newStock[i])
                }
              })

              let maxStock = Math.max(...sArr)
              newNum.forEach((v, p) => {
                data = {}

                if (minimum == v) {
                  if (maxStock == newStock[p]) {
                    data['Supplier'] = fname[p]
                    data['SKU'] = fSkus[i]
                    data['PRICE'] = price[p]
                    data['STOCK'] = stock[p]

                    newRR.push(data)

                  }
                }
              })

              //-------------------------------------------------------------------------------------
              // for (let index = 0; index < newRR.length; index++) {
              //   for (let q = index + 1; q < newRR.length; q++) {
              //     if (newRR[index]['SKU'] == newRR[q]['SKU']) {
              //       if (newRR[index]['Supplier'] == newRR[q]['Supplier']) {
              //         // console.log(newRR[index]['SKU']);
              //         newRR.splice(q, 1)
              //         // break
              //       }
              //     }
              //   }
              // }
              // ----------------------------------------------------------------------------------------------
              setFarr(newRR)
              data = {}
              price = []
              stock = []
              fname = []
              newNum = []
              newStock = []
              sArr = []

            } else {
              newNum = price.map((e) => toNumber(e))
              minimum = Math.min(...newNum)

              ind = newNum.indexOf(minimum)

              data['Supplier'] = fname[ind]
              data['SKU'] = fSkus[i]
              data['PRICE'] = minimum.toString()
              data['STOCK'] = stock[ind]

              newRR.push(data)
              data = {}

              if (Number(stock[ind]) == 0) {

                let filArr = newNum.filter((v, i) => i != ind)

                let newMin = Math.min(...filArr)
                let newInd = newNum.indexOf(newMin)
                // let sInd = newNum.indexOf(newMin, ind + 1)

                data['Supplier'] = fname[newInd]
                data['SKU'] = fSkus[i]
                data['PRICE'] = newMin.toString()
                data['STOCK'] = stock[newInd]
                newRR.push(data)

                // console.log(`found 0 ${newNum}`);
                data = {}

              }
              // console.log('shit happens');

              setFarr(newRR)
              price = []
              stock = []
              fname = []
              newNum = []

            }
          }
        }
      }

    }
    console.log(newRR);

    // console.log(filesArr);
    const nres = await axiosClient.post('/feeditems', { 'data': newRR })
    const res = await axiosClient.post('/masfeeditems', { 'data': filesArr })
    //res['status'] == 200 && 
    if (res['status'] == 200 && nres['status'] == 200) {
      // setLoading(false)
      setShowButton(false)

    }

    //  console.log(`EPrice ${Object.values(filesArr[0])}`);

  }
  const findStockInRec = async () => {
    let rfeed = []

    if (searchStock.includes('/')) {
      nq = searchStock.split('/')

    } else {
      nq = searchStock
    }
    let feeds = await axiosClient.get(`/masfeeditems/${nq}`, {
      params: {
        q: `${nq}`,
      }
    })
    // console.log(feeds);

    for (let index = 0; index < feeds.data['feeds'].length; index++) {

      rfeed.push(feeds.data['feeds'][index])
    }

    setStockInRec(rfeed.sort((a, b) => a['price'] - b['price']))
    // console.log(hfeed);
  }
  const findFeeds = async () => {
    let nq = ''
    let hfeed = []
    // hSearch
    if (hSearch.includes('/')) {
      nq = hSearch.split('/')

    } else {
      nq = hSearch
    }
    let feeds = await axiosClient.get(`/feeditems/${nq}`, {
      params: {
        q: `${nq}`,
      }
    })
    // console.log(nq);

    for (let index = 0; index < feeds.data['feeds'].length; index++) {

      hfeed.push(feeds.data['feeds'][index])
    }

    sethistory(hfeed)
    console.log(hfeed);
  }
  // const downFeed = async (id) => {
  //   let hfeed = []
  //   let feeds = await axios.get(`http://localhost:8000/api/feeds/${id}`)
  //   // console.log(feeds);

  //   for (let index = 0; index < feeds.data['feeds'].length; index++) {

  //     hfeed.push(feeds.data['feeds'][index])

  //   }

  // }
  const findByDate = async (date) => {
    let newDate = date.toLocaleDateString()
    let dd = newDate.split('/')[0]
    let mm = newDate.split('/')[1]
    let yr = newDate.split('/')[2]

    let nDate = yr + '-' + mm + '-' + dd
    // console.log(nDate);

    let feeds = await axiosClient.post('/findfeedByDate', { 'data': nDate })

    // for (let index = 0; index < feeds.data['feeds'].length; index++) {

    //   dFeed.push(feeds.data['feeds'][index])

    // }
    let data = feeds.data['feeds']
    let newAr = []
    for (let index = 0; index < data.length; index++) {
      data[index]['feed_item'].forEach(e => {
        let ndata = {
          'SKU': e['sku'],
          'PRICE': e['price'],
          'STOCK': e['stock'],
          'SUPPLIER_NAME': e['supplier_name']
        }
        // console.log(ndata);
        newAr.push(ndata)
        ndata = {}
      });
    }
    setdonFeed(newAr)

    setDateFeed(feeds.data['feeds'])
    // var str2 = 'red'.replace(/[^\d\+]+/g, '')
  }
  const findMByDate = async (date) => {
    let newDate = date.toLocaleDateString()
    let dd = newDate.split('/')[0]
    let mm = newDate.split('/')[1]
    let yr = newDate.split('/')[2]

    let nDate = yr + '-' + mm + '-' + dd
    // console.log(nDate);

    let feeds = await axiosClient.post('/findByDate', { 'data': nDate })

    setMDateFeed(feeds.data['feeds'])
    // console.log(dateFormat(feeds.data['feeds'][0]['created_at']));
  }
  const delFeed = async (id) => {

    await axiosClient.delete(`/feeds/${id}`)
    let dFeed = dateFeed.filter((v) => v['id'] !== id)
    setDateFeed(dFeed)

  }
  const delMFeed = async (id) => {

    await axiosClient.delete(`/mfeeds/${id}`)
    let dFeed = mDateFeed.filter((v) => v['id'] !== id)
    setMDateFeed(dFeed)

  }
  const getAllFeeds = async () => {
    const nres = await axiosClient.get('/masfeeds')

    console.log(nres);

  }
  const submit = async () => {

    const res = await axiosClient.post('/masfeeditems', { 'data': filesArr })
    const nres = await axiosClient.post('/feeditems', { 'data': newRR })

    if (res['status'] == 200 && nres['status'] == 200) {
      // setLoading(false)
      setShowButton(false)

    }
  }


  const handleFileConvert = () => {

    csvf.forEach((e, i) => {
      console.log(e);
      XLSX.writeFile(e, `${csvnames[i]}.csv`, { bookType: 'csv', type: 'array' })

    })
    // FileSaver.saveAs('ws', 'converted')

  }
  return (
    // <Row>

    <Col>
      <Container>
        <div>
          {/* File Uploader */}
          <input
            multiple
            type="File"
            name="files[]"
            // accept='.xlsx'
            onChange={handleXlUpoad}
            style={{ display: "block", margin: "10px auto" }}
          />
          <br />
          {/* <button onClick={handleFileConvert}>Download converted</button>
          <input
            multiple
            type="File"
            name="files[]"
            accept=".csv"
            onChange={handleFileChange}
            style={{ display: "block", margin: "10px auto" }}
          /> */}
          <div>
            <h6>*EURO to GBP</h6>
            <input placeholder='EURO to GBP' type='text' name='eur_to_gbp'
              onChange={(e) => setEuro(e.target.value)} />
          </div>
          <br />
          <div>
            <h6>*USD to GBP</h6>
            <input placeholder='USD to GBP' type='text' name='usd_to_gbp'
              onChange={(e) => setUsd(e.target.value)} />
          </div>
          <br />
          <div>
            <button className='btn btn-primary' onClick={handleNParse}>Apply</button>
          </div>
        </div>
        <br />
        {startTimer &&
          <h6>
            {timer} seconds remaining
          </h6>
        }

        {showButton ?
          <div>
            <Button onClick={finalres}>Get Result</Button>
          </div>
          :
          <div>
            <Button disabled onClick={() => { }}>Get Result</Button>
          </div>
        }

        <br />


        {/* <div className='row'>
            
            </div> */}



        {/* <div style={{ marginTop: "3rem" }}>
                {error?error: data.map((col,
                    idx) => <div key={idx}>{col}</div>)}
            </div> */}
        {/* <Row>

        <Col >
          SKU
        </Col>
        <Col >
          Price
        </Col>
        <Col >
          Stock
        </Col>
      </Row>
      <Row>
        <Col>
          {farr.map((e, ind) => <Row key={ind}>{ind}{e['SKU']}</Row>
          )}
        </Col>

        <Col>
          {farr.map((e, ind) => <Row key={ind}>{e['PRICE']}</Row>
          )}
        </Col>
        <Col>
          {farr.map((e, ind) => <Row key={ind}>{e['STOCK']}</Row>
          )}
        </Col>
        <Col>
          {farr.map((e, ind) => <Row key={ind}>{e['Supplier Name']}</Row>
          )}
        </Col>

      </Row> */}
        {farr.length > 0 &&
          <>
            {/* <Button onClick={submit}>SAVE</Button> */}
            <br />
            <ExportExcel excelData={farr} fileName={'Result'} />
            <br />
          </>
        }
        <div>
          <h6>Find Lowest Price</h6>
          <input placeholder='Search Lowest Price' type='text' name='search_history'
            onChange={(e) => setHSearch(e.target.value)} />
        </div>
        <br />
        <div>
          <button className='btn btn-primary' onClick={findFeeds}>Search</button>
        </div>
        <br />
        <br />
        <div>
          <h6>Find Stock in Record</h6>
          <input placeholder='Search Stock in Records' type='text' name='stock_in_records'
            onChange={(e) => {
              // e.preventDefault()
              setSearchStock(e.target.value)
            }} />
        </div>
        <br />
        <div>
          <button className='btn btn-primary' onClick={findStockInRec}>Search</button>
        </div>
        <br />
        <br />
        <h6>*Please Upload the Excel files by clicking choose files button</h6>
        <div>
          <input placeholder='Search Excel File Records' type='text' name='search_file_records'
            onChange={(e) => setSearch(e.target.value)} />
        </div>
        <br />
        <div>
          <button className='btn btn-primary' onClick={handleSearch}>Search</button>
        </div>
        <br />
        {/* <h6>Show all Feeds</h6>
        <Button className='primary' onClick={getAllFeeds}>
          Feeds
        </Button> */}
        {/* <h6>Find results by Date</h6>
        <div>
          <DatePicker selected={startDate} onChange={(date) => {
            findByDate(date)
            setStartDate(date)
          }} />

        </div>
        <h6>Find Stock in Record by Date</h6>
        <div>
          <DatePicker selected={startMDate} onChange={(date) => {
            findMByDate(date)
            setMStartDate(date)
          }} />

        </div> */}
        {searchArr.length > 0 && <>  <Row>
          <h3>Search File Results</h3>
          <Col >
            SKU
          </Col>
          <Col >
            Price
          </Col>
          <Col >
            Stock
          </Col>
          <Col >
            Supplier Name
          </Col>
        </Row>
          <Row>
            {searchArr.map((e, i) => (
              <>
                <br />
                <Row key={i}>
                  <Col >
                    {e['sku']}
                  </Col>

                  <Col >
                    {e['price']}
                  </Col>
                  <Col >
                    {e['stock']}

                  </Col>
                  <Col >
                    {e['supplier_name']}

                  </Col>
                </Row>
              </>

            ))}

          </Row >

        </>
        }
        {stockInRec.length > 0 && <>  <Row>
          <h3>Stock Search Results</h3>
          <Col >
            SKU
          </Col>
          <Col >
            Price
          </Col>
          <Col >
            Stock
          </Col>
          <Col >
            Supplier Name
          </Col>
          <Col >
            Date Added
          </Col>
        </Row>
          <Row>
            {stockInRec.map((e, i) => (
              <>
                <br />
                <Row key={i}>
                  <Col >
                    {e['sku']}
                  </Col>
                  <Col >
                    {e['price']}
                  </Col>
                  <Col >
                    {e['stock']}
                  </Col>
                  <Col >
                    {e['supplier_name']}
                  </Col>
                  <Col >
                    {dateFormat(e['created_at'], "mmmm dS, yyyy", true)}

                  </Col>
                </Row>
              </>

            ))}

          </Row >
        </>
        }
        {history.length > 0 && <>  <Row>
          <h3>Search Results</h3>
          <Col >
            SKU
          </Col>
          <Col >
            Price
          </Col>
          <Col >
            Stock
          </Col>
          <Col >
            Supplier Name
          </Col>
          <Col >
            Date Added
          </Col>
        </Row>
          <Row>
            {history.map((e, i) => (
              <>
                <br />
                <Row key={i}>
                  <Col >
                    {e['sku']}
                  </Col>

                  <Col >
                    {e['price']}
                  </Col>
                  <Col >
                    {e['stock']}

                  </Col>
                  <Col >
                    {e['supplier_name']}
                  </Col>
                  <Col >
                    {dateFormat(e['created_at'], "mmmm dS, yyyy", true)}

                  </Col>
                </Row>
              </>

            ))}

          </Row >

        </>
        }
        {dateFeed.length > 0 && <>  <Row>
          <h3>Feed Date Results</h3>
          <Col >
            File
          </Col>
          <Col >
            Action
          </Col>
          <Col >
            Date Added
          </Col>
        </Row>
          <Row>
            {dateFeed.map((e, i) => (
              <>
                <br />
                <br />

                <Row key={i}>
                  <Col >
                    <ExportExcel excelData={donFeed} fileName={'Excel Export'} />

                    {/* <Button onClick={() => downFeed(e['id'])} >
                    Download
                  </Button> */}
                  </Col>

                  <Col >
                    <Button onClick={() => delFeed(e['id'])}>
                      Delete
                    </Button>
                  </Col>
                  <Col >
                    {dateFormat(e['created_at'], "mmmm dS, yyyy", true)}

                  </Col>
                </Row>
              </>

            ))}

          </Row >
        </>
        }
        {mDateFeed.length > 0 && <>  <Row>
          <h3>Master Feed Date Results</h3>
          <Col >
            File
          </Col>
          <Col >
            Action
          </Col>
          <Col >
            Date Added
          </Col>
        </Row>
          <Row>
            {mDateFeed.map((e, i) => (
              <>
                <br />
                <br />

                <Row key={i}>
                  {/* <Col >
                  <Button onClick={() => downFeed(e['id'])} >
                    Download
                  </Button>
                </Col> */}

                  <Col >
                    <Button onClick={() => delMFeed(e['id'])}>
                      Delete
                    </Button>
                  </Col>
                  <Col >
                    {dateFormat(e['created_at'], "mmmm dS, yyyy", true)}

                  </Col>
                </Row>
              </>

            ))}

          </Row >
        </>
        }
      </Container>
    </Col>
    // {/* </Row> */}
  );
}

export default App;
