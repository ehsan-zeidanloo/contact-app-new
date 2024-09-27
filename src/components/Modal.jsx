import { useContext } from "react";
import styles from "./Modal.module.css";
import { ContactContext } from "./Contacts";

function Modal() {
  const reducer = useContext(ContactContext);
  const { state, dispatch } = reducer;

  console.log(state.contact.name);
  if (!state.isModal) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>تایید</h3>
        <p>آیا مطمئن هستید که قصد حذف کاربر {state.contact.name} را دارید؟</p>
        <div className={styles.modalButtons}>
          <button
            className={styles.confirmBtn}
            onClick={() =>
              dispatch({ type: "CONFIRM-DELETE", payload: state.contact.id })
            }
          >
            بله
          </button>
          <button
            className={styles.cancelBtn}
            onClick={() => dispatch({ type: "CANCEL-DELETE" })}
          >
            خیر
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
