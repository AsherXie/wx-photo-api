interface ModalProps {
  type: string,
  msg: string
}
function Modal(props: ModalProps) {
  return (
    <div>
      {props.msg}
    </div>
  );
}

export default Modal;
