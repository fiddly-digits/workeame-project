import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from '@nextui-org/react';

export default function ModalForDecisions({
  shouldOpenDecisionsModal,
  setShouldOpenDecisionsModal,
  onDelete
}) {
  return (
    <>
      <Modal isOpen={shouldOpenDecisionsModal}>
        <ModalContent>
          <ModalHeader>Estas Seguro?</ModalHeader>
          <ModalBody>
            El servicio se perderá y no podrá ser recuperado
          </ModalBody>
          <ModalFooter>
            <Button
              auto
              color='primary'
              size='small'
              onClick={() => {
                setShouldOpenDecisionsModal(false);
                onDelete();
              }}
            >
              Si
            </Button>
            <Button
              auto
              color='error'
              size='small'
              onClick={() => {
                setShouldOpenDecisionsModal(false);
              }}
            >
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
