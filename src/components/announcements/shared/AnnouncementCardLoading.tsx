const AnnouncementCardLoading = () => {
  return (
    <div className="w-full animate-pulse border bg-white shadow">
      <div className="h-44 w-full bg-gray-300" />
      <div className="flex flex-col gap-2 px-2 py-4">
        <div className="h-6 w-full bg-gray-200" />
        <div className="flex items-center justify-between gap-x-2">
          <div className="h-4 w-full bg-gray-200" />
          <div className="h-4 w-full bg-gray-200" />
        </div>
        <div className="h-4 w-full bg-gray-200" />
        <div className="h-4 w-full bg-gray-200" />
      </div>
    </div>
  );
};

export default AnnouncementCardLoading;
