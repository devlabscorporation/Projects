const GetJSONFILE = document.querySelector('.GetJSONFILE');
const FileLoaded = document.querySelector('.FileLoaded');
const FileName = document.querySelector('.FileName');
const FileSize = document.querySelector('.FileSize');
const SendFile = document.querySelector('.SendFile');
const ShowData = document.querySelector('.ShowData');
const PersonName = document.querySelector('.PersonName');
const PersonPhone = document.querySelector('.PersonPhone');
const NextButton = document.querySelector('.NextButton');
const MessageButton = document.querySelector('.MessageButton');

const Link = "https://wa.me/504";

GetJSONFILE.addEventListener('change', GetFile);

function GetFile(e) {
    const PrepareFile = e.target;
    const File = PrepareFile.files[0];

    document.querySelector('.Start').style.display = "none";
    FileLoaded.style.display = "flex";

    FileName.innerHTML = File.name;
    FileSize.innerHTML = File.size + " bytes"; 

    if (File) {
        const Reader = new FileReader();

        Reader.onload = function (e) {
            const Content = e.target.result;
            
            const ConvertToJSON = JSON.parse(Content);

            const GetPersonsNumber = ConvertToJSON.length;

            FileSize.innerHTML = GetPersonsNumber +" personas";

            const PackResult = JSON.stringify(ConvertToJSON);

            localStorage.setItem('CurrenSessionFile', PackResult)

        };

        Reader.onerror = function (e) {
            console.error('No se pudo procesar el archivo.' + e.target.error);
        };
        
        Reader.readAsText(File, "UTF-8");
    }
}


SendFile.addEventListener('click', ShowFileContent);

function ShowFileContent(){

    const GetCurrentFile = localStorage.getItem('CurrenSessionFile');

    if(GetCurrentFile){

        const Object = JSON.parse(GetCurrentFile);
        const Limit = Object.length;
        var Position = 0;

        if(Position <= Limit){

            PersonName.innerHTML = Object[Position].Name
            PersonPhone.innerHTML = FormatPhone()

            function FormatPhone(){

                const CountryCode = "+504 ";
                const GetFullPhone = Object[Position].Phone;
                const ConvertToString = GetFullPhone.toString();
                const Part01 = ConvertToString.substr(0,4);
                const Part02 = ConvertToString.substr(4,8)

                const FormattedPhoneNumber = `${CountryCode + Part01}-${Part02}`
                return FormattedPhoneNumber;

            }

            MessageButton.addEventListener('click', e=>{

                const Message = `¡Hola ${Object[Position].Name}! recibiste este mensaje gracias a la API de mensajes automaticos de Alejandro Salinas.`;
                const RemoveSpaces = Message.replace(/ /g, "%20");

                const CreateURL = `${Link + Object[Position].Phone}?text=${RemoveSpaces}`;

                window.open(CreateURL);

            })

            NextButton.addEventListener('click', e=>{

                
                if(Position < Limit){
           
                    Position++
                    PersonName.innerHTML = Object[Position].Name;
                    PersonPhone.innerHTML = FormatPhone()

                    PersonName.classList.add('Change');
                    PersonPhone.classList.add('Change');

                    setTimeout(() => {
                        
                        PersonName.classList.remove('Change');
                        PersonPhone.classList.remove('Change');

                    }, 300);

                }else{  

                    ShowData.style.display = "none";
                    document.querySelector('.Completed').style.display = "flex";

                }

            })

        }else{

            ShowData.style.display = "none";
            document.querySelector('.Completed').style.display = "flex";

        }

    }


  

    FileLoaded.style.display = "none";
    ShowData.style.display = "flex";

}


document.querySelector('.Refresh').addEventListener('click', e=>{

    window.location.reload()

})


document.querySelector('.Refresh2').addEventListener('click', e=>{

    window.location.reload()

})