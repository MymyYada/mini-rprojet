const Modal = ({ texts }: { texts: string[] }) => {
  return (
    <div className="flex flex-col mx-6 w-64">
      {texts.map((text: string, key: number) => (
        <div key={key} className="flex text-gray-500 text-xs my-1 items-center">
          {text}
        </div>
      ))}
    </div>
  );
};

export default Modal;
