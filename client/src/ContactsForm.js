import axios from "axios";
import { useRef } from "react";

function ContactsForm(props) {
  const name = useRef(null);
  const phone = useRef(null);
  const email = useRef(null);
  function hasEmptyStringValues(obj) {
    return Object.keys(obj).some((key) => obj[key] === "");
  }

  function saveHandler() {
    const formdata = {
      name: name.current.value,
      phone: phone.current.value,
      email: email.current.value,
    };
    if (hasEmptyStringValues(formdata)) {
      alert("can't submit empty fields");
      return;
    }
    props.setLoading(true);
    props.setShowForm(false);
    axios
      .post("https://contactsbackend-wd5f.onrender.com/api/contacts", formdata)
      .then((response) => {
        props.refreshPage();
        props.setSuccessMessage(response.data);
        props.showSuccessMessage();
      })
      .catch((err) => {
        console.log(err);
      });
    props.setLoading(false);
  }
  function editHandler() {
    const formdata = {
      name: name.current.value,
      phone: phone.current.value,
      email: email.current.value,
    };
    if (hasEmptyStringValues(formdata)) {
      alert("can't submit empty fields");
      return;
    }
    props.setLoading(true);
    props.setShowForm(false);
    axios
      .put(
        `https://contactsbackend-wd5f.onrender.com/api/contacts/${props.contact._id}`,
        formdata
      )
      .then((response) => {
        props.refreshPage();
        props.setSuccessMessage(response.data);
        props.showSuccessMessage();
      })
      .catch((err) => {
        console.log(err);
      });
    props.setLoading(false);
  }
  return (
    <>
      <div className="overlay">
        <div className="overlay-form">
          <label className="overlay-label">
            Name:
            <input
              ref={name}
              defaultValue={props.contact.name}
              className="overlay-input"
              required
            ></input>
          </label>
          <label className="overlay-label">
            Phone:
            <input
              ref={phone}
              defaultValue={props.contact.phone}
              className="overlay-input"
              required
            ></input>
          </label>
          <label className="overlay-label">
            E-mail:
            <input
              ref={email}
              defaultValue={props.contact.email}
              className="overlay-input"
              required
            ></input>
          </label>
          <div className="overlay-buttons">
            <button
              id="savebtn"
              className="overlay-button"
              onClick={() => {
                if (props.edit === false) saveHandler();
                else editHandler();
              }}
            >
              Save
            </button>
            <button
              id="cancelbtn"
              className="overlay-button"
              onClick={() => {
                props.setShowForm(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactsForm;
