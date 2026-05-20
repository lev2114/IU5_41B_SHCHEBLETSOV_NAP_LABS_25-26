import { amarnaCollection } from "../../data/amarna.js"
import { ProductCardComponent } from "../../components/object-card/index.js"
import { HeaderComponent } from "../../components/header/index.js"
import { ProductPage } from "../product/index.js"
import { EditPage } from "../edit/index.js"

import { sumOfSquares } from "../../utils/amarnaMath.js"
import { isEqualObj } from "../../utils/amarnaMath.js"
import { removeValues } from "../../utils/amarnaMath.js"
import { merge } from "../../utils/amarnaMath.js"

import { artworkUrls } from "../../modules/objectUrls.js"

export class MainPage {

    constructor(parent) {
        this.parent = parent
    }

    get pageRoot() {
        return document.getElementById("main-page")
    }

    getHTML() {
        return `
            <div class="container mt-4">

                <div class="mb-3">
                    <div class="analysis-block mt-3">

                        <h5>Анализ амарнских услуг</h5>

                        <button id="calc-sum" class="btn btn-outline-britannica">
                            Сумма квадратов ID
                        </button>

                        <button id="compare-artifacts" class="btn btn-outline-britannica">
                            Сравнить первые две услуги
                        </button>

                        <button id="remove-test" class="btn btn-outline-britannica">
                            Удалить ID 1 и 2
                        </button>

                        <button id="merge-test" class="btn btn-outline-britannica">
                            Merge услуг
                        </button>

                        <div id="analysis-result" class="mt-2"></div>

                    </div>

                    <div class="d-flex gap-2 mt-3">
                        <input
                            id="search"
                            class="form-control"
                            placeholder="Поиск по названию"
                        >

                        <button
                            id="search-card"
                            class="btn btn-outline-britannica"
                        >
                            Поиск
                        </button>
                    </div>

                    <button
                        id="add-card"
                        class="btn btn-primary mt-2"
                    >
                        Добавить карточку
                    </button>

                </div>

                <div
                    id="main-page"
                    class="d-flex flex-wrap gap-3"
                ></div>

            </div>
        `
    }

    async addCard() {

        const newItem = {
            title: "Новая услуга",
            text: "Добавлено через fetch",
            src: "https://via.placeholder.com/150"
        }

        try {
            await fetch(
                artworkUrls.createArtwork(),
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newItem)
                }
            )

            this.getData()

        } catch (e) {
            console.error(e)
        }
    }

    openCard(e) {

        const cardId = e.target.dataset.id

        const productPage = new ProductPage(this.parent, cardId)

        productPage.render()

    }

    async deleteCard(id) {

        try {
            await fetch(
                artworkUrls.removeArtworkById(id),
                {
                    method: "DELETE"
                }
            )

            this.getData()

        } catch (e) {
            console.error(e)
        }
    }

    async filterCards() {

        const value = document
            .getElementById("search")
            .value

        try {
            const response = await fetch(
                artworkUrls.getArtworksByTitle(value)
            )

            const data = await response.json()

            this.renderData(data)

        } catch (e) {
            console.error(e)
        }
    }

    editCard(e) {
        const id = e.target.dataset.id

        const editPage = new EditPage(this.parent, id)
        editPage.render()
    }

    renderCards(list = this.data) {

        this.pageRoot.innerHTML = ""

        list.forEach(item => {

            const card = new ProductCardComponent(this.pageRoot)

            card.render(
                item,
                this.openCard.bind(this),
                this.deleteCard.bind(this),
                this.editCard.bind(this)
            )

        })
    }

    async getData() {
        try {
            const response = await fetch(artworkUrls.getArtworks())
            const data = await response.json()

            this.data = data
            this.renderData(data)

        } catch (e) {
            console.error("Ошибка загрузки:", e)
        }
    }

    renderData(items) {

        this.pageRoot.innerHTML = ""

        items.forEach((item) => {

            const card = new ProductCardComponent(this.pageRoot)

            card.render(
                item,
                this.openCard.bind(this),
                this.deleteCard.bind(this),
                this.editCard.bind(this)
            )
        })
    }

    render() {

        this.parent.innerHTML = ""

        const header = new HeaderComponent(this.parent)
        header.render()

        const html = this.getHTML()

        this.parent.insertAdjacentHTML("beforeend", html)

        this.getData()

        document
            .getElementById("add-card")
            .addEventListener(
                "click",
                this.addCard.bind(this)
            )

        document.getElementById("search-card")
            .addEventListener("click", this.filterCards.bind(this))

        document
            .getElementById("calc-sum")
            .addEventListener("click", () => {

                const ids = this.data.map(a => a.id)

                const result = sumOfSquares(ids)

                document.getElementById("analysis-result").innerText =
                    "Сумма квадратов ID: " + result
            })

        document
            .getElementById("compare-artifacts")
            .addEventListener("click", () => {

                if (this.data.length < 2) return

                const equal = isEqualObj(this.data[0], this.data[1])

                document.getElementById("analysis-result").innerText =
                    "Первые два объекта одинаковы: " + equal
            })

        document
            .getElementById("remove-test")
            .addEventListener("click", () => {

                const ids = this.data.map(a => a.id)

                const result = removeValues(ids,1,2)

                document.getElementById("analysis-result").innerText =
                    "ID без 1 и 2: " + result.join(", ")
            })

        document
            .getElementById("merge-test")
            .addEventListener("click", () => {

                const obj1 = this.data[0]
                const obj2 = { period: "Amarna", dynasty: "XVIII" }

                const merged = merge(obj1,obj2)

                document.getElementById("analysis-result").innerText =
                    JSON.stringify(merged)
            })
    }

}
