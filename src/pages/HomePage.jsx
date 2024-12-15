

function HomePage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-3x2 font-bold my-3 text-center">Sistema de productos</h1>
        <h2 className="text-1x1 font-bold my-3 texte-center">Lenguajes Web
        </h2>
        <div>
          <p className="gap-x-2 text-justify pt-5 mt-5 text-sm">
            Estes sistema ha sido creado en la materia Lenguajes Web 
            Para la Materia Topicos Paginas web 

          </p>
          <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r
          from-trasparent via-neutral-500 to-transparent opacity-25 dark:opacity-100"/>

          <p className="texte-center text-xs">
            Derechos Reservados EAGG &#9400; 2024
          </p>
        </div>
        
      </div>
      
    </div>
  )
}

export default HomePage
