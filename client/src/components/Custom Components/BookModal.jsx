import {
  Modal, ModalBody, ModalContent, ModalHeader,
} from '@chakra-ui/react';

function DescModal() {
  return (
    <Modal>
      <ModalContent>
        <ModalHeader>Book Name</ModalHeader>
        <ModalBody>Book Description</ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default DescModal;
