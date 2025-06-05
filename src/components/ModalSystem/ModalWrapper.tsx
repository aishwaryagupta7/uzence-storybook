import { useState } from "react";
import { Modal } from "./Modal";



const ModalWrapper = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
      >
        Open Modal
      </button>
      <Modal {...props} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="space-y-4">
          <p>This is a modal with various configuration options.</p>
          <p>You can customize animations, sizes, backdrop effects, and more.</p>
          <div className="flex">
            <button onClick={() => setIsOpen(false)} className="px-3 py-1 bg-blue-500 text-white rounded cursor-pointer">Confirm</button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ModalWrapper;