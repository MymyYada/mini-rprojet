const Modal = ({ texts }: { texts: string[] }) => {
  return (
    <div>
      {texts.map((text: string, key: number) => (
        <div key={key}>{text}</div>
      ))}
    </div>
  );
};

export default Modal;
