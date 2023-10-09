import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from '@nextui-org/react';

export default function ModalOnCall({
  status,
  shouldOpenModal,
  setShouldOpenModal
}) {
  return (
    <>
      <Modal isOpen={shouldOpenModal}>
        <ModalContent>
          <ModalHeader>{status.success ? 'Éxito' : 'Error'}</ModalHeader>
          <ModalBody>
            <p>{status.message}</p>
          </ModalBody>
          <ModalFooter>
            <Button
              auto
              color='primary'
              size='small'
              onClick={() => {
                setShouldOpenModal(false);
                if (
                  status.message === 'Service deleted successfully' ||
                  status.message === 'Agenda Actualizada Correctamente'
                )
                  window.location.reload();
              }}
            >
              Regresar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
