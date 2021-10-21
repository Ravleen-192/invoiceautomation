import React, { useState, useEffect } from "react";
import axios from 'axios';
import { showError } from './App';
//import { Col, Row, Input } from 'reactstrap';
import Table from 'react-bootstrap/Table'
//import { FaUser } from 'react-icons/fa';
import {
  Container,
  Grid,
  MenuItem,
  Select,
  TextField
} from "@material-ui/core";
import Amplify from 'aws-amplify'

import SentimentTable from './SentimentTable';

import { Storage } from 'aws-amplify';

import config from './aws-exports';

Amplify.configure(config);

const InvoiceProcessing = () => {
  const [fileurl, setfileurl] = useState("");
  const [file, setfile] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [filename, setfilename] = useState("");
  const [contentType, setcontentType] = useState("text/plain");
  const [response, setResponse] = useState("");
  const [gFileUrl, setgFileUrl] = useState(null);
  const [isToggle, setisToggle] = useState(false);
  const [buttonText, setbuttonText] = useState("Attach File");
  const [input, setInput] = useState("");
  const [result, setResult] = useState({});
  const [type, setType] = useState("");
  const [finaltype, setfinalType] = useState("");
  const [query, setQuery] = useState("");
  const tempList = [
    { From: "ACME Solutions", DatenTime: "08/10/2021:13:15:00", Subject: "Brian Kampelove: For the week ending 7th Oct", Filepath: "a.pdf" },
    { From: "AnA Infotech", DatenTime: "08/10/2021:14:18:00", Subject: "Ciena Brussette: For the week ending 7th Oct", Filepath: "b.pdf" }

  ];
  const analysisTypeLinks = [

    {
      // postLink: 'https://i0r8q9vwyk.execute-api.us-west-2.amazonaws.com/default/trg-s3-safile?filename=' + encodeURIComponent(String(folder + filename)).replace(/%2F/g, "/") + (String('&contentType=')) + (String(contentType)) + (String('&apiType=')) + (String(type)) + (String('&text=')) + encodeURIComponent(String(input)).replace(/%20/g, "+")
    }

  ];
  const handleClick = (e) => {
    setFileContent("My Name is KKHHAAN");
  }
  const handleFileChange = event => {
    
    setInput("My Name is KHHHHHAN");
    
  };
  const saveFile = () => {
    Storage.put(`${filename}`,
      file)
      .then(result => {
        setResponse("Success uploading file!");
      })
      .catch(err => {
        setResponse(`Cannot upload file: ${err}`);
      });
  }

  const handleSubmit = () => {
    if (!input && !filename) {
      showError("Input Required.");
      return;
    }
    if (!type) {
      showError("Please Select the Analysis type.");
      return;
    }
    if ((filename) && response !== "Success uploading file!") {
      showError("File not uploaded.");
      return;
    }
    setfileurl("");
    setfile("");
    setfilename("");
    setcontentType("");
    setResult(input);
    setfinalType(type);
    console.log(query);
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    console.log(type);

    axios.post(query, { key1: input })
      .then(res => {
        setResult(res.data);
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
        console.log(res.data);
      })
  }
  const handleChange = (e) => {
    setType(e.target.value);
    console.log(e.target.value);

  }

  useEffect(() => {
    const filtered = analysisTypeLinks[0];
    console.log("____-ILTERED--------------------");
    console.log(filtered);
    if (type)
      setQuery(filtered.postLink);
  }, [type]);


  useEffect(() => {
    console.log(">>>>>>>>>>>>>>>> RAVLEEN");
    console.log(query);
  }, [query]);


  return (
    <div className="homeimg">

      <Grid container spacing={10} className="grid">
        <Grid item xs={12} className="grid_item">
          <label className="label"><b> UNREAD E-mails</b> </label>
          <br />
          <Container className="result">
            <Table striped bordered hover responsive="sm">
              <thead>
                <tr>
                  <th>
                    From
                  </th>
                  <th>
                    Date/Time
                  </th>
                  <th>
                    Subject
                  </th>
                  <th>
                    Attachment
                  </th>
                </tr>
              </thead>

              <tbody>
                {tempList.map((element) => (
                  <tr>
                    <td>
                      {element.From}
                    </td>
                    <td>
                      {(element.DatenTime)}
                    </td>
                    <td>
                      {(element.Subject)}
                    </td>
                    <td>
                      <a onClick={handleClick}> {(element.Filepath)}</a>
                    </td>
                  </tr>))}
              </tbody>
            </Table>

          </Container>
        </Grid>
        <Grid item xs={6} className="input-box">
          <div
            className="container"
          >
            <label className="label"><b> Selected PDF Content</b> </label>
            <TextField
              placeholder="PDF Content Here"
              variant="filled"
              multiline
              value={fileContent}
              rows={6}
              fullWidth={true}
            //onChange={(e) => { setInput(e.target.value); setcontentType("text/plain"); setfilename(""); setfolder(""); }}
            />
            <div>
              <button
                className="frmbtn2"
                onClick={handleFileChange}
              >
                Process
              </button>
            </div>
          </div>

        </Grid>
        <Grid item xs={6} className="input-box">
          <div
            className="container"
          >
            <label className="label"> <b>Extracted Content </b></label>
            <TextField
              placeholder="Extracted Content Here"
              variant="filled"
              multiline
              value={input}
              rows={6}
              fullWidth={true}
            //onChange={(e) => { setInput(e.target.value); setcontentType("text/plain"); setfilename(""); setfolder(""); }}
            />
          </div>
          <div>
            <button
              className="frmbtn2"
              onClick={handleClick}
            >
              Approve
            </button>
          </div>

        </Grid>



      </Grid>
    </div>
  );
};
export default InvoiceProcessing;