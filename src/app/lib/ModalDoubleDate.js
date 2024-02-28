import ReactModal from "react-modal";
import Modal from "react-modal";
import styles from "../page.module.css";

export default function ModalDoubleDate({ isOpen, message, onRequestClose }) {
  return (
    <>
      <Modal
        className={styles.modal}
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Error Modal"
      >
        <p>{message}</p>
        <button onClick={onRequestClose}>Cancel</button>
      </Modal>
    </>
  );
}
