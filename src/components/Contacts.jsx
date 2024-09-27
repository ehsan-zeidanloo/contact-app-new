import { useState, useReducer, useEffect, createContext } from "react";
import { v4 } from "uuid";
import styles from "./Contacts.module.css";
import inputs from "./../constants/inputs";
import ContactList from "./ContactList";
import Modal from "./Modal";

const initialState = {
  isEdit: false,
  alert: "",
  isModal: false,
  contact: {
    id: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
  },
  contacts: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      if (
        !state.contact.name ||
        !state.contact.lastName ||
        !state.contact.email ||
        !state.contact.phone
      ) {
        return { ...state, alert: "please enter valid data" };
      } else if (state.isEdit) {
        const updatedContacts = state.contacts.map((contact) =>
          contact.id === state.contact.id ? { ...state.contact } : contact
        );
        return {
          ...state,
          isEdit: false,
          alert: "!مخاطب ویرایش شد",

          contacts: updatedContacts,
          contact: { id: "", name: "", lastName: "", email: "", phone: "" },
        };
      } else {
        // add new contact
        const newContact = {
          id: v4(),
          name: state.contact.name,
          lastName: state.contact.lastName,
          email: state.contact.email,
          phone: state.contact.phone,
        };
        return {
          ...state,
          isEdit: false,
          alert: "! مخاطب اضافه شد",
          contacts: [...state.contacts, newContact],
          contact: { id: "", name: "", lastName: "", email: "", phone: "" },
        };
      }
    case "UPDATE_CONTACT":
      return {
        ...state,
        contact: {
          ...state.contact,
          [action.payload.name]: action.payload.value,
        },
      };
    case "DELETE_HANDLER":
      return {
        ...state,
        isModal: true,
        contact: action.payload,
      };
    case "CONFIRM-DELETE": {
      const newContacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
      return { ...state, contacts: newContacts, isModal: false };
    }
    case "CANCEL-DELETE":
      return { ...state, isModal: false };

    case "EDIT_CONTACT":
      return {
        ...state,
        isEdit: true,
        contact: {
          ...action.payload,
        },
      };
    case "CLEAR_ALERT":
      return {
        ...state,
        alert: "",
      };
    default:
      throw new Error("Invalid action");
  }
};
export const ContactContext = createContext();

function Contacts() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.alert) {
      const timer = setTimeout(() => {
        dispatch({ type: "CLEAR_ALERT" });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [state.alert]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_CONTACT", payload: { name, value } });
  };

  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      <div className={styles.container}>
        <div className={styles.form}>
          {inputs.map((input, index) => (
            <input
              key={index}
              name={input.name}
              placeholder={input.placeholder}
              type={input.type}
              value={state.contact[input.name]}
              onChange={changeHandler}
            />
          ))}
          <button onClick={() => dispatch({ type: "ADD_CONTACT" })}>
            {state.isEdit ? "Edit" : "Add"}
          </button>
        </div>

        <ContactList />
        <Modal />
        {state.alert && (
          <div className={styles.alert}>
            <p>{state.alert}</p>
          </div>
        )}
      </div>
    </ContactContext.Provider>
  );
}

export default Contacts;
