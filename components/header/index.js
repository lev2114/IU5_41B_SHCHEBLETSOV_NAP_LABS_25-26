import {MainPage} from "../../pages/main/index.js"

export class HeaderComponent{

constructor(parent){
    this.parent = parent
}

clickHome(){
    const mainPage = new MainPage(document.getElementById("root"))
    mainPage.render()
}

getHTML() {
        return `
            <div class="header d-flex justify-content-between align-items-center">

                <h4>Amarna Art Encyclopedia</h4>

                <button id="home-btn" class="header-home-btn text-white">
                    Домой
                </button>

            </div>
        `
    }

render(){

    const html = this.getHTML()

    this.parent.insertAdjacentHTML("afterbegin",html)

    document
    .getElementById("home-btn")
    .addEventListener("click",this.clickHome)

    }

}
