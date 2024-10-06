import { useContext } from "react";
import { ContactContext } from "./Contacts";
import styles from "./ContactItem.module.css";

function ContactItem({ contact, selectedContacts, setSelectedContacts }) {
  const { dispatch } = useContext(ContactContext);

  // const {contacts}=state

  const handleSelect = () => {
    if (selectedContacts.includes(contact.id)) {
      setSelectedContacts(selectedContacts.filter((id) => id !== contact.id));
    } else {
      setSelectedContacts([...selectedContacts, contact.id]);
    }
  };

  return (
    <>
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
          onClick={() => dispatch({ type: "DELETE_HANDLER", payload: contact })}
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
          checked={selectedContacts.includes(contact.id)}
          onChange={handleSelect}
        />
      </li>
    </>
  );
}

export default ContactItem;
