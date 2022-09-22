const Create = () => {
  return (
    <div
      className='h-screen w-screen'
      style={{
        backgroundColor: '#DFDBE5',
        backgroundImage:
          "url(data:image/svg+xml,%3Csvg width='12' height='24' viewBox='0 0 12 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M2 0h2v12H2V0zm1 20c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM9 8c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm-1 4h2v12H8V12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E)",
      }}
    >
      <div className='layout h-screen bg-bgAlt pt-36 text-center'>
        <h1>Create New Poll</h1>
      </div>
    </div>
  );
};
export default Create;
