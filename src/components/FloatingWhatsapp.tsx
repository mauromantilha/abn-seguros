export default function FloatingWhatsapp() {
  const whatsappUrl = "https://wa.me/5511944084097?text=Ol%C3%A1,%20gostaria%20de%20fazer%20uma%20consulta%20sobre%20seguros.";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[92px] right-6 z-50 p-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-1 group flex items-center gap-2 cursor-pointer border border-emerald-400"
      aria-label="Fale conosco no WhatsApp"
    >
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-semibold group-hover:max-w-xs transition-all duration-500 ease-in-out font-sans pl-0 group-hover:pl-1">
        Falar com Corretor
      </span>
      <svg 
        className="w-6 h-6 fill-white animate-pulse" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.488 1.459 5.421 1.46 5.561 0 10.093-4.52 10.097-10.077.002-2.693-1.045-5.225-2.951-7.133C17.309 1.496 14.773.449 12.013.449c-5.57 0-10.106 4.524-10.11 10.078-.002 1.879.5 3.71 1.458 5.31L2.38 21.502l5.807-1.523c1.556.849 3.298 1.297 5.067 1.298zM17.47 15.62c-.3-.15-1.77-.874-2.046-.975-.276-.102-.477-.152-.676.152-.199.304-.77.975-.944 1.178-.173.203-.347.228-.647.078-3.002-1.502-5.076-3.11-6.565-5.658-.393-.674.393-.626 1.125-2.073.125-.25.063-.47-.031-.67-.095-.2-.676-1.63-.926-2.235-.244-.589-.493-.51-.676-.518-.174-.008-.374-.01-.572-.01-.199 0-.523.074-.797.373-.273.3-1.045 1.02-1.045 2.487 0 1.467 1.07 2.883 1.218 3.084.15.2 2.106 3.216 5.101 4.512.712.308 1.27.493 1.704.63.716.227 1.368.195 1.883.118.574-.085 1.77-.724 2.02-1.417.251-.693.251-1.288.176-1.417-.076-.129-.276-.204-.576-.355z" />
      </svg>
    </a>
  );
}
