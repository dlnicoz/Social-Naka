function AuthSideImage({ imageUrl, overlayColor }) {
    return (
    //   <div className={`hidden lg:block w-1/2 relative overflow-hidden ${overlayColor}`}>
        <div className="hidden relative -z-10 items-center justify-center overflow-hidden xl:flex xl:w-[calc(100vw-48%)] bg-center bg-no-repeat bg-cover">

        <div 
        //   className="absolute inset-0"
          style={{ 
            backgroundImage: `url('${imageUrl}')`,
            backgroundSize: 'cover',
            // backgroundPosition: 'center',    
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100%'
          }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-br from-transparent to-black/40"
          aria-hidden="true"
        />
      </div>
    );
  }
  
  export default AuthSideImage;