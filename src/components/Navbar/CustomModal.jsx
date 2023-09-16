import React from "react"
import Modal from "react-modal"

const CustomModal = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Navigation Menu"
    >
      <div>{children}</div>
    </Modal>
  )
}

export default CustomModal
