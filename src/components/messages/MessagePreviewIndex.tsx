const MessagePreviewIndex: React.FC = () => {
  return (
    <div className="flex h-full flex-1 justify-center">
      <div className="container grid h-full grid-cols-4">
        <div>Show discussions</div>
        <div className="show messages"></div>
      </div>
    </div>
  );
};

export default MessagePreviewIndex;
