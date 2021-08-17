import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';

import { CSVLink, CSVDownload } from "react-csv";
// import AsyncCSV from "./AsyncCSV";

function App() {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  // const data0 = data[0];
  // console.log("data0", data0);

  // Object.keys(columns);

  // console.log("key", Object.values(data));
  // console.log("data", data0["Id"]);

  const csvReport = {
    data: data,
    headers: columns,
    filename: "output_churasai.csv",
  };

  // process CSV data
  const processData = (dataString) => {
    // console.log("processData", processData);
    // csvは,で区切られているので列を,で区切る
    // get the list of rows
    const dataStringLines = dataString.split(/\r\n|\n/);
    // get the list of the headers
    const headers = dataStringLines[0].split(
      /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
    );

    // インポートしたデータが配列の中にオブジェクトとして入ってる
    const list = [];
    // console.log("list", list);
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(
        /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
      );
      if (headers && row.length == headers.length) {
        const obj = {};
        // オブジェクトの一つが一つが入ってくる
        // console.log("obj", obj);
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          // 全てのデータ値、一つ一つ
          // console.log("d", d);
          if (d.length > 0) {
            if (d[0] == '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] == '"') d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter((x) => x).length > 0) {
          list.push(obj);
        }
      }
    }

    // prepare columns list from headers
    const preColumns = headers
      .filter(
        (c) =>
          c === "Shipping Zip" ||
          c === "Shipping Province Name" ||
          c === "Shipping City" ||
          c === "Shipping Street" ||
          c === "Shipping Name"
      )
      .map((c) => ({
        // name: c.replace(/ /g, ""),
        name: c,
        selector: c,
        sortable: true,
      }));

    // let zipCode = preColumns[3].selector.replace(/\s+/g, "");
    // let zipCode2 = preColumns[3].name.replace(/\s+/g, "");

    const columns = [
      {
        name: "郵便番号",
        selector: preColumns[3].selector,
        label: "郵便番号",
        key: preColumns[3].name,
      },
      {
        name: "住所",
        selector: "cuurentAddress",
        label: "住所",
        key: "cuurentAddress",
      },
      // {
      //   name: "都道府県",
      //   selector: preColumns[4].selector,
      //   label: "都道府県",
      //   key: preColumns[4].name,
      // },
      // {
      //   name: "市町村",
      //   selector: preColumns[2].selector,
      //   label: "市町村",
      //   key: preColumns[2].name,
      // },
      // {
      //   name: "住所",
      //   selector: preColumns[1].selector,
      //   label: "住所",
      //   key: preColumns[1].name,
      // },
      {
        name: "名称",
        selector: preColumns[0].selector,
        label: "名称",
        key: preColumns[0].name,
      },
      {
        name: "敬承",
        selector: "respectName",
        label: "敬承",
        key: "respectName",
      },
      {
        name: "電話番号",
        selector: "phoneNumber",
        label: "電話番号",
        key: "phoneNumber",
      },
      {
        name: "品名",
        selector: "product",
        label: "品名",
        key: "product",
      },
      {
        name: "チルド",
        selector: "chilled",
        label: "チルド",
        key: "chilled",
      },
      {
        name: "逆さ厳禁",
        selector: "reverseNo",
        label: "逆さ厳禁",
        key: "reverseNo",
      },
      {
        name: "下積み厳禁",
        selector: "under",
        label: "下積み厳禁",
        key: "under",
      },
      {
        name: "なまもの",
        selector: "row",
        label: "なまもの",
        key: "row",
      },
      {
        name: "配達希望日",
        selector: "deliverDay",
        label: "配達希望日",
        key: "deliverDay",
      },
      {
        name: "配達希望時間帯",
        selector: "deliverTime",
        label: "配達希望時間帯",
        key: "deliverTime",
      },
    ];

    console.log("header columns", columns);

    for (let i = 0; i < list.length; i++) {
      list[i].respectName = 1;
      list[i].phoneNumber = "098-853-5727";
      list[i].product = "レタス（美ら菜）";
      list[i].chilled = 1;
      list[i].reverseNo = 1;
      list[i].under = 1;
      list[i].row = 1;
      list[i].deliverDay = "";
      list[i].deliverTime = "";

      const newAddress =
        Object.values(list[i])[70] +
        Object.values(list[i])[39] +
        Object.values(list[i])[36] +
        Object.values(list[i])[37];

      // newAddress.replace(",", "");

      list[i].cuurentAddress = newAddress;

      console.log("newAddress", newAddress.replace(",", ""));
    }

    // const data ={key:value}
    // let newValue = [];
    // for (let x = 0; x < list.length; x++) {
    //   for (let y = 0; y < Object.values(list[0]).length; y++) {
    //     Object.keys(list[x])[y].filter((f) => f === "Shipping Province Name");

    console.log("key:value", Object.entries(list[13]));
    //   }
    // }

    console.log(
      "住所",
      Object.values(list[0])[70] +
        Object.values(list[0])[39] +
        Object.values(list[0])[35]
    );

    // // const data ={key:value}
    // let newValue = [];
    // for (let x = 0; x < list.length; x++) {
    //   for (let y = 0; y < Object.values(list[0]).length; y++) {
    //     // console.log("samp", Object.values(list[x])[y]);
    //     const listN = Object.keys(list[x])[y];

    //     if (Object.keys(list[x])[y] === "Shipping Province Name") {
    //       newValue.push(Object.values(list[x])[y]);
    //     }
    //     console.log(
    //       "Shipping Province Name",
    //       Object.keys(list[x])[y] === "Shipping Province Name"
    //     );
    //     // console.log(
    //     //   "Shipping City",
    //     //   Object.keys(list[x])[y] === "Shipping Province Name"
    //     // );
    //     console.log("key:value", Object.entries(list[x])[y]);
    //     // .filter(
    //     //   (c) =>
    //     //     c === "Shipping Province Name" ||
    //     //     c === "Shipping City" ||
    //     //     c === "Shipping Street"
    //     // );
    //     // return listN;
    //     console.log("listN", listN);
    //     // console.log("y", Object.keys(list[x])[y]);
    //   }
    // }

    // let newOb = newValue.map((i) => <p>{i}</p>);

    // console.log("newOb", newOb);

    // console.log("list key", Object.keys(list[0])[0]);
    // console.log("list key length", Object.values(list[0]).length);

    console.log("list", list);
    setData(list);
    setColumns(columns);
  };

  // handle file upload
  const handleFileUpload = (e) => {
    // informarion about file
    const file = e.target.files[0];
    // console.log("file", file);

    const reader = new FileReader();
    // console.log("reader", reader);
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      // console.log("bstr", bstr);
      const wb = XLSX.read(bstr, { type: "binary" });
      // console.log("wb", wb);
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      // console.log("data", data);
      processData(data);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <h3>
        Read CSV file in React -{" "}
        <a href="https://www.cluemediator.com" target="_blank">
          Clue Mediator
        </a>
      </h3>
      <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} />
      <DataTable pagination highlightOnHover columns={columns} data={data} />

      <CSVLink {...csvReport}>Export to CSV</CSVLink>
    </div>
  );
}

export default App;
