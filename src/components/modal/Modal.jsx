import React, { useRef } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

const Modalcomp = ({ onClose, children, label, labelbtn, onSubmit }) => {
  const initialRef = useRef();
  const finalRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <>
      <Button onClick={onClose}>Close Modal</Button>
      <Button ml={4} ref={finalRef}>
        I'll receive focus on close
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent w={{ base: "95vw", md: "80vw" }} maxW="100%" maxH="100%">
          <ModalHeader>{label}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} maxHeight="70vh" overflowY="auto">
            <form onSubmit={handleSubmit}>
              {children}
              <ModalFooter>
                <Button type="submit" colorScheme="teal" size="md" mr={3}>
                  {labelbtn}
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Modalcomp;
