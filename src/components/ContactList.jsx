import { useContext } from "react";
import { ContactContext } from "./Contacts";
import ContactItem from "./ContactItem";
import styles from "./ContactList.module.css";

function ContactList() {
  const reducer = useContext(ContactContext);
  const {state}=reducer
  // console.log(state);
  return (
    <div className={styles.container}>
      {state.contacts.length ? <ContactItem /> : <p>no contact yet</p>}
    </div>
  );
}

export default ContactList;
