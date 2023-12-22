const NombreDelAlumno = document.querySelector('.NombreDelAlumno');
const TelefonoDelAlumno = document.querySelector('.TelefonoDelAlumno');
const EnviarMensaje = document.querySelector('.EnviarMensaje');
const SiguienteAlumno = document.querySelector('.SiguienteAlumno');
const Enlace = "https://wa.me/504";
const TextoBase = "Estimado (Nombre de la persona) te escribimos para demostrar lo facil que es enviar mensajes automatizados con javascript";

//Solictud al servidor 

fetch('https://devlabscorporation.github.io/tests/datos.json')
    .then(response => response.json())
    .then(GetFile =>{

        const File = GetFile;
        const Limit = File.contactos.length;

        console.table(File.contactos)

        var Position = 0

        SiguienteAlumno.addEventListener('click', ObtenerDatos);

        function ObtenerDatos(){

            if(Position < Limit){
                
                NombreDelAlumno.innerHTML = File.contactos[Position].nombre;
                TelefonoDelAlumno.innerHTML = File.contactos[Position].telefono;

                EnviarMensaje.addEventListener('click', e=>{

                    const MensajeSinNombre = `Hola ${File.contactos[Position - 1].nombre} te escribimos para demostrar lo facil que es enviar mensajes automatizados con javascript`

                    const Mensaje = MensajeSinNombre.replace(/ /g, '%20');

                    const Salida = window.open(Enlace+File.contactos[Position - 1].telefono + `?text=${Mensaje}` );
                    

                })

                Position++

            }else{

                document.write('Ya no existen mas usuarios');

            }

        }

    })
    .catch(error => console.error(`No se pudo obtener el archivo datos.json porque ${error}`))