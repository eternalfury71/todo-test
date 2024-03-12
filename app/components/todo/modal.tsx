import React, { forwardRef, useState, useImperativeHandle, Ref } from "react";
import { useTodo } from "./todo-context";
type ModalProps = {
  children: React.ReactNode;
  onConfirm: () => void;
};
export type ModalRef = {
  openModal: () => void;
  closeModal: () => void;
};
function Modal(props: ModalProps, ref: Ref<ModalRef>) {
  const { children, onConfirm } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));
  const handleConfirm = () => {
    onConfirm();
  };
  return modalOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-hidden no-scroll">
      <div className="bg-white p-6 rounded-lg shadow-lg w-84 max-w-lg">
        <div className="flex flex-col items-center justify-center">
          {children}
          <div className="flex justify-center space-x-8">
            <button onClick={handleConfirm} className="btn text-green-500">
              Confirm
            </button>
            <button onClick={closeModal} className="btn text-red-500">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default forwardRef(Modal);
