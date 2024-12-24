const WarningModal = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex backdrop-blur justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Warning</h2>
        <p className="text-lg">You are not a member of this gift exchange.</p>
      </div>
    </div>
  );
};

export default WarningModal;
