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

  let data = {}
  let fData = {}
  let pData = {}
  let nData = {}

  let fSkus = []
  let skuArr = []
  let nSkuArr = []
  let priceArr = []
  let stockArr = []

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
        if (search.toLowerCase() === (mainArr[index]['sku'][q]).toLowerCase()) {

          sData['sku'] = mainArr[index]['sku'][q]
          sData['price'] = mainArr[index]['price'][q]
          sData['stock'] = mainArr[index]['stock'][q]
          sData['supplier_name'] = warr[index]['name']
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
        skipEmptyLines: false,

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
          }

        },
      });
    }
    // console.log(mArr);

  };



  function toNumber(value) {
    return Number(value);
  }
  const handleParse = (event) => {
    // console.log(warr);
    if (!file) return setError("Enter a valid file");
    // -------------------------------------------------------------------------------------------
    for (let j = 0; j < warr.length; j++) {
      warr[j]['results'].meta.fields.forEach((e, i) => {

        // if (e.toLowerCase().includes('price')
        //   || e.toLowerCase().includes('euro') || e.toLowerCase().includes('usd')) {

        if ((warr[j]['results'].meta.fields.includes('eur')
          || warr[j]['results'].meta.fields.includes('Eur')
          || warr[j]['results'].meta.fields.includes('EUR'))
          && (warr[j]['results'].meta.fields.includes('USD')
            || warr[j]['results'].meta.fields.includes('usd')
            || warr[j]['results'].meta.fields.includes('Usd'))
        ) {
          if (e.toLowerCase().includes('eur')) {
            // console.log('push exist');

            priceTag.push(e)

          }

        } else {
          if (e.toLowerCase().includes('eur')
            || e.toLowerCase().includes('usd')
            || (e.toLowerCase().includes('price')
              || (e.toLowerCase().includes('1_4')))) {
            // console.log('second push exist');
            if (priceTag[j] === undefined) {
              priceTag.push(e)
            }
          }
        }
        if (e.toLowerCase() === 'stock' || e.toLowerCase().includes('qty')
          || e.toLowerCase() === 'on stock'
          || e.toLowerCase().includes('quantity')) {
          stockTag.push(e)
        }
        if (e.toLowerCase().includes('sku') || e.toLowerCase().includes('mpn') || e.toLowerCase().includes('part number')
          || e.toLowerCase().includes('part no') || e.toLowerCase().includes('p/n') || e.toLowerCase().includes('mfr')
          || e.toLowerCase().includes('stock_code') || e.toLowerCase().includes('pn')) {

          if (skuTag[j] === undefined) {
            skuTag.push(e)
          }
        }
      })

      for (let c = 0; c < warr[j]['results'].data.length; c++) {
        // console.log(results.data[c]); && !isNaN(warr[j]['results'].data[c][stockTag[j]])
        let newPrice = String(warr[j]['results'].data[c][priceTag[j]]).replace(/,/g, '')
        // console.log(!isNaN('1,085'.replace(/,/g, '')));
        if (!isNaN(newPrice)) {
          skuArr.push(warr[j]['results'].data[c][skuTag[j]])
          if (priceTag[j].toLowerCase().includes('eur')) {
            // console.log('its exist');
            priceArr.push((euro * toNumber(newPrice)).toString())

          }
          if (priceTag[j].toLowerCase().includes('usd')) {
            // console.log('its exist');
            priceArr.push((usd * toNumber(newPrice)).toString())

          }
          if (priceTag[j].toLowerCase().includes('price') || priceTag[j].toLowerCase().includes('1_4')) {
            // console.log('its exist');
            priceArr.push(newPrice)

          }
          //.replace(/[^\d\+]+/g, '')
          stockArr.push(warr[j]['results'].data[c][stockTag[j]].replace(/[^\d\+]+/g, ''))
          nSkuArr.push(warr[j]['results'].data[c][skuTag[j]])
          setSkus(skuArr)
        }

      }

      nData['sku'] = nSkuArr
      nData['price'] = priceArr
      nData['stock'] = stockArr

      mArr.push(nData)
      setMainArr(mArr)
      nData = {}
      nSkuArr = []
      priceArr = []
      stockArr = []
    }

    console.log(mArr);
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
      const eName = warr[j]['name']
      for (let n = 0; n < eSku.length; n++) {

        fData['Supplier'] = eName
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
        const eName = warr[j]['name']
        // console.log(`EPrice ${ePrice}`);&& !nSkus.includes(eSku[n])

        for (let n = 0; n < eSku.length; n++) {
          if (fSkus[i] == eSku[n]) {
            price.push(ePrice[n])
            stock.push(eStock[n])
            fname.push(eName)

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
                  // console.log(`minimum ${stock[i]}`);

                  sArr.push(newStock[i])
                }
              })

              let maxStock = Math.max(...sArr)
              let np = []
              let ns = []
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
              // nSkus = []
              // let nr = newRR.filter((v, i) => v['Supplier'] != newRR[i]['Supplier'])
              // newRR.find()
              // console.log(newRR.sort((a, b) => b['SKU'] - a['SKU']));
              console.log(newRR);
              // ----------------------------------------------------------------------------------------

              // for (let index = 0; index < newRR.length; index++) {

              //   if (fSkus[i] == newRR[index]['SKU']) {
              //     newRR.splice(index, 1)

              //     // if (newRR[index]['Supplier'] == newRR[index]['Supplier']) {
              //     //   console.log(newRR[index]['SKU']);

              //     //   // break
              //     // }
              //   }

              // }
              // if ((newRR[index]['Supplier'] == newRR[q]['Supplier'])
              //   && (newRR[index]['SKU'] == newRR[q]['SKU'])
              //   && (newRR[index]['PRICE'] == newRR[q]['PRICE'])
              //   && (newRR[index]['STOCK'] == newRR[q]['STOCK'])) {

              //   newRR.splice(q, 1)
              //   // console.log('hello');
              //   // break
              // }
              // console.log('hello');
              //-------------------------------------------------------------------------------------
              for (let index = 0; index < newRR.length; index++) {
                for (let q = index + 1; q < newRR.length; q++) {
                  if (newRR[index]['SKU'] == newRR[q]['SKU']) {
                    if (newRR[index]['Supplier'] == newRR[q]['Supplier']) {
                      console.log(newRR[index]['SKU']);
                      newRR.splice(q, 1)
                      // break
                    }
                  }
                }
              }
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
    // console.log(newRR);

    // console.log(filesArr);
    // const res = await axios.post('http://localhost:8000/api/mfeeditems', { 'data': filesArr })
    // const nres = await axios.post('http://localhost:8000/api/feeditems', { 'data': newRR })
    // //res['status'] == 200 && 
    // if (nres['status'] == 200) {
    //   // setLoading(false)
    //   setShowButton(false)

    // }

    //  console.log(`EPrice ${Object.values(filesArr[0])}`);

  }
  const findStockInRec = async () => {
    let rfeed = []
    let feed = searchStock
    let feeds = await axios.get(`http://localhost:8000/api/mfeeditems/${feed}`)
    // console.log(feeds);

    for (let index = 0; index < feeds.data['feeds'].length; index++) {

      rfeed.push(feeds.data['feeds'][index])
    }

    setStockInRec(rfeed.sort((a, b) => a['price'] - b['price']))
    // console.log(hfeed);
  }
  const findFeeds = async () => {
    let hfeed = []
    let feed = hSearch
    let feeds = await axios.get(`http://localhost:8000/api/feeditems/${feed}`)
    // console.log(feeds);

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

    let feeds = await axios.post('http://localhost:8000/api/findfeedByDate', { 'data': nDate })

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

    let feeds = await axios.post('http://localhost:8000/api/findByDate', { 'data': nDate })

    setMDateFeed(feeds.data['feeds'])
    // console.log(dateFormat(feeds.data['feeds'][0]['created_at']));
  }
  const delFeed = async (id) => {

    await axios.delete(`http://localhost:8000/api/feeds/${id}`)
    let dFeed = dateFeed.filter((v) => v['id'] !== id)
    setDateFeed(dFeed)

  }
  const delMFeed = async (id) => {

    await axios.delete(`http://localhost:8000/api/mfeeds/${id}`)
    let dFeed = mDateFeed.filter((v) => v['id'] !== id)
    setMDateFeed(dFeed)

  }
  const submit = async () => {

    const res = await axios.post('http://localhost:8000/api/mfeeditems', { 'data': filesArr })
    const nres = await axios.post('http://localhost:8000/api/feeditems', { 'data': newRR })

    if (res['status'] == 200 && nres['status'] == 200) {
      // setLoading(false)
      setShowButton(false)

    }
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
            accept=".csv"
            onChange={handleFileChange}
            style={{ display: "block", margin: "10px auto" }}
          />
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
            <button className='btn btn-primary' onClick={handleParse}>Apply</button>
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
            <ExportExcel excelData={farr} fileName={'Excel Export'} />
          </>
        }
        <br />
        <div>
          <input placeholder='Search History' type='text' name='search_history'
            onChange={(e) => setHSearch(e.target.value)} />
        </div>
        <br />
        <div>
          <button className='btn btn-primary' onClick={findFeeds}>Search</button>
        </div>
        <br />
        <br />
        <div>
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
        <div>
          <input placeholder='Search File Records' type='text' name='search_file_records'
            onChange={(e) => setSearch(e.target.value)} />
        </div>
        <br />
        <div>
          <button className='btn btn-primary' onClick={handleSearch}>Search</button>
        </div>
        <br />
        <h6>Find results by Date</h6>
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

        </div>
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
