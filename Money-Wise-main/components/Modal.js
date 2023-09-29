function Modal({ isOpen, onClose, children }) {
    return (
      <div
        style={{
          transform: isOpen ? "translateX(0%)" : "translateX(-200%)",
        }}
        className={`absolute top-0 left-0 w-full h-full z-10 transition-all duration-500 ${
          isOpen ? "bg-black bg-opacity-50" : "" // Adiciona fundo escuro com opacidade quando o modal está aberto
        }`}
      >
        
        <div className="container mx-auto max-w-2xl min-h-[80vh] rounded-3xl bg-black bg-opacity-95 text-white py-6 px-4"> 
          <button
            onClick={() => {
              onClose(false);
            }}
            className="w-10 h-10 mb-4 font-bold rounded-full bg-slate-600"
          >
            X
          </button>
          {children}
        </div>
      </div>
    );
  }
  
  export default Modal;
  