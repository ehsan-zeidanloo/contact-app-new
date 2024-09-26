import { useContext } from "react";
import { ContactContext } from "./Contacts";
import styles from "./ContactItem.module.css";

function ContactItem() {
  const state = useContext(ContactContext);
  const { contacts } = state;
  console.log(contacts);
  return (
    <>
      {contacts.map((contact) => (
        <div className={styles.item} key={contact.id}>
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
          <button onClick={() => console.log("deleted")}>🗑️</button>
          <button onClick={() => console.log("edited")}>✏️</button>
          <input
            type="checkbox"
            // checked={selected}
            onChange={() => console.log("checked")}
          />
        </div>
      ))}
    </>
  );
}

export default ContactItem;
