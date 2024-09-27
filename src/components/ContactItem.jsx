import { useContext } from "react";
import { ContactContext } from "./Contacts";
import styles from "./ContactItem.module.css";

function ContactItem() {
  const reducer = useContext(ContactContext);
  const {
    state: { contacts },
    dispatch,
  } = reducer;
  // const {contacts}=state
  // console.log(contacts);

  return (
    <>
      {contacts.map((contact) => (
        <li className={styles.item} key={contact.id}>
          <p>
            {contact.name} {contact.lastName}
          </p>
          <p>
            <span>📧</span>
            {contact.email}
          </p>
          <p>
            <span>📞</span>
            {contact.phone}
          </p>
          <button
            onClick={() =>
              dispatch({ type: "DELETE_HANDLER", payload: contact })
            }
          >
            🗑️
          </button>
          <button
            onClick={() => dispatch({ type: "EDIT_CONTACT", payload: contact })}
          >
            ✏️
          </button>
          <input
            type="checkbox"
            // checked={selected}
            onChange={() => console.log("checked")}
          />
        </li>
      ))}
    </>
  );
}

export default ContactItem;
