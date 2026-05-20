import { HeaderComponent } from "../../components/header/index.js"
import { BackButtonComponent } from "../../components/back-button/index.js"
import { MainPage } from "../main/index.js"

import { ajax } from "../../modules/ajax.js"
import { artworkUrls } from "../../modules/objectUrls.js"

export class EditPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    get pageRoot() {
        return document.getElementById("edit-page")
    }

    getData() {
        ajax.get(
            artworkUrls.getArtworkById(this.id),
            (data) => {
                this.renderData(data)
            }
        )
    }

    getHTML() {
        return `
            <div class="container mt-4">
                <div id="edit-page"></div>
            </div>
        `
    }

    getEditHTML(data) {
        return `
            <div class="card p-3" style="max-width: 700px;">
                <h4>Редактирование услуги</h4>

                <label for="edit-title" class="form-label mt-3">
                    Название
                </label>

                <input
                    id="edit-title"
                    class="form-control"
                    type="text"
                    value="${data.title || ""}"
                >

                <label for="edit-text" class="form-label mt-3">
                    Описание
                </label>

                <textarea
                    id="edit-text"
                    class="form-control"
                    rows="5"
                >${data.text || ""}</textarea>

                <label for="edit-src" class="form-label mt-3">
                    Ссылка на изображение
                </label>

                <input
                    id="edit-src"
                    class="form-control"
                    type="text"
                    value="${data.src || ""}"
                >
            </div>
        `
    }

    renderData(data) {
        this.pageRoot.insertAdjacentHTML("beforeend", this.getEditHTML(data))

        document
            .getElementById("save-edit")
            .addEventListener("click", this.saveData.bind(this))
    }

    saveData() {
        const title = document.getElementById("edit-title").value
        const text = document.getElementById("edit-text").value
        const src = document.getElementById("edit-src").value

        ajax.patch(
            artworkUrls.updateArtworkById(this.id),
            {
                title: title,
                text: text,
                src: src
            },
            () => {
                const mainPage = new MainPage(this.parent)
                mainPage.render()
            }
        )
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    render() {
        this.parent.innerHTML = ""

        const header = new HeaderComponent(this.parent)
        header.render()

        this.parent.insertAdjacentHTML("beforeend", this.getHTML())

        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))

        this.getData()
    }
}