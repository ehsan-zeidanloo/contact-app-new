import { useState, useReducer, useEffect, createContext } from "react";
import styles from "./Contacts.module.css";
import inputs from "./../constants/inputs";
import ContactList from "./ContactList";

const initialState = {
  isEdit: false,
  alert: "",
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
      } else {
        // add new contact
        const newContact = {
          id: state.contact.id,
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
    default:
      throw new Error("Invalid action");
  }
};
export const ContactContext = createContext();

function Contacts() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_CONTACT", payload: { name, value } });
  };

  return (
    <ContactContext.Provider value={state}>
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
        <div className={styles.alert}>{state.alert}</div>
      </div>
    </ContactContext.Provider>
  );
}

export default Contacts;
