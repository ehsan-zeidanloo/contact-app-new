import { useState, useContext } from "react";
import { ContactContext } from "./Contacts";
import ContactItem from "./ContactItem";
import styles from "./ContactList.module.css";

function ContactList() {
  const [search, setSearch] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);
  const reducer = useContext(ContactContext);
  const { state, dispatch } = reducer;

  // filter contacts by search value
  const filteredContacts = state.contacts.filter((contact) => {
    const fullName = `${contact.name.toLowerCase()} ${contact.lastName.toLowerCase()}`;
    return fullName.includes(search) || contact.email.includes(search);
  });

  // remove all selectedContacts
  const handleDeleteSelected = () => {
    dispatch({ type: "DELETE_SELECTED_CONTACTS", payload: selectedContacts });
    setSelectedContacts([]);
  };
  return (
    <div className={styles.container}>
      <div className={styles.contactheader}>
        <h3>ContactList</h3>
        <input
          type="text"
          placeholder="search by name,email ..."
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase().trim())}
        />
        <button onClick={handleDeleteSelected}>deleteselected</button>
      </div>
      {filteredContacts.length ? (
        <ul>
          {filteredContacts.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              selectedContacts={selectedContacts}
              setSelectedContacts={setSelectedContacts}
            />
          ))}
        </ul>
      ) : (
        <p className={styles.noResults}>
          No contacts found matching your search.
        </p>
      )}
    </div>
  );
}

export default ContactList;
