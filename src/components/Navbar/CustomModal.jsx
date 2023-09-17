import React from "react"
import Modal from "react-modal"

const CustomModal = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Navigation Menu"
      className="mobile-menu"
    >
      <div>{children}</div>
    </Modal>
  )
}

export default CustomModal
