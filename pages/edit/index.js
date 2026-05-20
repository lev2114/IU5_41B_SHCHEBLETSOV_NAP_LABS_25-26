import { HeaderComponent } from "../../components/header/index.js"
import { MainPage } from "../main/index.js"

import { artworkUrls } from "../../modules/objectUrls.js"

export class EditPage {

    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    get pageRoot() {
        return document.getElementById("edit-page")
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

                <div class="mt-3">
                    <button
                        id="save-edit"
                        type="button"
                        class="btn btn-primary">
                        Сохранить
                    </button>

                    <button
                        id="back-edit"
                        type="button"
                        class="btn btn-outline-britannica ms-2">
                        Назад
                    </button>
                </div>
            </div>
        `
    }

    async getData() {
        try {
            const response = await fetch(
                artworkUrls.getArtworkById(this.id)
            )

            const data = await response.json()

            this.renderData(data)

        } catch (e) {
            console.error("Ошибка загрузки данных для редактирования:", e)
        }
    }

    renderData(data) {
        this.pageRoot.innerHTML = ""

        this.pageRoot.insertAdjacentHTML(
            "beforeend",
            this.getEditHTML(data)
        )

        document
            .getElementById("save-edit")
            .addEventListener("click", this.saveData.bind(this))

        document
            .getElementById("back-edit")
            .addEventListener("click", this.clickBack.bind(this))
    }

    async saveData() {
        const title = document.getElementById("edit-title").value
        const text = document.getElementById("edit-text").value
        const src = document.getElementById("edit-src").value

        const updatedObject = {
            title: title,
            text: text,
            src: src
        }

        console.log("Отправка PATCH:", updatedObject)

        try {
            const response = await fetch(
                artworkUrls.updateArtworkById(this.id),
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedObject)
                }
            )

            console.log("PATCH status:", response.status)

            const mainPage = new MainPage(this.parent)
            mainPage.render()

        } catch (e) {
            console.error("Ошибка сохранения:", e)
        }
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

        this.getData()
    }
}