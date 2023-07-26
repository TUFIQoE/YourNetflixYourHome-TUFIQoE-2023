import {CustomLogger} from "../../../../utils/custom/CustomLogger"


// noinspection ES6MissingAwait
export class HideMapping{
    private logger : CustomLogger

    private datastore: Object

    constructor() {
        this.logger = new CustomLogger("[AssessmentManager]")

        this.datastore = {
            value: Number,
            description: String,
            started: Date,
            duration: Date
        }
    }

    /**
     * Initialize method. Executed once after creating instance of the class.
    */
    public init = async () : Promise<void> => {
        await this.init_popup()
    }

    hide_everything = (name:string) : void => {
        const popup = document.getElementById("assessment-popup-" + name) as HTMLElement
        if(popup != null){
            popup.style.display = "unset"
        }
    }

    /**
     * Initializes the assessment popup element
     * @returns {Promise<unknown>}
     */

    private init_popup = async () : Promise<void> => {
        return new Promise(resolve => {
            const popup = document.createElement("div")
            const background = this.create_background()
            const header = this.create_header('Trwa konfigurowanie sesji, proszę czekać')
            const subheader = this.create_subheader('Po zakończeniu konfiguracji nastąpi przekierowanie')

            background.appendChild(header)
            background.appendChild(subheader)

            popup.id = "hide-up-popup"
            popup.style.display = "none"
            popup.appendChild(background)
        })
    }

    /**
     * Creates background html element
     * @returns {HTMLElement}
    */
    private create_background = () : HTMLElement => {
        const background = document.createElement("div")
        background.style.width = "100vw"; background.style.height = "100vh";
        background.style.position = "absolute"; background.style.left= "0"; background.style.top = "0";
        background.style.backgroundColor = "#221F1F";
        background.style.display = "flex"; background.style.justifyContent = "center"; background.style.alignItems = "center"; background.style.flexDirection = "column"
        background.style.zIndex = "11000"

        return background
    }

    /**
     * Creates header HTML element
     * @returns {HTMLElement}
    */
    private create_header = (text: string) : HTMLElement => {
        const header = document.createElement("h1")
        header.innerText = text
        header.style.color = "#F39A9D"
        header.style.fontSize = "3rem"
        header.style.zIndex = "10001"
        header.style.textAlign = "center"

        return header
    }

    private create_subheader = (text: string) : HTMLElement => {
        const header = document.createElement("h1")
        header.innerText = text
        header.style.color = "rgb(215, 215, 215)"
        header.style.fontSize = "2rem"
        header.style.zIndex = "10001"
        header.style.textAlign = "center"

        return header
    }
}




