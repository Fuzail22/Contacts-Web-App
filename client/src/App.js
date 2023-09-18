import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import ContactsForm from "./ContactsForm";
import DeleteOverlay from "./DeleteOverlay";
import LoadingOverlay from "./LoadingOverlay";
import SuccessMessage from "./SuccessMSG";
import {
  BsSortAlphaUp,
  BsSortAlphaDownAlt,
  BsPencil,
  BsPlusCircle,
  BsArrowDownCircle,
  BsXCircle,
  BsFillPersonVcardFill,
} from "react-icons/bs";
import DelayMSG from "./DelayMSG";

function App() {
  const [contacts, setContacts] = useState([]);
  const [contactsView, setContactsView] = useState(contacts);
  const [showForm, setShowForm] = useState(false);
  const [contactState, setContactState] = useState({});
  const [edit, setEdit] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  let contact = { _id: "", name: "", phone: "", email: "" };

  useEffect(() => {
    axios
      .get("https://contactsbackend-wd5f.onrender.com/api/contacts")
      .then((response) => {
        setContacts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    setContactsView(contacts);
  }, [contacts]);
  function showSuccessMessage() {
    setIsSuccessVisible(true);
    setTimeout(() => {
      setIsSuccessVisible(false);
    }, 5000);
  }
  function searchEventHandler(e) {
    let result = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (result.length === 0) {
      setContactsView(contacts);
    } else {
      setContactsView(result);
    }
  }
  function sortDescending() {
    const sortedResult = [...contactsView].sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1
    );
    setContactsView(sortedResult);
  }
  function sortAscending() {
    const sortedResult = [...contactsView].sort((a, b) =>
      a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
    );
    setContactsView(sortedResult);
  }
  function editHandler(c) {
    contact._id = c._id;
    contact.name = c.name;
    contact.phone = c.phone;
    contact.email = c.email;
    setContactState(contact);
    setEdit(true);
    setShowForm(true);
  }
  function refreshPage() {
    axios
      .get("https://contactsbackend-wd5f.onrender.com/api/contacts")
      .then((response) => {
        setContacts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function deleteHandler(c) {
    setContactState(c);
    setShowOverlay(true);
  }
  function handleConfirmDelete() {
    setLoading(true);
    axios
      .delete(
        `https://contactsbackend-wd5f.onrender.com/api/contacts/${contactState._id}`
      )
      .then((response) => {
        setContactState({});
        refreshPage();
        setSuccessMessage(response.data);
        showSuccessMessage();
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
    setShowOverlay(false);
  }
  function handleCancelDelete() {
    setShowOverlay(false);
  }
  function jsonToCsv(data) {
    const csv = Papa.unparse(data);
    return csv;
  }
  const handleDownload = () => {
    const contactsDownload = contacts.map(({ _id, ...rest }) => rest);
    const csv = jsonToCsv(contactsDownload);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "contacts.csv");
  };
  return (
    <div className="App">
      {loading && <LoadingOverlay />}
      {loading && <DelayMSG />}
      <div className="heading">
        <h1>
          Contact Management App
          <BsFillPersonVcardFill className="icon" />
        </h1>
      </div>
      <div className="header">
        <input
          type="text"
          id="searchBar"
          placeholder="Search"
          onChange={searchEventHandler}
        ></input>
        <button
          className="add"
          onClick={() => {
            setShowForm(true);
            setEdit(false);
            setContactState({});
          }}
        >
          <BsPlusCircle style={{ fontSize: "30px" }} />
        </button>
        <button className="download" onClick={handleDownload}>
          <BsArrowDownCircle style={{ fontSize: "30px" }} />
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <td>
              Name
              <button className="sort" onClick={sortAscending}>
                <BsSortAlphaUp style={{ color: "white", fontSize: "20px" }} />
              </button>
              <button className="sort" onClick={sortDescending}>
                <BsSortAlphaDownAlt
                  style={{ color: "white", fontSize: "20px" }}
                />
              </button>
            </td>
            <td>Phone</td>
            <td>E-mail</td>
          </tr>
        </thead>
        <tbody>
          {contactsView &&
            contactsView.map((x) => (
              <tr key={x._id}>
                <td>
                  {x.name}
                  <button className="edit" onClick={() => editHandler(x)}>
                    <BsPencil />
                  </button>
                  <button className="delete" onClick={() => deleteHandler(x)}>
                    <BsXCircle />
                  </button>
                </td>
                <td>{x.phone}</td>
                <td>{x.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {showForm && (
        <ContactsForm
          setShowForm={setShowForm}
          setLoading={setLoading}
          edit={edit}
          contact={contactState}
          refreshPage={refreshPage}
          showSuccessMessage={showSuccessMessage}
          setSuccessMessage={setSuccessMessage}
        />
      )}
      {showOverlay && (
        <DeleteOverlay
          handleCancelDelete={handleCancelDelete}
          handleConfirmDelete={handleConfirmDelete}
        />
      )}
      {isSuccessVisible && <SuccessMessage message={successMessage} />}
    </div>
  );
}

export default App;
